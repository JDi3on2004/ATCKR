/* =====================================================
   ATCKR — Cybertower Frenzy Tutorial
   Script: tutorial2.js
   Description: Auto-advancing slide system with
   progress bars, dot indicators, skip/replay, and
   particle background. Each slide auto-advances after
   a set duration. Student can skip at any time.
   ===================================================== */


/* -------------------------------------------------------
   SLIDE CONFIGURATION
   Each slide has a duration in milliseconds.
   The progress bar fills over that duration then
   automatically advances to the next slide.
------------------------------------------------------- */
const SLIDE_DURATIONS = [
  3500,   // Slide 0 — intro
  6000,   // Slide 1 — the map
  6000,   // Slide 2 — pick a defense
  6000,   // Slide 3 — place your tower
  6000    // Slide 4 — match towers to enemies
];

const TOTAL_SLIDES = SLIDE_DURATIONS.length;


/* -------------------------------------------------------
   TUTORIAL STATE
------------------------------------------------------- */
let currentSlide = 0;
let slideTimer   = null;
let barTimer     = null;


/* -------------------------------------------------------
   PARTICLE BACKGROUND
   Same floating dot pattern as game1 and quiz1.
   Uses green particles to match cyberdefense theme.
------------------------------------------------------- */
(function setupParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    pts = Array.from({ length: 45 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.3 + 0.4,
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
      ctx.fillStyle = `rgba(0, 229, 255, ${p.a * 0.4})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  })();
})();


/* -------------------------------------------------------
   SHOW SLIDE
   Hides all slides, shows the target one, updates dots,
   and starts the auto-advance timer with progress bar.
------------------------------------------------------- */
function goSlide(index) {
  // Clear any running timers
  clearTimeout(slideTimer);
  clearTimeout(barTimer);

  // Hide all slides and reset bars
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  document.querySelectorAll('.auto-bar').forEach(b => {
    b.style.transition = 'none';
    b.style.width = '0%';
  });

  currentSlide = index;

  // Show end screen after all content slides
  if (index >= TOTAL_SLIDES) {
    document.getElementById('slide-end').classList.add('active');
    document.getElementById('dots').style.display = 'none';
    return;
  }

  // Show the right slide and dot
  document.getElementById('slide-' + index).classList.add('active');
  document.querySelectorAll('.dot')[index].classList.add('active');
  document.getElementById('dots').style.display = 'flex';

  // Start progress bar animation
  const bar      = document.getElementById('auto-bar-' + index);
  const duration = SLIDE_DURATIONS[index];

  if (bar) {
    // Force reflow so the transition restart is visible
    void bar.offsetWidth;
    bar.style.transition = `width ${duration}ms linear`;
    bar.style.width = '100%';
  }

  // Auto-advance timer
  slideTimer = setTimeout(() => {
    goSlide(currentSlide + 1);
  }, duration);
}


/* -------------------------------------------------------
   SKIP TUTORIAL
   Jumps directly to the end screen
------------------------------------------------------- */
function skipTutorial() {
  clearTimeout(slideTimer);
  clearTimeout(barTimer);
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  document.getElementById('slide-end').classList.add('active');
  document.getElementById('dots').style.display = 'none';
}


/* -------------------------------------------------------
   REPLAY TUTORIAL
   Goes back to the first slide
------------------------------------------------------- */
function replayTutorial() {
  document.getElementById('dots').style.display = 'flex';
  goSlide(0);
}


/* -------------------------------------------------------
   START GAME
   Navigates to the actual cyberdefense game.
   The tutorial saves a flag so the game knows
   the tutorial was completed.
------------------------------------------------------- */
function startGame() {
  localStorage.setItem('tutorial2_seen', 'true');
  window.location.href = 'cyberdefense.html';
}


/* -------------------------------------------------------
   KEYBOARD NAVIGATION
   Left/right arrow keys to move between slides.
   Space or Enter to advance.
------------------------------------------------------- */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (currentSlide < TOTAL_SLIDES) {
      goSlide(currentSlide + 1);
    }
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    if (currentSlide > 0) {
      goSlide(currentSlide - 1);
    }
  }
  if (e.key === 'Escape') {
    skipTutorial();
  }
});


/* -------------------------------------------------------
   BOOT
   Start from slide 0 on page load
------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  goSlide(0);
});
