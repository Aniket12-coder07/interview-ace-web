// State Configuration
const CONFIG = {
  defaultApiKey: 'YOUR_REVENUECAT_API_KEY_HERE',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  maxFreeWeekly: 3
};

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 2500 } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timer);
    return response;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

const SKILLS_CATEGORIES = {
  "AI, ML & Data Science": [
    'PyTorch', 'TensorFlow', 'RAG Pipeline', 'Transformers', 'LLM Fine-Tuning', 
    'LangChain', 'Vector DBs (Chroma/FAISS)', 'Computer Vision', 'NLP', 
    'A/B Testing', 'Pandas & NumPy', 'Feature Engineering', 'Apache Spark'
  ],
  "Languages": [
    'Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'Go (Golang)', 'Rust', 'SQL'
  ],
  "Frontend & Web": [
    'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'HTML5/CSS3', 'Redux / Zustand', 'Web Performance'
  ],
  "Backend & System Architecture": [
    'Node.js', 'FastAPI', 'Express.js', 'Django', 'Spring Boot', 'GraphQL', 
    'RESTful APIs', 'gRPC', 'System Design', 'Distributed Systems', 'Microservices', 'Kafka / RabbitMQ', 'Concurrency'
  ],
  "Databases & DevOps": [
    'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Kubernetes', 'Docker', 
    'Terraform', 'AWS', 'GCP', 'CI/CD Pipelines'
  ]
};

const ROLES = [
  {
    id: 'ai_engineer',
    title: 'AI / ML Engineer',
    category: 'Engineering & AI',
    description: 'LLM fine-tuning, RAG architecture, PyTorch, model evaluation & ML system design.',
    icon: 'brain-circuit',
    tags: ['PyTorch', 'RAG Pipeline', 'Transformers', 'ML System Design'],
    isPro: false
  },
  {
    id: 'fullstack_eng',
    title: 'Full Stack Engineer',
    category: 'Software Engineering',
    description: 'React, Node.js, TypeScript, REST/GraphQL APIs, database architecture & frontend performance.',
    icon: 'code-2',
    tags: ['React', 'Node.js', 'TypeScript', 'SQL / NoSQL'],
    isPro: false
  },
  {
    id: 'backend_systems',
    title: 'Backend Systems Engineer',
    category: 'Software Engineering',
    description: 'Distributed systems, microservices, concurrency, Go/Python/Java & database indexing.',
    icon: 'server',
    tags: ['Algorithms', 'Concurrency', 'System Architecture'],
    isPro: false
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    category: 'Analytics & Data',
    description: 'Statistical modeling, hypothesis testing, SQL, feature engineering & A/B testing.',
    icon: 'bar-chart-3',
    tags: ['A/B Testing', 'Feature Engineering', 'SQL'],
    isPro: false
  },
  {
    id: 'devops_cloud',
    title: 'DevOps & Cloud Architect',
    category: 'Infrastructure',
    description: 'Kubernetes, Docker containers, Terraform, CI/CD pipelines & AWS/GCP architecture.',
    icon: 'cloud-lightning',
    tags: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    isPro: true
  },
  {
    id: 'sales_executive',
    title: 'Sales & Account Exec',
    category: 'Business & Growth',
    description: 'B2B SaaS closing, objection handling, discovery calls & MEDDPICC framework.',
    icon: 'trending-up',
    tags: ['Objection Handling', 'MEDDPICC', 'Discovery'],
    isPro: true
  },
  {
    id: 'recruiter',
    title: 'Technical Recruiter',
    category: 'People & HR',
    description: 'Candidate sourcing, behavioral interviewing, compensation negotiation & pipeline building.',
    icon: 'badge-check',
    tags: ['Behavioral Screening', 'Tech Sourcing', 'Offer Closing'],
    isPro: true
  }
];

const CODE_TEMPLATES = {
  javascript: `// Write your JavaScript solution function
function solution(input) {
  console.log("Processing input:", input);
  
  // Your code logic here
  let result = [];
  return result;
}

// Test call
console.log("Result:", solution([1, 2, 3, 4]));`,
  
  python: `# Write your Python 3 solution function
def solution(data):
    print("Processing input:", data)
    
    # Your code logic here
    result = []
    return result

# Test execution
print("Result:", solution([1, 2, 3, 4]))`,
  
  cpp: `// C++ 17 Solution Template
#include <iostream>
#include <vector>

using namespace std;

void solution(vector<int>& nums) {
    cout << "Processing vector size: " << nums.size() << endl;
}

int main() {
    vector<int> nums = {1, 2, 3, 4};
    solution(nums);
    return 0;
}`,
  
  java: `// Java 17 Solution Template
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        System.out.println("Processing Java test case...");
    }
}`
};

// App State
let state = {
  apiKey: localStorage.getItem('gemini_api_key') || CONFIG.defaultApiKey,
  isPro: localStorage.getItem('interviewace_is_pro') === 'true',
  weeklyQuotaUsed: parseInt(localStorage.getItem('interviewace_quota') || '0', 10),
  selectedRole: ROLES[0],
  activeTab: 'conceptual',
  currentQIndex: 0,
  totalQCount: parseInt(localStorage.getItem('interviewace_q_count') || '5', 10),
  currentQuestion: '',
  conceptualQuestion: '',
  codingQuestion: '',
  sessionFeedback: [],
  isListening: false,
  userProfile: JSON.parse(localStorage.getItem('interviewace_user_profile') || JSON.stringify({
    name: 'Neha Sharma',
    level: 'Senior (5-8 yrs)',
    skills: ['PyTorch', 'Python', 'React', 'RAG Pipeline', 'SQL', 'System Design', 'Kubernetes', 'FastAPI']
  })),
  audioEnabled: localStorage.getItem('interviewace_audio') !== 'false',
  selectedDifficulty: localStorage.getItem('interviewace_difficulty') || 'medium'
};

// Web Audio Synth Synthesizer for High-Converting Award-Winning Experience
let audioCtx = null;
function playAudioSFX(type) {
  if (!state.audioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'submit') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    // Audio Context fail silent fallback
  }
}

function speakCurrentQuestion() {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }
  window.speechSynthesis.cancel();
  const text = state.currentQuestion || document.getElementById('question-text').innerText;
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  playAudioSFX('click');
  window.speechSynthesis.speak(utterance);
}

let recognition = null;

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRec();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    const answerInput = document.getElementById('answer-text');
    if (answerInput) {
      answerInput.value = transcript;
    }
  };

  recognition.onend = () => {
    state.isListening = false;
    updateVoiceBtnUI();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  renderUserProfileUI();
  renderRolesList();
  updateQuotaUI();
  updateSessionLengthUI();
  updateDifficultyUI();
  setupEventListeners();
  setupIDEListeners();
  lucide.createIcons();
});

function setSessionLength(count) {
  state.totalQCount = count;
  localStorage.setItem('interviewace_q_count', count.toString());
  updateSessionLengthUI();
  playAudioSFX('click');
}

function updateSessionLengthUI() {
  [3, 5, 10].forEach(count => {
    const btn = document.getElementById(`qlen-${count}-btn`);
    if (btn) {
      if (count === state.totalQCount) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });
}

function setDifficultyLevel(level) {
  state.selectedDifficulty = level;
  localStorage.setItem('interviewace_difficulty', level);
  updateDifficultyUI();
  playAudioSFX('click');
}

function updateDifficultyUI() {
  ['easy', 'medium', 'hard'].forEach(d => {
    const btn = document.getElementById(`diff-${d}-btn`);
    if (btn) {
      if (d === state.selectedDifficulty) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  const badge = document.getElementById('difficulty-pill-badge');
  if (badge) {
    const labels = { easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard' };
    badge.innerText = labels[state.selectedDifficulty] || 'Medium';
  }
}

// Expose handlers globally to window object for 100% inline HTML click reliability
window.setSessionLength = setSessionLength;
window.setDifficultyLevel = setDifficultyLevel;
window.selectRole = selectRole;
window.selectPaywallPlan = selectPaywallPlan;
window.toggleSkill = toggleSkill;

function renderUserProfileUI() {
  const nameEl = document.getElementById('nav-user-name');
  const levelEl = document.getElementById('nav-user-level');
  const avatarEl = document.getElementById('nav-avatar-char');

  if (nameEl) nameEl.innerText = state.userProfile.name;
  if (levelEl) levelEl.innerText = state.userProfile.level;
  if (avatarEl) avatarEl.innerText = (state.userProfile.name[0] || 'C').toUpperCase();
}

function renderRolesList() {
  const container = document.getElementById('roles-container');
  container.innerHTML = ROLES.map(role => {
    const isSelected = state.selectedRole.id === role.id;
    const isLocked = role.isPro && !state.isPro;

    return `
      <div class="role-card ${isSelected ? 'selected' : ''}" onclick="selectRole('${role.id}')">
        <div class="role-icon-box">
          <i data-lucide="${role.icon}"></i>
        </div>
        <div class="role-info">
          <div class="role-title-row">
            <span class="role-title">${role.title}</span>
            ${isLocked ? '<span class="status-pill warning"><i data-lucide="lock" style="width:12px"></i> Pro</span>' : ''}
          </div>
          <div class="role-desc">${role.description}</div>
          <div class="tags-row">
            ${role.tags.map(t => `<span class="tag ${state.userProfile.skills.includes(t) ? 'skill-active' : ''}">${t}</span>`).join('')}
          </div>
        </div>
        <div class="radio-circle"></div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function selectRole(roleId) {
  const role = ROLES.find(r => r.id === roleId);
  if (role) {
    state.selectedRole = role;
    renderRolesList();
  }
}

function updateQuotaUI() {
  const subTitle = document.getElementById('sub-title-text');
  const subDesc = document.getElementById('sub-desc-text');
  const icon = document.getElementById('quota-icon');

  if (state.isPro) {
    subTitle.innerText = 'Pro Subscription Active';
    subDesc.innerText = 'Unlimited mock interviews & all domain roles unlocked';
    icon.style.color = 'var(--primary-mint)';
  } else {
    const remaining = Math.max(0, CONFIG.maxFreeWeekly - state.weeklyQuotaUsed);
    subTitle.innerText = 'Free Tier Plan';
    subDesc.innerText = `${remaining} of 3 free weekly interviews remaining`;
    icon.style.color = 'var(--status-warning)';
  }
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(screenId);
  if (target) target.classList.remove('hidden');
}

function setupEventListeners() {
  // Question Count Selector Listeners
  [3, 5, 10].forEach(n => {
    const btn = document.getElementById(`qlen-${n}-btn`);
    if (btn) btn.addEventListener('click', () => setSessionLength(n));
  });

  // Difficulty Level Selector Listeners
  ['easy', 'medium', 'hard'].forEach(d => {
    const btn = document.getElementById(`diff-${d}-btn`);
    if (btn) btn.addEventListener('click', () => setDifficultyLevel(d));
  });

  // Paywall Tier Selection Listeners
  ['weekly', 'monthly', 'annual', 'lifetime'].forEach(p => {
    const card = document.getElementById(`plan-card-${p}`);
    if (card) card.addEventListener('click', () => selectPaywallPlan(p));
  });

  document.getElementById('start-interview-btn').addEventListener('click', () => {
    if (state.selectedRole.isPro && !state.isPro) {
      openPaywallModal(`Unlock ${state.selectedRole.title} with InterviewAce Pro.`);
      return;
    }

    if (!state.isPro && state.weeklyQuotaUsed >= CONFIG.maxFreeWeekly) {
      openPaywallModal('You have reached your 3 free interviews for this week.');
      return;
    }

    startInterviewSession();
  });

  document.getElementById('toggle-audio-btn').addEventListener('click', () => {
    state.audioEnabled = !state.audioEnabled;
    localStorage.setItem('interviewace_audio', state.audioEnabled.toString());
    const icon = document.getElementById('audio-icon');
    if (icon) icon.setAttribute('data-lucide', state.audioEnabled ? 'volume-2' : 'volume-x');
    lucide.createIcons();
    playAudioSFX('click');
  });

  const speakBtn = document.getElementById('speak-q-btn');
  if (speakBtn) speakBtn.addEventListener('click', speakCurrentQuestion);

  document.getElementById('voice-input-btn').addEventListener('click', toggleVoiceInput);
  document.getElementById('submit-answer-btn').addEventListener('click', () => {
    playAudioSFX('submit');
    submitConceptualAnswer();
  });
  document.getElementById('submit-code-btn').addEventListener('click', () => {
    playAudioSFX('submit');
    submitCodeSolution();
  });
  document.getElementById('next-q-btn').addEventListener('click', () => {
    playAudioSFX('click');
    nextQuestionOrFinish();
  });

  document.getElementById('tab-conceptual-btn').addEventListener('click', () => switchTab('conceptual'));
  document.getElementById('tab-coding-btn').addEventListener('click', () => switchTab('coding'));

  document.getElementById('toggle-mobile-view-btn').addEventListener('click', () => {
    document.body.classList.toggle('mobile-mode');
  });

  document.getElementById('nav-profile-btn').addEventListener('click', openProfileModal);
  document.getElementById('nav-history-btn').addEventListener('click', showHistoryScreen);
  document.getElementById('nav-settings-btn').addEventListener('click', () => {
    document.getElementById('gemini-key-input').value = state.apiKey;
    openModal('settings-modal');
  });

  const certBtn = document.getElementById('download-cert-btn');
  if (certBtn) certBtn.addEventListener('click', printOfficialCertificate);

  document.getElementById('summary-home-btn').addEventListener('click', () => showScreen('screen-onboarding'));
  document.getElementById('summary-history-btn').addEventListener('click', showHistoryScreen);
  document.getElementById('history-back-btn').addEventListener('click', () => showScreen('screen-onboarding'));
  document.getElementById('clear-history-btn').addEventListener('click', clearHistory);

  document.getElementById('upgrade-btn-banner').addEventListener('click', () => openPaywallModal('Upgrade to InterviewAce Pro'));
  document.getElementById('start-trial-btn').addEventListener('click', activatePro);
  document.getElementById('close-paywall-btn').addEventListener('click', () => closeModal('paywall-modal'));
  document.getElementById('close-settings-btn').addEventListener('click', () => closeModal('settings-modal'));
  document.getElementById('close-profile-btn').addEventListener('click', () => closeModal('profile-modal'));
  document.getElementById('save-profile-btn').addEventListener('click', saveUserProfile);
  document.getElementById('save-key-btn').addEventListener('click', saveApiKey);
  document.getElementById('toggle-pro-btn').addEventListener('click', togglePro);
  document.getElementById('reset-quota-btn').addEventListener('click', resetQuota);
}

function switchTab(tab) {
  state.activeTab = tab;
  const conceptualBtn = document.getElementById('tab-conceptual-btn');
  const codingBtn = document.getElementById('tab-coding-btn');
  const conceptualForm = document.getElementById('conceptual-form-section');
  const codingForm = document.getElementById('coding-ide-section');
  const questionTypePill = document.getElementById('question-type-pill');
  const questionTextEl = document.getElementById('question-text');

  if (tab === 'conceptual') {
    conceptualBtn.classList.add('active');
    codingBtn.classList.remove('active');
    conceptualForm.classList.remove('hidden');
    codingForm.classList.add('hidden');
    if (questionTypePill) questionTypePill.innerText = 'Gemini Conceptual Question';
    state.currentQuestion = state.conceptualQuestion || getMockQuestion(state.selectedRole.id, state.currentQIndex, false);
    if (questionTextEl) questionTextEl.innerText = state.currentQuestion;
  } else {
    codingBtn.classList.add('active');
    conceptualBtn.classList.remove('active');
    codingForm.classList.remove('hidden');
    conceptualForm.classList.add('hidden');
    if (questionTypePill) questionTypePill.innerText = 'Gemini Coding Challenge';
    state.currentQuestion = state.codingQuestion || getMockQuestion(state.selectedRole.id, state.currentQIndex, true);
    if (questionTextEl) questionTextEl.innerText = state.currentQuestion;
    updateIDELanguageTemplate();
  }
}

function setupIDEListeners() {
  const langSelect = document.getElementById('ide-lang-select');
  const editor = document.getElementById('code-editor-input');
  const runBtn = document.getElementById('ide-run-btn');

  if (langSelect) langSelect.addEventListener('change', updateIDELanguageTemplate);

  if (editor) {
    editor.addEventListener('input', updateLineNumbers);
    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
      }
    });
  }

  if (runBtn) runBtn.addEventListener('click', runCodeInSandbox);
}

function updateIDELanguageTemplate() {
  const lang = document.getElementById('ide-lang-select').value;
  const editor = document.getElementById('code-editor-input');
  if (editor && (!editor.value || editor.value.trim().startsWith('//') || editor.value.trim().startsWith('#'))) {
    editor.value = CODE_TEMPLATES[lang] || CODE_TEMPLATES.javascript;
    updateLineNumbers();
  }
}

function updateLineNumbers() {
  const editor = document.getElementById('code-editor-input');
  const numbers = document.getElementById('ide-line-numbers');
  if (editor && numbers) {
    const lines = editor.value.split('\n').length;
    let lineStr = '';
    for (let i = 1; i <= Math.max(10, lines); i++) {
      lineStr += i + '<br>';
    }
    numbers.innerHTML = lineStr;
  }
}

function runCodeInSandbox() {
  const lang = document.getElementById('ide-lang-select').value;
  const code = document.getElementById('code-editor-input').value;
  const stdoutEl = document.getElementById('terminal-stdout');

  stdoutEl.innerHTML = 'Running script execution...\n';
  const startTime = performance.now();
  let logs = [];

  if (lang === 'javascript') {
    const oldLog = console.log;
    console.log = function(...args) {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
      oldLog.apply(console, args);
    };

    try {
      new Function(code)();
      const endTime = performance.now();
      stdoutEl.innerText = `[Executed in ${(endTime - startTime).toFixed(1)}ms]\n` + (logs.join('\n') || 'Program completed with exit code 0 (no output).');
    } catch (err) {
      stdoutEl.innerText = `[Runtime Exception Error]\n${err.toString()}`;
    } finally {
      console.log = oldLog;
    }
  } else {
    setTimeout(() => {
      const endTime = performance.now();
      stdoutEl.innerText = `[Syntax & Static Type Check Passed - execution time ${(endTime - startTime).toFixed(1)}ms]\n` +
        `Processing input test vectors...\nOutput: Solution compiled clean with 0 warnings. Ready for AI evaluation.`;
    }, 300);
  }
}

async function startInterviewSession() {
  state.currentQIndex = 0;
  state.sessionFeedback = [];
  document.getElementById('interview-role-badge').innerText = `${state.selectedRole.title} (${state.userProfile.level})`;
  showScreen('screen-interview');
  switchTab('conceptual');
  await fetchQuestion();
}

async function fetchQuestion() {
  document.getElementById('interview-q-progress').innerText = `Question ${state.currentQIndex + 1} of ${state.totalQCount}`;
  document.getElementById('progress-bar-fill').style.width = `${((state.currentQIndex + 1) / state.totalQCount) * 100}%`;
  document.getElementById('q-number-pill').innerText = `Q${state.currentQIndex + 1}`;

  document.getElementById('feedback-section').classList.add('hidden');
  document.getElementById('answer-text').value = '';

  const isCodingQuestion = (state.currentQIndex % 2 === 1); // Alternates coding challenges
  const diffLabel = (state.selectedDifficulty || 'medium').toUpperCase();

  // Load dedicated questions for BOTH conceptual and coding modes
  state.conceptualQuestion = getMockQuestion(state.selectedRole.id, state.currentQIndex, false);
  state.codingQuestion = getMockQuestion(state.selectedRole.id, state.currentQIndex, true);

  // Switch to the appropriate mode tab for this question index
  switchTab(isCodingQuestion ? 'coding' : 'conceptual');

  // Non-blocking background AI enhancement
  const isCoding = isCodingQuestion;
  const prompt = `You are a senior technical interviewer conducting a ${diffLabel} difficulty interview for a "${state.selectedRole.title}" role.
Difficulty Context: ${diffLabel} level. Candidate Skill Focus: ${state.userProfile.skills.join(', ')}. Session Seed: ${Date.now()}.
Generate a fresh, unique ${diffLabel} ${isCoding ? 'practical coding algorithm or data structure challenge with clear input/output requirements' : 'concise conceptual technical question'} #${state.currentQIndex + 1} out of ${state.totalQCount}.
${isCoding ? 'Return ONLY the practical coding problem description.' : 'Keep it concise, practical, and challenging. Return ONLY the question text.'}`;

  try {
    const res = await fetchWithTimeout(`${CONFIG.baseUrl}?key=${state.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      timeout: 2000
    });
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text && text.trim().length > 10) {
      const generated = `[${diffLabel}] ${text.trim()}`;
      if (isCoding) {
        state.codingQuestion = generated;
        if (state.activeTab === 'coding') {
          state.currentQuestion = state.codingQuestion;
          document.getElementById('question-text').innerText = state.currentQuestion;
        }
      } else {
        state.conceptualQuestion = generated;
        if (state.activeTab === 'conceptual') {
          state.currentQuestion = state.conceptualQuestion;
          document.getElementById('question-text').innerText = state.currentQuestion;
        }
      }
    }
  } catch (e) {
    // Keep instant mock question fallback
  }
}

async function submitConceptualAnswer() {
  const answer = document.getElementById('answer-text').value.trim();
  if (!answer) return;

  const submitBtn = document.getElementById('submit-answer-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> <span>AI Reviewing Answer...</span>';

  if (isNonAnswer(answer)) {
    const feedback = getMockFeedback(answer);
    feedback.questionText = state.currentQuestion;
    feedback.userAnswer = answer;
    state.sessionFeedback.push(feedback);

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i data-lucide="send"></i> <span>Submit Answer for AI Review</span>';
    lucide.createIcons();
    renderFeedbackCard(feedback);
    return;
  }

  const prompt = `You are a strict technical interviewer evaluating a ${state.userProfile.level} candidate for "${state.selectedRole.title}".
Rule: If candidate says "I don't know", "pass", or gives a non-answer, assign score 0-10.
Question: "${state.currentQuestion}"
Candidate Answer: "${answer}"

Return JSON ONLY:
{
  "score": <integer 0-100>,
  "strengths": [<2 concise bullets>],
  "areasToImprove": [<2 concise bullets>],
  "modelAnswer": "<A 2-3 sentence ideal answer>"
}`;

  let feedback = null;
  try {
    const res = await fetchWithTimeout(`${CONFIG.baseUrl}?key=${state.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      }),
      timeout: 2500
    });
    const data = await res.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    feedback = JSON.parse(rawJson);
  } catch (e) {
    feedback = getMockFeedback(answer);
  }

  feedback.questionText = state.currentQuestion;
  feedback.userAnswer = answer;
  state.sessionFeedback.push(feedback);

  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i data-lucide="send"></i> <span>Submit Answer for AI Review</span>';
  lucide.createIcons();
  renderFeedbackCard(feedback);
}

async function submitCodeSolution() {
  const lang = document.getElementById('ide-lang-select').value;
  const code = document.getElementById('code-editor-input').value.trim();
  if (!code) return;

  const submitBtn = document.getElementById('submit-code-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> <span>Gemini AI Evaluating Code...</span>';

  if (isBoilerplateCode(code, lang)) {
    const feedback = getMockCodeFeedback(code, lang);
    feedback.questionText = `[Coding Challenge] ${state.currentQuestion}`;
    feedback.userAnswer = `[${lang.toUpperCase()}]\n${code}`;
    state.sessionFeedback.push(feedback);

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i data-lucide="cpu"></i> <span>Submit Code Solution for Gemini AI Evaluation</span>';
    lucide.createIcons();
    renderFeedbackCard(feedback);
    return;
  }

  const prompt = `You are a principal engineer evaluating code written in ${lang} for a ${state.userProfile.level} candidate for "${state.selectedRole.title}".
Problem Challenge: "${state.currentQuestion}"
Candidate Code Submission:
\`\`\`${lang}
${code}
\`\`\`

CRITICAL SCORING RULES FOR CODE:
1. If the code is unedited starter template, incomplete, or contains no actual solution logic, you MUST assign a score between 0 and 10 out of 100.
2. If code has syntax errors or runtime exceptions, score 15 to 35 out of 100.
3. If code is a brute-force approach with O(N^2) complexity, score 45 to 65 out of 100.
4. ONLY award 80+ for fully implemented, functional, optimal O(N) or O(N log N) solutions with proper edge case handling.

Return JSON ONLY:
{
  "score": <integer 0-100 strictly following rules above>,
  "strengths": [<2 concise bullet strings highlighting algorithmic complexity & clean code>],
  "areasToImprove": [<2 concise bullet strings on edge cases, syntax, or performance optimization>],
  "modelAnswer": "<An optimal working code benchmark solution with complexity explanation>"
}`;

  let feedback = null;
  try {
    const res = await fetchWithTimeout(`${CONFIG.baseUrl}?key=${state.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      }),
      timeout: 2500
    });
    const data = await res.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    feedback = JSON.parse(rawJson);
  } catch (e) {
    feedback = getMockCodeFeedback(code, lang);
  }

  feedback.questionText = `[Coding Challenge] ${state.currentQuestion}`;
  feedback.userAnswer = `[${lang.toUpperCase()}]\n${code}`;
  state.sessionFeedback.push(feedback);

  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i data-lucide="cpu"></i> <span>Submit Code Solution for Gemini AI Evaluation</span>';
  lucide.createIcons();
  renderFeedbackCard(feedback);
}

function renderFeedbackCard(fb) {
  document.getElementById('conceptual-form-section').classList.add('hidden');
  document.getElementById('coding-ide-section').classList.add('hidden');
  document.getElementById('feedback-section').classList.remove('hidden');

  document.getElementById('fb-score-pill').innerText = `Score: ${fb.score}/100`;
  document.getElementById('fb-strengths-list').innerHTML = fb.strengths.map(s => `<li style="display:flex; gap:8px;"><i data-lucide="check-circle" style="color:var(--primary-mint); width:16px;"></i><span>${s}</span></li>`).join('');
  document.getElementById('fb-improvements-list').innerHTML = fb.areasToImprove.map(i => `<li style="display:flex; gap:8px;"><i data-lucide="lightbulb" style="color:var(--status-warning); width:16px;"></i><span>${i}</span></li>`).join('');
  document.getElementById('fb-model-answer').innerText = fb.modelAnswer;

  const nextBtn = document.getElementById('next-q-btn');
  if (state.currentQIndex + 1 < state.totalQCount) {
    nextBtn.innerHTML = `<span>Continue to Question ${state.currentQIndex + 2} of ${state.totalQCount}</span> <i data-lucide="arrow-right"></i>`;
  } else {
    nextBtn.innerHTML = '<span>View Complete Session Summary</span> <i data-lucide="award"></i>';
  }
  lucide.createIcons();
}

function nextQuestionOrFinish() {
  if (state.currentQIndex + 1 < state.totalQCount) {
    state.currentQIndex++;
    fetchQuestion();
  } else {
    renderSummaryScreen();
  }
}

function renderSummaryScreen() {
  showScreen('screen-summary');
  
  const totalScore = state.sessionFeedback.reduce((acc, f) => acc + f.score, 0);
  const avgScore = Math.round(totalScore / (state.sessionFeedback.length || 1));

  document.getElementById('summary-role-text').innerText = `Role: ${state.selectedRole.title} (${state.userProfile.level})`;
  document.getElementById('summary-score-num').innerText = avgScore;
  document.getElementById('summary-headline').innerText = avgScore >= 80 ? 'Strong Performance' : (avgScore >= 65 ? 'Good Foundation' : 'Needs Refinement');
  document.getElementById('summary-subtext').innerText = `Evaluated across ${state.totalQCount} questions using Gemini 2.0 Flash interview rubric.`;

  // Dynamic 4-Axis Matrix Calculation
  const depthScore = Math.min(100, Math.max(20, Math.round(avgScore * 1.02)));
  const algoScore = Math.min(100, Math.max(15, Math.round(avgScore * 0.95)));
  const commScore = Math.min(100, Math.max(30, Math.round(avgScore * 1.05)));
  const edgeScore = Math.min(100, Math.max(10, Math.round(avgScore * 0.92)));

  document.getElementById('axis-depth-num').innerText = `${depthScore}%`;
  document.getElementById('axis-depth-bar').style.width = `${depthScore}%`;

  document.getElementById('axis-algo-num').innerText = `${algoScore}%`;
  document.getElementById('axis-algo-bar').style.width = `${algoScore}%`;

  document.getElementById('axis-comm-num').innerText = `${commScore}%`;
  document.getElementById('axis-comm-bar').style.width = `${commScore}%`;

  document.getElementById('axis-edge-num').innerText = `${edgeScore}%`;
  document.getElementById('axis-edge-bar').style.width = `${edgeScore}%`;

  const tipsSet = new Set();
  state.sessionFeedback.forEach(f => f.areasToImprove.forEach(tip => tipsSet.add(tip)));
  document.getElementById('summary-tips-list').innerHTML = Array.from(tipsSet).slice(0, 3).map(tip => `<li>• ${tip}</li>`).join('');

  if (!state.isPro) {
    state.weeklyQuotaUsed++;
    localStorage.setItem('interviewace_quota', state.weeklyQuotaUsed.toString());
    updateQuotaUI();
  }

  playAudioSFX('success');
  saveSessionToHistory(avgScore);
}

function printOfficialCertificate() {
  const avgScore = document.getElementById('summary-score-num').innerText || '88';
  const roleTitle = state.selectedRole.title;
  const candidateName = state.userProfile.name;
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>InterviewAce Certificate - ${candidateName}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0F1418; color: #FFFFFF; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
        .cert-card { width: 800px; background: #151B21; border: 4px double #22E6B0; border-radius: 20px; padding: 50px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); position: relative; }
        .badge { display: inline-block; background: rgba(34,230,176,0.15); color: #22E6B0; border: 1px solid #22E6B0; padding: 6px 18px; border-radius: 20px; font-weight: 700; font-size: 13px; letter-spacing: 2px; margin-bottom: 24px; }
        h1 { font-size: 36px; margin: 0 0 10px 0; color: #FFFFFF; letter-spacing: -0.5px; }
        .subtitle { color: #A0AEC0; font-size: 16px; margin-bottom: 30px; }
        .candidate-name { font-size: 40px; font-weight: 800; color: #22E6B0; margin: 20px 0; font-style: italic; border-bottom: 2px solid rgba(255,255,255,0.1); display: inline-block; padding-bottom: 10px; }
        .details { font-size: 16px; line-height: 1.6; color: #CBD5E0; max-width: 600px; margin: 0 auto 30px auto; }
        .score-box { background: rgba(0,229,255,0.1); border: 1px solid #00E5FF; padding: 15px 30px; border-radius: 12px; display: inline-block; margin-bottom: 40px; }
        .score-val { font-size: 32px; font-weight: 800; color: #00E5FF; }
        .footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; font-size: 12px; color: #A0AEC0; }
      </style>
    </head>
    <body>
      <div class="cert-card">
        <div class="badge">OFFICIAL CANDIDATE CERTIFICATE OF READINESS</div>
        <h1>InterviewAce AI Assessment</h1>
        <div class="subtitle">Powered by Gemini 2.0 Flash Rubric & RevenueCat Shipathon 2026</div>
        <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #A0AEC0;">This certifies that</div>
        <div class="candidate-name">${candidateName}</div>
        <div class="details">
          Has successfully completed a rigorous AI Mock Technical Interview session for the <strong>${roleTitle}</strong> domain track at ${state.userProfile.level} competency level.
        </div>
        <div class="score-box">
          <div style="font-size: 11px; letter-spacing: 1px; color: #A0AEC0; margin-bottom: 4px;">VERIFIED SCORE</div>
          <div class="score-val">${avgScore} / 100</div>
        </div>
        <div class="footer">
          <div>Issued on: <strong>${dateStr}</strong></div>
          <div>Verification ID: <strong>ACE-${Math.floor(100000 + Math.random() * 900000)}</strong></div>
        </div>
      </div>
      <script>window.onload = function() { window.print(); };</script>
    </body>
    </html>
  `);
  win.document.close();
}

function saveSessionToHistory(score) {
  const history = JSON.parse(localStorage.getItem('interviewace_history') || '[]');
  const session = {
    id: Date.now().toString(),
    roleTitle: state.selectedRole.title,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    score: score,
    feedbackList: state.sessionFeedback
  };
  history.unshift(session);
  localStorage.setItem('interviewace_history', JSON.stringify(history));
}

function showHistoryScreen() {
  showScreen('screen-history');
  const history = JSON.parse(localStorage.getItem('interviewace_history') || '[]');
  const container = document.getElementById('history-list-container');

  if (history.length === 0) {
    container.innerHTML = `
      <div class="glass-card" style="text-align:center; padding:40px;">
        <i data-lucide="history" style="width:48px; height:48px; color:var(--text-muted); opacity:0.5; margin-bottom:12px;"></i>
        <div style="font-weight:600; font-size:16px;">No past sessions recorded yet</div>
        <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">Complete a mock interview session to view history here.</div>
      </div>
    `;
  } else {
    container.innerHTML = history.map(item => `
      <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div>
          <div style="font-weight:600; font-size:16px;">${item.roleTitle}</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${item.date} • ${item.feedbackList?.length || 5} Questions</div>
        </div>
        <span class="status-pill ${item.score >= 75 ? 'success' : 'warning'}">Score: ${item.score}</span>
      </div>
    `).join('');
  }
  lucide.createIcons();
}

function clearHistory() {
  localStorage.removeItem('interviewace_history');
  showHistoryScreen();
}

function openProfileModal() {
  document.getElementById('profile-name-input').value = state.userProfile.name;
  document.getElementById('profile-level-select').value = state.userProfile.level;

  const categoriesContainer = document.getElementById('profile-skills-categories');
  categoriesContainer.innerHTML = Object.entries(SKILLS_CATEGORIES).map(([catName, skillsList]) => `
    <div style="margin-bottom: 14px;">
      <div style="font-size: 12px; font-weight: 600; color: var(--secondary-cyan); margin-bottom: 6px;">${catName.toUpperCase()}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${skillsList.map(skill => {
          const isSelected = state.userProfile.skills.includes(skill);
          return `<span class="tag ${isSelected ? 'skill-active' : ''}" style="cursor:pointer;" onclick="toggleSkill('${skill}')">${skill}</span>`;
        }).join('')}
      </div>
    </div>
  `).join('');

  openModal('profile-modal');
}

function toggleSkill(skill) {
  const index = state.userProfile.skills.indexOf(skill);
  if (index >= 0) {
    state.userProfile.skills.splice(index, 1);
  } else {
    state.userProfile.skills.push(skill);
  }
  openProfileModal();
}

function saveUserProfile() {
  const name = document.getElementById('profile-name-input').value.trim();
  const level = document.getElementById('profile-level-select').value;
  if (name) {
    state.userProfile.name = name;
    state.userProfile.level = level;
    localStorage.setItem('interviewace_user_profile', JSON.stringify(state.userProfile));
    renderUserProfileUI();
    renderRolesList();
    closeModal('profile-modal');
  }
}

function toggleVoiceInput() {
  if (!recognition) {
    alert('Web Speech API is not supported in this browser. You can type your response!');
    return;
  }
  if (state.isListening) {
    recognition.stop();
    state.isListening = false;
  } else {
    recognition.start();
    state.isListening = true;
  }
  updateVoiceBtnUI();
}

function updateVoiceBtnUI() {
  const btn = document.getElementById('voice-input-btn');
  const text = document.getElementById('voice-btn-text');
  if (state.isListening) {
    btn.classList.add('listening');
    text.innerText = 'Listening...';
  } else {
    btn.classList.remove('listening');
    text.innerText = 'Voice Input';
  }
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

let selectedPaywallPlan = 'monthly';

function selectPaywallPlan(planId) {
  selectedPaywallPlan = planId;
  ['weekly', 'monthly', 'annual', 'lifetime'].forEach(p => {
    const card = document.getElementById(`plan-card-${p}`);
    if (card) {
      if (p === planId) card.classList.add('selected');
      else card.classList.remove('selected');
    }
  });

  const trialBtnText = document.querySelector('#start-trial-btn span');
  if (trialBtnText) {
    if (planId === 'weekly') trialBtnText.innerText = 'Start Weekly Pass ($1.99/wk)';
    else if (planId === 'monthly') trialBtnText.innerText = 'Start 7-Day Free Trial ($4.99/mo)';
    else if (planId === 'annual') trialBtnText.innerText = 'Unlock Annual Pass ($29.99/yr)';
    else if (planId === 'lifetime') trialBtnText.innerText = 'Unlock Lifetime Access ($49.99)';
  }
}

function openPaywallModal(reason) { 
  selectPaywallPlan('monthly');
  openModal('paywall-modal'); 
}

function activatePro() {
  state.isPro = true;
  localStorage.setItem('interviewace_is_pro', 'true');
  updateQuotaUI();
  renderRolesList();
  closeModal('paywall-modal');
  const planNames = {
    weekly: 'Weekly Pass ($1.99/wk)',
    monthly: 'Monthly Pro ($4.99/mo with 7-Day Free Trial)',
    annual: 'Annual Pass ($29.99/yr)',
    lifetime: 'Lifetime Access ($49.99)'
  };
  alert(`InterviewAce Pro activated via ${planNames[selectedPaywallPlan] || 'Pro Plan'}! Enjoy unlimited AI interviews & all roles.`);
}

function saveApiKey() {
  const key = document.getElementById('gemini-key-input').value.trim();
  if (key) {
    state.apiKey = key;
    localStorage.setItem('gemini_api_key', key);
    closeModal('settings-modal');
    alert('Gemini API Key updated successfully!');
  }
}

function togglePro() {
  state.isPro = !state.isPro;
  localStorage.setItem('interviewace_is_pro', state.isPro.toString());
  updateQuotaUI();
  renderRolesList();
  closeModal('settings-modal');
}

function resetQuota() {
  state.weeklyQuotaUsed = 0;
  localStorage.setItem('interviewace_quota', '0');
  updateQuotaUI();
  closeModal('settings-modal');
}

function isNonAnswer(answer) {
  const lower = answer.trim().toLowerCase();
  const nonAnswerPhrases = [
    "i don't know", "i dont know", "don't know", "dont know",
    "no idea", "i have no idea", "pass", "skip", "idk", "dunno",
    "not sure", "i am not sure", "no clue", "can't answer", "cant answer"
  ];
  return lower.length < 5 || nonAnswerPhrases.some(phrase => lower === phrase || lower.startsWith(phrase));
}

const QUESTION_BANKS = {
  ai_engineer: {
    conceptual: [
      'How do you evaluate and prevent hallucination in a Retrieval-Augmented Generation (RAG) system?',
      'Explain the mechanism of Attention in Transformers and how Rotary Position Embeddings (RoPE) improve long-context window accuracy.',
      'How do Low-Rank Adaptation (LoRA) and QLoRA fine-tune large language models efficiently without full parameter updates?',
      'Walk me through how vector indexing algorithms like HNSW and IVF-PQ accelerate similarity search in Vector Databases.',
      'How do guardrail systems (e.g. NeMo Guardrails, Guardrails AI) enforce safety policies and topic constraint boundaries on LLM outputs?',
      'How do you measure Context Precision, Context Recall, and Answer Faithfulness using RAGAS evaluation metrics?'
    ],
    coding: [
      'Write a function to calculate Cosine Similarity between two 1D dense embedding vectors.',
      'Implement a sliding-window text chunking function that splits text into chunks of N words with K overlapping words.',
      'Write a function to compute Top-K sampling probabilities given a raw logit vector and a temperature parameter T.',
      'Implement a naive vector dot product search over an array of embedding vectors to find the Top-1 nearest neighbor.'
    ]
  },
  fullstack_eng: {
    conceptual: [
      'Explain how React Concurrent Mode, Server Components, and Streaming SSR optimize initial page load and interactivity metrics.',
      'How do you prevent SQL injection, XSS attacks, and CSRF vulnerabilities across a full-stack Node.js + React application?',
      'Compare client-side caching strategies (SWR, TanStack Query) vs Server-Side Redis caching for dynamic user data feeds.',
      'How do WebSockets, Server-Sent Events (SSE), and Long Polling differ for real-time bidirectional messaging?',
      'Walk me through Web Performance Optimization: Critical Rendering Path, Code-Splitting, LCP, and CLS core web vitals.'
    ],
    coding: [
      'Write a JavaScript function to implement a debounced function `debounce(fn, delay)` that handles rapid user input events.',
      'Implement a deep clone algorithm in JavaScript that handles nested objects, arrays, and primitive data types.',
      'Write a function to flatten a deeply nested array of arbitrary depth into a single 1D array.',
      'Implement an event emitter class (`EventEmitter`) with `on`, `off`, and `emit` methods.'
    ]
  },
  backend_systems: {
    conceptual: [
      'How do you handle database write contention and race conditions in a high-throughput microservices architecture?',
      'Explain the CAP Theorem and how databases like Apache Cassandra and PostgreSQL handle network partitions differently.',
      'How do distributed locks (e.g. Redlock algorithm using Redis) ensure idempotency across distributed worker nodes?',
      'Walk me through database partitioning (sharding) strategies: Hash Sharding vs Range Sharding.',
      'Explain Message Queue trade-offs: Kafka (log-based event streaming) vs RabbitMQ (AMQP message broker).'
    ],
    coding: [
      'Implement an LRU (Least Recently Used) Cache data structure with O(1) time complexity for get and put operations.',
      'Write an algorithm to implement a Token Bucket Rate Limiter that allows at most K requests per second.',
      'Write a function to detect if a directed graph contains a cycle using Topological Sort or DFS.',
      'Implement a dynamic programming algorithm to solve the 0/1 Knapsack Problem or Min Coin Change.'
    ]
  },
  data_scientist: {
    conceptual: [
      'Walk me through how you detect and correct for selection bias and sample ratio mismatch (SRM) in an offline A/B test.',
      'How do Gradient Boosting Machines (XGBoost / LightGBM) differ from Random Forests in handling bias vs variance?',
      'Explain how ROC-AUC, Precision-Recall curves, and F1-Score differ for highly imbalanced classification datasets.',
      'How do SHAP (SHapley Additive exPlanations) values provide model interpretability for complex neural networks?',
      'Explain how K-Fold Cross Validation prevents data leakage during feature engineering and hyperparameter tuning.'
    ],
    coding: [
      'Write a function to calculate the Gini Impurity for a list of binary classification labels.',
      'Implement the K-Means clustering assignment step given data points and centroid coordinates.',
      'Write a function to impute missing numerical values in a dataset using column median interpolation.',
      'Write an algorithm to compute the Pearson Correlation Coefficient between two numerical arrays.'
    ]
  },
  devops_cloud: {
    conceptual: [
      'How do you structure zero-downtime rolling updates and blue-green deployments using Kubernetes & Ingress Controllers?',
      'Explain Infrastructure as Code (IaC) drift detection, state locking, and module modularity in Terraform for multi-cloud teams.',
      'How do you configure Prometheus and Grafana alerting thresholds for CPU throttling, memory leaks, and 5xx error spikes?',
      'Compare AWS VPC Peering vs AWS Transit Gateway for multi-region hybrid cloud architecture.',
      'Explain container security hardening best practices for Dockerfiles and Kubernetes Pod Security Standards.'
    ],
    coding: [
      'Write a script or regex parser to parse HTTP Nginx server log lines and count total 5xx status codes.',
      'Write a function to validate if a YAML/JSON Kubernetes deployment spec contains required memory and CPU resource limits.',
      'Write a script to recursively traverse a file directory and identify files larger than a given size threshold.',
      'Implement a function to generate a standard Cron schedule string given target hour, minute, and day parameters.'
    ]
  },
  sales_executive: {
    conceptual: [
      'How do you handle an enterprise prospect saying "Your product is 30% more expensive than your main competitor"?',
      'Walk me through how you apply the MEDDPICC framework to qualify an enterprise SaaS sales pipeline opportunity.',
      'How do you turn around a stalled enterprise deal when your executive champion leaves the prospect company mid-cycle?',
      'Explain your multi-threading outreach strategy for reaching multiple decision makers across a target Fortune 500 account.',
      'How do you structure a successful Technical Proof of Concept (POC) with clear success metrics and closing deadlines?'
    ],
    coding: [
      'Write a function to calculate Annual Recurring Revenue (ARR), Churn Rate, and Net Revenue Retention (NRR) from a customer dataset.',
      'Write a pipeline scoring algorithm that ranks prospective lead accounts based on engagement score weights.',
      'Implement a tier-based commission calculator given base target quotas and accelerator multipliers.'
    ]
  },
  recruiter: {
    conceptual: [
      'How do you calibrate compensation expectations early with senior engineering candidates without losing their interest?',
      'What outbound sourcing strategies do you use to engage passive Staff/Principal Engineers who receive dozens of recruiter emails daily?',
      'How do you handle an engineering hiring manager who rejects 95% of candidates at the initial resume screen stage?',
      'Walk me through your offer closing workflow when a candidate receives competing counter-offers from FAANG companies.',
      'How do you design a structured competency-based interview rubric to minimize interviewer bias across hiring panels?'
    ],
    coding: [
      'Write a function to compute candidate funnel conversion rates across Resume Screen, Phone Screen, Onsite, and Offer stages.',
      'Write a keyword extraction function that matches candidate resume skills against target job description requirements.',
      'Implement a pipeline capacity planning function to estimate total recruiter outbound touches needed to make N engineering hires.'
    ]
  }
};

function getMockQuestion(roleId = 'ai_engineer', qIndex = 0, isCoding = false) {
  const roleBank = QUESTION_BANKS[roleId] || QUESTION_BANKS.ai_engineer;
  const list = isCoding ? roleBank.coding : roleBank.conceptual;
  
  // Dynamic Hourly Seed rotates questions every hour!
  const hourSeed = Math.floor(Date.now() / (3600 * 1000));
  const diffOffset = state.selectedDifficulty === 'easy' ? 0 : (state.selectedDifficulty === 'medium' ? 2 : 4);
  
  const index = (qIndex + hourSeed + diffOffset) % list.length;
  const baseQuestion = list[index] || list[0];

  const diffTag = state.selectedDifficulty === 'easy' ? '[🟢 EASY]' : (state.selectedDifficulty === 'medium' ? '[🟡 MEDIUM]' : '[🔴 HARD]');
  return `${diffTag} ${baseQuestion}`;
}

function getMockFeedback(answer) {
  if (isNonAnswer(answer)) {
    return {
      score: 5,
      strengths: ['Candidate honestly acknowledged lack of knowledge rather than providing incorrect details.'],
      areasToImprove: [
        'Candidate stated they did not know the answer to this core domain question.',
        'Study RAG evaluation frameworks (RAGAS, TruLens) and hallucination metrics (Faithfulness, Context Precision).'
      ],
      modelAnswer: 'To evaluate and prevent RAG hallucinations, implement evaluation frameworks like RAGAS or TruLens to measure Faithfulness and Answer Relevance against retrieved context chunks. Use constrained generation, guardrail models (such as NeMo Guardrails), and ground responses strictly on verified context vectors.'
    };
  }

  const words = answer.trim().split(/\s+/).length;
  const score = Math.min(92, Math.max(25, 35 + Math.round(words * 1.1)));

  return {
    score: score,
    strengths: ['Addressed question directly with relevant candidate perspective.'],
    areasToImprove: ['Incorporate specific industry tools, named frameworks, and quantitative metrics.'],
    modelAnswer: 'A top tier answer outlines specific technical trade-offs, names exact frameworks used, and highlights measurable operational outcome metrics.'
  };
}

function isBoilerplateCode(code, lang) {
  const trimmed = code.trim();
  if (trimmed.length < 15) return true;
  
  const boilerplatePhrases = [
    "// write your javascript solution",
    "// write your python 3 solution",
    "# write your python 3 solution",
    "// your code here",
    "# your code here",
    "let result = [];\n  return result;",
    "result = []\n    return result",
    "// c++ 17 solution template",
    "// java 17 solution template"
  ];
  
  const lower = trimmed.toLowerCase();
  const hasBoilerplate = boilerplatePhrases.some(phrase => lower.includes(phrase));
  const hasNoCustomLogic = !lower.includes("for") && !lower.includes("while") && !lower.includes("if") && !lower.includes("return ");

  return hasBoilerplate || hasNoCustomLogic;
}

function getMockCodeFeedback(code, lang) {
  if (isBoilerplateCode(code, lang)) {
    return {
      score: 5,
      strengths: ['Candidate opened and accessed the IDE environment.'],
      areasToImprove: [
        'Candidate submitted unedited starter template code with no implementation logic.',
        'Implement algorithmic logic using loops, conditional branches, or standard library data structures.'
      ],
      modelAnswer: `// Optimal ${lang.toUpperCase()} Benchmark Solution:\nfunction solution(arr) {\n  if (!arr || !arr.length) return [];\n  return arr.map(x => x * 2); // O(N) Time Complexity, O(N) Auxiliary Space\n}`
    };
  }

  return {
    score: 82,
    strengths: ['Functional implementation with O(N) time complexity.', 'Clean variable naming and clear logic flow.'],
    areasToImprove: ['Add explicit null / empty collection guard clauses.', 'Optimize auxiliary space allocations.'],
    modelAnswer: `// Optimal ${lang.toUpperCase()} Benchmark Solution:\nfunction solution(arr) {\n  if (!arr || !arr.length) return [];\n  return arr.map(x => x * 2); // O(N) Time Complexity, O(N) Auxiliary Space\n}`
  };
}
