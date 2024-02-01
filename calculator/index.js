const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const screen = document.querySelector('#screen');
const special = document.querySelectorAll('.special');
const decimal = document.querySelector('#decimal');
/* const percent = document.querySelector('.percent');
const invert = document.querySelector('.invert'); */



numbers.forEach(btn => btn.addEventListener('click', getInput));
operators.forEach(btn => btn.addEventListener('click', getArg));
special.forEach(btn => btn.addEventListener('click', getInput))
decimal.addEventListener('click', checkFloat);
/* percent.addEventListener('click', makePercent);
invert.addEventListener('click', makeInvert); */
equals.addEventListener('click', solve);
clear.addEventListener('click', reset);

const equation = {
  a: 0,
  b: 0,
  result: null,
  operator: ''
}


function getInput(e) {
  let input = String(e.target.id);

  e.target.classList.contains('special') ? updateScreen2(make(e))
    : updateScreen(input);
}

function updateScreen(input) {
  let val = screen.textContent;
  screen.textContent.length > 6 ? null
    : val === equation.result ? screen.textContent = `${val}${input}`
      : val == equation.a || val == equation.result ? screen.textContent = input
        : screen.textContent = `${val}${input}`;
}

function updateScreen2(input) {
  screen.textContent = input
}

function getArg(e) {

  if (equation.operator != '' || equation.operator == e.target.id) {
    solve();
  }

  equation.a = parseFloat(screen.textContent);
  equation.operator = e.target.id;
  console.log(equation);

}

function solve() {

  equation.b == 0 ? equation.b = parseFloat(screen.textContent)
    : equation.a = parseFloat(screen.textContent);

  equation.result = operate(equation.operator, equation.a, equation.b);
  screen.textContent = equation.result;

  clearMem();
  console.log(equation);

}

function reset() {
  clearScreen();
  clearMem();
}

function clearScreen() {
  screen.textContent = '0';
}

function clearMem() {
  equation.a = 0;
  equation.b = 0;
  //equation.result = 0;
  equation.operator = '';
}

function make(e) {
  return e.target.id === 'invert' ? makeInvert()
    : e.target.id === 'percent' ? makePercent()
      : null;
}

function checkFloat() {
  // If '.' is present in screen text content disable '.'
  let val = screen.textContent;
  val.includes('.') ? null
    : updateScreen('.');
}

function makePercent() {
  let val = parseFloat(screen.textContent);
  return val / 100;
}

function makeInvert() {
  let val = parseFloat(screen.textContent);
  return val - (val * 2);
}

// Operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  return operator === '+' ? add(a, b)
    : operator === '-' ? subtract(a, b)
      : operator === '*' ? multiply(a, b)
        : operator === '/' ? divide(a, b)
          : b;
}
