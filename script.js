let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let money = 0;
let level = 1;
let speed = 2;
let x = 0;

let rickshawImg = new Image();
rickshawImg.src = "rickshaw.png"; // make sure the image is in the same folder

rickshawImg.onload = () => {
  setInterval(updateGame, 30); // game loop
};

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background road
  ctx.fillStyle = "#444";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  // Rickshaw
  ctx.drawImage(rickshawImg, x, canvas.height - 150, 100, 100);

  x += speed;
  if (x > canvas.width) {
    x = -100; // loop around
    earnMoney();
  }
}

function earnMoney() {
  money += speed * 5;
  document.getElementById("money").textContent = money;
}

function upgrade() {
  if (money >= 100) {
    money -= 100;
    level++;
    speed += 1;
    document.getElementById("money").textContent = money;
    document.getElementById("level").textContent = level;
    document.getElementById("speed").textContent = speed;
  } else {
    alert("Not enough money to upgrade!");
  }
}
