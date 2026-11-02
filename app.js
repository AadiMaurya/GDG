/* ============================================
   SONICPRO ULTRA™ — WIZARD ONLY CHAOS ENGINE
   ============================================ */

// ── FAHHH Sound Effect ─────────────────────
const fahhAudio = new Audio('https://www.myinstants.com/media/sounds/fahhhhhhhhhhhhhhhhhhhhh.mp3');
fahhAudio.volume = 1.0;
function playFahh() {
  fahhAudio.currentTime = 0;
  fahhAudio.play().catch(() => {}); // silently handle autoplay restrictions
}

// ── State ──────────────────────────────────
let currentVolume = 47;
let pendingVolume = 47;
let wizardStep = 1;
let wizardData = {};
let captchaAnswer = 0;
let captchaAttempts = 3;
let captchaCallback = null;
let emailTimer = null;
let driftInterval = null;

// ── SVG Ring Gradient ──────────────────────
const svg = document.querySelector('.volume-ring');
const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
grad.id = 'ringGrad';
grad.setAttribute('x1','0%'); grad.setAttribute('y1','0%');
grad.setAttribute('x2','100%'); grad.setAttribute('y2','0%');
const s1 = document.createElementNS('http://www.w3.org/2000/svg','stop');
s1.setAttribute('offset','0%'); s1.setAttribute('stop-color','#7c3aed');
const s2 = document.createElementNS('http://www.w3.org/2000/svg','stop');
s2.setAttribute('offset','100%'); s2.setAttribute('stop-color','#06b6d4');
grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad);
svg.insertBefore(defs, svg.firstChild);

// ── Particles ──────────────────────────────
(function spawnParticles() {
  const c = document.getElementById('particles-container');
  const colors = ['#7c3aed','#a855f7','#06b6d4','#f59e0b','#10b981'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*8+6}s;
      animation-delay:${Math.random()*8}s;
    `;
    c.appendChild(p);
  }
})();

// ── Volume Display ─────────────────────────
function updateVolumeDisplay(vol) {
  currentVolume = Math.max(0, Math.min(100, Math.round(vol)));
  document.getElementById('volumeNumber').textContent = currentVolume;

  // Deliberately WRONG icons
  const icon = document.getElementById('volumeIcon');
  if      (currentVolume === 0)  icon.textContent = '🔊'; // loud icon when muted
  else if (currentVolume < 30)   icon.textContent = '📢'; // mega-loud for quiet
  else if (currentVolume < 70)   icon.textContent = '🔇'; // mute icon for medium
  else                           icon.textContent = '🔕'; // do-not-disturb for loud

  const circumference = 534;
  document.getElementById('ringFill').style.strokeDashoffset =
    circumference - (currentVolume / 100) * circumference;
}

// ══════════════════════════════════════════
//  7-STEP WIZARD DEFINITION
// ══════════════════════════════════════════
// Photo challenges for step 6 — user must upload a photo matching the challenge
// We DO NOT verify content. Any uploaded file passes. This is chaos.
const photoChallenges = [
  { emoji: '🦆', task: 'Find a rubber duck (real or toy) and photograph it.' },
  { emoji: '🧦', task: 'Take a photo of two mismatched socks worn together.' },
  { emoji: '🌿', task: 'Photograph a plant and point at it with one finger.' },
  { emoji: '📚', task: 'Stack at least 3 books and photograph the stack.' },
  { emoji: '🥄', task: 'Hold a spoon up to your face and take a photo.' },
  { emoji: '✋', task: 'Take a photo showing exactly 4 fingers (not 5, not 3 — 4).' },
  { emoji: '☕', task: 'Photograph a cup or mug — empty or full, we cannot tell.' },
  { emoji: '🪑', task: 'Take a photo of a chair from an unnecessarily dramatic angle.' },
];
let currentChallenge = photoChallenges[Math.floor(Math.random() * photoChallenges.length)];
let photoUploaded = false;

const wizardSteps = [
  {
    emoji: '📋',
    title: 'Terms & Conditions',
    body: 'By adjusting your volume, you agree to SonicPro Ultra™ Terms of Service (v47.3.1, revised daily). You acknowledge that volume is a privilege, not a right, and that SonicPro™ bears no responsibility for any hearing experiences.',
    inputType: null,
    trick: '"I have read and understood the Terms." — No one, ever.'
  },
  {
    emoji: '🌍',
    title: 'Select Your Region',
    body: 'Volume regulations vary by territory. Please select your operating jurisdiction so we can apply the correct audio compliance framework.',
    inputType: 'select',
    selectOptions: ['— Select one —','North America','Europe','Asia Pacific','South America','Antarctica','The Moon','The Void','Prefer not to say'],
    key: 'region',
    trick: 'Note: Moon users may experience a 3-second audio delay.'
  },
  {
    emoji: '🎵',
    title: 'What Are You Listening To?',
    body: 'Our AI must calibrate the Harmonic Signature™ of your content before suggesting an appropriate volume level.',
    inputType: 'select',
    selectOptions: ['— Select one —','Music (Happy)','Music (Sad)','Music (Confused)','Podcast','Video Call I\'m Not Paying Attention To','Nature Sounds','My Own Thoughts (dangerous)','Absolutely Nothing','Something I shouldn\'t be'],
    key: 'content',
    trick: null
  },
  {
    emoji: '📏',
    title: 'Desired Volume (in Decibels)',
    body: 'Please enter your target volume in dB SPL measured at 1 metre. For reference: whisper ≈ 30 dB, conversation ≈ 60 dB, jet engine ≈ 140 dB.',
    inputType: 'number',
    placeholder: 'Enter dB value (e.g. 65)...',
    key: 'volumeDB',
    trick: 'Your input will be processed through our proprietary dB-to-% conversion matrix. Results may vary wildly.'
  },
  {
    emoji: '🧮',
    title: 'Security Math Check',
    body: 'To prevent unauthorised volume changes, please solve the following. You have 3 attempts before a new problem is generated.',
    inputType: 'math',
    key: 'mathAnswer',
    trick: null
  },
  {
    emoji: '📸',
    title: 'Photo Identity Challenge',
    body: null, // rendered dynamically
    inputType: 'photochallenge',
    trick: 'Our AI will thoroughly analyse this photo. (It will not. Any photo works. We just wanted you to do this.)',
    key: null
  },
  {
    emoji: '✅',
    title: 'Final Confirmation',
    body: 'You are about to submit a certified volume change request. This action is semi-permanent for approximately 45 seconds. Please type the confirmation phrase exactly as shown to proceed.',
    inputType: 'confirm',
    placeholder: 'Type: YES I AM SURE',
    key: 'confirm',
    trick: null
  }
];

// Current math problem for step 5
let currentMathQ = '';
let currentMathA = 0;
let mathAttempts = 3;

const mathPool = [
  { q: '23 × 7 = ?', a: 161 },
  { q: '√144 = ?', a: 12 },
  { q: '17² = ?', a: 289 },
  { q: '(48 ÷ 6) × 9 = ?', a: 72 },
  { q: '999 − 876 = ?', a: 123 },
  { q: '13 × 13 = ?', a: 169 },
  { q: '2⁸ = ?', a: 256 },
  { q: '(7 + 8) × 4 − 2 = ?', a: 58 },
  { q: '3³ + 4² = ?', a: 43 },
  { q: '144 ÷ 12 + 55 = ?', a: 67 },
];

function pickMathProblem() {
  const p = mathPool[Math.floor(Math.random() * mathPool.length)];
  currentMathQ = p.q;
  currentMathA = p.a;
  mathAttempts = 3;
}

// ── Render Wizard Step ─────────────────────
function renderWizardStep() {
  const step = wizardSteps[wizardStep - 1];
  const content = document.getElementById('wizardContent');

  // Step indicators
  for (let i = 1; i <= 7; i++) {
    const el = document.getElementById('ws' + i);
    el.className = 'wstep';
    if (i < wizardStep)      el.classList.add('done');
    else if (i === wizardStep) el.classList.add('active');
  }

  // Progress bar
  document.getElementById('wizardProgressFill').style.width =
    ((wizardStep - 1) / 6 * 100) + '%';

  // Back / Next buttons
  document.getElementById('wizardBack').disabled = wizardStep === 1;
  document.getElementById('wizardNext').textContent =
    wizardStep === 7 ? '🎉 Apply Volume' : 'Next →';

  // Build inner HTML
  let bodyHtml = '';

  if (step.inputType === 'select') {
    bodyHtml = `<select id="wizardInput">
      ${step.selectOptions.map(o => `<option value="${o}">${o}</option>`).join('')}
    </select>`;
  } else if (step.inputType === 'number') {
    bodyHtml = `<input type="number" id="wizardInput" placeholder="${step.placeholder}" value="${wizardData[step.key] || ''}" />`;
  } else if (step.inputType === 'math') {
    bodyHtml = `
      <div style="font-family:'Orbitron',monospace; font-size:1.3rem; background:rgba(255,255,255,0.04); border:1px solid var(--border); border-radius:10px; padding:1rem 2rem; margin-bottom:0.25rem;">
        ${currentMathQ}
      </div>
      <input type="number" id="wizardInput" placeholder="Your answer..." />
      <div class="step-error" id="mathError" style="display:none">❌ Wrong! Attempts left: <span id="mathAttemptsLeft">${mathAttempts}</span></div>
    `;
  } else if (step.inputType === 'photochallenge') {
    photoUploaded = false;
    bodyHtml = `
      <p style="font-size:0.95rem; color:var(--text); font-weight:600; margin-bottom:0.25rem;">
        Your Mission ${currentChallenge.emoji}
      </p>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0rem;">
        ${currentChallenge.task}
      </p>
      <label class="file-upload-label" id="uploadLabel" for="photoInput">
        <span class="upload-icon">📂</span>
        <span class="upload-text">Click to upload your photo</span>
        <span class="upload-chosen" id="uploadChosen" style="display:none"></span>
        <input type="file" id="photoInput" accept="image/*" />
      </label>
    `;
  } else if (step.inputType === 'confirm') {
    bodyHtml = `<input type="text" id="wizardInput" placeholder="${step.placeholder}" value="${wizardData[step.key] || ''}" autocomplete="off" />`;
  }

  content.innerHTML = `
    <div class="wizard-emoji">${step.emoji}</div>
    <h3>${step.title}</h3>
    ${step.body ? `<p>${step.body}</p>` : ''}
    ${bodyHtml}
    ${step.trick ? `<p class="step-trick">${step.trick}</p>` : ''}
  `;

  // Restore saved select value
  if (step.inputType === 'select' && wizardData[step.key]) {
    document.getElementById('wizardInput').value = wizardData[step.key];
  }

  // Wire up photo upload listener
  if (step.inputType === 'photochallenge') {
    document.getElementById('photoInput').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        photoUploaded = true;
        const chosenEl = document.getElementById('uploadChosen');
        const labelEl  = document.getElementById('uploadLabel');
        chosenEl.textContent = `✅ "${file.name}" uploaded!`;
        chosenEl.style.display = 'block';
        labelEl.style.borderColor = 'var(--success)';
        labelEl.style.background  = 'rgba(16,185,129,0.06)';
        // Remove any existing error
        const old = document.getElementById('wizardContent').querySelector('.inline-error');
        if (old) old.remove();
      }
    });
  }
}

// ── Wizard Navigation ──────────────────────
function wizardNext() {
  const step = wizardSteps[wizardStep - 1];

  // --- Validation per step ---
  if (step.inputType === 'select') {
    const val = document.getElementById('wizardInput')?.value || '';
    if (!val || val.startsWith('—')) {
      shakeContent('⚠️ Please select an option before continuing.', true);
      return;
    }
    wizardData[step.key] = val;
  }

  else if (step.inputType === 'number') {
    const raw = document.getElementById('wizardInput')?.value?.trim();
    if (!raw || raw === '' || isNaN(parseFloat(raw))) {
      shakeContent('⚠️ This field cannot be empty. Please enter a number.', true);
      return;
    }
    wizardData[step.key] = raw;
  }

  else if (step.inputType === 'math') {
    const raw = document.getElementById('wizardInput')?.value?.trim();
    if (!raw || raw === '') {
      shakeContent('⚠️ Please enter your answer before continuing.', true);
      return;
    }
    const val = parseInt(raw);
    if (val !== currentMathA) {
      mathAttempts--;
      const errEl = document.getElementById('mathError');
      const leftEl = document.getElementById('mathAttemptsLeft');
      if (errEl) {
        errEl.style.display = 'block';
        errEl.style.animation = 'none';
        setTimeout(() => errEl.style.animation = 'shake 0.35s ease', 10);
      }
      if (leftEl) leftEl.textContent = mathAttempts;
      playFahh();
      triggerBoxShake();
      if (mathAttempts <= 0) {
        pickMathProblem();
        renderWizardStep();
      }
      return;
    }
    wizardData[step.key] = val;
  }

  else if (step.inputType === 'photochallenge') {
    // Only check if a file was picked — we do NOT verify contents
    if (!photoUploaded) {
      shakeContent('⚠️ Please upload a photo to complete this step.', true);
      return;
    }
    // All good — any uploaded image passes!
  }

  else if (step.inputType === 'confirm') {
    const val = (document.getElementById('wizardInput')?.value || '').trim();
    if (!val || val === '') {
      shakeContent('⚠️ This field cannot be empty. Please type the confirmation phrase.', true);
      return;
    }
    if (val.toUpperCase() !== 'YES I AM SURE') {
      shakeContent('❌ Incorrect phrase. Please type exactly: YES I AM SURE');
      return;
    }
    wizardData[step.key] = val;
  }

  // --- Last step: Apply! ---
  if (wizardStep === 7) {
    applyWizardVolume();
    return;
  }

  wizardStep++;
  renderWizardStep();
}

function wizardBack() {
  if (wizardStep > 1) {
    wizardStep--;
    renderWizardStep();
  }
}

function triggerBoxShake() {
  const content = document.getElementById('wizardContent');
  content.classList.remove('shake-box');
  void content.offsetWidth; // reflow to restart animation
  content.classList.add('shake-box');
  setTimeout(() => content.classList.remove('shake-box'), 500);
}

function shakeContent(msg, playSound = false) {
  const content = document.getElementById('wizardContent');

  // Remove old inline error first
  const old = content.querySelector('.inline-error');
  if (old) old.remove();

  // Play the sound only when a required value was left blank.
  if (playSound) playFahh();
  triggerBoxShake();

  // Append error message inside the content box
  const err = document.createElement('div');
  err.className = 'step-error inline-error';
  err.textContent = msg;
  content.appendChild(err);
}

// ── Apply Volume (with full drama) ─────────
function applyWizardVolume() {
  // Parse their dB input, but ultimately pick a random volume because we feel like it
  let target = parseInt(wizardData['volumeDB']);
  if (isNaN(target) || target < 0 || target > 100) {
    target = Math.floor(Math.random() * 101);
  } else {
    // Secretly shift it a bit
    target = Math.max(0, Math.min(100, target + Math.floor((Math.random() - 0.5) * 20)));
  }
  pendingVolume = target;

  showLoading(
    'Submitting 7-step certified volume request…',
    'Contacting regional volume authority…',
    2000,
    () => openCaptcha(() =>
      showEmail(() => {
        updateVolumeDisplay(pendingVolume);
        showSuccess(pendingVolume);
        startVolumeDrift();
        // Reset wizard for next attempt
        wizardStep = 1;
        wizardData = {};
        pickMathProblem();
        renderWizardStep();
      })
    )
  );
}

// ══════════════════════════════════════════
//  CAPTCHA MODAL
// ══════════════════════════════════════════
const captchaPool = [
  { q:'23 × 7 = ?', a:161 }, { q:'√144 = ?', a:12 },
  { q:'17² = ?', a:289 },    { q:'(48 ÷ 6) × 9 = ?', a:72 },
  { q:'999 − 876 = ?', a:123 }, { q:'2⁸ = ?', a:256 },
  { q:'3³ + 4² = ?', a:43 }, { q:'(7+8)×4−2 = ?', a:58 },
];

function openCaptcha(callback) {
  captchaCallback = callback;
  captchaAttempts = 3;
  document.getElementById('attemptsLeft').textContent = 3;
  document.getElementById('captchaError').style.display = 'none';
  document.getElementById('captchaInput').value = '';

  const chosen = captchaPool[Math.floor(Math.random() * captchaPool.length)];
  captchaAnswer = chosen.a;
  document.getElementById('captchaQuestion').innerHTML =
    `🧮 One more check before we proceed:<br><strong>${chosen.q}</strong>`;
  document.getElementById('captchaModal').style.display = 'flex';
  setTimeout(() => document.getElementById('captchaInput').focus(), 100);
}

function verifyCaptcha() {
  const val = parseInt(document.getElementById('captchaInput').value);
  if (val === captchaAnswer) {
    closeCaptcha();
    captchaCallback && captchaCallback();
  } else {
    playFahh();
    captchaAttempts--;
    const errEl = document.getElementById('captchaError');
    errEl.style.display = 'block';
    errEl.style.animation = 'none';
    setTimeout(() => errEl.style.animation = 'shake 0.3s ease', 10);
    document.getElementById('attemptsLeft').textContent = captchaAttempts;
    document.getElementById('captchaInput').value = '';

    if (captchaAttempts <= 0) {
      captchaAttempts = 3;
      const chosen = captchaPool[Math.floor(Math.random() * captchaPool.length)];
      captchaAnswer = chosen.a;
      document.getElementById('captchaQuestion').innerHTML =
        `🧮 New problem (too many failures):<br><strong>${chosen.q}</strong>`;
      document.getElementById('attemptsLeft').textContent = 3;
      errEl.textContent = '❌ Too many wrong answers! Here is a fresh problem.';
    }
  }
}

function closeCaptcha() {
  document.getElementById('captchaModal').style.display = 'none';
}

document.getElementById('captchaInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') verifyCaptcha();
});

// ══════════════════════════════════════════
//  EMAIL VERIFICATION MODAL
// ══════════════════════════════════════════
function showEmail(callback) {
  let seconds = 30;
  document.getElementById('emailTimerNum').textContent = seconds;
  document.getElementById('emailProgressFill').style.width = '0%';
  document.getElementById('emailConfirmBtn').disabled = true;
  document.getElementById('emailModal').style.display = 'flex';

  emailTimer = setInterval(() => {
    seconds--;
    document.getElementById('emailTimerNum').textContent = seconds;
    document.getElementById('emailProgressFill').style.width = ((30 - seconds) / 30 * 100) + '%';
    if (seconds <= 15) document.getElementById('emailConfirmBtn').disabled = false;
    if (seconds <= 0) {
      clearInterval(emailTimer);
      closeEmail();
      callback && callback();
    }
  }, 1000);

  document.getElementById('emailConfirmBtn').onclick = () => {
    clearInterval(emailTimer);
    closeEmail();
    callback && callback();
  };
}

function emailConfirm() {} // handled via onclick above
function closeEmail() {
  clearInterval(emailTimer);
  document.getElementById('emailModal').style.display = 'none';
}

// ══════════════════════════════════════════
//  LOADING MODAL
// ══════════════════════════════════════════
const loadingLines = [
  ['Contacting volume servers…','Please remain perfectly still.'],
  ['Applying 7-step certified change…','This is a very serious operation.'],
  ['Consulting regional audio board…','Results pending board approval.'],
  ['Running 47 quality checks…','Only 46 remaining…'],
  ['Waking up sound engineers…','They were napping. Sorry about that.'],
  ['Performing quantum audio calibration…','The volume needs a moment to think.'],
];

function showLoading(text, sub, duration, callback) {
  const [t, s] = loadingLines[Math.floor(Math.random() * loadingLines.length)];
  document.getElementById('loadingText').textContent = text || t;
  document.getElementById('loadingSub').textContent = sub || s;
  document.getElementById('loadingModal').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('loadingModal').style.display = 'none';
    callback && callback();
  }, duration || 2000);
}

// ══════════════════════════════════════════
//  SUCCESS MODAL
// ══════════════════════════════════════════
function showSuccess(vol) {
  document.getElementById('successVolNum').textContent = vol;
  document.getElementById('successModal').style.display = 'flex';
  launchConfetti();
}

function closeSuccess() {
  document.getElementById('successModal').style.display = 'none';
}

function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  const colors = ['#7c3aed','#06b6d4','#f59e0b','#10b981','#ec4899','#fff'];
  for (let i = 0; i < 35; i++) {
    const dot = document.createElement('div');
    const tx = (Math.random() - 0.5) * 100;
    dot.style.cssText = `
      position:absolute; border-radius:${Math.random()>0.5?'50%':'3px'};
      width:${Math.random()*9+4}px; height:${Math.random()*9+4}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${Math.random()*100}%; top:50%;
      animation:confettiFly ${Math.random()*0.8+0.5}s ease-out forwards;
      animation-delay:${Math.random()*0.3}s;
      --tx:${tx}px;
    `;
    container.appendChild(dot);
  }
}
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
@keyframes confettiFly {
  0%   { transform: translateY(0) rotate(0deg) translateX(0); opacity:1; }
  100% { transform: translateY(-90px) rotate(360deg) translateX(var(--tx,0)); opacity:0; }
}`;
document.head.appendChild(confettiStyle);

// ══════════════════════════════════════════
//  VOLUME DRIFT
// ══════════════════════════════════════════
function startVolumeDrift() {
  if (driftInterval) clearInterval(driftInterval);
  let count = 0;
  driftInterval = setInterval(() => {
    if (count++ >= 4) { clearInterval(driftInterval); return; }
    const drift = Math.round((Math.random() - 0.5) * 6);
    updateVolumeDisplay(currentVolume + drift);
    if (Math.random() < 0.6) showToast(`📉 Volume drifting (${drift > 0 ? '+' : ''}${drift})… recalibrating…`);
  }, 9000);
}

// ══════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════
const chaosMessages = [
  '🛸 UFO interference detected. Volume may be unstable.',
  '🧠 AI is reconsidering your volume preferences.',
  '📡 Syncing with SonicPro™ Cloud… (47% — forever)',
  '🌊 Acoustic wave anomaly in your area.',
  '🐛 Bug found in volume module. Working as intended.',
  '🌡️ Temperature too high. Volume efficiency reduced by 0.003 dB.',
  '🔋 Low battery mode: audio fidelity dampened.',
  '⚡ Power surge. Volume auto-backed-up to cloud.',
  '🎙️ Microphone has joined the session uninvited.',
  '🔊 Volume briefly increased by 0.001%. You\'re welcome.',
];

function showToast(msg) {
  const toast = document.getElementById('driftToast');
  toast.textContent = msg;
  toast.style.display = 'block';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.display = 'none'; }, 3200);
}

setInterval(() => {
  if (Math.random() < 0.35)
    showToast(chaosMessages[Math.floor(Math.random() * chaosMessages.length)]);
}, 12000);

// Random jitter
setInterval(() => {
  if (Math.random() < 0.2) {
    const j = Math.round((Math.random() - 0.5) * 8);
    updateVolumeDisplay(currentVolume + j);
    showToast(`⚡ Spontaneous volume correction: ${j > 0 ? '+' : ''}${j}. Our algorithm knows best.`);
  }
}, 22000);

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
window.addEventListener('load', () => {
  updateVolumeDisplay(47);
  pickMathProblem();
  renderWizardStep();

  setTimeout(() => {
    showToast('🎉 Welcome to SonicPro Ultra™. Volume adjustment has never required more paperwork.');
  }, 1500);
});
