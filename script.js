// Toggle Theme
const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () =>
  toggleElement.classList.toggle("themes__toggle--isActive");

const clickEnter = (event) => event.key === "Enter" && toggleDarkTheme();

toggleElement.addEventListener("click", toggleDarkTheme);
toggleElement.addEventListener("keydown", clickEnter);

// Logic For Calculation

let currentNumber = "";
let storedNumber = "";
let operation = "";

const calcResult = document.querySelector(".calc__result");
const calcKey = document.querySelectorAll(".calc__key");

const updateScreen = (value) => {
  calcResult.textContent = !value ? "0" : value;
};

// Click Sound
const audio = new Audio("./62C888piCBcW.mp3");

// Reset Button Function
const resetButton = () => {
  currentNumber = "";
  storedNumber = "";
  operation = "";
  updateScreen();
};

// Delete Button Function
const deletetButton = () => {
  if (currentNumber) {
    currentNumber = currentNumber.slice(0, -1);
    updateScreen(currentNumber);
  }
};

// Execute Operation
const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
    }
    currentNumber = "";
    updateScreen(storedNumber);
  }
};

const operationBtnHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;
  if (!storedNumber && currentNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
  }
  if (currentNumber) {
    executeOperation();
  }
};

// operation Button Handler
const operationButton = (value) => {
  switch (value) {
    case "c":
      resetButton();
      break;
    case "Backspace":
      deletetButton();
      break;
    case "Enter":
      executeOperation();
      break;
    default:
      operationBtnHandler(value);
  }
};

// Number Button Handler
const numBtnHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  currentNumber += value;
  updateScreen(currentNumber);
};

calcKey.forEach((key) =>
  key.addEventListener("click", () => {
    audio.play();
    if (key.dataset.type === "number") {
      numBtnHandler(key.dataset.value);
    } else if (key.dataset.type === "operation") {
      operationButton(key.dataset.value);
    }
  })
);
const availableNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const availableOperations = ["+", "-", "*", "/"];

// Keyboard
window.addEventListener("keydown", (event) => {
  audio.play();
  if (availableNumbers.includes(event.key)) {
    numBtnHandler(event.key);
  } else if (availableOperations.includes(event.key)) {
    operationButton(event.key);
  } else if (event.key === "Enter") {
    executeOperation();
  } else if (event.key === "Backspace") {
    deletetButton();
  } else if (event.key === "c") {
    resetButton();
  } else return;
  clickHover(event.key);
});

// Hover
const clickHover = (event) => {
  const currentKey = document.querySelector(
    `.calc__key[data-value='${event}']`
  );
  currentKey.classList.add("hover");
  setTimeout(() => currentKey.classList.remove("hover"), 100);
};
