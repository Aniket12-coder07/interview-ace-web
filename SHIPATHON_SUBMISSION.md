# 🏆 RevenueCat Shipathon 2026 Official Submission Kit

## App Name: InterviewAce
### Tagline: AI-Powered Mock Interviews & Coding IDE Monetized with RevenueCat

---

## 🎯 Executive Summary & Pitch

**InterviewAce** is a cross-platform mobile app (Flutter for iOS/Android & responsive Web PWA) that prepares job candidates for senior technical interviews across **7 domain tracks** (AI/ML, Full Stack, Backend Systems, Data Science, DevOps, Sales, Technical Recruiting).

Powered by **Gemini 2.0 Flash**, it stream-generates role-tailored questions, supports hands-free **voice-to-text recording**, and features an **in-app Coding IDE with terminal execution**. Candidates receive real-time rubric evaluation on technical accuracy, $O(N)$ algorithmic complexity, edge cases, and model answer benchmarks.

---

## 💳 RevenueCat Monetization & Entitlement Architecture

### 1. Entitlement Definition
- **Entitlement ID**: `pro_access`
- **Gated Features**:
  - Unlimited Gemini 2.0 Flash AI mock sessions (bypasses 3/week free limit).
  - Unlocks specialized domain tracks (*DevOps Cloud Architect*, *Sales Account Exec*, *Technical Recruiter*).
  - Interactive In-App Coding IDE & test execution sandbox.
  - Deep rubric score breakdowns & model benchmark comparisons.

### 2. Product Matrix & Lower Versatile Pricing Tiers

| Product ID | Display Name | Billing Cycle | Introductory Offer | RevenueCat Offering |
| :--- | :--- | :--- | :--- | :--- |
| `interviewace_pro_weekly` | Weekly Pass | **$1.99 / week** | Flexible Short-Term Practice | Default |
| `interviewace_pro_monthly` | Monthly Pro | **$4.99 / month** | **7-Day Free Trial Included** | **Default (Current / Featured)** |
| `interviewace_pro_annual` | Annual Pass | **$29.99 / year** | Save 50% ($2.49/mo equivalent) | Default |
| `interviewace_pro_lifetime` | Lifetime Access | **$49.99 once** | One-time payment, unlimited forever | Special Offering |

---

## 🎨 High-Converting Glassmorphic Paywall Design Rationale

1. **Social Proof & Value Header**: Highlights instant access to 40+ technical skill tracks and 7-day free trial.
2. **Clear Friction-Free Selection**: Pre-selects the Monthly Pro plan ($4.99/mo) featuring a prominent `7-Day Free Trial Included` pill badge.
3. **Glassmorphism Aesthetic**: Custom dark palette (`#0F1418` background, `#151B21` glass cards, `#22E6B0` mint glowing pill buttons) matching modern top-tier iOS/Android design standards.
4. **1-Tap Trial Activation & Restore**: Directly calls `Purchases.purchasePackage()` and `Purchases.restorePurchases()`.

---

## 🎬 60-Second Demo Video Script for RevenueCat Judges

- **[0:00 - 0:10] Introduction**: "Meet InterviewAce — the AI interview prep platform built for developers, monetized with RevenueCat."
- **[0:10 - 0:25] Live Mock Interview**: Show candidate selecting the *AI Engineer* track, speaking a response via voice input, and receiving instant Gemini 2.0 Flash feedback.
- **[0:25 - 0:40] Coding IDE Challenge**: Demonstrate switching to the Coding IDE tab, running code in the terminal console, and submitting for $O(N)$ complexity evaluation.
- **[0:40 - 0:55] RevenueCat Paywall & Trial**: Hit the 3-interview weekly limit to trigger the glassmorphic paywall. Show selecting the Monthly Pro plan with 3-day free trial.
- **[0:55 - 1:00] Closing**: "InterviewAce — powered by Gemini 2.0 Flash and RevenueCat."

---

## 📱 Mobile App Setup & Launch Commands

### Native Mobile Flutter Project:
📁 Location: `C:\Users\Neha\.gemini\antigravity\scratch\interview_ace`
```bash
flutter pub get
flutter run
```

### Live Web PWA Simulator:
📁 Location: `C:\Users\Neha\.gemini\antigravity\scratch\interview_ace_web`
🌐 Web Link: **http://localhost:8080** *(Click smartphone icon in navbar for iPhone 16 Pro simulator frame!)*
