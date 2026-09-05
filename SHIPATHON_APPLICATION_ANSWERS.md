# 🏆 RevenueCat Shipathon 2026 - Official Submission Form Answers

Use this document to quickly fill out the official **RevenueCat Shipathon** submission form. Every question has been crafted to highlight your technical execution, RevenueCat monetization architecture, and Gemini 2.0 Flash AI integration.

---

## 📋 1. General Project Details

* **Project / App Name**:  
  `InterviewAce`

* **Tagline (under 80 characters)**:  
  `AI-Powered Mock Interviews & Coding IDE Monetized with RevenueCat`

* **Primary Category**:  
  `Developer Tools / Career & Education / AI Productivity`

* **Target Platforms**:  
  `Web PWA (Desktop & Mobile Simulator) & Flutter (iOS & Android)`

* **Public GitHub Repository**:  
  [https://github.com/Aniket12-coder07/interview-ace-web](https://github.com/Aniket12-coder07/interview-ace-web)

* **Live Demo / Local Preview**:  
  `http://localhost:8080` *(Run `npm start` or deploy with 1-click on Vercel / Netlify)*

---

## 📝 2. Short Description (Under 100 Words)

> **InterviewAce** is a next-generation AI technical interview prep platform built for engineers, monetized seamlessly with **RevenueCat**. Powered by **Gemini 2.0 Flash**, it generates real-time, role-tailored questions across 7 specialized tracks (AI/ML, Full Stack, Backend, Data Science, DevOps, Sales, Recruiting). It features hands-free **voice-to-text dictation**, an **in-browser multi-language Coding IDE** with terminal execution, and strict anti-cheating 4-axis rubric scoring. Users access free weekly sessions before unlocking unlimited practice, advanced tracks, and performance certificates via RevenueCat’s versatile 4-tier subscription paywall.

---

## 💡 3. What inspired you to build InterviewAce?

> Preparing for senior engineering interviews at top tech companies is notoriously stressful, fragmented, and cost-prohibitive. Professional human mock interviewers charge upwards of **$150 to $300 per hour**, creating a massive barrier for talented developers worldwide. Meanwhile, traditional coding platforms provide static LeetCode puzzles without conversational evaluation or system design trade-offs.
>
> We built **InterviewAce** to democratize elite interview coaching. By pairing Google's **Gemini 2.0 Flash** with **RevenueCat's monetization platform**, candidates can practice conversational architecture questions out loud, solve coding challenges in an in-app IDE, and receive instant, unbiased rubric feedback—all at a price point that is 90% cheaper than human coaching.

---

## 💳 4. How did you integrate RevenueCat? (Monetization & Entitlements)

### A. Entitlement Architecture
* **Entitlement ID**: `pro_access`
* **Gated Pro Features**:
  1. **Unlimited AI Mock Sessions**: Bypasses the 3-session/week free tier limit.
  2. **Premium Domain Tracks**: Unlocks specialized tracks (*DevOps Cloud Architect*, *Sales Account Exec*, *Technical Recruiter*).
  3. **Interactive Coding IDE Sandbox**: Multi-language code editor with live terminal execution and $O(N)$ algorithmic complexity grading.
  4. **Official Verified Certificate**: Downloadable and printable Candidate Readiness Certificate with unique verification ID.

### B. Product Matrix & Flexible Pricing Strategy
| Product ID | Display Name | Price | Value Proposition | Offering |
| :--- | :--- | :--- | :--- | :--- |
| `interviewace_pro_weekly` | Weekly Pass | **$1.99 / wk** | Low-friction, short-term practice for immediate interviews | Default |
| `interviewace_pro_monthly` | Monthly Pro | **$4.99 / mo** | **7-Day Free Trial Included** *(Featured default for maximum trial conversion)* | **Default (Featured)** |
| `interviewace_pro_annual` | Annual Pass | **$29.99 / yr** | Save 50% ($2.49/mo equivalent) for continuous career prep | Default |
| `interviewace_pro_lifetime` | Lifetime Access | **$49.99 once** | High-ticket one-time unlock for permanent prep | Special |

### C. High-Converting Glassmorphic Paywall Design
1. **Frictionless Free-to-Paid Onboarding**: Users experience the magic immediately with 3 free interviews before encountering the paywall.
2. **Prominent Free Trial CTA**: Pre-selects the **Monthly Pro ($4.99/mo)** plan featuring a glowing `7-Day Free Trial Included` badge to maximize conversion.
3. **Glassmorphism Aesthetic**: Designed with an ultra-sleek dark palette (`#0F1418` background, `#151B21` translucent glass cards, `#22E6B0` mint glowing buttons) that matches modern iOS/Android standards.
4. **1-Tap Trial Activation & Restore**: Fully wired with state persistence and simulated RevenueCat purchase flows.

---

## 🛠️ 5. Technical Architecture & Innovation

1. **Dual Question Architecture**: Alternates seamlessly between **Conceptual System Design Questions** (voice/text) and **Hands-on In-App Coding Challenges** (in-browser code execution).
2. **Multi-Language IDE**: Built-in editor supporting **JavaScript, Python 3, C++ 17, and Java 17** with a live in-browser stdout console.
3. **Strict 4-Axis Mathematical Rubric**:
   - $S_{\text{overall}} = 0.35 \cdot S_{\text{depth}} + 0.30 \cdot S_{\text{algo}} + 0.20 \cdot S_{\text{comm}} + 0.15 \cdot S_{\text{edge}}$
   - Enforces an automated penalty function assigning 0–10 scores for boilerplate non-answers ("I don't know", "pass") or unedited starter templates.
4. **Speech & Audio Suite**: Integrated **Web Speech API** for hands-free dictation, **SpeechSynthesis** for auditory questions, and a synthesized Web Audio chime engine.
5. **Cross-Platform Parity**: Available both as a high-performance **Web PWA with an iPhone 16 Pro simulator frame** and a native **Flutter mobile app** (`purchases_flutter`).

---

## 🎬 6. 60-Second Demo Video Script for Judges

* **[0:00 - 0:10] The Hook**:  
  *"Meet InterviewAce — the AI technical interview prep platform built for developers, monetized with RevenueCat."*  
  *(Show responsive landing dashboard and 7 interview tracks).*

* **[0:10 - 0:25] The Interview**:  
  *"Select your role, like AI/ML Engineer. Click 'Start Mock Interview' to receive instant Gemini 2.0 Flash questions, and dictate answers hands-free using voice recognition."*  
  *(Show voice input and instant 4-axis rubric feedback).*

* **[0:25 - 0:40] The In-App Coding IDE**:  
  *"Switch to the Coding Challenge tab to solve practical algorithmic problems. Run code in the live terminal console and submit for O(N) complexity evaluation."*  
  *(Demonstrate code execution in JavaScript/Python and test output).*

* **[0:40 - 0:55] RevenueCat Paywall & Free Trial**:  
  *"Hitting the weekly limit triggers our high-converting glassmorphic paywall. Candidates can choose between weekly, annual, or start a 7-day free trial on the $4.99/mo Monthly Pro plan."*  
  *(Click Upgrade, show paywall modal with tiers and trial badge).*

* **[0:55 - 1:00] Closing**:  
  *"InterviewAce — powered by Gemini 2.0 Flash and monetized with RevenueCat."*

---

## 🚀 7. Submission Checklist Before Submitting

- [x] Code pushed to public GitHub repo: `https://github.com/Aniket12-coder07/interview-ace-web`
- [x] Bug-free verification: Missing UI function fixed & validated via live browser testing
- [x] Dedicated coding questions separated from conceptual questions
- [x] RevenueCat 4-tier paywall and `pro_access` entitlement architecture documented
- [x] Promotional 16:9 banner image generated (`interview_ace_banner.jpg`)
- [x] 60-Second video demo script prepared
- [x] 1-Click Netlify & Vercel deployment guides included in `DEPLOYMENT_GUIDE.md`
