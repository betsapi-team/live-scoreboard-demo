// BetsAPI Live Scoreboard Demo
// ---------------------------------------------------------------
// STEP 1: Sign up at https://betsapi.com and copy your API token
// STEP 2: Paste it below, replacing YOUR_API_TOKEN_HERE
// STEP 3: Check the endpoint URL and response field names in the
//         BetsAPI documentation (https://betsapi.com/docs) and
//         adjust ENDPOINT / field mapping if needed.
// ---------------------------------------------------------------

const CONFIG = {
  TOKEN: "YOUR_API_TOKEN_HERE",
  API_BASE: "https://api.betsapi.com",   // verify base URL in the docs
  ENDPOINT: "/v1/events/inplay",        // in-play events; verify in the docs
  SPORT_ID: "1",                        // soccer by default; see docs for IDs
  REFRESH_MS: 5000,                     // poll every 5 seconds
};

const eventsEl   = document.getElementById("events");
const statusEl   = document.getElementById("status");
const lastUpdEl  = document.getElementById("last-update");
const refreshBtn = document.getElementById("refresh-btn");

// Build the request URL
function buildUrl() {
  return CONFIG.API_BASE + CONFIG.ENDPOINT +
    "?token=" + encodeURIComponent(CONFIG.TOKEN) +
    "&sport_id=" + encodeURIComponent(CONFIG.SPORT_ID);
}

// Fetch live events from BetsAPI
async function loadEvents() {
  if (CONFIG.TOKEN === "YOUR_API_TOKEN_HERE") {
    setStatus("error", "Add your BetsAPI token in js/app.js first");
    renderEmpty("Configuration needed: open js/app.js and paste your API token.");
    return;
  }

  setStatus("", "Loading...");
  try {
    const res = await fetch(buildUrl());
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    // NOTE: adjust these field names to match the docs' example response
    const events = (data && data.results) || [];
    renderEvents(events);
    setStatus("ok", events.length + " live events");
    lastUpdEl.textContent = "Updated " + new Date().toLocaleTimeString();
  } catch (err) {
    setStatus("error", "Request failed: " + err.message);
    renderEmpty("Could not load data. Check your token, endpoint, and internet connection.");
  }
}

function setStatus(cls, msg) {
  statusEl.className = "status " + cls;
  statusEl.textContent = msg;
}

function renderEmpty(msg) {
  eventsEl.innerHTML = '<div class="empty">' + escapeHtml(msg) + "</div>";
}

// Render one card per live event
function renderEvents(events) {
  if (!events.length) {
    renderEmpty("No live events right now. Try another sport_id, or check back during match hours.");
    return;
  }

  eventsEl.innerHTML = events.map(function (ev) {
    // NOTE: adjust field names to match the BetsAPI docs response
    var home  = ev.home && (ev.home.name || ev.home) || "Home";
    var away  = ev.away && (ev.away.name || ev.away) || "Away";
    var ss    = ev.ss || "-";              // live score, e.g. "1-0"
    var timer = ev.timer || "";            // match clock, e.g. "34'"
    var league = ev.league && (ev.league.name || ev.league) || "";

    return (
      '<div class="event">' +
        '<div>' +
          '<div class="league">' + escapeHtml(league) + "</div>" +
          '<div class="teams">' +
            '<span class="team">' + escapeHtml(home) + "</span>" +
            '<span class="team">' + escapeHtml(away) + "</span>" +
          "</div>" +
        "</div>" +
        '<div class="score">' + escapeHtml(ss) +
          '<span class="time">' + escapeHtml(timer) + "</span>" +
        "</div>" +
      "</div>"
    );
  }).join("");
}

// Minimal HTML escaping to keep the page safe
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Manual refresh button
refreshBtn.addEventListener("click", loadEvents);

// Auto-refresh every REFRESH_MS
setInterval(loadEvents, CONFIG.REFRESH_MS);

// First load
loadEvents();
