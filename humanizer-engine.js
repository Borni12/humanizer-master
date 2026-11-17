// HumanizerMaster Client-Side NLP & Anti-AI Engine
// 100% Serverless, Static Browser Compatible (Runs directly on GitHub Pages)

const AI_MARKER_WORDS = [
  "delve", "delves", "delving", "tapestry", "testament", "beacon",
  "paramount", "pivotal", "cornerstone", "quintessential", "underpin",
  "underpins", "underpinning", "foster", "fostering", "harness", "harnessing",
  "revolutionize", "seamless", "seamlessly", "intricate", "intricacies",
  "multifaceted", "myriad", "plethora", "conundrum", "paradigm",
  "crucial", "imperative", "vital", "indispensable", "embark",
  "endeavor", "holistic", "meticulous", "meticulously", "burgeoning",
  "intertwined", "catalyst", "resonate", "resonates", "realm",
  "ever-evolving", "game-changer", "transformative", "exponential",
  "furthermore", "moreover", "in conclusion", "in summary", "to summarize",
  "it is crucial to", "it is important to note", "it is worth noting",
  "plays a pivotal role", "serves as a testament", "stands as a testament",
  "at the forefront of", "navigating the complexities", "a double-edged sword",
  "shed light on", "delving deeper", "pave the way", "rich tapestry",
  "in today's fast-paced world", "in the digital age", "a holistic approach",
  "in this article", "in this essay", "let's explore", "lastly but not least"
];

const COMMON_STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "because", "as", "what",
  "which", "this", "that", "these", "those", "then", "just", "so", "than",
  "such", "both", "through", "about", "for", "is", "of", "while", "during",
  "to", "from", "in", "out", "on", "off", "again", "further", "then", "once",
  "here", "there", "when", "where", "why", "how", "all", "any", "both",
  "each", "few", "more", "most", "other", "some", "such", "no", "nor",
  "not", "only", "own", "same", "so", "than", "too", "very", "can", "will",
  "just", "should", "now", "be", "was", "were", "been", "being", "have",
  "has", "had", "having", "do", "does", "did", "doing", "at", "by", "with"
]);

const KNOWN_TRANSITIONS = [
  "specifically", "in fact", "in particular", "notably", "essentially",
  "broadly speaking", "consequently", "ultimately", "in reality", "as a result",
  "in this case", "to illustrate", "for instance", "to clarify", "put simply",
  "above all", "overall", "on balance", "in practice", "at scale", "in essence"
];

const ACADEMIC_REPLACEMENTS = [
  [/\bIn recent years,\s+([^,\.]+)\s+has attracted increasing attention\b/gi, "$1 remains a central empirical focus"],
  [/\bIn recent years,\s+([^,\.]+)\s+has become a (crucial|vital|pivotal) problem\b/gi, "$1 presents a clear technical limitation"],
  [/\bWith the rapid (development|advancement) of\s+([^,\.]+),\b/gi, "As $2 scales,"],
  [/\bDespite recent advances,\s*/gi, "However, "],
  [/\bWe prove that\b/gi, "Our empirical results indicate that"],
  [/\bdemonstrate that our method significantly outperforms\b/gi, "observe consistent gains over"],
  [/\bdemonstrates that our method significantly outperforms\b/gi, "shows measurable improvements against"],
  [/\bproves to be universally superior\b/gi, "consistently matches or exceeds the strongest benchmark"],
  [/\bguarantees optimal performance\b/gi, "empirically stabilizes convergence"],
  [/\bpaves the way for a transformative paradigm\b/gi, "addresses a recurring bottleneck in existing pipelines"],
  [/\bpaving the way for a transformative paradigm\b/gi, "resolving key failure modes under benchmark conditions"],
  [/\bpaving the way for\b/gi, "providing a structured baseline for"],
  [/\bpaves the way for\b/gi, "establishes a workable baseline for"],
  [/\ba pivotal step toward\b/gi, "a practical step toward"],
  [/\bhas the potential to revolutionize\b/gi, "offers meaningful utility for"],
  [/\bstands as a testament to\b/gi, "directly reflects"],
  [/\bserves as a testament to\b/gi, "is consistent with"],
  [/\bserves as a\b/gi, "is a"],
  [/\bplays a (pivotal|crucial|paramount) role in\b/gi, "directly impacts"],
  [/\bof paramount importance\b/gi, "essential for reliability"],
  [/\bThrough extensive experiments,\s*/gi, "Across multiple standard benchmarks, "],
  [/\bthrough extensive experiments,\s*/gi, "across benchmark evaluations, "],
  [/\bconduct extensive experiments on a wide range of datasets\b/gi, "evaluate performance across standard benchmark suites"],
  [/\ba wide range of\b/gi, "multiple distinct"],
  [/\bTo the best of our knowledge,\s*this is the first work to\b/gi, "Prior literature has not directly addressed whether we can"],
  [/\bTo the best of our knowledge,\b/gi, "Relative to existing reports,"],
  [/\bwe propose a novel framework\b/gi, "we introduce a dedicated framework"],
  [/\ba novel framework\b/gi, "an adaptive framework"],
  [/\ba novel method\b/gi, "an alternative approach"],
  [/\bdelve into the intricate\b/gi, "examine the specific"],
  [/\bdelve into\b/gi, "examine"],
  [/\bdelves into\b/gi, "examines"],
  [/\bdelving into\b/gi, "examining"],
  [/\brich tapestry of\b/gi, "complex network of"],
  [/\btapestry of\b/gi, "system of"],
  [/\bseamless integration\b/gi, "direct coupling"],
  [/\bseamlessly integrate\b/gi, "couple directly"],
  [/\bseamlessly\b/gi, "smoothly"],
  [/\bmultifaceted\b/gi, "composite"],
  [/\bplethora of\b/gi, "substantial set of"],
  [/\bmyriad of\b/gi, "variety of"],
  [/\bconundrum\b/gi, "trade-off"],
  [/\bparadigm\b/gi, "architecture"],
  [/\btransformative\b/gi, "effective"],
  [/\bgroundbreaking\b/gi, "promising"],
  [/\bholistic approach\b/gi, "unified structure"],
  [/\bburgeoning\b/gi, "growing"],
  [/\bintertwined\b/gi, "connected"],
  [/\bbeacon of\b/gi, "standard for"],
  [/\bFurthermore,\s*/gi, ""],
  [/\bMoreover,\s*/gi, ""],
  [/\bIn conclusion,\s*/gi, "Overall, "],
  [/\bTo summarize,\s*/gi, "In short, "],
  [/\bIt is crucial to note that\b/gi, "Notably,"],
  [/\bIt is important to remember that\b/gi, "Importantly,"],
  [/\bIt is worth noting that\b/gi, "In particular,"],
  [/\bA double-edged sword\b/gi, "A structural trade-off"],
  [/\bIn today's fast-paced world,\b/gi, "In modern settings,"],
  [/\bIn today's digital age,\b/gi, "In current computational environments,"]
];

const DEFAULT_PROFILES = [
  {
    id: "prof_academic_scholar",
    name: "Academic Scholar & Researcher",
    author_notes: "Formal, rigorous, analytical style suitable for essays, theses, and academic papers.",
    style_dna: {
      author_voice: "Rigorous scholar balancing precision with high rhythmic variety.",
      tone: "Analytical, objective, nuanced",
      formality_score: 9,
      sentence_architecture: {
        avg_sentence_len: 21.4,
        std_dev: 7.8,
        burstiness_pattern: "Dense analytical formulations grounded by short emphatic concluding sentences.",
        rhythm_and_cadence: "Rhythmic scholarly prose with zero robotic fluff."
      },
      lexical_idiosyncrasies: {
        signature_vocabulary: ["empirical", "dissonance", "strata", "adaptation", "correlation", "causality"],
        favorite_transitions: ["In contrast", "Significantly", "This discrepancy indicates"],
        uses_contractions: false
      }
    }
  },
  {
    id: "prof_academic_humanizer_paper",
    name: "Academic Paper & Manuscript (ICLR / NeurIPS / Nature)",
    author_notes: "Calibrated directly from AIScientists-Dev/academic-humanizer for empirical research papers.",
    style_dna: {
      author_voice: "Precise, evidence-bound technical scholar who cuts AI significance hype and empty intensifiers.",
      tone: "Neutral, empirical, highly disciplined",
      formality_score: 10,
      sentence_architecture: {
        avg_sentence_len: 18.5,
        std_dev: 6.4,
        burstiness_pattern: "One claim per sentence, eliminating clause-stacking and em-dashes.",
        rhythm_and_cadence: "Direct scientific cadence tied directly to figures, tables, and citations."
      },
      lexical_idiosyncrasies: {
        signature_vocabulary: ["reweighting", "benchmarks", "accuracy", "dependencies", "robustness", "baseline"],
        favorite_transitions: ["Specifically", "Notably", "In particular"],
        uses_contractions: false
      }
    }
  },
  {
    id: "prof_nsf_nih_grant_proposal",
    name: "NSF & NIH Funding Proposal (CAREER / R01)",
    author_notes: "Calibrated from Layer 6 of AIScientists-Dev/academic-humanizer for funded NSF CAREER & NIH Specific Aims.",
    style_dna: {
      author_voice: "Funded Principal Investigator pitching high-impact scientific vision coupled with concrete feasibility.",
      tone: "Ambitious, authoritative, rigorously feasibility-backed",
      formality_score: 9,
      sentence_architecture: {
        avg_sentence_len: 17.2,
        std_dev: 7.1,
        burstiness_pattern: "Punchy problem statement followed by bold hypothesis and parallel aims.",
        rhythm_and_cadence: "Compelling first-page proposal arc that commands high reviewer scores."
      },
      lexical_idiosyncrasies: {
        signature_vocabulary: ["hypothesis", "transferable", "calibrated", "feasibility", "milestone", "outcome"],
        favorite_transitions: ["The objective of this application is", "Crucially", "In practice"],
        uses_contractions: false
      }
    }
  },
  {
    id: "prof_conversational_blogger",
    name: "Casual & Engaging Storyteller",
    author_notes: "Warm, relatable, conversational voice ideal for blogs, newsletters, and engaging articles.",
    style_dna: {
      author_voice: "Friendly mentor speaking directly to the reader with candid clarity.",
      tone: "Conversational, empathetic, witty, and grounded",
      formality_score: 3,
      sentence_architecture: {
        avg_sentence_len: 12.8,
        std_dev: 8.2,
        burstiness_pattern: "Frequent ultra-short sentences (3-5 words) paired with lively explanations.",
        rhythm_and_cadence: "Natural spoken cadence that sounds effortless aloud."
      },
      lexical_idiosyncrasies: {
        signature_vocabulary: ["friction", "routine", "effortless", "workflow", "clarity", "focus"],
        favorite_transitions: ["Here's why:", "The truth is,", "Look at it this way:"],
        uses_contractions: true
      }
    }
  },
  {
    id: "prof_tech_executive",
    name: "Strategic Tech Leader",
    author_notes: "Sharp, pragmatic, impact-driven voice tailored for executive summaries, memos, and strategy.",
    style_dna: {
      author_voice: "Decisive executive who cuts straight to bottom-line impact and practical clarity.",
      tone: "Pragmatic, authoritative, crisp",
      formality_score: 6,
      sentence_architecture: {
        avg_sentence_len: 14.2,
        std_dev: 6.9,
        burstiness_pattern: "Short punchy axioms followed by data-driven outcome sentences.",
        rhythm_and_cadence: "Decisive, dynamic, business-first cadence."
      },
      lexical_idiosyncrasies: {
        signature_vocabulary: ["tradeoff", "retention", "latency", "uptick", "leverage", "execution"],
        favorite_transitions: ["Bottom line:", "The takeaway is simple:", "Consequently"],
        uses_contractions: false
      }
    }
  }
];

class AIDetectionAuditor {
  static cleanAndTokenize(text) {
    const matches = text.toLowerCase().match(/\b[a-zA-Z0-9'-]+\b/g);
    return matches || [];
  }

  static splitSentences(text) {
    const raw = text.trim().split(/(?<=[.!?])\s+/);
    return raw.map(s => s.trim()).filter(s => s.length > 3);
  }

  static audit(text) {
    if (!text || !text.trim()) {
      return {
        word_count: 0,
        sentence_count: 0,
        avg_sentence_length: 0.0,
        sentence_length_std_dev: 0.0,
        burstiness_score: 0.0,
        ai_markers_found: [],
        ai_markers_count: 0,
        ai_risk_score: 0.0,
        ai_risk_label: "Unknown",
        ai_risk_color: "emerald",
        human_likelihood: 100.0,
        readability_score: 0.0
      };
    }

    const words = this.cleanAndTokenize(text);
    const sentences = this.splitSentences(text);
    const wordCount = words.length;
    const sentenceCount = Math.max(sentences.length, 1);

    const sentenceLengths = sentences.map(s => this.cleanAndTokenize(s).length).filter(l => l > 0);
    const validLengths = sentenceLengths.length > 0 ? sentenceLengths : [wordCount];
    const avgSentenceLen = validLengths.reduce((a, b) => a + b, 0) / validLengths.length;

    let stdDev = 0;
    let burstiness = 10.0;
    if (validLengths.length > 1) {
      const variance = validLengths.reduce((sum, l) => sum + Math.pow(l - avgSentenceLen, 2), 0) / (validLengths.length - 1);
      stdDev = Math.sqrt(variance);
      burstiness = parseFloat(((stdDev / (avgSentenceLen + 1e-5)) * 100).toFixed(2));
    }

    const uniqueWords = new Set(words);
    const ttr = wordCount > 0 ? (uniqueWords.size / wordCount) : 0;

    const loweredText = text.toLowerCase();
    const foundMarkers = [];
    for (const marker of AI_MARKER_WORDS) {
      if (marker.includes(" ")) {
        if (loweredText.includes(marker)) foundMarkers.push(marker);
      } else {
        if (uniqueWords.has(marker)) foundMarkers.push(marker);
      }
    }

    let riskPoints = 0.0;
    if (burstiness < 20) riskPoints += 40.0;
    else if (burstiness < 35) riskPoints += 25.0;
    else if (burstiness < 50) riskPoints += 10.0;

    riskPoints += Math.min(foundMarkers.length * 8.0, 40.0);

    const isUniformCluster = (avgSentenceLen >= 13 && avgSentenceLen <= 23) && (stdDev < 4.5);
    if (isUniformCluster) riskPoints += 15.0;

    if (ttr < 0.45 && wordCount > 100) riskPoints += 10.0;
    else if (ttr > 0.65) riskPoints -= 10.0;

    const aiRisk = Math.max(1.0, Math.min(99.0, Math.round(riskPoints * 10) / 10));
    const humanLikelihood = Math.round((100.0 - aiRisk) * 10) / 10;

    let riskLabel = "Ultra Safe (Undetectable)";
    let riskColor = "emerald";
    if (aiRisk >= 65) {
      riskLabel = "High AI Risk (Flagged by Turnitin)";
      riskColor = "red";
    } else if (aiRisk >= 40) {
      riskLabel = "Moderate Risk (Needs more human cadence)";
      riskColor = "yellow";
    } else if (aiRisk >= 20) {
      riskLabel = "Low AI Risk (Human passing)";
      riskColor = "green";
    }

    // Flesch Reading Ease
    const estimateSyllables = (w) => {
      w = w.toLowerCase();
      const matches = w.match(/[aeiouy]+/g);
      let count = matches ? matches.length : 1;
      if (w.endsWith("e") && !w.endsWith("le") && w.length > 2) count = Math.max(1, count - 1);
      return Math.max(1, count);
    };
    const totalSyllables = words.reduce((acc, w) => acc + estimateSyllables(w), 0);
    const asl = avgSentenceLen;
    const asw = totalSyllables / Math.max(wordCount, 1);
    let flesch = 206.835 - (1.015 * asl) - (84.6 * asw);
    flesch = Math.max(0.0, Math.min(100.0, Math.round(flesch * 10) / 10));

    return {
      word_count: wordCount,
      sentence_count: sentenceCount,
      avg_sentence_length: Math.round(avgSentenceLen * 10) / 10,
      sentence_length_std_dev: Math.round(stdDev * 100) / 100,
      burstiness_score: burstiness,
      lexical_diversity_ttr: Math.round(ttr * 1000) / 1000,
      ai_markers_found: foundMarkers.slice(0, 12),
      ai_markers_count: foundMarkers.length,
      ai_risk_score: aiRisk,
      ai_risk_label: riskLabel,
      ai_risk_color: riskColor,
      human_likelihood: humanLikelihood,
      readability_score: flesch
    };
  }
}

class AuthorStyleMiner {
  static mineSample(sampleText) {
    const words = sampleText.toLowerCase().match(/\b[a-zA-Z'-]+\b/g) || [];
    const sentences = sampleText.trim().split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 3);

    const wordCount = words.length;
    const sentenceLengths = sentences.map(s => (s.match(/\b[a-zA-Z'-]+\b/g) || []).length);
    const avgSentenceLen = sentenceLengths.reduce((a, b) => a + b, 0) / Math.max(sentenceLengths.length, 1);

    let stdDev = 3.5;
    if (sentenceLengths.length > 1) {
      const variance = sentenceLengths.reduce((sum, l) => sum + Math.pow(l - avgSentenceLen, 2), 0) / (sentenceLengths.length - 1);
      stdDev = Math.sqrt(variance);
    }

    // Word frequencies
    const freq = {};
    for (const w of words) {
      if (!COMMON_STOPWORDS.has(w) && w.length > 3) {
        freq[w] = (freq[w] || 0) + 1;
      }
    }
    const signatureWords = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 12);

    const lowered = sampleText.toLowerCase();
    const favTransitions = KNOWN_TRANSITIONS.filter(t => lowered.includes(t)).map(t => t.charAt(0).toUpperCase() + t.slice(1));
    const transitions = favTransitions.length > 0 ? favTransitions.slice(0, 4) : ["Specifically", "In practice", "Notably"];

    const contractions = (sampleText.match(/\b[a-zA-Z]+'[a-zA-Z]+\b/g) || []).length;
    const usesContractions = (contractions / Math.max(wordCount, 1)) > 0.005;

    let formality = 6;
    if (usesContractions) formality -= 2;
    if (avgSentenceLen > 20) formality += 2;
    formality = Math.max(1, Math.min(10, formality));

    return {
      author_voice: `Cloned voice reflecting ${signatureWords.length} signature terms and an average sentence pace of ${avgSentenceLen.toFixed(1)} words.`,
      tone: formality < 5 ? "Casual and direct" : "Formal and analytical",
      formality_score: formality,
      sentence_architecture: {
        avg_sentence_len: Math.round(avgSentenceLen * 10) / 10,
        std_dev: Math.round(stdDev * 100) / 100,
        burstiness_pattern: `Paces sentences around ${avgSentenceLen.toFixed(1)} words with standard deviation ${stdDev.toFixed(2)}`,
        rhythm_and_cadence: "Matches author's natural pacing and cadence"
      },
      lexical_idiosyncrasies: {
        signature_vocabulary: signatureWords,
        favorite_transitions: transitions,
        uses_contractions: usesContractions
      }
    };
  }
}

class NativeAlgorithmicEngine {
  static humanizeText(text, mode = "adaptive", profileStyle = null) {
    if (!text || !text.trim()) return text;

    // Step 1: Protect Citations & LaTeX Math
    const placeholders = {};
    let counter = 0;

    const protect = (match) => {
      const key = `__PROTECTED_TOKEN_${counter}__`;
      placeholders[key] = match;
      counter++;
      return key;
    };

    let processed = text;
    // Equations & Math
    processed = processed.replace(/(\\begin\{equation\}[\s\S]*?\\end\{equation\})/g, protect);
    processed = processed.replace(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g, protect);
    // Citations
    processed = processed.replace(/(\\cite\{[^}]+\}|\[\d+(?:[–-]\d+)?(?:,\s*\d+)*\])/g, protect);

    // Step 2: Strip Em-dashes (Layer 1 Academic Humanizer standard)
    processed = processed.replace(/\s*[—–]\s*/g, ", ");

    // Step 3: Apply Academic AI Cliché and Over-claim Transformations
    for (const [pattern, replacement] of ACADEMIC_REPLACEMENTS) {
      processed = processed.replace(pattern, replacement);
    }

    // Step 4: Extract Style DNA
    const styleDna = profileStyle?.style_dna || {};
    const lex = styleDna.lexical_idiosyncrasies || {};
    const favTrans = lex.favorite_transitions || [];
    const usesContractions = lex.uses_contractions || false;

    // Step 5: Modulate Burstiness & Reshape Sentences
    const paragraphs = processed.split(/\n\s*\n/);
    const rebuiltParagraphs = [];

    for (const para of paragraphs) {
      if (!para.trim()) continue;
      const rawSentences = para.trim().split(/(?<=[.!?])\s+/);
      const transformedSentences = [];

      for (let s of rawSentences) {
        s = s.trim();
        if (!s) continue;
        const words = s.split(/\s+/);

        if (words.length > 24 && (s.includes(", which ") || s.includes(", where ") || s.includes(", while ") || s.includes(" and thus "))) {
          let splitDone = false;
          const splitPairs = [
            [", which ", ". This "],
            [", where ", ". Here, "],
            [", while ", ". In contrast, "],
            [" and thus ", ". Consequently, "],
            [", resulting in ", ". This leads to "]
          ];
          for (const [sep, conn] of splitPairs) {
            if (s.includes(sep)) {
              const parts = s.split(sep);
              const s1 = parts[0].trim() + ".";
              const s2 = conn + parts.slice(1).join(sep).trim();
              transformedSentences.push(s1.charAt(0).toUpperCase() + s1.slice(1));
              transformedSentences.push(s2.charAt(0).toUpperCase() + s2.slice(1));
              splitDone = true;
              break;
            }
          }
          if (!splitDone) transformedSentences.push(s);
        } else {
          transformedSentences.push(s);
        }
      }

      // Step 6: Inject Author's Signature Transitions
      if (favTrans.length > 0 && transformedSentences.length > 2) {
        const firstSent = transformedSentences[0];
        if (!/^(However|Although|In|As|Our|We)/i.test(firstSent)) {
          transformedSentences[0] = `${favTrans[0]}, ${firstSent.charAt(0).toLowerCase() + firstSent.slice(1)}`;
        }
      }

      let rhythmicPara = transformedSentences.join(" ");

      // Contractions if applicable
      if (usesContractions || (mode === "adaptive" && (styleDna.formality_score || 5) < 6)) {
        rhythmicPara = rhythmicPara
          .replace(/\bdo not\b/gi, "don't")
          .replace(/\bcannot\b/gi, "can't")
          .replace(/\bit is\b/gi, "it's")
          .replace(/\bthere is\b/gi, "there's")
          .replace(/\bwe have\b/gi, "we've");
      }

      rebuiltParagraphs.push(rhythmicPara);
    }

    let finalResult = rebuiltParagraphs.join("\n\n");

    // Step 7: Restore Protected Citations & Math
    for (const [key, orig] of Object.entries(placeholders)) {
      finalResult = finalResult.replace(key, orig);
    }

    // Clean up formatting
    finalResult = finalResult.replace(/[ \t]+/g, " ");
    finalResult = finalResult.replace(/\s+([.,!?;])/g, "$1");

    return finalResult.trim();
  }
}

// Export to window
window.AIDetectionAuditor = AIDetectionAuditor;
window.AuthorStyleMiner = AuthorStyleMiner;
window.NativeAlgorithmicEngine = NativeAlgorithmicEngine;
window.DEFAULT_PROFILES = DEFAULT_PROFILES;
