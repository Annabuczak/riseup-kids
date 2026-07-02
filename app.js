const STORAGE_KEY = "riseup-kids-pwa-v1";

function id() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const defaultRewards = [
  { id: id(), min: 0, max: 7, reward: "No weekly reward yet" },
  { id: id(), min: 8, max: 13, reward: "Small treat with Mum" },
  { id: id(), min: 14, max: 21, reward: "Extra screen-time pass" },
  { id: id(), min: 22, max: 29, reward: "Pick a weekend activity" },
  { id: id(), min: 30, max: 100, reward: "Choose a family night" }
];

const defaultBehaviours = [
  ["Bed made", "Responsibility", "Bonus", 1],
  ["Bedroom tidy", "Responsibility", "Bonus", 1],
  ["Buddy walked", "Responsibility", "Bonus", 2],
  ["Helped Mum without asking", "Kindness", "Bonus", 2],
  ["Accepted 'No' first time", "Self-control", "Bonus", 2],
  ["Good sportsmanship", "Self-control", "Bonus", 2],
  ["Honest about mistake", "Honesty", "Bonus", 2],
  ["Good behaviour", "Kindness", "Bonus", 2],
  ["Apologised sincerely", "Kindness", "Bonus", 2],
  ["Included another child", "Kindness", "Bonus", 2],
  ["Controlled frustration", "Self-control", "Bonus", 4],
  ["Got up without reminders", "Responsibility", "Bonus", 1],
  ["Bed left unmade", "Responsibility", "Deduction", -1],
  ["Bedroom needs a reset", "Responsibility", "Deduction", -2],
  ["Clothes left on bathroom floor", "Responsibility", "Deduction", -1],
  ["Shoes left in hallway", "Responsibility", "Deduction", -1],
  ["Plate left upstairs", "Responsibility", "Deduction", -1],
  ["Table area left messy", "Responsibility", "Deduction", -1],
  ["Buddy walk missed", "Responsibility", "Deduction", -2],
  ["Chore not finished", "Responsibility", "Deduction", -2],
  ["Spoke disrespectfully", "Respect", "Deduction", -2],
  ["Used rude language", "Respect", "Deduction", -2],
  ["Door slammed", "Respect", "Deduction", -2],
  ["Instruction not followed", "Respect", "Deduction", -2],
  ["Asked again after answer", "Respect", "Deduction", -1],
  ["Kept asking for YouTube", "Respect", "Deduction", -1],
  ["Kept asking for phone", "Respect", "Deduction", -1],
  ["Kept asking for computer", "Respect", "Deduction", -1],
  ["Asked for treats after refusing chores", "Respect", "Deduction", -2],
  ["Found winning or losing hard", "Self-control", "Deduction", -3],
  ["Used threatening words", "Kindness", "Deduction", -4],
  ["Used unkind words", "Kindness", "Deduction", -3],
  ["Took frustration out on Buddy", "Kindness", "Deduction", -3],
  ["Apology refused", "Kindness", "Deduction", -2]
].map(([name, category, type, points]) => ({
  id: id(),
  name,
  category,
  type,
  points
}));

const aliases = {
  "woke up without being nagged": "got up without reminders",
  "bed not made": "bed left unmade",
  "bedroom messy": "bedroom needs a reset",
  "didn't clean after eating": "table area left messy",
  "didn't walk buddy when asked": "buddy walk missed",
  "didn't complete chore": "chore not finished",
  "talking back": "spoke disrespectfully",
  "swearing": "used rude language",
  "slamming door": "door slammed",
  "ignored instruction": "instruction not followed",
  "asked again after 'no'": "asked again after answer",
  "begged for youtube": "kept asking for youtube",
  "begged for phone": "kept asking for phone",
  "begged for computer": "kept asking for computer",
  "asked for tesco money after refusing chores": "asked for treats after refusing chores",
  "poor sportsmanship": "found winning or losing hard",
  "threatened another child": "used threatening words",
  "deliberately rude": "used unkind words",
  "refused to apologise": "apology refused"
};

let state = loadState();
let selectedAccountId = state.selectedAccountId || null;
let selectedTab = "log";
let selectedDay = "monday";
let behaviourFilter = "All";
let catalogueFilter = "All";

function todayMonday() {
  const today = new Date();
  const day = today.getDay() || 7;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - day + 1);
  return monday.toISOString().slice(0, 10);
}

function blankLogs() {
  return ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].reduce((logs, day) => {
    logs[day] = { notes: "", behaviours: [] };
    return logs;
  }, {});
}

function defaultAccount() {
  return {
    id: id(),
    name: "Anna",
    email: "buczakanna@gmail.com",
    pin: "1234",
    child: { name: "Louie", age: 10 },
    customBehaviours: [],
    hiddenBehaviours: [],
    rewardLevels: clone(defaultRewards),
    currentWeekStart: todayMonday(),
    weeklyLogs: blankLogs(),
    pastWeeks: []
  };
}

function loadState() {
  const fallback = { accounts: [defaultAccount()], selectedAccountId: null };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.accounts)) return fallback;
    return saved;
  } catch {
    return fallback;
  }
}

function saveState() {
  state.selectedAccountId = selectedAccountId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function account() {
  return state.accounts.find(item => item.id === selectedAccountId) || null;
}

function normalise(name) {
  const trimmed = String(name || "").trim().toLowerCase();
  return aliases[trimmed] || trimmed;
}

function behaviourLibrary() {
  const current = account();
  return [...defaultBehaviours, ...((current && current.customBehaviours) || [])];
}

function visibleBehaviours() {
  const current = account();
  const hidden = new Set(((current && current.hiddenBehaviours) || []).map(normalise));
  const seen = new Set();

  return behaviourLibrary().filter(behaviour => {
    const key = normalise(behaviour.name);
    if (hidden.has(key) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pointsFor(name) {
  const key = normalise(name);
  const found = behaviourLibrary().find(behaviour => normalise(behaviour.name) === key);
  return found ? found.points : 0;
}

function dayScore(day) {
  const current = account();
  if (!current) return 0;
  return (current.weeklyLogs[day]?.behaviours || []).reduce((sum, name) => sum + pointsFor(name), 0);
}

function weeklyScore(current = account()) {
  if (!current) return 0;
  return Math.max(0, Math.min(100, Object.keys(current.weeklyLogs).reduce((sum, day) => sum + dayScore(day), 0)));
}

function rewardFor(score, current = account()) {
  const levels = [...(current?.rewardLevels || defaultRewards)].sort((a, b) => a.min - b.min);
  return (levels.find(level => level.min <= score && score <= level.max) || levels[0]).reward;
}

function sign(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function render() {
  const root = document.querySelector("#app");
  const current = account();
  root.innerHTML = current ? appView(current) : loginView();
  bindEvents();
}

function loginView() {
  return `
    <main class="shell">
      <section class="topbar">
        <div class="brand">
          <div class="brand-mark">RU</div>
          <div class="title-stack">
            <h1>RiseUp Kids</h1>
            <p>Behaviour, XP and rewards</p>
          </div>
        </div>
      </section>

      <section class="card">
        <h2>Log in</h2>
        <label class="field">
          <span>Account</span>
          <select id="login-account">
            ${state.accounts.map(item => `<option value="${item.id}">${esc(item.name)} (${esc(item.child.name)})</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>PIN</span>
          <input id="login-pin" type="password" inputmode="numeric" placeholder="1234">
        </label>
        <button class="primary" data-action="login">Log in</button>
      </section>

      <section class="card">
        <h2>Create account</h2>
        <label class="field"><span>Parent name</span><input id="new-parent" placeholder="Parent"></label>
        <label class="field"><span>Email</span><input id="new-email" type="email" placeholder="parent@email.com"></label>
        <label class="field"><span>PIN</span><input id="new-pin" type="password" inputmode="numeric" placeholder="Create PIN"></label>
        <div class="grid-2">
          <label class="field"><span>Child</span><input id="new-child" placeholder="Child name"></label>
          <label class="field"><span>Age</span><input id="new-age" inputmode="numeric" placeholder="10"></label>
        </div>
        <button class="secondary" data-action="create-account">Create new account</button>
      </section>
    </main>
  `;
}

function appView(current) {
  const score = weeklyScore(current);
  return `
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">RU</div>
          <div class="title-stack">
            <h1>${esc(current.child.name)}</h1>
            <p>${esc(current.name)}'s account</p>
          </div>
        </div>
        <div class="xp-pill">${score} XP</div>
      </header>
      ${tabView(current)}
    </main>
    <nav class="tabs">
      ${["log", "week", "rewards", "more"].map(tab => `
        <button class="tab ${selectedTab === tab ? "active" : ""}" data-tab="${tab}">
          ${tab[0].toUpperCase()}${tab.slice(1)}
        </button>
      `).join("")}
    </nav>
  `;
}

function tabView(current) {
  if (selectedTab === "week") return weekView(current);
  if (selectedTab === "rewards") return rewardsView(current);
  if (selectedTab === "more") return moreView(current);
  return logView(current);
}

function logView(current) {
  const shown = visibleBehaviours().filter(item => behaviourFilter === "All" || item.type === behaviourFilter);
  const log = current.weeklyLogs[selectedDay];
  return `
    <section class="card">
      <div class="section-row">
        <h2>Day</h2>
        <span class="muted small">${selectedDay}</span>
      </div>
      <div class="day-strip">
        ${Object.keys(current.weeklyLogs).map(day => `
          <button class="day-button ${day === selectedDay ? "active" : ""}" data-day="${day}">
            <strong>${day.slice(0, 3)}</strong>
            <span>${sign(dayScore(day))}</span>
          </button>
        `).join("")}
      </div>
    </section>

    <section class="card">
      <div class="section-row">
        <h2>${selectedDay[0].toUpperCase()}${selectedDay.slice(1)} total</h2>
        <strong>${sign(dayScore(selectedDay))}</strong>
      </div>
      <div class="plain-list">
        ${log.behaviours.length ? log.behaviours.map((name, index) => `
          <div class="log-row">
            <div>
              <strong>${esc(name)}</strong>
              <span class="muted small">${sign(pointsFor(name))} XP</span>
            </div>
            <button class="icon-button" data-remove-log="${index}" aria-label="Remove">x</button>
          </div>
        `).join("") : `<div class="empty">Nothing recorded yet.</div>`}
      </div>
    </section>

    <section class="card">
      <div class="section-row">
        <h2>Record behaviour</h2>
        <span class="muted small">${shown.length} shown</span>
      </div>
      ${segments("behaviour-filter", behaviourFilter)}
      <div class="behaviour-list">
        ${shown.map(behaviour => behaviourButton(behaviour, "record")).join("")}
      </div>
    </section>

    <section class="card">
      <h2>Notes</h2>
      <textarea id="notes">${esc(log.notes)}</textarea>
      <button class="primary" data-action="save-notes">Save note</button>
    </section>
  `;
}

function weekView(current) {
  const score = weeklyScore(current);
  return `
    <section class="card">
      <h2>Weekly summary</h2>
      <div class="xp-pill">${score} XP</div>
      <p class="muted">${esc(rewardFor(score, current))}</p>
      <p class="muted">Daily average: ${(score / 7).toFixed(1)} XP</p>
    </section>
    ${Object.keys(current.weeklyLogs).map(day => {
      const scoreForDay = dayScore(day);
      const behaviours = current.weeklyLogs[day].behaviours;
      return `
        <section class="card">
          <div class="section-row">
            <h2>${day[0].toUpperCase()}${day.slice(1)}</h2>
            <strong>${sign(scoreForDay)}</strong>
          </div>
          <div class="progress"><div style="width:${Math.min(100, Math.max(0, scoreForDay) / 8 * 100)}%"></div></div>
          <p class="muted">${behaviours.length ? esc(behaviours.join(", ")) : "No behaviours yet"}</p>
        </section>
      `;
    }).join("")}
  `;
}

function rewardsView(current) {
  const score = weeklyScore(current);
  const unlocked = (current.rewardLevels || defaultRewards).some(level => level.min > 0 && score >= level.min);
  return `
    <section class="card">
      <h2>Current reward</h2>
      <p><strong>${esc(rewardFor(score, current))}</strong></p>
      <p class="muted">${unlocked ? `${esc(current.child.name)} has unlocked a reward.` : `${esc(current.child.name)} has not unlocked a reward yet.`}</p>
    </section>

    <section class="card">
      <h2>Add your own reward</h2>
      <label class="field"><span>Reward</span><input id="reward-name" placeholder="Choose movie night"></label>
      <div class="grid-2">
        <label class="field"><span>Min XP</span><input id="reward-min" inputmode="numeric" placeholder="8"></label>
        <label class="field"><span>Max XP</span><input id="reward-max" inputmode="numeric" placeholder="13"></label>
      </div>
      <div class="toolbar">
        <button class="primary" data-action="add-reward">Add reward</button>
        <button class="secondary" data-action="reset-rewards">Reset defaults</button>
      </div>
    </section>

    <section class="card">
      <h2>Reward levels</h2>
      <div class="plain-list">
        ${[...(current.rewardLevels || defaultRewards)].sort((a, b) => a.min - b.min).map(level => `
          <div class="reward-row">
            <div>
              <strong>${esc(level.reward)}</strong>
              <span class="muted small">${level.min}-${level.max} XP</span>
            </div>
            ${level.min > 0 ? `<button class="icon-button" data-remove-reward="${level.id}" aria-label="Remove">x</button>` : ""}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function moreView(current) {
  const shown = visibleBehaviours().filter(item => catalogueFilter === "All" || item.type === catalogueFilter);
  return `
    <section class="card">
      <h2>Add your own behaviour</h2>
      <label class="field"><span>Name</span><input id="custom-name" placeholder="Packed school bag"></label>
      <label class="field"><span>Category</span><input id="custom-category" placeholder="Responsibility"></label>
      <div class="grid-2">
        <label class="field">
          <span>Type</span>
          <select id="custom-type"><option>Bonus</option><option>Deduction</option></select>
        </label>
        <label class="field"><span>Points</span><input id="custom-points" inputmode="numeric" placeholder="1"></label>
      </div>
      <button class="primary" data-action="add-behaviour">Add behaviour</button>
    </section>

    <section class="card">
      <div class="section-row">
        <h2>Behaviour catalogue</h2>
        <span class="muted small">${shown.length} shown</span>
      </div>
      ${segments("catalogue-filter", catalogueFilter)}
      <div class="behaviour-list">
        ${shown.map(behaviour => behaviourButton(behaviour, "hide")).join("")}
      </div>
      <button class="secondary" data-action="restore-behaviours">Restore hidden behaviours</button>
    </section>

    <section class="card">
      <h2>Week tools</h2>
      <button class="secondary" data-action="archive-week">Save week and start fresh</button>
    </section>

    <section class="card">
      <h2>Past weeks</h2>
      <div class="plain-list">
        ${current.pastWeeks.length ? current.pastWeeks.map(week => `
          <div class="reward-row">
            <div>
              <strong>${esc(week.weekStart)} to ${esc(week.weekEnd)}</strong>
              <span class="muted small">${week.score} XP - ${esc(week.reward)}</span>
            </div>
          </div>
        `).join("") : `<div class="empty">No past weeks yet.</div>`}
      </div>
    </section>

    <section class="card">
      <button class="danger" data-action="logout">Log out</button>
    </section>
  `;
}

function segments(kind, value) {
  return `
    <div class="segments" data-segments="${kind}">
      ${["All", "Bonus", "Deduction"].map(item => `<button class="${value === item ? "active" : ""}" data-value="${item}">${item === "Deduction" ? "Deductions" : item}</button>`).join("")}
    </div>
  `;
}

function behaviourButton(behaviour, mode) {
  return `
    <div class="behaviour-row">
      <button class="behaviour-row" data-${mode === "record" ? "record" : "hide"}="${behaviour.id}">
        <div>
          <strong>${esc(behaviour.name)}</strong>
          <span class="muted small">${esc(behaviour.category)}</span>
        </div>
        <span class="point ${behaviour.points < 0 ? "negative" : ""}">${sign(behaviour.points)}</span>
      </button>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach(button => {
    button.addEventListener("click", () => {
      selectedTab = button.dataset.tab;
      render();
    });
  });

  document.querySelectorAll("[data-day]").forEach(button => {
    button.addEventListener("click", () => {
      selectedDay = button.dataset.day;
      render();
    });
  });

  document.querySelectorAll("[data-segments='behaviour-filter'] button").forEach(button => {
    button.addEventListener("click", () => {
      behaviourFilter = button.dataset.value;
      render();
    });
  });

  document.querySelectorAll("[data-segments='catalogue-filter'] button").forEach(button => {
    button.addEventListener("click", () => {
      catalogueFilter = button.dataset.value;
      render();
    });
  });

  document.querySelectorAll("[data-record]").forEach(button => {
    button.addEventListener("click", () => {
      const found = visibleBehaviours().find(item => item.id === button.dataset.record);
      if (!found) return;
      account().weeklyLogs[selectedDay].behaviours.push(found.name);
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-hide]").forEach(button => {
    button.addEventListener("click", () => {
      const found = visibleBehaviours().find(item => item.id === button.dataset.hide);
      if (!found) return;
      const current = account();
      current.hiddenBehaviours = current.hiddenBehaviours || [];
      current.hiddenBehaviours.push(found.name);
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-remove-log]").forEach(button => {
    button.addEventListener("click", () => {
      account().weeklyLogs[selectedDay].behaviours.splice(Number(button.dataset.removeLog), 1);
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-remove-reward]").forEach(button => {
    button.addEventListener("click", () => {
      account().rewardLevels = account().rewardLevels.filter(level => level.id !== button.dataset.removeReward);
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });
}

function handleAction(action) {
  if (action === "login") {
    const id = document.querySelector("#login-account").value;
    const pin = document.querySelector("#login-pin").value;
    const found = state.accounts.find(item => item.id === id);
    if (!found || found.pin !== pin) {
      alert("Wrong PIN.");
      return;
    }
    selectedAccountId = found.id;
    checkWeek();
  }

  if (action === "create-account") {
    const newAccount = {
      id: id(),
      name: document.querySelector("#new-parent").value.trim() || "Parent",
      email: document.querySelector("#new-email").value.trim(),
      pin: document.querySelector("#new-pin").value.trim() || "0000",
      child: {
        name: document.querySelector("#new-child").value.trim() || "Child",
        age: Number(document.querySelector("#new-age").value) || 0
      },
      customBehaviours: [],
      hiddenBehaviours: [],
      rewardLevels: clone(defaultRewards),
      currentWeekStart: todayMonday(),
      weeklyLogs: blankLogs(),
      pastWeeks: []
    };
    state.accounts.push(newAccount);
    selectedAccountId = newAccount.id;
  }

  if (action === "save-notes") {
    account().weeklyLogs[selectedDay].notes = document.querySelector("#notes").value;
  }

  if (action === "add-behaviour") {
    const name = document.querySelector("#custom-name").value.trim();
    if (!name) return;
    const type = document.querySelector("#custom-type").value;
    const rawPoints = Math.abs(Number(document.querySelector("#custom-points").value) || 0);
    account().customBehaviours.push({
      id: id(),
      name,
      category: document.querySelector("#custom-category").value.trim() || "Custom",
      type,
      points: type === "Deduction" ? -rawPoints : rawPoints
    });
  }

  if (action === "add-reward") {
    const name = document.querySelector("#reward-name").value.trim();
    if (!name) return;
    const min = Math.max(0, Number(document.querySelector("#reward-min").value) || 0);
    const max = Math.max(min, Number(document.querySelector("#reward-max").value) || min);
    account().rewardLevels.push({ id: id(), min, max, reward: name });
  }

  if (action === "reset-rewards") {
    account().rewardLevels = clone(defaultRewards);
  }

  if (action === "restore-behaviours") {
    account().hiddenBehaviours = [];
  }

  if (action === "archive-week") {
    archiveWeek();
  }

  if (action === "logout") {
    selectedAccountId = null;
  }

  saveState();
  render();
}

function archiveWeek() {
  const current = account();
  const score = weeklyScore(current);
  const monday = new Date(current.currentWeekStart);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  current.pastWeeks.push({
    id: id(),
    weekStart: current.currentWeekStart,
    weekEnd: sunday.toISOString().slice(0, 10),
    score,
    reward: rewardFor(score, current),
    logs: clone(current.weeklyLogs)
  });
  current.currentWeekStart = todayMonday();
  current.weeklyLogs = blankLogs();
  selectedDay = "monday";
}

function checkWeek() {
  const current = account();
  if (!current) return;
  if (current.currentWeekStart !== todayMonday()) archiveWeek();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").catch(() => {});
}

render();
