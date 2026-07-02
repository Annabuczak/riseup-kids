const STORAGE_KEY = "riseup-kids-pwa-v1";

function id() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const defaultRewards = [
  { id: id(), min: 0, max: 34, reward: "No weekly reward yet" },
  { id: id(), min: 35, max: 49, reward: "Small treat with Mum" },
  { id: id(), min: 50, max: 69, reward: "Extra screen-time pass" },
  { id: id(), min: 70, max: 89, reward: "Pick a weekend activity" },
  { id: id(), min: 90, max: 100, reward: "Choose a family night" }
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
  sourceName: name,
  name,
  category,
  type,
  points,
  isDefault: true
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

const languages = {
  en: "English",
  pl: "Polski",
  es: "Español"
};

const translations = {
  en: {
    appSubtitle: "Behaviour, XP and rewards",
    login: "Log in",
    account: "Account",
    pin: "PIN",
    createAccount: "Create account",
    createNewAccount: "Create new account",
    parentName: "Parent name",
    parent: "Parent",
    email: "Email",
    createPin: "Create PIN",
    child: "Child",
    childName: "Child name",
    age: "Age",
    accountSuffix: "account",
    tabs: { log: "Log", week: "Week", rewards: "Rewards", more: "More" },
    day: "Day",
    total: "total",
    remove: "Remove",
    nothingRecorded: "Nothing recorded yet.",
    recordBehaviour: "Record behaviour",
    behaviourRecorded: "{behaviour} recorded for {day} ({points} XP).",
    shown: "shown",
    notes: "Notes",
    saveNote: "Save note",
    weeklySummary: "Weekly summary",
    dailyAverage: "Daily average",
    noBehavioursYet: "No behaviours yet",
    currentReward: "Current reward",
    unlocked: "{child} has unlocked a reward.",
    notUnlocked: "{child} has not unlocked a reward yet.",
    addOwnReward: "Add your own reward",
    reward: "Reward",
    minXp: "Min XP",
    maxXp: "Max XP",
    addReward: "Add reward",
    resetDefaults: "Reset defaults",
    rewardLevels: "Reward levels",
    addOwnBehaviour: "Add your own behaviour",
    name: "Name",
    category: "Category",
    type: "Type",
    points: "Points",
    addBehaviour: "Add behaviour",
    behaviourCatalogue: "Behaviour catalogue",
    restoreHidden: "Restore hidden behaviours",
    resetBehaviourEdits: "Reset behaviour edits",
    edit: "Edit",
    hide: "Hide",
    editBehaviour: "Edit behaviour",
    editNamePrompt: "Behaviour name",
    editCategoryPrompt: "Category",
    editTypePrompt: "Type: Bonus or Deduction",
    editPointsPrompt: "Points",
    weekTools: "Week tools",
    archiveWeek: "Save week and start fresh",
    pastWeeks: "Past weeks",
    noPastWeeks: "No past weeks yet.",
    logout: "Log out",
    all: "All",
    bonus: "Bonus",
    deduction: "Deduction",
    deductions: "Deductions",
    wrongPin: "Wrong PIN.",
    custom: "Custom",
    placeholders: {
      reward: "Choose movie night",
      behaviour: "Packed school bag",
      category: "Responsibility"
    },
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday"
    },
    shortDays: {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun"
    }
  },
  pl: {
    appSubtitle: "Zachowanie, XP i nagrody",
    login: "Zaloguj",
    account: "Konto",
    pin: "PIN",
    createAccount: "Utwórz konto",
    createNewAccount: "Utwórz nowe konto",
    parentName: "Imię rodzica",
    parent: "Rodzic",
    email: "Email",
    createPin: "Utwórz PIN",
    child: "Dziecko",
    childName: "Imię dziecka",
    age: "Wiek",
    accountSuffix: "konto",
    tabs: { log: "Dzień", week: "Tydzień", rewards: "Nagrody", more: "Więcej" },
    day: "Dzień",
    total: "razem",
    remove: "Usuń",
    nothingRecorded: "Jeszcze nic nie dodano.",
    recordBehaviour: "Dodaj zachowanie",
    behaviourRecorded: "Dodano {behaviour} na {day} ({points} XP).",
    shown: "widoczne",
    notes: "Notatki",
    saveNote: "Zapisz notatkę",
    weeklySummary: "Podsumowanie tygodnia",
    dailyAverage: "Średnia dzienna",
    noBehavioursYet: "Brak zachowań",
    currentReward: "Aktualna nagroda",
    unlocked: "{child} odblokował nagrodę.",
    notUnlocked: "{child} jeszcze nie odblokował nagrody.",
    addOwnReward: "Dodaj własną nagrodę",
    reward: "Nagroda",
    minXp: "Min XP",
    maxXp: "Max XP",
    addReward: "Dodaj nagrodę",
    resetDefaults: "Przywróć domyślne",
    rewardLevels: "Poziomy nagród",
    addOwnBehaviour: "Dodaj własne zachowanie",
    name: "Nazwa",
    category: "Kategoria",
    type: "Typ",
    points: "Punkty",
    addBehaviour: "Dodaj zachowanie",
    behaviourCatalogue: "Lista zachowań",
    restoreHidden: "Przywróć ukryte zachowania",
    resetBehaviourEdits: "Cofnij zmiany zachowań",
    edit: "Edytuj",
    hide: "Ukryj",
    editBehaviour: "Edytuj zachowanie",
    editNamePrompt: "Nazwa zachowania",
    editCategoryPrompt: "Kategoria",
    editTypePrompt: "Typ: Bonus albo Deduction",
    editPointsPrompt: "Punkty",
    weekTools: "Narzędzia tygodnia",
    archiveWeek: "Zapisz tydzień i zacznij od nowa",
    pastWeeks: "Poprzednie tygodnie",
    noPastWeeks: "Brak zapisanych tygodni.",
    logout: "Wyloguj",
    all: "Wszystkie",
    bonus: "Plus",
    deduction: "Minus",
    deductions: "Minusy",
    wrongPin: "Zły PIN.",
    custom: "Własne",
    placeholders: {
      reward: "Wybiera wieczór filmowy",
      behaviour: "Spakowany plecak",
      category: "Odpowiedzialność"
    },
    days: {
      monday: "Poniedziałek",
      tuesday: "Wtorek",
      wednesday: "Środa",
      thursday: "Czwartek",
      friday: "Piątek",
      saturday: "Sobota",
      sunday: "Niedziela"
    },
    shortDays: {
      monday: "Pon",
      tuesday: "Wt",
      wednesday: "Śr",
      thursday: "Czw",
      friday: "Pt",
      saturday: "Sob",
      sunday: "Nd"
    }
  },
  es: {
    appSubtitle: "Conducta, XP y recompensas",
    login: "Entrar",
    account: "Cuenta",
    pin: "PIN",
    createAccount: "Crear cuenta",
    createNewAccount: "Crear cuenta nueva",
    parentName: "Nombre del padre/madre",
    parent: "Padre/madre",
    email: "Email",
    createPin: "Crear PIN",
    child: "Niño/a",
    childName: "Nombre del niño/a",
    age: "Edad",
    accountSuffix: "cuenta",
    tabs: { log: "Día", week: "Semana", rewards: "Premios", more: "Más" },
    day: "Día",
    total: "total",
    remove: "Quitar",
    nothingRecorded: "Nada registrado todavía.",
    recordBehaviour: "Registrar conducta",
    behaviourRecorded: "{behaviour} registrado para {day} ({points} XP).",
    shown: "visibles",
    notes: "Notas",
    saveNote: "Guardar nota",
    weeklySummary: "Resumen semanal",
    dailyAverage: "Media diaria",
    noBehavioursYet: "Sin conductas todavía",
    currentReward: "Premio actual",
    unlocked: "{child} ha desbloqueado un premio.",
    notUnlocked: "{child} todavía no ha desbloqueado un premio.",
    addOwnReward: "Añade tu propio premio",
    reward: "Premio",
    minXp: "XP mín.",
    maxXp: "XP máx.",
    addReward: "Añadir premio",
    resetDefaults: "Restaurar",
    rewardLevels: "Niveles de premios",
    addOwnBehaviour: "Añade tu propia conducta",
    name: "Nombre",
    category: "Categoría",
    type: "Tipo",
    points: "Puntos",
    addBehaviour: "Añadir conducta",
    behaviourCatalogue: "Catálogo de conductas",
    restoreHidden: "Restaurar conductas ocultas",
    resetBehaviourEdits: "Restaurar cambios",
    edit: "Editar",
    hide: "Ocultar",
    editBehaviour: "Editar conducta",
    editNamePrompt: "Nombre de la conducta",
    editCategoryPrompt: "Categoría",
    editTypePrompt: "Tipo: Bonus o Deduction",
    editPointsPrompt: "Puntos",
    weekTools: "Herramientas de semana",
    archiveWeek: "Guardar semana y empezar de nuevo",
    pastWeeks: "Semanas anteriores",
    noPastWeeks: "No hay semanas guardadas.",
    logout: "Cerrar sesión",
    all: "Todo",
    bonus: "Bonus",
    deduction: "Descuento",
    deductions: "Descuentos",
    wrongPin: "PIN incorrecto.",
    custom: "Personalizado",
    placeholders: {
      reward: "Elegir noche de película",
      behaviour: "Mochila preparada",
      category: "Responsabilidad"
    },
    days: {
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
      sunday: "Domingo"
    },
    shortDays: {
      monday: "Lun",
      tuesday: "Mar",
      wednesday: "Mié",
      thursday: "Jue",
      friday: "Vie",
      saturday: "Sáb",
      sunday: "Dom"
    }
  }
};

const translatedText = {
  "No weekly reward yet": {
    pl: "Jeszcze bez nagrody tygodniowej",
    es: "Sin premio semanal todavía"
  },
  "Small treat with Mum": {
    pl: "Mała przyjemność z Mamą",
    es: "Pequeño capricho con mamá"
  },
  "Extra screen-time pass": {
    pl: "Bonusowy czas ekranowy",
    es: "Pase de tiempo extra de pantalla"
  },
  "Pick a weekend activity": {
    pl: "Wybiera aktywność na weekend",
    es: "Elegir una actividad del finde"
  },
  "Choose a family night": {
    pl: "Wybiera rodzinny wieczór",
    es: "Elegir una noche familiar"
  },
  "Responsibility": { pl: "Odpowiedzialność", es: "Responsabilidad" },
  "Kindness": { pl: "Życzliwość", es: "Amabilidad" },
  "Self-control": { pl: "Samokontrola", es: "Autocontrol" },
  "Honesty": { pl: "Szczerość", es: "Honestidad" },
  "Respect": { pl: "Szacunek", es: "Respeto" },
  "Bed made": { pl: "Pościelone łóżko", es: "Cama hecha" },
  "Bedroom tidy": { pl: "Pokój posprzątany", es: "Habitación ordenada" },
  "Buddy walked": { pl: "Buddy wyprowadzony", es: "Paseó a Buddy" },
  "Helped Mum without asking": { pl: "Pomógł Mamie bez proszenia", es: "Ayudó a mamá sin pedir" },
  "Accepted 'No' first time": { pl: "Przyjął 'nie' za pierwszym razem", es: "Aceptó un 'no' a la primera" },
  "Good sportsmanship": { pl: "Dobre zachowanie w grze", es: "Buen espíritu deportivo" },
  "Honest about mistake": { pl: "Szczery po błędzie", es: "Honesto sobre un error" },
  "Good behaviour": { pl: "Dobre zachowanie", es: "Buena conducta" },
  "Apologised sincerely": { pl: "Szczerze przeprosił", es: "Pidió perdón sinceramente" },
  "Included another child": { pl: "Włączył inne dziecko do zabawy", es: "Incluyó a otro niño" },
  "Controlled frustration": { pl: "Opanował frustrację", es: "Controló la frustración" },
  "Got up without reminders": { pl: "Wstał bez przypominania", es: "Se levantó sin recordatorios" },
  "Bed left unmade": { pl: "Niepościelone łóżko", es: "Cama sin hacer" },
  "Bedroom needs a reset": { pl: "Pokój wymaga ogarnięcia", es: "La habitación necesita orden" },
  "Clothes left on bathroom floor": { pl: "Ubrania na podłodze w łazience", es: "Ropa en el suelo del baño" },
  "Shoes left in hallway": { pl: "Buty zostawione w korytarzu", es: "Zapatos en el pasillo" },
  "Plate left upstairs": { pl: "Talerz zostawiony na górze", es: "Plato dejado arriba" },
  "Table area left messy": { pl: "Bałagan przy stole", es: "Zona de mesa desordenada" },
  "Buddy walk missed": { pl: "Spacer Buddy'ego pominięty", es: "Paseo de Buddy pendiente" },
  "Chore not finished": { pl: "Obowiązek niedokończony", es: "Tarea sin terminar" },
  "Spoke disrespectfully": { pl: "Odezwał się bez szacunku", es: "Habló con falta de respeto" },
  "Used rude language": { pl: "Użył brzydkich słów", es: "Usó lenguaje grosero" },
  "Door slammed": { pl: "Trzaśnięcie drzwiami", es: "Portazo" },
  "Instruction not followed": { pl: "Nie wykonał polecenia", es: "No siguió la instrucción" },
  "Asked again after answer": { pl: "Pytał dalej po odpowiedzi", es: "Preguntó otra vez tras la respuesta" },
  "Kept asking for YouTube": { pl: "Ciągle prosił o YouTube", es: "Insistió con YouTube" },
  "Kept asking for phone": { pl: "Ciągle prosił o telefon", es: "Insistió con el móvil" },
  "Kept asking for computer": { pl: "Ciągle prosił o komputer", es: "Insistió con el ordenador" },
  "Asked for treats after refusing chores": { pl: "Prosił o słodycze po odmowie obowiązków", es: "Pidió premios tras rechazar tareas" },
  "Found winning or losing hard": { pl: "Trudno przyjął wygraną lub przegraną", es: "Le costó ganar o perder" },
  "Used threatening words": { pl: "Użył groźnych słów", es: "Usó palabras amenazantes" },
  "Used unkind words": { pl: "Użył niemiłych słów", es: "Usó palabras poco amables" },
  "Took frustration out on Buddy": { pl: "Wyładował frustrację na Buddym", es: "Descargó frustración con Buddy" },
  "Apology refused": { pl: "Odmówił przeprosin", es: "Se negó a pedir perdón" }
};

const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

let state = loadState();
let selectedAccountId = state.selectedAccountId || null;
let selectedLanguage = state.language || "en";
let selectedTab = "log";
let selectedDay = todayDay();
let behaviourFilter = "All";
let catalogueFilter = "All";
let toastMessage = "";
let toastTimer = null;

function todayMonday() {
  const today = new Date();
  const day = today.getDay() || 7;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - day + 1);
  return monday.toISOString().slice(0, 10);
}

function todayDay() {
  return weekDays[(new Date().getDay() || 7) - 1];
}

function blankLogs() {
  return weekDays.reduce((logs, day) => {
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
    behaviourOverrides: {},
    rewardLevels: clone(defaultRewards),
    currentWeekStart: todayMonday(),
    weeklyLogs: blankLogs(),
    pastWeeks: []
  };
}

function loadState() {
  const fallback = { accounts: [defaultAccount()], selectedAccountId: null, language: "en" };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.accounts)) return fallback;
    saved.language = saved.language || "en";
    saved.accounts = saved.accounts.map(migrateAccount);
    return saved;
  } catch {
    return fallback;
  }
}

function migrateAccount(item) {
  const rewardLevels = Array.isArray(item.rewardLevels) ? item.rewardLevels : clone(defaultRewards);
  return {
    ...item,
    customBehaviours: Array.isArray(item.customBehaviours) ? item.customBehaviours : [],
    hiddenBehaviours: Array.isArray(item.hiddenBehaviours) ? item.hiddenBehaviours : [],
    behaviourOverrides: item.behaviourOverrides && typeof item.behaviourOverrides === "object" ? item.behaviourOverrides : {},
    rewardLevels: usesOldDefaultRewards(rewardLevels) ? clone(defaultRewards) : rewardLevels,
    weeklyLogs: item.weeklyLogs || blankLogs(),
    pastWeeks: Array.isArray(item.pastWeeks) ? item.pastWeeks : []
  };
}

function usesOldDefaultRewards(levels) {
  const oldMins = [0, 8, 14, 22, 30];
  const oldRewards = [
    "No weekly reward yet",
    "Small treat with Mum",
    "Extra screen-time pass",
    "Pick a weekend activity",
    "Choose a family night"
  ];

  return levels.length === oldMins.length && levels.every((level, index) => {
    return Number(level.min) === oldMins[index] && level.reward === oldRewards[index];
  });
}

function saveState() {
  state.selectedAccountId = selectedAccountId;
  state.language = selectedLanguage;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function t(key) {
  return translations[selectedLanguage]?.[key] ?? translations.en[key] ?? key;
}

function nestedT(group, key) {
  return translations[selectedLanguage]?.[group]?.[key] ?? translations.en[group]?.[key] ?? key;
}

function translated(value) {
  return translatedText[value]?.[selectedLanguage] || value;
}

function languagePicker() {
  return `
    <label class="language-picker">
      <span class="sr-only">Language</span>
      <select id="language-select" aria-label="Language">
        ${Object.entries(languages).map(([code, label]) => `
          <option value="${code}" ${selectedLanguage === code ? "selected" : ""}>${esc(label)}</option>
        `).join("")}
      </select>
    </label>
  `;
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
  const overrides = (current && current.behaviourOverrides) || {};
  const defaults = defaultBehaviours.map(behaviour => {
    const sourceName = behaviour.sourceName || behaviour.name;
    return {
      ...behaviour,
      ...(overrides[normalise(sourceName)] || {}),
      sourceName,
      isDefault: true
    };
  });
  const custom = ((current && current.customBehaviours) || []).map(behaviour => ({
    ...behaviour,
    sourceName: behaviour.sourceName || behaviour.name,
    isDefault: false
  }));
  return [...defaults, ...custom];
}

function visibleBehaviours() {
  const current = account();
  const hidden = new Set(((current && current.hiddenBehaviours) || []).map(normalise));
  const seen = new Set();

  return behaviourLibrary().filter(behaviour => {
    const key = normalise(behaviour.sourceName || behaviour.name);
    const displayKey = normalise(behaviour.name);
    if (hidden.has(key) || hidden.has(displayKey) || seen.has(displayKey)) return false;
    seen.add(displayKey);
    return true;
  });
}

function pointsFor(name) {
  const key = normalise(name);
  const found = behaviourLibrary().find(behaviour => {
    return normalise(behaviour.name) === key || normalise(behaviour.sourceName) === key;
  });
  return found ? found.points : 0;
}

function behaviourForName(name) {
  const key = normalise(name);
  return behaviourLibrary().find(behaviour => {
    return normalise(behaviour.name) === key || normalise(behaviour.sourceName) === key;
  });
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

function displayBehaviourName(name) {
  const behaviour = behaviourForName(name);
  if (behaviour) return translated(behaviour.name);
  return translated(name);
}

function displayCategory(category) {
  return translated(category);
}

function displayReward(reward) {
  return translated(reward);
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
  document.documentElement.lang = selectedLanguage;
  const root = document.querySelector("#app");
  const current = account();
  root.innerHTML = `${current ? appView(current) : loginView()}${toastView()}`;
  bindEvents();
}

function toastView() {
  return toastMessage ? `<div class="toast" role="status">${esc(toastMessage)}</div>` : "";
}

function loginView() {
  return `
    <main class="shell">
      <section class="topbar">
        <div class="brand">
          <div class="brand-mark">RU</div>
          <div class="title-stack">
            <h1>RiseUp Kids</h1>
            <p>${t("appSubtitle")}</p>
          </div>
        </div>
        ${languagePicker()}
      </section>

      <section class="card">
        <h2>${t("login")}</h2>
        <label class="field">
          <span>${t("account")}</span>
          <select id="login-account">
            ${state.accounts.map(item => `<option value="${item.id}">${esc(item.name)} (${esc(item.child.name)})</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>${t("pin")}</span>
          <input id="login-pin" type="password" inputmode="numeric" placeholder="1234">
        </label>
        <button class="primary" data-action="login">${t("login")}</button>
      </section>

      <section class="card">
        <h2>${t("createAccount")}</h2>
        <label class="field"><span>${t("parentName")}</span><input id="new-parent" placeholder="${t("parent")}"></label>
        <label class="field"><span>${t("email")}</span><input id="new-email" type="email" placeholder="parent@email.com"></label>
        <label class="field"><span>${t("pin")}</span><input id="new-pin" type="password" inputmode="numeric" placeholder="${t("createPin")}"></label>
        <div class="grid-2">
          <label class="field"><span>${t("child")}</span><input id="new-child" placeholder="${t("childName")}"></label>
          <label class="field"><span>${t("age")}</span><input id="new-age" inputmode="numeric" placeholder="10"></label>
        </div>
        <button class="secondary" data-action="create-account">${t("createNewAccount")}</button>
      </section>
    </main>
  `;
}

function appView(current) {
  const score = weeklyScore(current);
  const currentReward = displayReward(rewardFor(score, current));
  return `
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">RU</div>
          <div class="title-stack">
            <h1>${esc(current.child.name)}</h1>
            <div class="profile-line">
              <p>${esc(current.name)} ${t("accountSuffix")}</p>
              <button class="text-button" data-action="logout">${t("logout")}</button>
            </div>
          </div>
        </div>
        <div class="header-actions">
          ${languagePicker()}
          <div class="score-card">
            <div class="xp-pill">${score} XP</div>
            <div class="reward-chip">
              <span>${t("currentReward")}</span>
              <strong>${esc(currentReward)}</strong>
            </div>
          </div>
        </div>
      </header>
      ${tabView(current)}
    </main>
    <nav class="tabs">
      ${["log", "week", "rewards", "more"].map(tab => `
        <button class="tab ${selectedTab === tab ? "active" : ""}" data-tab="${tab}">
          ${nestedT("tabs", tab)}
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
        <h2>${t("day")}</h2>
        <span class="muted small">${nestedT("days", selectedDay)}</span>
      </div>
      <div class="day-strip">
        ${Object.keys(current.weeklyLogs).map(day => `
          <button class="day-button ${day === selectedDay ? "active" : ""}" data-day="${day}">
            <strong>${nestedT("shortDays", day)}</strong>
            <span>${sign(dayScore(day))}</span>
          </button>
        `).join("")}
      </div>
    </section>

    <section class="card">
      <div class="section-row">
        <h2>${nestedT("days", selectedDay)} ${t("total")}</h2>
        <strong>${sign(dayScore(selectedDay))}</strong>
      </div>
      <div class="plain-list">
        ${log.behaviours.length ? log.behaviours.map((name, index) => `
          <div class="log-row">
            <div>
              <strong>${esc(displayBehaviourName(name))}</strong>
              <span class="muted small">${sign(pointsFor(name))} XP</span>
            </div>
            <button class="icon-button" data-remove-log="${index}" aria-label="${t("remove")}">x</button>
          </div>
        `).join("") : `<div class="empty">${t("nothingRecorded")}</div>`}
      </div>
    </section>

    <section class="card">
      <div class="section-row">
        <h2>${t("recordBehaviour")}</h2>
        <span class="muted small">${shown.length} ${t("shown")}</span>
      </div>
      ${segments("behaviour-filter", behaviourFilter)}
      <div class="behaviour-list">
        ${shown.map(behaviour => behaviourButton(behaviour, "record")).join("")}
      </div>
    </section>

    <section class="card">
      <h2>${t("notes")}</h2>
      <textarea id="notes">${esc(log.notes)}</textarea>
      <button class="primary" data-action="save-notes">${t("saveNote")}</button>
    </section>
  `;
}

function weekView(current) {
  const score = weeklyScore(current);
  return `
    <section class="card">
      <h2>${t("weeklySummary")}</h2>
      <div class="xp-pill">${score} XP</div>
      <p class="muted">${esc(displayReward(rewardFor(score, current)))}</p>
      <p class="muted">${t("dailyAverage")}: ${(score / 7).toFixed(1)} XP</p>
    </section>
    ${Object.keys(current.weeklyLogs).map(day => {
      const scoreForDay = dayScore(day);
      const behaviours = current.weeklyLogs[day].behaviours;
      return `
        <section class="card">
          <div class="section-row">
            <h2>${nestedT("days", day)}</h2>
            <strong>${sign(scoreForDay)}</strong>
          </div>
          <div class="progress"><div style="width:${Math.min(100, Math.max(0, scoreForDay) / 8 * 100)}%"></div></div>
          <p class="muted">${behaviours.length ? esc(behaviours.map(displayBehaviourName).join(", ")) : t("noBehavioursYet")}</p>
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
      <h2>${t("currentReward")}</h2>
      <p><strong>${esc(displayReward(rewardFor(score, current)))}</strong></p>
      <p class="muted">${(unlocked ? t("unlocked") : t("notUnlocked")).replace("{child}", esc(current.child.name))}</p>
    </section>

    <section class="card">
      <h2>${t("addOwnReward")}</h2>
      <label class="field"><span>${t("reward")}</span><input id="reward-name" placeholder="${nestedT("placeholders", "reward")}"></label>
      <div class="grid-2">
        <label class="field"><span>${t("minXp")}</span><input id="reward-min" inputmode="numeric" placeholder="8"></label>
        <label class="field"><span>${t("maxXp")}</span><input id="reward-max" inputmode="numeric" placeholder="13"></label>
      </div>
      <div class="toolbar">
        <button class="primary" data-action="add-reward">${t("addReward")}</button>
        <button class="secondary" data-action="reset-rewards">${t("resetDefaults")}</button>
      </div>
    </section>

    <section class="card">
      <h2>${t("rewardLevels")}</h2>
      <div class="plain-list">
        ${[...(current.rewardLevels || defaultRewards)].sort((a, b) => a.min - b.min).map(level => `
          <div class="reward-row">
            <div>
              <strong>${esc(displayReward(level.reward))}</strong>
              <span class="muted small">${level.min}-${level.max} XP</span>
            </div>
            ${level.min > 0 ? `<button class="icon-button" data-remove-reward="${level.id}" aria-label="${t("remove")}">x</button>` : ""}
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
      <h2>${t("addOwnBehaviour")}</h2>
      <label class="field"><span>${t("name")}</span><input id="custom-name" placeholder="${nestedT("placeholders", "behaviour")}"></label>
      <label class="field"><span>${t("category")}</span><input id="custom-category" placeholder="${nestedT("placeholders", "category")}"></label>
      <div class="grid-2">
        <label class="field">
          <span>${t("type")}</span>
          <select id="custom-type">
            <option value="Bonus">${t("bonus")}</option>
            <option value="Deduction">${t("deduction")}</option>
          </select>
        </label>
        <label class="field"><span>${t("points")}</span><input id="custom-points" inputmode="numeric" placeholder="1"></label>
      </div>
      <button class="primary" data-action="add-behaviour">${t("addBehaviour")}</button>
    </section>

    <section class="card">
      <div class="section-row">
        <h2>${t("behaviourCatalogue")}</h2>
        <span class="muted small">${shown.length} ${t("shown")}</span>
      </div>
      ${segments("catalogue-filter", catalogueFilter)}
      <div class="behaviour-list">
        ${shown.map(behaviour => behaviourButton(behaviour, "manage")).join("")}
      </div>
      <div class="toolbar">
        <button class="secondary" data-action="restore-behaviours">${t("restoreHidden")}</button>
        <button class="secondary" data-action="reset-behaviour-edits">${t("resetBehaviourEdits")}</button>
      </div>
    </section>

    <section class="card">
      <h2>${t("weekTools")}</h2>
      <button class="secondary" data-action="archive-week">${t("archiveWeek")}</button>
    </section>

    <section class="card">
      <h2>${t("pastWeeks")}</h2>
      <div class="plain-list">
        ${current.pastWeeks.length ? current.pastWeeks.map(week => `
          <div class="reward-row">
            <div>
              <strong>${esc(week.weekStart)} to ${esc(week.weekEnd)}</strong>
              <span class="muted small">${week.score} XP - ${esc(displayReward(week.reward))}</span>
            </div>
          </div>
        `).join("") : `<div class="empty">${t("noPastWeeks")}</div>`}
      </div>
    </section>

    <section class="card">
      <button class="danger" data-action="logout">${t("logout")}</button>
    </section>
  `;
}

function segments(kind, value) {
  return `
    <div class="segments" data-segments="${kind}">
      ${["All", "Bonus", "Deduction"].map(item => `
        <button class="${value === item ? "active" : ""}" data-value="${item}">
          ${item === "All" ? t("all") : item === "Bonus" ? t("bonus") : t("deductions")}
        </button>
      `).join("")}
    </div>
  `;
}

function behaviourButton(behaviour, mode) {
  if (mode === "manage") {
    return `
      <div class="behaviour-row manage-row">
        <div>
          <strong>${esc(displayBehaviourName(behaviour.name))}</strong>
          <span class="muted small">${esc(displayCategory(behaviour.category))} · ${sign(behaviour.points)} XP</span>
        </div>
        <div class="behaviour-actions">
          <button class="mini-button" data-edit="${behaviour.id}">${t("edit")}</button>
          <button class="mini-button danger-mini" data-hide="${behaviour.id}">${t("hide")}</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="behaviour-row">
      <button class="behaviour-row" data-${mode === "record" ? "record" : "hide"}="${behaviour.id}">
        <div>
          <strong>${esc(displayBehaviourName(behaviour.name))}</strong>
          <span class="muted small">${esc(displayCategory(behaviour.category))}</span>
        </div>
        <span class="point ${behaviour.points < 0 ? "negative" : ""}">${sign(behaviour.points)}</span>
      </button>
    </div>
  `;
}

function bindEvents() {
  const languageSelect = document.querySelector("#language-select");
  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      selectedLanguage = languageSelect.value;
      saveState();
      render();
    });
  }

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
      account().weeklyLogs[selectedDay].behaviours.push(found.sourceName || found.name);
      saveState();
      showToast(t("behaviourRecorded")
        .replace("{behaviour}", displayBehaviourName(found.name))
        .replace("{day}", nestedT("days", selectedDay))
        .replace("{points}", sign(found.points)));
    });
  });

  document.querySelectorAll("[data-hide]").forEach(button => {
    button.addEventListener("click", () => {
      const found = visibleBehaviours().find(item => item.id === button.dataset.hide);
      if (!found) return;
      const current = account();
      current.hiddenBehaviours = current.hiddenBehaviours || [];
      current.hiddenBehaviours.push(found.sourceName || found.name);
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-edit]").forEach(button => {
    button.addEventListener("click", () => {
      const found = visibleBehaviours().find(item => item.id === button.dataset.edit);
      if (!found) return;
      editBehaviour(found);
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
      alert(t("wrongPin"));
      return;
    }
    selectedAccountId = found.id;
    selectedDay = todayDay();
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
      behaviourOverrides: {},
      rewardLevels: clone(defaultRewards),
      currentWeekStart: todayMonday(),
      weeklyLogs: blankLogs(),
      pastWeeks: []
    };
    state.accounts.push(newAccount);
    selectedAccountId = newAccount.id;
    selectedDay = todayDay();
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
      category: document.querySelector("#custom-category").value.trim() || t("custom"),
      type,
      points: type === "Deduction" ? -rawPoints : rawPoints,
      sourceName: name
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

  if (action === "reset-behaviour-edits") {
    account().behaviourOverrides = {};
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

function editBehaviour(behaviour) {
  const current = account();
  const name = prompt(t("editNamePrompt"), behaviour.name);
  if (name === null || !name.trim()) return;

  const category = prompt(t("editCategoryPrompt"), behaviour.category);
  if (category === null) return;

  const typeInput = prompt(t("editTypePrompt"), behaviour.type);
  if (typeInput === null) return;
  const type = /^d/i.test(typeInput.trim()) ? "Deduction" : "Bonus";

  const pointsInput = prompt(t("editPointsPrompt"), String(Math.abs(behaviour.points)));
  if (pointsInput === null) return;
  const rawPoints = Math.abs(Number(pointsInput) || Math.abs(behaviour.points));

  const updated = {
    name: name.trim(),
    category: category.trim() || t("custom"),
    type,
    points: type === "Deduction" ? -rawPoints : rawPoints
  };

  if (behaviour.isDefault) {
    current.behaviourOverrides = current.behaviourOverrides || {};
    current.behaviourOverrides[normalise(behaviour.sourceName || behaviour.name)] = updated;
  } else {
    current.customBehaviours = (current.customBehaviours || []).map(item => {
      if (item.id !== behaviour.id) return item;
      return { ...item, ...updated, sourceName: item.sourceName || item.name };
    });
  }

  saveState();
  render();
}

function showToast(message) {
  toastMessage = message;
  if (toastTimer) clearTimeout(toastTimer);
  render();
  toastTimer = setTimeout(() => {
    toastMessage = "";
    render();
  }, 2400);
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
  selectedDay = todayDay();
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
