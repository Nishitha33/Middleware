// --- Middleware Simulation ---
let isLoggedIn = false;

// Logger Middleware
function logger(req, next) {
  const log = `[${new Date().toLocaleTimeString()}] ${req.action}`;
  appendLog(log);
  next(); // move to next middleware or handler
}

// Auth Middleware
function auth(req, next) {
  if (!isLoggedIn) {
    appendLog("❌ Access denied. Please log in first!");
    return;
  }
  next(); // proceed if logged in
}

// Final handler for viewing data
function viewDataHandler(req) {
  appendLog("✅ Secure Data: [User info, account details, etc.]");
}

// Helper to append logs to UI
function appendLog(message) {
  const output = document.getElementById("output");
  const line = document.createElement("div");
  line.textContent = message;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

// --- Event Listeners ---
document.getElementById("loginBtn").addEventListener("click", () => {
  isLoggedIn = true;
  logger({ action: "User logged in" }, () => {});
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  isLoggedIn = false;
  logger({ action: "User logged out" }, () => {});
});

document.getElementById("viewDataBtn").addEventListener("click", () => {
  // Middleware chain simulation
  const req = { action: "Attempt to access secure data" };
  logger(req, () => auth(req, () => viewDataHandler(req)));
});
