// TEAM IRONIC WEBSITE SCRIPT
//
// Does two things, both run on every page:
//   1. Countdown card: updates the days/hrs/min/sec numbers on the
//      home page (does nothing on pages without a countdown card)
//   2. Active nav link: adds the ".active" highlight to whichever
//      nav link matches the current page


// ----------------------------------------------------------
// 1. Countdown to next competition
// ----------------------------------------------------------
// To update, change NEXT_COMP_DATE below to the next event's date
// and time (format: "YYYY-MM-DDTHH:MM:SS", 24 hour clock). Also
// update the matching text in the .countdown-event line in
// index.html so the label and the countdown match up.
const NEXT_COMP_DATE = "2026-09-12T08:00:00"; // Kick Off Event, Charlotte HS

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


// ----------------------------------------------------------
// 2. Active nav link
// ----------------------------------------------------------
// Each HTML file's <body> tag passes its own filename through a
// data attribute, like <body data-page="team.html">. This just
// checks that against each nav link's href and marks the match
// ".active", no server or routing needed for it to work.
document.addEventListener('DOMContentLoaded', () => {
  const current = document.body.getAttribute('data-page');
  if (!current) return;
  document.querySelectorAll('.nav-link').forEach(el => {
    const href = el.getAttribute('href');
    if (href === current) el.classList.add('active');
  });
});
