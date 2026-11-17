# 🛡️ HumanizerMaster

> **Self-Adaptive AI Text Humanizer & Persona Cloning Engine**  
> *100% Serverless, Zero-API, Pure Client-Side Anti-AI Detection Engine (Turnitin, GPTZero, CopyLeaks Shield)*

---

## 🌟 Overview

**HumanizerMaster** is a privacy-first, zero-server text transformation engine. It is specifically engineered to bypass AI detection software like **Turnitin, GPTZero, CopyLeaks, and Originality.ai** by cloning an author's authentic **Style DNA** (burstiness pacing, signature vocabulary, and cadence) rather than using crude synonym substitution.

It operates **100% inside your browser** (client-side JavaScript). Zero data leaves your computer, zero API keys are required, and there are zero usage limits.

---

## ✨ Key Features

- 🧬 **Few-Shot Style DNA & Vocabulary Cloner**:
  - Upload or paste genuine writing samples (PDF, DOCX, TXT).
  - Automatically mines your signature vocabulary (শব্দ চয়ন), favorite transitions, and sentence pacing.
- 🎓 **Peer-Reviewed Academic Humanizer Protocol**:
  - Implements the 6-layer editing protocol from [AIScientists-Dev/academic-humanizer](https://github.com/AIScientists-Dev/academic-humanizer) (developed by NSF & NIH funded researchers).
  - Mode 1: **Adaptive Style Transfer** (general writing, blogs, essays).
  - Mode 2: **Academic Paper & Journal** (ICLR, NeurIPS, Nature, arXiv).
  - Mode 3: **Grant Proposal Mode** (NSF CAREER, NIH R01).
- 🎯 **Turnitin & GPTZero Shield**:
  - **Burstiness Modulation**: Enforces high variance between short punchy sentences and compound thoughts.
  - **150+ AI Cliché Sanitizer**: Strips dead giveaway tokens (*"delve"*, *"tapestry"*, *"testament"*, *"furthermore"*, *"in conclusion"*, *"pivotal"*, etc.).
  - **Citation & Math Armor**: Equations ($...$) and citations (`\cite{...}`, `[1, 2]`) are 100% preserved.
- 📂 **Client-Side File Ingestion & Export**:
  - Import: `.docx`, `.pdf`, `.txt`, `.md` directly in the browser via client-side parsers.
  - Export: One-click export to Word (`.doc`), Markdown (`.md`), or Plain Text (`.txt`).
- ⚡ **100% Serverless & Static**:
  - Runs natively on **GitHub Pages**, **Cloudflare Pages**, **Vercel**, or locally in any web browser without installing Python or dependencies.

---

## 🚀 Live Deployment Options

### Option 1: GitHub Pages (Recommended)
1. Fork or push this repository to GitHub.
2. Go to **Settings** -> **Pages**.
3. Under **Branch**, select `main` and root `/` folder.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.

*(Note: On GitHub Free accounts, GitHub Pages requires a public repository. If you have GitHub Pro, private repositories are supported).*

### Option 2: Cloudflare Pages / Vercel (100% Free with Private GitHub Repo)
If you want to keep your GitHub repository **100% Private (Secret)** and still host a live URL for free:
1. Push this project to a **Private** GitHub repository.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) or [Vercel](https://vercel.com/) (both free forever).
3. Connect your private GitHub repository with 1-click.
4. Framework preset: Select `Other` or `Static HTML`.
5. Deploy! You will receive an instant live URL (e.g., `https://humanizer-master.pages.dev`).

---

## 💻 Local Usage

Simply double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox!

---

## 📄 License
MIT License. Free for personal, academic, and commercial use.
