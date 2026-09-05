# 🚀 InterviewAce - About the Project

> **Tagline**: Ace Every Technical Interview with Gemini 2.0 AI & Real-Time Rubric Feedback.

---

## 💡 Inspiration

Preparing for senior technical interviews at top technology companies is stressful, fragmented, and expensive. Professional human mock interview services often charge upwards of **\$150 to \$300 per hour**, creating a massive financial barrier for talented candidates worldwide.

Existing practice platforms present static LeetCode-style algorithms or plain multiple-choice quizzes, but lack:
1. **Realistic Conversational Delivery**: Modern technical interviews evaluate verbal communication, architectural tradeoffs, and reasoning out loud.
2. **Hands-On Coding IDE Execution**: Candidates need to write, test, and execute real code while being evaluated on algorithmic time complexity \(O(N)\).
3. **Strict Objective Evaluation**: Typical AI wrappers suffer from "politeness bias," awarding unearned 60–80% scores to 2-word non-answers like *"I don't know"*.

We built **InterviewAce** to democratize high-stakes interview preparation—combining **Gemini 2.0 Flash**, a hands-free **Voice Interviewer**, an **In-App Coding IDE**, and a **RevenueCat Monetization System** into a seamless cross-platform app for Web, iOS, and Android.

---

## 🔨 How We Built It

InterviewAce was architected with a mobile-first, high-performance tech stack built for cross-platform scale:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           INTERVIEWACE ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Frontend (Web & Mobile PWA)                                                │
│  ├── Flutter (iOS & Android Native App)                                     │
│  └── HTML5 / Vanilla CSS Glassmorphism + Web Speech API (Browser Web PWA)   │
├─────────────────────────────────────────────────────────────────────────────┤
│  AI Engine & Evaluation Pipeline                                            │
│  ├── Gemini 2.0 Flash REST API (Real-Time Question & Rubric Generation)     │
│  ├── Multi-Language IDE Sandbox (JS, Python 3, C++ 17, Java 17)             │
│  └── Web Audio SFX Synthesizer + Speech Synthesis (Audio Interviewer)       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Monetization Layer                                                         │
│  └── RevenueCat SDK (Entitlement: `pro_access` | Weekly, Monthly, Annual)   │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **AI Engine (Gemini 2.0 Flash)**: Generates domain-tailored technical and system architecture questions across **7 specialized tracks** (*AI/ML Engineer, Full Stack, Backend Systems, Data Scientist, DevOps Cloud Architect, B2B Sales Exec, Technical Recruiter*).
2. **Interactive Coding IDE**: Built-in multi-language editor with an in-browser stdout execution console for JavaScript and syntax evaluation for Python, C++, and Java.
3. **Speech & Audio Engine**: Integrated **Web Speech API** for hands-free answer dictation and **SpeechSynthesis** to have the AI interviewer speak questions aloud.
4. **Monetization Architecture (RevenueCat)**: Integrated RevenueCat `purchases_flutter` SDK with a high-converting glassmorphic paywall gating unlimited sessions behind the `pro_access` entitlement.

---

## 📐 Mathematical Model & Scoring Function

To ensure rigorous evaluation without grading inflation, InterviewAce computes an overall candidate readiness score \(S_{\text{overall}} \in [0, 100]\) using a weighted 4-axis rubric model:

\[
S_{\text{overall}} = w_1 \cdot S_{\text{depth}} + w_2 \cdot S_{\text{algo}} + w_3 \cdot S_{\text{comm}} + w_4 \cdot S_{\text{edge}}
\]

where the weights are constrained by:

\[
\sum_{i=1}^{4} w_i = 1.0 \quad \text{with } (w_1, w_2, w_3, w_4) = (0.35, 0.30, 0.20, 0.15)
\]

### 1. Strict Anti-Cheating & Non-Answer Step Function

To prevent unearned high scores when candidates provide empty, template, or non-answers \(a \in \mathcal{K}_{\text{non-answer}}\), we enforce a strict penalty function:

\[
P(a) = \begin{cases} 
S_{\text{penalty}} \in [0, 10] & \text{if } a \in \mathcal{K}_{\text{non-answer}} \cup \mathcal{K}_{\text{boilerplate}} \\ 
S_{\text{Gemini}}(a) & \text{otherwise} 
\end{cases}
\]

where:

\[
\mathcal{K}_{\text{non-answer}} = \{ \text{"I don't know"}, \text{"pass"}, \text{"idk"}, \text{"no idea"}, \text{"skip"} \}
\]

### 2. Algorithmic Complexity Scoring Metric

Code submissions are benchmarked against optimal time complexity bounds:

\[
\text{Complexity Score } (S_{\text{algo}}) \propto \frac{1}{O(f(N))}
\]

- Optimal \(O(1)\) or \(O(N)\) solutions: \(85 \le S_{\text{algo}} \le 100\)
- Sub-optimal \(O(N \log N)\) or \(O(N^2)\) brute force: \(45 \le S_{\text{algo}} \le 65\)
- Syntax errors or unedited templates: \(0 \le S_{\text{algo}} \le 10\)

---

## 🧠 What We Learned

1. **Prompt Engineering for Strict Rubrics**: We discovered that standard LLM evaluation prompts tend to be overly generous. Enforcing strict JSON schema responses with explicit zero-tolerance rules for non-answers creates authentic interview rigor.
2. **Cross-Platform Monetization Parity**: Implementing RevenueCat entitlements across both mobile SDKs and web local simulation taught us the value of clean, unified entitlement state wrappers (`isPro`, `weeklyQuotaUsed`).
3. **Designing for Delight**: Adding subtle micro-interactions—like synthesized Web Audio chimes, an interactive 4-Axis radar breakdown, and an **Official Printable Certificate of Readiness**—dramatically boosts user engagement and retention.

---

## 🛑 Challenges We Faced & How We Overcame Them

### Challenge 1: Eliminating AI Score Inflation on Short / Non-Answers
* **Problem**: Early test runs showed Gemini giving ~67/100 to responses like *"I don't know"*, because the LLM tried to be polite.
* **Solution**: Implemented a 2-stage hybrid pipeline. Stage 1 uses local regex string tokenization (`isNonAnswer()`) to instantly catch non-answers and unedited code templates. Stage 2 passes strict scoring guardrails in the Gemini prompt payload, forcing scores of **0–10 / 100** for non-answers.

### Challenge 2: In-Browser Multi-Language Execution
* **Problem**: Running untrusted user code safely inside a browser without backend server dependencies.
* **Solution**: Built an isolated Web Worker console wrapper for JavaScript execution using standard `stdout` capture, combined with static code template validators for Python, C++, and Java.

### Challenge 3: Accessible & Versatile Subscription Pricing
* **Problem**: High subscription prices (\$12.99/mo) can deter students and job seekers on tight budgets.
* **Solution**: Redesigned the RevenueCat paywall into a versatile tiered matrix:
  - **Weekly Pass**: \$1.99 / week
  - **Monthly Pro**: \$4.99 / month (**7-Day Free Trial**)
  - **Annual Pass**: \$29.99 / year (**Save 50%**)
  - **Lifetime Access**: \$49.99 (One-time payment)

---

## 🏆 Summary

InterviewAce transforms interview preparation from a stressful chore into an empowering, AI-driven practice experience. Powered by **Gemini 2.0 Flash** and monetized seamlessly with **RevenueCat**, candidates can practice anytime, anywhere, for a fraction of the cost of traditional coaching.
