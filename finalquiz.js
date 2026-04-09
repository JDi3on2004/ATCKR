/* =====================================================
   ATCKR — Final Quiz
   Script: finalquiz.js
   Description: 10-question mixed quiz covering all
   3 game topics. 3 total hints, 70% passing grade,
   full-screen confetti on pass, certificate redirect.
   ===================================================== */


/* -------------------------------------------------------
   QUESTIONS
   10 questions: 4 phishing, 3 cyber defense, 3 vocab.
   Each has a topic tag for the color-coded label.
------------------------------------------------------- */
const QUESTIONS = [
  {
    // Q1 — correct is A
    topic: 'phishing',
    topicLabel: '📱 Phishing',
    img: '🎣',
    q: 'In Text or Trap, you got a fake text pretending to be Bank of America saying your account was LOCKED and you had to click a link. You also got a fake FedEx text and a fake prize text. What is the word for this type of scam where someone PRETENDS to be someone you trust?',
    choices: [
      'Phishing',
      'Updating',
      'Firewalling',
      'Encrypting'
    ],
    correct: 0,
    hint: '💡 It sounds like the word "fishing" — because scammers cast out bait (fake messages) hoping you will bite! What is the cybersecurity word for this?',
    fact: '✅ Phishing! When a scammer pretends to be your bank, your school, or a delivery company to trick you — that is always phishing!'
  },
  {
    // Q2 — correct is D
    topic: 'phishing',
    topicLabel: '📱 Phishing',
    img: '🔑',
    q: 'In Text or Trap, a Minecraft player named xXProGamer99 said: "I\'ll give you 999 FREE diamonds! Just type your username and password into this website first." Why was that a trap?',
    choices: [
      'Because 999 diamonds is too many',
      'Because real Minecraft players never DM you',
      'Because the website had a weird name',
      'Because you should NEVER give your password to anyone — they wanted to steal your account!'
    ],
    correct: 3,
    hint: '💡 There is ONE rule in cybersecurity that never has an exception. What should you NEVER give to anyone online — not ever?',
    fact: '✅ Never share your password with ANYONE — ever! No real developer, game, or company will ever ask for your password. xXProGamer99 just wanted to steal the account!'
  },
  {
    // Q3 — correct is B
    topic: 'defense',
    topicLabel: '🛡️ Cyber Defense',
    img: '🧱',
    q: 'In Cybertower Frenzy, the 🧱 Firewall tower shot at 🐛 worms and 🎣 phishing enemies to stop them from reaching your computer. In real life, a firewall does the same thing — but what exactly does it block?',
    choices: [
      'It blocks your screen from getting too bright',
      'It blocks dangerous network traffic trying to sneak into your computer',
      'It blocks apps from using too much battery',
      'It blocks your webcam from turning on'
    ],
    correct: 1,
    hint: '💡 The Firewall tower stood between the enemies and your computer. In real life it stands between the internet and your computer. What is it stopping from getting through?',
    fact: '✅ A firewall blocks dangerous traffic from the internet — exactly like that tower blocked enemies from reaching your computer in the game!'
  },
  {
    // Q4 — correct is C
    topic: 'phishing',
    topicLabel: '📱 Phishing',
    img: '🔗',
    q: 'In Text or Trap there was a fake prize text with a link to "amaz0n-giftcard-winner.xyz" — the word Amazon was spelled "amaz0n" with a NUMBER ZERO instead of the letter O. Why do scammers do this?',
    choices: [
      'It was just a typo — they probably made a mistake',
      'Amazon actually uses a zero in some of their links',
      'They make fake website addresses that look almost real to trick you into clicking!',
      'The zero makes the website load faster'
    ],
    correct: 2,
    hint: '💡 Say both out loud — "amazon" and "amaz0n". They sound the same but are completely different websites. Why would someone want a site that LOOKS like Amazon but isn\'t?',
    fact: '✅ Scammers create fake websites that look almost identical to real ones — one wrong letter is all it takes. Always read every character in a link before you click!'
  },
  {
    // Q5 — correct is A
    topic: 'defense',
    topicLabel: '🛡️ Cyber Defense',
    img: '🔄',
    q: 'In Cybertower Frenzy, the 🔄 Updater tower "patched exploits" — it fixed weak spots enemies were sneaking through. When your phone shows "Update Available" for an app, what is that update actually fixing?',
    choices: [
      'Fixing security weak spots before hackers find and use them to break in!',
      'Just changing the icon and adding new stickers',
      'Making the app take up more space on your phone',
      'Resetting all your settings back to the beginning'
    ],
    correct: 0,
    hint: '💡 In the game "patching exploits" = fixing weak spots. On your phone, updates do the exact same thing. Hackers look for apps that have NOT been updated yet!',
    fact: '✅ App updates patch real security holes! Hackers specifically target old unpatched apps. Every time your phone asks you to update — that is protecting you from real attacks!'
  },
  {
    // Q6 — correct is D
    topic: 'phishing',
    topicLabel: '📱 Phishing',
    img: '⚡',
    q: 'In Text or Trap, the fake IRS text said "You will be ARRESTED in 1 HOUR if you do not call back RIGHT NOW!!!" and the fake prize text said "YOU HAVE 15 MINUTES TO CLAIM!!!" Why do scammers always add this kind of extreme panic and time pressure?',
    choices: [
      'Because the offer really does expire that fast',
      'Because the IRS really does arrest people by text',
      'Because short deadlines are required by law',
      'To make you so scared and rushed that you act without stopping to think if it is real'
    ],
    correct: 3,
    hint: '💡 When you are panicking and rushing, are you thinking carefully? Or are you just reacting? Scammers know that scared people stop checking if something is real!',
    fact: '✅ Panic is a scammer\'s best friend! When you are scared and rushed you stop thinking clearly. Any message that makes you feel that scared is almost always fake!'
  },
  {
    // Q7 — correct is C
    topic: 'vocab',
    topicLabel: '📚 Vocabulary',
    img: '🦠',
    q: 'In Cybertower Frenzy you battled 🐛 worms that spread fast, 🕵️ spyware that hid from most towers, 🔒 ransomware that was super tough, and 🎣 phishing that stole credentials. All four of these are types of harmful software. What is the ONE word that covers ALL harmful software like this?',
    choices: [
      'Antivirus',
      'Firewall',
      'Malware',
      'Spyware'
    ],
    correct: 2,
    hint: '💡 "Mal" is a prefix that means BAD — like the word "malicious" which means evil. "Ware" is short for software. Put them together — what word do you get?',
    fact: '✅ Malware — short for malicious software! Every harmful program you fought in the game — worms, spyware, ransomware — they are all malware!'
  },
  {
    // Q8 — correct is A
    topic: 'defense',
    topicLabel: '🛡️ Cyber Defense',
    img: '🛡️',
    q: 'In Cybertower Frenzy the 🧱 Firewall could NOT stop 🕵️ spyware. The 🔍 Antivirus could NOT stop 🔒 ransomware. You needed ALL the different towers working together. What does this teach you about real life cybersecurity?',
    choices: [
      'You need multiple defenses together — firewall, antivirus, VPN, and software updates!',
      'Just get the most expensive antivirus and you are fully protected',
      'Cybersecurity is only for IT professionals and companies',
      'One really strong password protects everything'
    ],
    correct: 0,
    hint: '💡 Could the 🧱 Firewall stop spyware? Could the 🔍 Antivirus stop ransomware? You needed ALL the towers. Same idea in real life — what do you need?',
    fact: '✅ Layered defense — just like the game! Firewall blocks bad traffic, Antivirus finds hidden threats, VPN encrypts your connection, updates patch weak spots. You need ALL of them!'
  },
  {
    // Q9 — correct is B
    topic: 'vocab',
    topicLabel: '📚 Vocabulary',
    img: '🔐',
    q: 'You log into your school email. You type your password — but then it says "A 6-digit code was just sent to your phone." You grab your phone, get the code, type it in, and THEN it finally lets you in. What is this two-step login process called?',
    choices: [
      'A spam filter',
      'Two-Factor Authentication (2FA)',
      'Malware scanning',
      'Social engineering'
    ],
    correct: 1,
    hint: '💡 You had to do TWO things to get in — first your password, then a code from your phone. Two steps = Two _____ Authentication. Fill in the blank!',
    fact: '✅ Two-Factor Authentication or 2FA! Even if a hacker steals your password they still cannot get in without the code on YOUR phone!'
  },
  {
    // Q10 — correct is D
    topic: 'vocab',
    topicLabel: '📚 Vocabulary',
    img: '🕵️',
    q: 'Hackers don\'t always break into computers. Sometimes they just trick PEOPLE into giving them passwords or clicking fake links. What is this called?',
    choices: [
      'Malware',
      'Encryption',
      'A Data Breach',
      'Social Engineering'
    ],
    correct: 3,
    hint: '💡 Every scam in all 3 games — the fake bank texts, the fake prize, the Minecraft password trick, the fake IRS threat — none of them hacked a computer. They all tried to fool a PERSON. What do we call that?',
    fact: '✅ Social Engineering — tricking people instead of hacking machines! Every phishing text and fake prize you saw in the games was social engineering. You were the target, not the computer!'
  }
];



/* -------------------------------------------------------
   GAME STATE
------------------------------------------------------- */
const Q = {
  index:       0,
  correct:     0,
  answered:    false,
  hintsLeft:   3,
  hintsUsed:   0,
  hintShown:   false,
  byTopic:     { phishing: 0, defense: 0, vocab: 0 },
  studentName: ''
};


/* -------------------------------------------------------
   PARTICLE BACKGROUND — gold particles for final quiz
------------------------------------------------------- */
(function setupParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    pts = Array.from({ length: 50 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a:  Math.random()
    }));
  }

  resize();
  window.addEventListener('resize', resize);

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${p.a * 0.4})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  })();
})();


/* -------------------------------------------------------
   SCREEN NAVIGATION
------------------------------------------------------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}


/* -------------------------------------------------------
   START QUIZ
------------------------------------------------------- */
function startQuiz() {
  const nameInput = document.getElementById('studentName');
  Q.studentName = nameInput.value.trim() || 'Cyber Guardian';
  Q.index      = 0;
  Q.correct    = 0;
  Q.answered   = false;
  Q.hintsLeft  = 3;
  Q.hintsUsed  = 0;
  Q.hintShown  = false;
  Q.byTopic    = { phishing: 0, defense: 0, vocab: 0 };
  showScreen('s-quiz');
  loadQuestion();
}


/* -------------------------------------------------------
   LOAD QUESTION
------------------------------------------------------- */
function loadQuestion() {
  const q   = QUESTIONS[Q.index];
  const tot = QUESTIONS.length;
  Q.answered = false;
  Q.hintShown = false;

  const pct = Math.round((Q.index / tot) * 100);
  document.getElementById('progFill').style.width  = pct + '%';
  document.getElementById('qCounter').textContent  = 'Q' + (Q.index + 1) + ' / ' + tot;
  document.getElementById('hintCount').textContent = Q.hintsLeft;
  document.getElementById('liveScore').textContent = Q.correct;
  document.getElementById('hintBadge').textContent = Q.hintsLeft;
  document.getElementById('btnHint').disabled      = Q.hintsLeft <= 0;

  // Topic color tag
  const tag = document.getElementById('topicTag');
  tag.textContent = q.topicLabel;
  tag.className   = 'topic-tag ' + q.topic;

  document.getElementById('qImg').textContent  = q.img;
  document.getElementById('qText').textContent = q.q;

  // Build choices
  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  ['A','B','C','D'].forEach((letter, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = '<span class="choice-letter">' + letter + '</span>' + q.choices[i];
    btn.onclick   = () => checkAnswer(i, btn);
    choicesEl.appendChild(btn);
  });

  document.getElementById('hintBox').textContent  = '';
  document.getElementById('hintBox').className    = 'hint-box';
  document.getElementById('feedbackMsg').textContent = '';
  document.getElementById('feedbackMsg').className   = 'feedback-msg';

  const card = document.getElementById('qCard');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'cardIn 0.4s cubic-bezier(0.34,1.56,0.64,1)';
}


/* -------------------------------------------------------
   CHECK ANSWER
------------------------------------------------------- */
function checkAnswer(index, btn) {
  if (Q.answered) return;
  const q = QUESTIONS[Q.index];

  if (index === q.correct) {
    Q.answered = true;
    Q.correct++;
    Q.byTopic[q.topic]++;

    btn.classList.add('correct');
    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
    document.getElementById('liveScore').textContent = Q.correct;

    const fb = document.getElementById('feedbackMsg');
    fb.textContent = q.fact;
    fb.className   = 'feedback-msg ok';

    // Streak combo at milestones
    if (Q.correct === 5)  showCombo('Halfway there! 🔥');
    if (Q.correct === 10) showCombo('PERFECT! 🌟');

    setTimeout(() => {
      if (Q.index + 1 >= QUESTIONS.length) {
        endQuiz();
      } else {
        Q.index++;
        loadQuestion();
      }
    }, 2000);

  } else {
    btn.classList.add('wrong');
    setTimeout(() => btn.classList.remove('wrong'), 500);

    const fb = document.getElementById('feedbackMsg');
    fb.textContent = 'Not quite — try again! ' + (Q.hintsLeft > 0 ? 'Use a hint if you need help. 💡' : 'Think carefully!');
    fb.className   = 'feedback-msg no';

    if (!Q.hintShown && Q.hintsLeft > 0) {
      setTimeout(useHint, 700);
    }
  }
}


/* -------------------------------------------------------
   USE HINT
------------------------------------------------------- */
function useHint() {
  if (Q.hintsLeft <= 0 || Q.hintShown) return;
  Q.hintsLeft--;
  Q.hintsUsed++;
  Q.hintShown = true;

  document.getElementById('hintCount').textContent  = Q.hintsLeft;
  document.getElementById('hintBadge').textContent  = Q.hintsLeft;
  document.getElementById('btnHint').disabled       = Q.hintsLeft <= 0;
  document.getElementById('hintsLeft').innerHTML    =
    '<span class="hint-icon">💡</span><span id="hintCount">' + Q.hintsLeft + '</span> hints left';

  const hb = document.getElementById('hintBox');
  hb.textContent = QUESTIONS[Q.index].hint;
  hb.className   = 'hint-box show';
}


/* -------------------------------------------------------
   COMBO POPUP
------------------------------------------------------- */
function showCombo(text) {
  const el = document.getElementById('combo');
  el.style.color  = '#ffd700';
  el.textContent  = text;
  el.className    = 'combo';
  void el.offsetWidth;
  el.className    = 'combo go';
}


/* -------------------------------------------------------
   END QUIZ
   Calculates pass/fail, populates results screen,
   triggers confetti if passed, saves to localStorage.
------------------------------------------------------- */
function endQuiz() {
  const total   = QUESTIONS.length;
  const passed  = Q.correct >= 7;
  const pct     = Q.correct / total;
  const stars   = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;

  // Populate results
  document.getElementById('scoreRingNum').textContent = Q.correct + '/' + total;
  document.getElementById('bdPhishing').textContent   = Q.byTopic.phishing + '/4';
  document.getElementById('bdDefense').textContent    = Q.byTopic.defense  + '/3';
  document.getElementById('bdVocab').textContent      = Q.byTopic.vocab    + '/3';
  document.getElementById('bdHints').textContent      = Q.hintsUsed;

  if (passed) {
    document.getElementById('resIcon').textContent   = '🏆';
    document.getElementById('resBadge').textContent  = 'FINAL MISSION // CLEARED';
    document.getElementById('resTitle').textContent  = Q.correct === 10 ? 'PERFECT SCORE! 🌟' : 'Mission Accomplished!';
    document.getElementById('resSub').textContent    = 'You passed with ' + Q.correct + '/10. You are now a Certified Cyber Guardian!';
    const btns = document.getElementById('resBtns');
    btns.innerHTML = '<button class="btn-cert" onclick="getCertificate()">🎓 Get My Certificate!</button>';
    setTimeout(spawnConfetti, 300);
  } else {
    document.getElementById('resIcon').textContent   = '💪';
    document.getElementById('resBadge').textContent  = 'FINAL MISSION // KEEP TRYING';
    document.getElementById('resTitle').textContent  = 'Almost There!';
    document.getElementById('resSub').textContent    = 'You scored ' + Q.correct + '/10. You need 7/10 to pass. Review the topics and try again!';
    const btns = document.getElementById('resBtns');
    btns.innerHTML = '<button class="btn-retry" onclick="retryQuiz()">🔁 Try Again</button>';
  }

  localStorage.setItem('finalquiz_passed', passed ? 'true' : 'false');
  localStorage.setItem('finalquiz_score',  Q.correct);
  localStorage.setItem('student_name',     Q.studentName);
  localStorage.setItem('finalquiz_date',   new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }));

  showScreen('s-results');
}


/* -------------------------------------------------------
   CONFETTI — massive full-screen explosion
------------------------------------------------------- */
function spawnConfetti() {
  const colors = ['#ffd700','#ffe066','#ffffff','#39ff14','#00e5ff','#a55eea','#ff4757','#ffa500'];
  const style  = document.createElement('style');
  style.textContent = `
    @keyframes cFall     { 0%{transform:translateY(-20px) rotate(0);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
    @keyframes cFallSide { 0%{transform:translateY(-20px) translateX(0) rotate(0);opacity:1} 100%{transform:translateY(110vh) translateX(100px) rotate(540deg);opacity:0} }
    @keyframes cFallLeft { 0%{transform:translateY(-20px) translateX(0) rotate(0);opacity:1} 100%{transform:translateY(110vh) translateX(-80px) rotate(600deg);opacity:0} }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < 200; i++) {
    const el     = document.createElement('div');
    const size   = Math.random() * 10 + 4;
    const isRect = Math.random() > 0.4;
    const anim   = ['cFall','cFallSide','cFallLeft'][Math.floor(Math.random() * 3)];
    el.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'z-index:9999',
      'left:'   + Math.random() * 100 + 'vw',
      'top:-24px',
      'width:'  + size + 'px',
      'height:' + (isRect ? size * 0.35 : size) + 'px',
      'border-radius:' + (isRect ? '1px' : '50%'),
      'background:' + colors[i % colors.length],
      'opacity:1',
      'animation:' + anim + ' ' + (1.8 + Math.random() * 2.5) + 's ' + (Math.random() * 0.6) + 's ease-in forwards'
    ].join(';');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}


/* -------------------------------------------------------
   GET CERTIFICATE
   Saves name to localStorage then opens certificate page
------------------------------------------------------- */
function getCertificate() {
  window.location.href = 'certificate.html';
}


/* -------------------------------------------------------
   RETRY QUIZ
------------------------------------------------------- */
function retryQuiz() {
  showScreen('s-intro');
}
