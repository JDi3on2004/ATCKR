/* =====================================================
   ATCKR — Text or Trap? Game 1
   Script file: game1.js
   Description: All game logic, animations, sound
   effects, score tracking, streak system, hint system,
   confetti, and screen navigation for the phishing game.
   ===================================================== */


/* -------------------------------------------------------
   GAME STATE
   Tracks everything about the current playthrough
------------------------------------------------------- */
const G = {
  scenarios:  [],   // shuffled copy of SCENARIOS array
  index:      0,    // which question we are on
  score:      0,    // total points earned
  lives:      3,    // remaining lives (max 3)
  streak:     0,    // current correct answer streak
  best:       0,    // best streak this game
  correct:    0,    // total correct answers
  hints:      3,    // hints remaining
  bonus:      0,    // total streak bonus points earned
  answered:   false // prevents double answering
};


/* -------------------------------------------------------
   PARTICLE BACKGROUND
   Draws small floating dots on the canvas element
   to create an animated starfield background
------------------------------------------------------- */
(function setupParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, points = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    points = Array.from({ length: 55 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a:  Math.random()
    }));
  }

  resize();
  window.addEventListener('resize', resize);

  function drawLoop() {
    ctx.clearRect(0, 0, W, H);
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.a * 0.55})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(drawLoop);
  }

  drawLoop();
})();


/* -------------------------------------------------------
   LIVE CLOCK
   Updates the time shown in the phone status bar
------------------------------------------------------- */
function updateClock() {
  const now = new Date();
  const hh  = String(now.getHours()).padStart(2, '0');
  const mm  = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clockEl').textContent = hh + ':' + mm;
}
updateClock();
setInterval(updateClock, 30000);


/* -------------------------------------------------------
   AUDIO ENGINE
   Uses the Web Audio API to generate simple tones
   for correct answers, wrong answers, streaks, and hints
------------------------------------------------------- */
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(frequency, type, duration, volume = 0.14) {
  try {
    const ctx  = getAudioCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio not supported — fail silently
  }
}

function soundCorrect() {
  playTone(523, 'sine', 0.1);
  setTimeout(() => playTone(659, 'sine', 0.13), 90);
  setTimeout(() => playTone(784, 'sine', 0.22), 185);
}

function soundWrong() {
  playTone(220, 'sawtooth', 0.22, 0.11);
  setTimeout(() => playTone(180, 'sawtooth', 0.22, 0.09), 130);
}

function soundStreak() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => setTimeout(() => playTone(freq, 'sine', 0.18), i * 75));
}

function soundHint() {
  playTone(440, 'sine', 0.09);
  setTimeout(() => playTone(550, 'sine', 0.11), 65);
}


/* -------------------------------------------------------
   SCREEN NAVIGATION
   Shows one screen at a time by toggling the
   "active" class — CSS handles the display
------------------------------------------------------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}


/* -------------------------------------------------------
   START GAME
   Shuffles the scenarios, resets all state,
   then loads the first question
------------------------------------------------------- */
function startGame() {
  G.scenarios = [...SCENARIOS].sort(() => Math.random() - 0.5);
  G.index     = 0;
  G.score     = 0;
  G.lives     = 3;
  G.streak    = 0;
  G.best      = 0;
  G.correct   = 0;
  G.hints     = 3;
  G.bonus     = 0;
  G.answered  = false;
  showScreen('s-game');
  loadQuestion();
}


/* -------------------------------------------------------
   LOAD QUESTION
   Populates the phone mockup with the current scenario's
   sender info and message bubbles, clears old flags,
   and resets the feedback overlay
------------------------------------------------------- */
function loadQuestion() {
  const sc    = G.scenarios[G.index];
  const total = G.scenarios.length;
  G.answered  = false;

  // Update progress bar and label
  const pct = Math.round((G.index / total) * 100);
  document.getElementById('progBar').style.width  = pct + '%';
  document.getElementById('progText').textContent = 'Question ' + (G.index + 1) + ' of ' + total;
  document.getElementById('progPct').textContent  = pct + '%';

  // Update HUD displays
  renderLives();
  renderStreak();
  document.getElementById('hudScore').textContent = G.score.toLocaleString();
  document.getElementById('hintDot').textContent  = G.hints;
  document.getElementById('btnHint').disabled     = G.hints <= 0;

  // Populate phone sender info
  document.getElementById('pAva').textContent  = sc.ava;
  document.getElementById('pName').textContent = sc.sender;
  document.getElementById('pNum').textContent  = sc.num;

  // Build message bubbles — each one animates in with a delay
  const msgArea = document.getElementById('pMsgs');
  msgArea.innerHTML = '';

  sc.msgs.forEach((msg, i) => {
    setTimeout(() => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble ' + (msg.bad ? 'scam' : 'normal') + ' in';
      bubble.innerHTML = msg.text + (msg.time ? '<div class="b-time">' + msg.time + '</div>' : '');
      msgArea.appendChild(bubble);
    }, i * 400);
  });

  // Clear red flag area and hide feedback overlay
  document.getElementById('flagArea').innerHTML = '';
  document.getElementById('fbLayer').className  = 'fb-layer';

  // Re-enable all buttons
  ['btnSafe', 'btnTrap', 'btnHint'].forEach(id => {
    document.getElementById(id).disabled = false;
  });

  // Animate the phone bouncing in
  const phone = document.getElementById('phoneWrap');
  phone.style.animation = 'none';
  void phone.offsetWidth; // force reflow to restart animation
  phone.style.animation = 'phoneIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
}


/* -------------------------------------------------------
   ANSWER
   Called when student clicks Safe or Trap button.
   Checks if correct, updates score and lives,
   reveals red flags, and shows the feedback overlay.
------------------------------------------------------- */
function answer(choice) {
  if (G.answered) return;
  G.answered = true;

  // Disable all buttons while feedback is showing
  ['btnSafe', 'btnTrap', 'btnHint'].forEach(id => {
    document.getElementById(id).disabled = true;
  });

  const sc      = G.scenarios[G.index];
  const correct = (choice === 'trap') === sc.isTrap;

  if (correct) {
    // Correct answer — add points and update streak
    G.correct++;
    G.streak++;
    if (G.streak > G.best) G.best = G.streak;

    // Bonus points for streaks
    let points = 100;
    if (G.streak >= 4) points += 50;
    else if (G.streak >= 2) points += 20;

    G.score += points;
    G.bonus += (points - 100);

    soundCorrect();

    // Play streak sound and show combo popup at 3+ streak
    if (G.streak >= 3) {
      setTimeout(soundStreak, 180);
      showCombo(G.streak);
    }

    // Animate score number popping
    const scoreEl = document.getElementById('hudScore');
    scoreEl.textContent = G.score.toLocaleString();
    scoreEl.classList.remove('pop');
    void scoreEl.offsetWidth;
    scoreEl.classList.add('pop');

  } else {
    // Wrong answer — lose a life and reset streak
    G.lives--;
    G.streak = 0;
    soundWrong();
    renderLives();
  }

  renderStreak();

  // Reveal red flag / safe point chips one by one
  const flagArea = document.getElementById('flagArea');
  flagArea.innerHTML = '';
  const chips = sc.isTrap ? (sc.flags || []) : (sc.safePoints || []);

  chips.forEach((text, i) => {
    setTimeout(() => {
      const chip = document.createElement('div');
      chip.className = 'flag-chip show ' + (sc.isTrap ? 'bad' : 'good');
      chip.textContent = text;
      flagArea.appendChild(chip);
    }, i * 160);
  });

  // Show the feedback overlay on top of the phone
  const overlay = document.getElementById('fbLayer');
  overlay.className = 'fb-layer show ' + (correct ? 'correct' : 'wrong');

  // Pick a random response title
  const titleSets = {
    ct: ['Scam busted! 🕵️', 'Great catch!', 'You spotted it!', 'Nice detective work!'],
    cs: ["That's safe! ✅", 'Good call!', 'Correct!', 'You got it right!'],
    wt: ['That was a trap! 🪤', 'Scammer got ya!', 'Watch those links!', 'Oops — that was fake!'],
    ws: ['That was actually safe!', 'Not every text is bad!', 'That one was legit!']
  };
  const iconMap = { ct: '🎉', cs: '✅', wt: '😬', ws: '🤔' };
  const key = correct ? (sc.isTrap ? 'ct' : 'cs') : (sc.isTrap ? 'wt' : 'ws');

  document.getElementById('fbIcon').textContent  = iconMap[key];
  document.getElementById('fbTitle').textContent = titleSets[key][Math.floor(Math.random() * titleSets[key].length)];
  document.getElementById('fbExplain').textContent = sc.explanation;

  // Build the learn box with flag / safe point bullet list
  const learnBody  = document.getElementById('fbLearnBody');
  const learnTitle = document.getElementById('fbLearnTitle');
  const learnItems = sc.isTrap ? (sc.flags || []) : (sc.safePoints || []);

  if (learnItems.length > 0) {
    document.getElementById('fbLearn').style.display = 'block';
    learnTitle.textContent = sc.isTrap ? '🚩 Red flags in this message:' : '✅ Why it was safe:';
    learnBody.innerHTML = learnItems.map(f => '<div class="fb-learn-item">• ' + f + '</div>').join('');

    // Show streak bonus note inside feedback
    if (G.streak >= 3 && correct) {
      learnBody.innerHTML += '<div class="fb-learn-item bonus">🔥 ' + G.streak + 'x streak bonus! +' + G.bonus + ' pts total</div>';
    }
  } else {
    document.getElementById('fbLearn').style.display = 'none';
  }

  // Change Next button text if out of lives
  document.getElementById('btnNext').textContent = G.lives <= 0 ? 'See Results →' : 'Next →';
}


/* -------------------------------------------------------
   NEXT QUESTION
   Called when student clicks "Next" in the feedback
   overlay. Ends the game if lives are gone or all
   questions have been answered.
------------------------------------------------------- */
function nextQ() {
  if (G.lives <= 0) {
    endGame();
    return;
  }
  G.index++;
  if (G.index >= G.scenarios.length) {
    endGame();
  } else {
    loadQuestion();
  }
}


/* -------------------------------------------------------
   HINT SYSTEM
   Spends one hint token and shows a toast message
   that gently nudges the student toward the answer
------------------------------------------------------- */
function useHint() {
  if (G.hints <= 0 || G.answered) return;

  G.hints--;
  document.getElementById('hintDot').textContent = G.hints;
  if (G.hints <= 0) document.getElementById('btnHint').disabled = true;

  soundHint();

  const sc  = G.scenarios[G.index];
  const msg = sc.isTrap
    ? '🤔 Something feels off… check the link or the urgency!'
    : '😊 Hmm, this one actually seems okay to me!';

  showToast(msg);
}


/* -------------------------------------------------------
   COMBO POPUP
   Shows a floating streak message that animates up
   and fades out when the student gets 3+ in a row
------------------------------------------------------- */
function showCombo(streak) {
  const messages = {
    2: '🔥 Nice!',
    3: '🔥🔥 On a roll!',
    4: '🔥🔥🔥 Unstoppable!',
    5: '⚡ Cyber Hero!',
    6: '🌟 Legendary!',
    7: '💥 Unbeatable!'
  };

  const el = document.getElementById('combo');
  el.style.color   = streak >= 5 ? '#f59e0b' : streak >= 3 ? '#34d399' : '#a78bfa';
  el.textContent   = messages[Math.min(streak, 7)] || streak + 'x 🔥';
  el.className     = 'combo';
  void el.offsetWidth; // force reflow to restart animation
  el.className     = 'combo go';
}


/* -------------------------------------------------------
   CONFETTI
   Spawns colored confetti pieces that fall down the
   screen. Shown on the results screen for good scores.
------------------------------------------------------- */
function spawnConfetti() {
  const colors = ['#7c3aed', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#06b6d4', '#ec4899'];

  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('div');
    piece.style.cssText = [
      'position:fixed',
      'width:8px',
      'height:8px',
      'border-radius:2px',
      'pointer-events:none',
      'z-index:998',
      'left:' + Math.random() * 100 + 'vw',
      'top:-10px',
      'background:' + colors[i % colors.length],
      'transform:rotate(' + Math.random() * 360 + 'deg)',
      'animation:confettiFall ' + (1.2 + Math.random() * 2) + 's ' + Math.random() * 0.6 + 's ease-in forwards'
    ].join(';');

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}


/* -------------------------------------------------------
   TOAST NOTIFICATION
   Shows a small floating message at the bottom of
   the screen and removes it after a few seconds
------------------------------------------------------- */
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = [
    'position:fixed',
    'bottom:100px',
    'left:50%',
    'transform:translateX(-50%)',
    'background:#1e2d3d',
    'border:0.5px solid rgba(6,182,212,0.4)',
    'color:#e2e8f0',
    'font-size:0.83rem',
    'font-weight:800',
    'padding:9px 18px',
    'border-radius:20px',
    'z-index:500',
    'animation:chipPop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'max-width:290px',
    'text-align:center',
    'white-space:nowrap'
  ].join(';');

  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2700);
}


/* -------------------------------------------------------
   RENDER HELPERS
   Small functions that update specific parts of the UI
------------------------------------------------------- */

// Redraws the hearts in the HUD based on remaining lives
function renderLives() {
  document.getElementById('hudLives').innerHTML = Array.from({ length: 3 }, (_, i) => {
    const lost  = i >= G.lives;
    const style = lost ? 'filter:grayscale(1);opacity:0.25' : '';
    return '<span style="font-size:1.3rem;transition:all 0.3s;' + style + '">' + (i < G.lives ? '❤️' : '🖤') + '</span>';
  }).join('');
}

// Shows or hides the streak counter in the HUD
function renderStreak() {
  const el = document.getElementById('hudStreak');
  if (G.streak >= 2) {
    el.textContent = '🔥 ' + G.streak + 'x';
    el.style.color = G.streak >= 4 ? '#f59e0b' : '#fcd34d';
  } else {
    el.textContent = '';
  }
}


/* -------------------------------------------------------
   END GAME
   Calculates final score and star rating, populates
   the results screen, triggers confetti if score is
   good, and saves progress to localStorage so the
   game hub knows this level was completed.
------------------------------------------------------- */
function endGame() {
  const total   = G.scenarios.length;
  const pct     = G.correct / total;
  const stars   = pct >= 0.9 ? 3 : pct >= 0.65 ? 2 : 1;

  // Pick result data based on stars
  const results = {
    3: { trophy: '🏆', title: 'PERFECT! 🔥', sub: "You're a certified Scam-Spotting Legend! 🛡️" },
    2: { trophy: '🎉', title: 'Great Job!',   sub: 'You kept your family safe from most scams!' },
    1: { trophy: '💪', title: 'Keep Practicing!', sub: "Every mistake teaches you something. Try again!" }
  };

  if (G.lives <= 0) {
    document.getElementById('resTrophy').textContent = '💪';
    document.getElementById('resTitle').textContent  = "Don't Give Up!";
    document.getElementById('resSub').textContent    = 'You ran out of lives — but you learned a lot! Try again.';
  } else {
    const r = results[stars];
    document.getElementById('resTrophy').textContent = r.trophy;
    document.getElementById('resTitle').textContent  = r.title;
    document.getElementById('resSub').textContent    = r.sub;
  }

  document.getElementById('resScore').textContent  = G.score.toLocaleString() + ' pts';
  document.getElementById('resStars').textContent  = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('bdCorrect').textContent = G.correct + '/' + total;
  document.getElementById('bdBest').textContent    = G.best + 'x';
  document.getElementById('bdBonus').textContent   = '+' + G.bonus;

  // Trigger confetti for 2 or 3 star scores
  if (stars >= 2) {
    setTimeout(spawnConfetti, 350);
  }

  // Save progress to localStorage so the game hub can read it
  const passed = pct >= 0.6;
  localStorage.setItem('game1_passed', passed ? 'true' : 'false');
  localStorage.setItem('game1_score',  G.score);
  localStorage.setItem('game1_stars',  stars);

  showScreen('s-results');
}


/* -------------------------------------------------------
   GO TO NEXT GAME
   Called by the "Next Game →" button on results screen.
   Change the href below to point to your Game 2 file.
------------------------------------------------------- */
function goNext() {
  const passed = parseFloat(localStorage.getItem('game1_score') || 0) > 0
    && localStorage.getItem('game1_passed') === 'true';

  if (passed) {
    window.location.href = 'game2.html'; // connect to Game 2 here
  } else {
    showToast('💡 Try to get at least 60% correct to unlock Game 2!');
  }
} 