# 🛡️ HumanizerMaster

> **Adaptive Anti-AI Writing & Voice Cloning Engine**  
> *100% Client-Side, Zero Server, No API Keys Required — Turnitin, GPTZero & CopyLeaks Shield*

🌐 **Live Web Application:** [https://borni12.github.io/humanizer-master/](https://borni12.github.io/humanizer-master/)

---

## 🌟 About the Application

**HumanizerMaster** is an open-source, client-side web application designed to transform AI-generated drafts into natural, human-sounding prose that bypasses advanced AI detection systems like **Turnitin, GPTZero, CopyLeaks, and Originality.ai**.

Unlike conventional humanizers that rely on crude synonym substitution or external paid APIs, HumanizerMaster operates on **stylometric restructuring** and **author voice cloning**:
- **Burstiness Modulation:** Adjusts sentence length variance so writing follows natural human rhythm rather than rigid, machine-like consistency.
- **AI Marker Elimination:** Purges over 150+ dead giveaway words and formulaic constructions favored by LLMs.
- **Voice Cloning (Style DNA):** Extracts vocabulary preferences, transitions, and pacing from your genuine writing samples and applies them to incoming drafts.
- **Privacy First:** 100% of the processing happens directly in your browser. No text ever leaves your machine.

---

## 🚀 Core Features & Modules

### 1. 🪄 Humanize Studio
The primary split-screen editing and transformation environment:
- **Direct File Import:** Load drafts directly from **Word (`.docx`)**, **PDF (`.pdf`)**, **Markdown (`.md`)**, or **Plain Text (`.txt`)** files using built-in client-side parsers.
- **Three Protocol Modes:**
  - 🧬 **Adaptive Style Transfer:** Infuses your custom cloned writing persona or selected profile.
  - 🎓 **Academic Paper / Journal:** Tailored for research papers (ICLR, NeurIPS, Nature, arXiv) by removing promotional hype and ensuring rigorous academic tone.
  - 🏛️ **Grant Proposal Mode:** Optimized for NSF, NIH, and scientific research funding applications.
- **Pre-Humanize Risk Check:** Click **"Check AI Risk First"** to inspect your draft before applying transformations.
- **One-Click Export:** Download transformed text as **Word (`.doc`)**, **Markdown (`.md`)**, or **Plain Text (`.txt`)**, or copy directly to clipboard.

### 2. 🧬 Style DNA Cloner
A persona extraction module that reverse-engineers your authentic writing habits:
- **Sample Ingestion:** Upload an existing essay, paper, article, or past writing sample (`.docx`, `.pdf`, `.txt`, `.md`).
- **Feature Extraction:**
  - Sentence length statistics and cadence.
  - Signature vocabulary and word preferences.
  - Favorite transitional phrases and discourse markers.
  - Contraction and punctuation tendencies.
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
Real-time report simulating Turnitin, GPTZero, and CopyLeaks detection algorithms:
- **Simulated AI Risk Score (%):** Predicts detection risk before and after humanization.
- **Burstiness Index:** Measures variance in sentence length. High variance indicates authentic human writing.
- **AI Clichés Purged:** Identifies and highlights flagged buzzwords (e.g., *"delve"*, *"tapestry"*, *"testament"*, *"moreover"*, *"pivotal"*).
- **Readability Index:** Calculates Flesch Reading Ease score to ensure smooth comprehension.

---

## 🔬 6-Layer Anti-AI Transformation Engine

HumanizerMaster implements an algorithmic multi-pass transformation pipeline based on research from [academic-humanizer](https://github.com/AIScientists-Dev/academic-humanizer):

```
[ AI-Generated Draft / Uploaded File ]
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
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
[ Undetectable, Authentic Humanized Text ]
```

---

## 🔒 Privacy & Architecture

- **Zero Server Communication:** No text or documents are uploaded to third-party cloud servers or external AI models.
- **Zero API Keys:** Works without OpenAI, Anthropic, or any third-party credentials.
- **No Rate Limits:** Transform unlimited words, essays, papers, and documents without subscription paywalls.
- **Client-Side Document Parsing:** `.docx` files are parsed via Mammoth.js and `.pdf` files via PDF.js entirely inside the browser's JavaScript sandbox.

---

## 💻 Tech Stack

- **Frontend:** HTML5, Modern Vanilla JavaScript (ES6+), Tailwind CSS, Lucide Icons.
- **Document Parsers:** Mammoth.js (Word), PDF.js (PDF documents).
- **Stylometrics:** Custom pure-JS algorithmic engine (`humanizer-engine.js`).
- **Hosting:** GitHub Pages (Static Web App).

---

## 📄 License

MIT License. Free for personal, academic, and professional use.
