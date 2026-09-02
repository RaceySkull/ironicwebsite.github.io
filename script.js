// ============================================
// TEAM IRONIC WEBSITE SCRIPT
// Marks the correct nav link as active based on
// which HTML file is currently open, and runs the
// countdown card on the home page (if a date is set).
// ============================================

// ---- countdown to next competition (home page only, safe to include everywhere) ----
// Set your competition date here once it's known, e.g. "2026-01-17T08:00:00"
  const NEXT_COMP_DATE = "2026-09-12T08:00:00"; // Kick Off Event — Charlotte HS

  function updateCountdown() {
    const daysEl = document.getElementById('cd-days');
    if (!daysEl) return; // this page has no countdown card, nothing to update
    if (!NEXT_COMP_DATE) return; // leave dashes showing
    const target = new Date(NEXT_COMP_DATE).getTime();
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

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
