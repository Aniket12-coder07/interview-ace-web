# 🎙️ InterviewAce — AI-Powered Technical Interview & Coding Sandbox

> **Official Submission for the RevenueCat Shipathon 2026**  
> *Built with Google Gemini 2.0 Flash, RevenueCat Web SDK, and Google Antigravity IDE.*

[![RevenueCat](https://img.shields.io/badge/RevenueCat-In--App%20Subscriptions-E84A5F?style=for-the-badge&logo=revenuecat&logoColor=white)](https://www.revenuecat.com/)
[![Gemini 2.0 Flash](https://img.shields.io/badge/Gemini%202.0%20Flash-Multimodal%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Antigravity](https://img.shields.io/badge/Built%20With-Google%20Antigravity-8A5CF6?style=for-the-badge)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22E6B0?style=for-the-badge)](LICENSE)

---

## 📺 Official Video Walkthrough & Presentation

- 🎬 **Watch Demo Video:** [`interviewace_demo_with_audio.mp4`](./interviewace_demo_with_audio.mp4) *(1 min 34 sec with full voiceover audio narration)*
- 🌐 **Interactive Web Player:** [`demo_player.html`](./demo_player.html) *(Features live synced transcript captions, chapter jumps, speed controls, and Dark/Light mode)*
- 🎙️ **Audio Narration Track:** [`interviewace_voiceover.wav`](./interviewace_voiceover.wav)

---

## 🌟 Key Features

1. **⚡ Gemini 2.0 Flash Real-Time Technical Interviewer**
   - Live AI mock interview simulations across multiple domains: AI/ML, Full Stack, Backend Systems, Data Science, DevOps, and Tech Recruiting.
   - Dynamic question generation adapted to candidate seniority (Entry, Mid, Senior, Principal) and custom skill sets (PyTorch, RAG, Kubernetes, etc.).

2. **💻 In-Browser Interactive Coding IDE & Terminal Sandbox**
   - Multi-language support (JavaScript, Python 3, C++ 17, Java 17).
   - Live browser-side code runner with simulated terminal output and instant syntax checks.
   - Algorithmic evaluation comparing candidate code against optimal benchmark solutions.

3. **💳 RevenueCat Paywall & Flexible Subscription Monetization**
   - Integrated with RevenueCat REST API & Web SDK.
   - Weekly ($2.99), Monthly ($9.99), Annual ($39.99), and Lifetime ($49.99) accessible tiers.
   - Soft paywall triggers upon quota exhaustion (3 free weekly sessions) and role-based gating.

4. **🌓 Seamless Dark & Light Mode Theme Support**
   - High-contrast, tailored color palettes for both Dark (cyberpunk teal/glassmorphism) and Light modes (crisp slate/emerald).
   - One-click navbar theme toggle with `localStorage` persistence.

5. **🔊 Audio Synthesis & Voice Recognition**
   - Web Speech API for candidate voice input and question text-to-speech.
   - Custom Web Audio API synthesizer for tactile UI sound effects (clicks, success chimes, submission tones).

6. **📱 Adaptive Responsive Design & iPhone Simulator**
   - Fully responsive for mobile, tablet, and desktop viewports.
   - Built-in one-click iPhone Frame simulator mode for demoing mobile UX.

---

## 🏷️ Built With 25 Tags

`revenuecat` • `gemini-api` • `google-antigravity` • `javascript` • `html5` • `css3` • `web-audio-api` • `speech-recognition` • `speech-synthesis` • `mock-interview` • `coding-ide` • `sandbox-terminal` • `subscriptions` • `paywall` • `dark-mode` • `light-mode` • `responsive-design` • `in-app-purchases` • `ai-feedback` • `monetization` • `developer-tools` • `edtech` • `career-prep` • `saas` • `lucide-icons`

---

## 🚀 Quick Start (Local Setup)

```bash
# Clone repository
git clone https://github.com/Aniket12-coder07/interview-ace-web.git
cd interview-ace-web

# Serve locally using any HTTP server
python -m http.server 8080
# or
npx serve .
```

Open your browser to:
- **Main Web Application:** `http://localhost:8080/index.html`
- **Interactive Video Player:** `http://localhost:8080/demo_player.html`

---

## 📁 Repository Structure

```
interview-ace-web/
├── index.html                       # Main application shell with navbar & screens
├── index.css                        # Design system tokens (Dark & Light themes)
├── app.js                           # State engine, Gemini 2.0 API & RevenueCat logic
├── demo_player.html                 # Interactive presentation video player with captions
├── interviewace_demo_with_audio.mp4 # Official presentation video with voiceover
├── interviewace_voiceover.wav       # Synced audio voiceover narration
├── interviewace_demo_video.webp     # High-resolution visual recording
├── interview_ace_banner.jpg         # Project social banner & thumbnail
├── SHIPATHON_APPLICATION_ANSWERS.md # Complete submission questionnaire & pitch deck
├── DEPLOYMENT_GUIDE.md              # Netlify & Vercel deployment instructions
├── PITCH_DECK.md                    # Structured pitch deck for judges
└── PROJECT_STORY.md                 # Origin story & technical architecture
```

---

## 🏆 Shipathon 2026 Submission Kit

For the complete questionnaire answers, judge review checklist, and technical breakdown, please refer to:
👉 **[`SHIPATHON_APPLICATION_ANSWERS.md`](./SHIPATHON_APPLICATION_ANSWERS.md)**
