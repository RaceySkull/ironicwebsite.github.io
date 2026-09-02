// ============================================
// TEAM IRONIC WEBSITE SCRIPT
// Handles the hamburger sidebar toggle, marks
// the correct nav link as active based on which
// HTML file is currently open, and runs the
// "days to next event" counter on the home page.
// ============================================

// ---- countdown to next event (home page only, safe to include everywhere) ----
// Update these two lines whenever the next event on the schedule changes.
  const NEXT_EVENT_DATE = "2026-09-12T08:00:00"; // Kick Off Event — Charlotte HS
  const NEXT_EVENT_NAME = "Kick Off Event";

  function updateCountdown() {
    const daysEl = document.getElementById('cd-days-num');
    if (!daysEl) return; // not on the home page

    const nameEl = document.getElementById('cd-event-name');
    const dateEl = document.getElementById('cd-date-label');

    if (!NEXT_EVENT_DATE) return; // leave "TBD" showing

    const target = new Date(NEXT_EVENT_DATE).getTime();
    const now = Date.now();
    const diff = target - now;
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

    daysEl.textContent = days;
    if (nameEl) nameEl.textContent = NEXT_EVENT_NAME;
    if (dateEl) {
      const d = new Date(NEXT_EVENT_DATE);
      dateEl.textContent = (d.getMonth() + 1) + '/' + d.getDate() + '/' + String(d.getFullYear()).slice(-2);
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000 * 60 * 60); // a once-an-hour refresh is plenty for a day counter

// ---- sidebar / hamburger toggle ----
const nav = document.getElementById('sideNav');
  const overlay = document.getElementById('navOverlay');
  const btn = document.getElementById('hamburgerBtn');

  function toggleNav() {
    const isOpen = nav.classList.contains('open');
    isOpen ? closeNav() : openNav();
  }

  function openNav() {
    nav.classList.add('open');
    overlay.classList.add('visible');
    btn.classList.add('open');
  }

  function closeNav() {
    nav.classList.remove('open');
    overlay.classList.remove('visible');
    btn.classList.remove('open');
  }


  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });

// ---- mark the current page's nav link as active ----
// Each HTML file's <body> passes its own filename via a data attribute
// on <body data-page="team.html">, so this works without any server.
document.addEventListener('DOMContentLoaded', () => {
  const current = document.body.getAttribute('data-page');
  if (!current) return;
  document.querySelectorAll('.nav-link').forEach(el => {
    const href = el.getAttribute('href');
    if (href === current) el.classList.add('active');
  });
});
