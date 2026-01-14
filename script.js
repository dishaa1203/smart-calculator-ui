const current = document.getElementById("current");
const previous = document.getElementById("previous");
const themeToggle = document.getElementById("themeToggle");

let currentValue = "0";
let previousValue = "";
let operator = null;

/* Update display */
function updateDisplay() {
  current.textContent = currentValue;
}

/* Numbers */
document.querySelectorAll("[data-number]").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "." && currentValue.includes(".")) return;
    currentValue = currentValue === "0" ? btn.textContent : currentValue + btn.textContent;
    updateDisplay();
  });
});

/* Operators */
document.querySelectorAll("[data-operator]").forEach(btn => {
  btn.addEventListener("click", () => {
    previousValue = currentValue;
    operator = btn.dataset.operator;
    currentValue = "0";
  });
});

/* Actions */
document.querySelectorAll("[data-action]").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    if (action === "clear") {
      currentValue = "0";
      previousValue = "";
      operator = null;
    }

    if (action === "sign") {
      currentValue = String(Number(currentValue) * -1);
    }

    if (action === "percent") {
      currentValue = String(Number(currentValue) / 100);
    }

    if (action === "equals") {
      calculate();
    }

    updateDisplay();
  });
});

/* Calculate */
function calculate() {
  if (!operator) return;

  const a = Number(previousValue);
  const b = Number(currentValue);
  let result = 0;

  if (operator === "+") result = a + b;
  if (operator === "-") result = a - b;
  if (operator === "*") result = a * b;
  if (operator === "/") result = b === 0 ? "Error" : a / b;

  currentValue = String(result);
  operator = null;
}

/* THEME TOGGLE (WORKING) */
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.dataset.theme === "dark";
  html.dataset.theme = isDark ? "light" : "dark";
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});

/* Load theme */
if (localStorage.getItem("theme")) {
  document.documentElement.dataset.theme = localStorage.getItem("theme");
}

themeToggle.addEventListener("click", () => {
  localStorage.setItem("theme", document.documentElement.dataset.theme);
});

updateDisplay();
