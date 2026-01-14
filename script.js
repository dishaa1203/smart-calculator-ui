const current = document.getElementById("current");
const previous = document.getElementById("previous");
const buttons = document.querySelectorAll("button");
const themeToggle = document.getElementById("themeToggle");

let currentValue = "0";
let previousValue = "";
let operator = null;

/* CALCULATOR LOGIC */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) appendNumber(value);
    if (btn.classList.contains("operator")) chooseOperator(value);
    if (action === "equals") calculate();
    if (action === "clear") reset();
    if (action === "delete") deleteLast();
  });
});

function appendNumber(num) {
  if (num === "." && currentValue.includes(".")) return;
  currentValue = currentValue === "0" ? num : currentValue + num;
  updateDisplay();
}

function chooseOperator(op) {
  if (operator) calculate();
  operator = op;
  previousValue = currentValue;
  currentValue = "0";
  updateDisplay();
}

function calculate() {
  if (!operator) return;
  const result = eval(`${previousValue}${operator}${currentValue}`);
  currentValue = String(result);
  operator = null;
  previousValue = "";
  updateDisplay();
}

function reset() {
  currentValue = "0";
  previousValue = "";
  operator = null;
  updateDisplay();
}

function deleteLast() {
  currentValue =
    currentValue.length > 1
      ? currentValue.slice(0, -1)
      : "0";
  updateDisplay();
}

function updateDisplay() {
  current.textContent = currentValue;
  previous.textContent = operator
    ? `${previousValue} ${operator}`
    : "";
}

/* DARK MODE */
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.dataset.theme === "dark";

  html.dataset.theme = isDark ? "light" : "dark";
  themeToggle.textContent = isDark
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";

  localStorage.setItem("theme", html.dataset.theme);
});

/* LOAD THEME */
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent =
    savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", e => {
  if (/\d|\./.test(e.key)) appendNumber(e.key);
  if ("+-*/".includes(e.key)) chooseOperator(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Escape") reset();
});
