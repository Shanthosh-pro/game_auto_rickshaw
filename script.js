let money = 0;
let level = 1;
let income = 10;

function drive() {
  money += income;
  updateDisplay();
}

function upgrade() {
  if (money >= 100) {
    money -= 100;
    level++;
    income += 10;
    updateDisplay();
  } else {
    alert("Not enough money to upgrade!");
  }
}

function updateDisplay() {
  document.getElementById("money").textContent = money;
  document.getElementById("level").textContent = level;
  document.getElementById("income").textContent = income;
}
