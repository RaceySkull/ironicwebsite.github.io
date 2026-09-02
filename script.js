// ================================================================
// TEAM IRONIC WEBSITE — SCRIPT
// ================================================================
// Two independent jobs, both run on every page:
//   1. Countdown card       — updates the days:hrs:min:sec digits
//                              on the home page (harmless no-op on
//                              pages that don't have a countdown card)
//   2. Active nav highlight — adds ".active" to the current page's
//                              link in the top bar
// ================================================================


// ----------------------------------------------------------------
// 1. COUNTDOWN TO NEXT COMPETITION
// ----------------------------------------------------------------
// HOW TO UPDATE: change NEXT_COMP_DATE below to the next event's
// date/time (format: "YYYY-MM-DDTHH:MM:SS", 24-hour clock). Also
// update the matching text in the .countdown-event line in
// index.html so the label and the countdown stay in sync.
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


// ----------------------------------------------------------------
// 2. ACTIVE NAV LINK
// ----------------------------------------------------------------
// Each HTML file's <body> passes its own filename via a data
// attribute, e.g. <body data-page="team.html">. This just matches
// that against each nav link's href and marks the winner ".active" —
// no server or routing needed.
document.addEventListener('DOMContentLoaded', () => {
  const current = document.body.getAttribute('data-page');
  if (!current) return;
  document.querySelectorAll('.nav-link').forEach(el => {
    const href = el.getAttribute('href');
    if (href === current) el.classList.add('active');
  });
});
