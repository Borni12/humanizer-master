# 🛡️ HumanizerMaster

> **Adaptive Anti-AI Writing & Voice Cloning Engine**  
> *100% Client-Side, Zero Server, No API Keys Required — Turnitin, GPTZero & CopyLeaks Shield*

🌐 **Live Web Application:** [https://borni12.github.io/humanizer-master/](https://borni12.github.io/humanizer-master/)

---

## 🌟 About the Application

**HumanizerMaster** is an open-source, client-side web application designed to transform AI-generated drafts into natural, human-sounding prose that bypasses advanced AI detection systems like **Turnitin, GPTZero, CopyLeaks, and Originality.ai**.

Unlike conventional humanizers that destroy document formatting and rely on crude synonym replacement or paid cloud APIs, HumanizerMaster operates on **stylometric restructuring**, **document layout preservation**, and **author voice cloning**:
- **Document Layout & Style Preservation:** Uploading a Word (`.docx`), PDF (`.pdf`), or Markdown document retains its original headings (`H1`, `H2`, `H3`), bullet lists, and paragraph structure. Only the phrasing is transformed; the structure remains identical upon export.
- **Voice Cloning Fidelity Indicator (%):** Measures stylometric alignment (sentence length variance, vocabulary density, and transition harmony) to guarantee output matches your authentic personal voice.
- **Burstiness Modulation:** Adjusts sentence length variance so writing follows natural human rhythm rather than rigid, machine-like consistency.
- **AI Marker Elimination:** Purges over 150+ dead giveaway words and formulaic constructions favored by LLMs.
- **Privacy First:** 100% of the processing happens directly in your browser. No text ever leaves your machine.

---

## 🚀 Core Features & Modules

### 1. 🪄 Humanize Studio & Document Formatting Engine
The primary split-screen editing and transformation environment:
- **Document Structure Preservation:** When a `.docx`, `.pdf`, `.md`, or `.txt` file is imported, the engine extracts and preserves document elements (Headings, Bullet/Numbered Lists, Paragraphs).
- **Three Protocol Modes:**
  - 🧬 **Adaptive Style Transfer:** Infuses your custom cloned writing persona or selected profile.
  - 🎓 **Academic Paper / Journal:** Tailored for research papers (ICLR, NeurIPS, Nature, arXiv) by removing promotional hype and ensuring rigorous academic tone.
  - 🏛️ **Grant Proposal Mode:** Optimized for NSF, NIH, and scientific research funding applications.
- **Voice Clone Match Indicator:** Real-time feedback showing exact stylometric similarity between your active voice persona and the output.
- **One-Click Native Export:**
  - 📄 **Word Document (`.docx`):** True binary OpenXML Word document with preserved heading styles, list indentations, and 1.15 line spacing.
  - 📕 **Adobe PDF (`.pdf`):** High-resolution, print-ready formatted document with clean typography and margins.
  - 📝 **Markdown (`.md`):** Clean markdown headers (`#`, `##`) and lists (`-`).
  - 📄 **Plain Text (`.txt`):** Formatted text with structured spacing.

### 2. 🧬 Style DNA Cloner & Calibration Exercise
A persona extraction module that reverse-engineers your authentic writing habits:
- **Standard Calibration Exercise (Read & Rewrite):**
  - Don't have a past document handy? Read one of 3 standard calibration passages (Technology & Autonomy, Scientific Curiosity, Creative Voice).
  - Rewrite its core ideas in 2–3 paragraphs using your natural words and sentence pacing.
  - The engine extracts your authentic **Style DNA** instantly!
- **Document Ingestion:** Or simply upload your existing essay, thesis, paper, or article (`.docx`, `.pdf`, `.txt`, `.md`).
- **Feature Extraction:**
  - Sentence length statistics and cadence standard deviation.
  - Signature vocabulary and word preferences.
  - Favorite transitional phrases and discourse markers.
  - Contraction tendencies and formality scoring.
- **Local Persistence:** Saves custom profiles directly in your browser's `localStorage` for instant reuse.

### 3. 📚 Profiles Library
Manage and switch between pre-configured and custom-cloned writing personas:
- **Academic Scholar:** Measured, formal, objective tone with conservative assertions.
- **ICLR / NeurIPS Researcher:** Concise, rigorous computer science and machine learning paper style.
- **NSF / NIH Grant Writer:** High-impact, objective grant proposal phrasing.
- **Conversational Blogger:** Casual, punchy, engaging narrative with contractions.
- **Tech Executive:** Authoritative, strategic, and concise business communication.
- **Custom Personas:** View metrics, switch active profile, or delete anytime.

### 4. 📊 Live Stylometric & AI Detection Audit Panel
Real-time 5-point report simulating Turnitin, GPTZero, and CopyLeaks detection algorithms:
- **Voice Clone Match (%):** Real-time fidelity score (Rhythm Harmony, Vocabulary Density, Cadence Flow).
- **Simulated AI Risk Score (%):** Predicts detection risk before and after humanization.
- **Burstiness Index:** Measures variance in sentence length. High variance indicates authentic human writing.
- **AI Clichés Purged:** Identifies and highlights flagged buzzwords (e.g., *"delve"*, *"tapestry"*, *"testament"*, *"moreover"*, *"pivotal"*).
- **Readability Index:** Calculates Flesch Reading Ease score to ensure smooth comprehension.

---

## 🔬 6-Layer Anti-AI Transformation Engine

HumanizerMaster implements an algorithmic multi-pass transformation pipeline based on research from [academic-humanizer](https://github.com/AIScientists-Dev/academic-humanizer):

```
[ Uploaded Document (.docx / .pdf / .txt) ]
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│ Document Structure Extraction (Headings, Lists, Paragraphs) │
├─────────────────────────────────────────────────────────────┤
│ Layer 1: Formulaic Opener & Cliché Elimination              │
│ (Removes "In today's fast-paced world", "It is crucial", etc)│
├─────────────────────────────────────────────────────────────┤
│ Layer 2: Overclaiming & Promotional Verb Downgrading        │
│ (Transforms "pivotal", "revolutionary", "delve", etc)       │
├─────────────────────────────────────────────────────────────┤
│ Layer 3: Punctuation & Em-Dash Sanitization                 │
│ (Purges excessive em-dashes '—' and robotic colons)         │
├─────────────────────────────────────────────────────────────┤
│ Layer 4: Burstiness & Clause Restructuring                  │
│ (Splits monotonic stacked sentences into human rhythm)      │
├─────────────────────────────────────────────────────────────┤
│ Layer 5: Author Style DNA & Signature Vocabulary Injection   │
│ (Blends author's favored transitions and sentence habits)   │
├─────────────────────────────────────────────────────────────┤
│ Layer 6: Citation & Math Armor Protection                   │
│ (100% preserves LaTeX $...$, \cite{...}, and [1, 2] markers) │
└─────────────────────────────────────────────────────────────┘
                  │
                  ▼
[ Preserved Structure Output: Export to .docx / .pdf / .md ]
```

---

## 🔒 Privacy & Architecture

- **Zero Server Communication:** No text or documents are uploaded to third-party cloud servers or external AI models.
- **Zero API Keys:** Works without OpenAI, Anthropic, or any third-party credentials.
- **No Rate Limits:** Transform unlimited words, essays, papers, and documents without subscription paywalls.
- **Client-Side Document Parsing & Export:** `.docx` files are parsed via Mammoth.js and generated via docx.js; `.pdf` files are parsed via PDF.js and generated via html2pdf.js inside the browser's JavaScript sandbox.

---

## 💻 Tech Stack

- **Frontend:** HTML5, Modern Vanilla JavaScript (ES6+), Tailwind CSS, Lucide Icons.
- **Document Parsers & Generators:** docx.js (Word), html2pdf.js / jsPDF (PDF), Mammoth.js, PDF.js.
- **Stylometrics:** Custom pure-JS algorithmic engine (`humanizer-engine.js`).
- **Hosting:** GitHub Pages (Static Web App).

---

## 📄 License

MIT License. Free for personal, academic, and professional use.
