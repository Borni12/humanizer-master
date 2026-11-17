// HumanizerMaster Client Application Logic (Static & Standalone)

let state = {
  activeTab: 'humanize',
  profiles: [],
  selectedProfileId: '',
  lastAudit: null,
  isProcessing: false
};

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  loadProfiles();
  setupEventListeners();
});

function setupEventListeners() {
  const inputArea = document.getElementById('input-textarea');
  if (inputArea) {
    inputArea.addEventListener('input', () => {
      updateCounts(inputArea.value, 'input');
    });

    const dropZone = inputArea.parentElement;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.add('border-emerald-500/50'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.remove('border-emerald-500/50'), false);
    });

    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadFile(files[0]);
      }
    });
  }

  // Profiler word count & dropzone
  const profilerInput = document.getElementById('profiler-sample-input');
  if (profilerInput) {
    profilerInput.addEventListener('input', () => {
      const words = profilerInput.value.trim() ? profilerInput.value.trim().split(/\s+/).length : 0;
      const countEl = document.getElementById('profiler-word-count');
      if (countEl) countEl.innerText = words;
    });
  }

  const profilerDrop = document.getElementById('profiler-dropzone');
  if (profilerDrop) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
      profilerDrop.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); }, false);
    });
    ['dragenter', 'dragover'].forEach(ev => {
      profilerDrop.addEventListener(ev, () => profilerDrop.classList.add('border-emerald-500/50'), false);
    });
    ['dragleave', 'drop'].forEach(ev => {
      profilerDrop.addEventListener(ev, () => profilerDrop.classList.remove('border-emerald-500/50'), false);
    });
    profilerDrop.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadProfilerFile(files[0]);
      }
    });
  }

  document.addEventListener('click', (e) => {
    const exportDropdown = document.getElementById('export-dropdown');
    if (!e.target.closest('#export-dropdown') && !e.target.closest('button[onclick="toggleExportMenu()"]')) {
      if (exportDropdown) exportDropdown.classList.add('hidden');
    }
  });
}

function updateCounts(text, prefix) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const wordEl = document.getElementById(`${prefix}-word-count`);
  const charEl = document.getElementById(`${prefix}-char-count`);
  if (wordEl) wordEl.innerText = words;
  if (charEl) charEl.innerText = chars;
}

// ----------------- NAVIGATION -----------------
function switchTab(tabId) {
  state.activeTab = tabId;
  const views = ['humanize', 'profiler', 'library'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    const navBtn = document.getElementById(`nav-tab-${v}`);
    if (v === tabId) {
      if (el) el.classList.remove('hidden');
      if (navBtn) navBtn.className = "px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-2 bg-emerald-600 text-white shadow-sm";
    } else {
      if (el) el.classList.add('hidden');
      if (navBtn) navBtn.className = "px-4 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-slate-200 transition-all flex items-center space-x-2";
    }
  });
  if (window.lucide) lucide.createIcons();
}

// ----------------- PROFILES -----------------
function loadProfiles() {
  const saved = localStorage.getItem('hm_custom_profiles');
  let customProfiles = [];
  if (saved) {
    try { customProfiles = JSON.parse(saved); } catch (e) { customProfiles = []; }
  }
  state.profiles = [...window.DEFAULT_PROFILES, ...customProfiles];
  renderProfileSelect();
  renderProfilesLibrary();
}

function saveCustomProfile(profile) {
  const saved = localStorage.getItem('hm_custom_profiles');
  let customProfiles = [];
  if (saved) {
    try { customProfiles = JSON.parse(saved); } catch (e) { customProfiles = []; }
  }
  const existingIdx = customProfiles.findIndex(p => p.id === profile.id || p.name.toLowerCase() === profile.name.toLowerCase());
  if (existingIdx >= 0) {
    customProfiles[existingIdx] = profile;
  } else {
    customProfiles.unshift(profile);
  }
  localStorage.setItem('hm_custom_profiles', JSON.stringify(customProfiles));
  loadProfiles();
}

function renderProfileSelect() {
  const select = document.getElementById('profile-select');
  if (!select) return;
  select.innerHTML = '';
  state.profiles.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    select.appendChild(opt);
  });
  if (state.profiles.length > 0) {
    if (!state.selectedProfileId) state.selectedProfileId = state.profiles[0].id;
    select.value = state.selectedProfileId;
  }
}

function renderProfilesLibrary() {
  const grid = document.getElementById('profiles-grid');
  if (!grid) return;
  grid.innerHTML = '';

  state.profiles.forEach(p => {
    const dna = p.style_dna || {};
    const isCustom = !p.id.startsWith("prof_academic_") && !p.id.startsWith("prof_nsf_") && !p.id.startsWith("prof_conversational_") && !p.id.startsWith("prof_tech_");
    const card = document.createElement('div');
    card.className = "bg-dark-850 border border-dark-700/70 p-5 rounded-2xl shadow-lg flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all";

    const deleteBtn = isCustom
      ? `<button onclick="deleteCustomProfile('${p.id}')" class="text-slate-500 hover:text-red-400 transition" title="Delete Profile"><i data-lucide="trash" class="w-3.5 h-3.5"></i></button>`
      : `<span class="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Preset</span>`;

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-bold bg-dark-800 text-emerald-400 px-2 py-0.5 rounded-full border border-dark-700">
            Formality ${dna.formality_score || 5}/10
          </span>
          ${deleteBtn}
        </div>
        <h3 class="font-bold text-slate-100 text-sm mb-1">${p.name}</h3>
        <p class="text-xs text-slate-400 line-clamp-2">${p.author_notes || dna.author_voice || 'Authentic human voice profile'}</p>
        
        <div class="mt-4 pt-3 border-t border-dark-700/50 space-y-1.5 text-[11px] text-slate-400">
          <div><strong class="text-slate-300">Tone:</strong> ${dna.tone || 'Dynamic'}</div>
          <div><strong class="text-slate-300">Avg Sentence:</strong> ${dna.sentence_architecture?.avg_sentence_len || 18} words</div>
          <div><strong class="text-slate-300">Cadence:</strong> ${dna.sentence_architecture?.rhythm_and_cadence || 'Varied rhythm'}</div>
        </div>
      </div>

      <button onclick="selectProfileAndHumanize('${p.id}')" class="w-full py-2 bg-dark-800 hover:bg-emerald-600 hover:text-white text-slate-300 rounded-xl text-xs font-semibold border border-dark-700 transition">
        Use in Studio
      </button>
    `;
    grid.appendChild(card);
  });
  if (window.lucide) lucide.createIcons();
}

function selectProfileAndHumanize(profileId) {
  state.selectedProfileId = profileId;
  const select = document.getElementById('profile-select');
  if (select) select.value = profileId;
  switchTab('humanize');
  showToast('Profile activated!');
}

function deleteCustomProfile(profileId) {
  if (!confirm('Are you sure you want to delete this profile?')) return;
  const saved = localStorage.getItem('hm_custom_profiles');
  if (saved) {
    try {
      let customProfiles = JSON.parse(saved);
      customProfiles = customProfiles.filter(p => p.id !== profileId);
      localStorage.setItem('hm_custom_profiles', JSON.stringify(customProfiles));
      loadProfiles();
      showToast('Profile deleted');
    } catch (e) {}
  }
}

// ----------------- STYLE EXTRACTION -----------------
function executeExtractProfile() {
  const name = document.getElementById('profiler-name-input').value.trim();
  const notes = document.getElementById('profiler-notes-input').value.trim();
  const sample = document.getElementById('profiler-sample-input').value.trim();

  if (!name) {
    showToast('Please enter a Profile Name.');
    return;
  }
  if (!sample || sample.length < 25) {
    showToast('Please provide a writing sample (at least 2-3 sentences).');
    return;
  }

  const btn = document.getElementById('extract-profile-btn');
  const label = document.getElementById('extract-btn-label');
  btn.disabled = true;
  label.innerText = 'Extracting Style DNA & Vocabulary...';

  setTimeout(() => {
    try {
      const dna = window.AuthorStyleMiner.mineSample(sample);
      const newProfile = {
        id: "prof_custom_" + Date.now().toString(36),
        name: name,
        author_notes: notes || "User custom cloned style",
        sample_snippet: sample.slice(0, 300) + "...",
        style_dna: dna
      };

      saveCustomProfile(newProfile);

      const resultCard = document.getElementById('extraction-result-card');
      const resultContent = document.getElementById('extraction-result-content');
      resultCard.classList.remove('hidden');

      const lex = dna.lexical_idiosyncrasies || {};
      const sigWords = lex.signature_vocabulary || [];
      const favTrans = lex.favorite_transitions || [];

      const wordsHtml = sigWords.length > 0 
        ? sigWords.map(w => `<span class="bg-dark-800 text-emerald-400 px-2 py-0.5 rounded border border-dark-700 text-[11px] font-mono mr-1">${w}</span>`).join('')
        : '<span class="text-slate-500">Natural vocabulary</span>';

      resultContent.innerHTML = `
        <p><strong>Cloned Persona:</strong> ${dna.author_voice}</p>
        <p><strong>Formality Level:</strong> ${dna.formality_score}/10 | <strong>Cadence:</strong> ${dna.sentence_architecture.avg_sentence_len} words per sentence</p>
        <div class="mt-2">
          <strong class="text-slate-200">Mined Signature Vocabulary (শব্দ চয়ন):</strong>
          <div class="flex flex-wrap gap-1 mt-1">${wordsHtml}</div>
        </div>
        <p class="mt-2 text-xs text-slate-400"><strong>Favorite Transitions:</strong> ${favTrans.join(', ') || 'Natural organic bridges'}</p>
        <div class="mt-3 flex items-center space-x-2">
          <button onclick="selectProfileAndHumanize('${newProfile.id}')" class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md">
            Activate in Studio Now &rarr;
          </button>
        </div>
      `;

      showToast(`Profile "${name}" cloned successfully!`);
    } catch (err) {
      showToast('Error: ' + err.message);
    } finally {
      btn.disabled = false;
      label.innerText = 'Extract & Save Style DNA';
      if (window.lucide) lucide.createIcons();
    }
  }, 100);
}

// ----------------- HUMANIZATION ENGINE -----------------
function executeHumanize() {
  const inputText = document.getElementById('input-textarea').value.trim();
  if (!inputText) {
    showToast('Please enter or upload some text to humanize.');
    return;
  }

  const profileSelect = document.getElementById('profile-select');
  const profileId = profileSelect ? profileSelect.value : '';
  const profile = state.profiles.find(p => p.id === profileId) || state.profiles[0];

  const protocolMode = document.getElementById('protocol-mode-select') ? document.getElementById('protocol-mode-select').value : 'adaptive';
  const btn = document.getElementById('humanize-btn');
  const label = document.getElementById('humanize-btn-label');
  const statusPill = document.getElementById('output-status-pill');

  btn.disabled = true;
  btn.classList.add('processing-pulse');
  label.innerText = 'Humanizing & Neutralizing AI Markers...';
  statusPill.innerText = 'Transforming...';
  statusPill.className = 'text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 font-medium animate-pulse';

  setTimeout(() => {
    try {
      const beforeAudit = window.AIDetectionAuditor.audit(inputText);
      const humanizedText = window.NativeAlgorithmicEngine.humanizeText(inputText, protocolMode, profile);
      const afterAudit = window.AIDetectionAuditor.audit(humanizedText);

      const outArea = document.getElementById('output-textarea');
      const placeholder = document.getElementById('output-placeholder');
      if (placeholder) placeholder.classList.add('hidden');
      if (outArea) {
        outArea.classList.remove('hidden');
        outArea.value = humanizedText;
        updateCounts(humanizedText, 'output');
      }

      renderMetrics(beforeAudit, afterAudit, {
        ai_risk_reduction: Math.round(Math.max(0, beforeAudit.ai_risk_score - afterAudit.ai_risk_score) * 10) / 10
      });

      statusPill.innerText = 'Humanized & Safe';
      statusPill.className = 'text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium';
      showToast('Text successfully humanized and anti-AI protected!');
    } catch (err) {
      showToast('Humanization Error: ' + err.message);
      statusPill.innerText = 'Error';
      statusPill.className = 'text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20 font-medium';
    } finally {
      btn.disabled = false;
      btn.classList.remove('processing-pulse');
      label.innerText = 'Humanize Now (Anti-AI Transformation)';
      if (window.lucide) lucide.createIcons();
    }
  }, 80);
}

// ----------------- METRICS -----------------
function renderMetrics(before, after, improvement) {
  const panel = document.getElementById('metrics-panel');
  if (panel) panel.classList.remove('hidden');

  const riskVal = document.getElementById('metric-ai-risk');
  const riskLabel = document.getElementById('metric-risk-label');
  const riskBar = document.getElementById('metric-risk-bar');
  const riskComp = document.getElementById('metric-risk-comparison');

  if (riskVal) riskVal.innerText = `${after.ai_risk_score}%`;
  if (riskLabel) riskLabel.innerText = after.ai_risk_label;
  if (riskBar) riskBar.style.width = `${after.ai_risk_score}%`;

  if (after.ai_risk_score < 25) {
    if (riskVal) riskVal.className = 'text-2xl font-black text-emerald-400';
    if (riskLabel) riskLabel.className = 'text-xs font-semibold text-emerald-400';
    if (riskBar) riskBar.className = 'bg-emerald-500 h-full rounded-full transition-all duration-700';
  } else if (after.ai_risk_score < 50) {
    if (riskVal) riskVal.className = 'text-2xl font-black text-amber-400';
    if (riskLabel) riskLabel.className = 'text-xs font-semibold text-amber-400';
    if (riskBar) riskBar.className = 'bg-amber-500 h-full rounded-full transition-all duration-700';
  } else {
    if (riskVal) riskVal.className = 'text-2xl font-black text-red-400';
    if (riskLabel) riskLabel.className = 'text-xs font-semibold text-red-400';
    if (riskBar) riskBar.className = 'bg-red-500 h-full rounded-full transition-all duration-700';
  }

  if (riskComp) riskComp.innerText = `Original was ${before.ai_risk_score}% AI risk (Reduced by ${improvement.ai_risk_reduction}%)`;
  const burstEl = document.getElementById('metric-burstiness');
  if (burstEl) burstEl.innerText = after.burstiness_score;

  const markersCount = document.getElementById('metric-markers-count');
  if (markersCount) markersCount.innerText = after.ai_markers_count;

  const tagsContainer = document.getElementById('metric-markers-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = '';
    if (after.ai_markers_found.length === 0) {
      tagsContainer.innerHTML = '<span class="text-[10px] text-emerald-400 font-medium">✓ 100% Free of AI buzzwords</span>';
    } else {
      after.ai_markers_found.forEach(m => {
        const tag = document.createElement('span');
        tag.className = 'text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20';
        tag.innerText = m;
        tagsContainer.appendChild(tag);
      });
    }
  }

  const readEl = document.getElementById('metric-readability');
  if (readEl) readEl.innerText = after.readability_score;
}

function runAuditOnly() {
  const text = document.getElementById('input-textarea').value.trim();
  if (!text) {
    showToast('Please provide some text to audit.');
    return;
  }
  const report = window.AIDetectionAuditor.audit(text);
  renderMetrics(report, report, { ai_risk_reduction: 0 });
  showToast(`Audit complete: Detected ${report.ai_risk_score}% AI risk.`);
}

// ----------------- CLIENT-SIDE FILE PARSING -----------------
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) uploadFile(file);
}

function parseFileText(file, callback) {
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'docx' && window.mammoth) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      window.mammoth.extractRawText({ arrayBuffer: evt.target.result })
        .then(function(result) {
          callback(result.value);
        })
        .catch(function(err) {
          showToast('Failed to parse DOCX: ' + err.message);
        });
    };
    reader.readAsArrayBuffer(file);
  } else if (ext === 'pdf' && window.pdfjsLib) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      const typedArray = new Uint8Array(evt.target.result);
      window.pdfjsLib.getDocument(typedArray).promise.then(function(pdf) {
        let maxPages = pdf.numPages;
        let countPromises = [];
        for (let j = 1; j <= maxPages; j++) {
          countPromises.push(pdf.getPage(j).then(page => page.getTextContent().then(content => {
            return content.items.map(item => item.str).join(' ');
          })));
        }
        Promise.all(countPromises).then(pagesText => {
          callback(pagesText.join('\n\n'));
        });
      }).catch(err => {
        showToast('PDF parse error: ' + err.message);
      });
    };
    reader.readAsArrayBuffer(file);
  } else {
    // Plain text / Markdown
    const reader = new FileReader();
    reader.onload = function(evt) {
      callback(evt.target.result);
    };
    reader.readAsText(file);
  }
}

function uploadFile(file) {
  showToast(`Reading ${file.name}...`);
  parseFileText(file, (text) => {
    const inputArea = document.getElementById('input-textarea');
    inputArea.value = text;
    updateCounts(text, 'input');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    showToast(`Loaded ${words} words from ${file.name}!`);
  });
}

function handleProfilerFileUpload(e) {
  const file = e.target.files[0];
  if (file) uploadProfilerFile(file);
}

function uploadProfilerFile(file) {
  const label = document.getElementById('profiler-upload-label');
  if (label) label.innerText = 'Extracting writing sample...';
  showToast(`Analyzing ${file.name}...`);

  parseFileText(file, (text) => {
    const sampleArea = document.getElementById('profiler-sample-input');
    const words = text.trim().split(/\s+/);
    let sampleText = text;
    if (words.length > 800) {
      sampleText = words.slice(0, 800).join(' ') + '...';
      showToast(`Selected first 800 words from ${file.name} for voice profiling!`);
    } else {
      showToast(`Extracted ${words.length} words from ${file.name}!`);
    }

    sampleArea.value = sampleText;
    const countEl = document.getElementById('profiler-word-count');
    if (countEl) countEl.innerText = sampleText.trim().split(/\s+/).length;

    const nameInput = document.getElementById('profiler-name-input');
    if (nameInput && !nameInput.value.trim()) {
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      nameInput.value = baseName.charAt(0).toUpperCase() + baseName.slice(1) + ' Voice';
    }

    if (label) label.innerText = 'Upload My Document (.pdf, .docx, .txt)';
  });
}

function clearProfilerSample() {
  const sampleArea = document.getElementById('profiler-sample-input');
  if (sampleArea) sampleArea.value = '';
  const countEl = document.getElementById('profiler-word-count');
  if (countEl) countEl.innerText = '0';
  showToast('Sample cleared.');
}

// ----------------- EXPORT & COPY -----------------
function toggleExportMenu() {
  const menu = document.getElementById('export-dropdown');
  if (menu) menu.classList.toggle('hidden');
}

function exportResult(format) {
  const outArea = document.getElementById('output-textarea');
  const text = outArea.value.trim();
  if (!text) {
    showToast('No text available to export.');
    return;
  }

  const menu = document.getElementById('export-dropdown');
  if (menu) menu.classList.add('hidden');

  let mimeType = 'text/plain;charset=utf-8';
  let content = text;
  let filename = `Humanized_Passing_Document.${format}`;

  if (format === 'docx') {
    // Generate simple Word XML/HTML document for instant download
    mimeType = 'application/msword;charset=utf-8';
    content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Humanized Document</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; font-size: 11pt;">
        ${text.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}
      </body>
      </html>
    `;
    filename = 'Humanized_Passing_Document.doc';
  } else if (format === 'md') {
    mimeType = 'text/markdown;charset=utf-8';
  }

  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
  showToast(`Downloaded ${filename}!`);
}

function copyOutput() {
  const outArea = document.getElementById('output-textarea');
  if (!outArea || !outArea.value) {
    showToast('Nothing to copy.');
    return;
  }
  navigator.clipboard.writeText(outArea.value);
  const btnText = document.getElementById('copy-btn-text');
  if (btnText) {
    btnText.innerText = 'Copied!';
    setTimeout(() => { btnText.innerText = 'Copy'; }, 2000);
  }
  showToast('Copied humanized text to clipboard!');
}

function clearInput() {
  const inputArea = document.getElementById('input-textarea');
  if (inputArea) inputArea.value = '';
  updateCounts('', 'input');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 3500);
  }
}
