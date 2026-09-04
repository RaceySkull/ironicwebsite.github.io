// TEAM IRONIC WEBSITE SCRIPT
//
// Does three things, all run on every page:
//   1. Countdown card: updates the "days to go" number on the home
//      page (does nothing on pages without a countdown card)
//   2. Active nav link: adds the ".active" highlight to whichever
//      nav link matches the current page
//   3. History locator scrollspy: highlights whichever season is
//      currently on screen on the history page (does nothing on
//      pages without a .history-locator)


// ----------------------------------------------------------
// 1. Countdown to next competition
// ----------------------------------------------------------
// To update, change NEXT_COMP_DATE below to the next event's date
// and time (format: "YYYY-MM-DDTHH:MM:SS", 24 hour clock). Also
// update the matching text in the .countdown-event line in
// index.html so the label and the countdown match up.
//
// Card only shows whole days now (hours/min/sec got dropped), so it
// only needs to recheck once a minute, not once a second.
const NEXT_COMP_DATE = "2026-09-12T08:00:00"; // Kick Off Event, Charlotte HS

function updateCountdown() {
  const daysEl = document.getElementById('cd-days');
  if (!daysEl) return; // this page has no countdown card, nothing to update
  if (!NEXT_COMP_DATE) return; // leave dashes showing

  const target = new Date(NEXT_COMP_DATE).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    daysEl.textContent = '0';
    return;
  }

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  daysEl.textContent = String(days);
}

updateCountdown();
setInterval(updateCountdown, 60 * 1000);


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


// ----------------------------------------------------------
// 3. History page: season locator scrollspy
// ----------------------------------------------------------
// Watches every .season-block on the history page and marks the
// matching .locator-link ".active" whenever that season is the one
// in view, so the left-hand tab column tracks scroll position
// automatically. New season blocks pick this up for free as long
// as the block's id matches its locator-link's href.
document.addEventListener('DOMContentLoaded', () => {
  const seasonBlocks = document.querySelectorAll('.season-block[id]');
  if (!seasonBlocks.length) return; // not the history page, nothing to do

  const locatorLinks = document.querySelectorAll('.history-locator .locator-link');
  const linkFor = id => Array.from(locatorLinks).find(a => a.getAttribute('href') === `#${id}`);

  const setActive = id => {
    locatorLinks.forEach(a => a.classList.remove('active'));
    const match = linkFor(id);
    if (match) match.classList.add('active');
  };

  // Start on whichever season is nearest the top of the viewport.
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    if (!visible.length) return;
    visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    setActive(visible[0].target.id);
  }, { rootMargin: '-96px 0px -60% 0px', threshold: 0 });

  seasonBlocks.forEach(block => observer.observe(block));
  setActive(seasonBlocks[0].id); // sensible default before any scrolling happens
});
