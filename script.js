let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let rickshawImg = new Image();
rickshawImg.src = "rickshaw.png"; // Download a PNG and put it in the same folder

let obstacleImg = new Image();
obstacleImg.src = "obstacle.png"; // Use any small PNG image (e.g. cone, barrier)

let x = 50;
let y = 300;
let hearts = 3;
let distance = 0;
let level = 1;
let goal = 20;
let gameInterval;
let obstacles = [];

function startGame() {
  resetGame();
  gameInterval = setInterval(updateGame, 50);
}

function resetGame() {
  x = 50;
  y = 300;
  hearts = 3;
  distance = 0;
  level = 1;
  goal = 20;
  obstacles = [];
  updateUI();
}

function updateUI() {
  document.getElementById("level").textContent = level;
  document.getElementById("distance").textContent = Math.floor(distance);
  document.getElementById("goal").textContent = goal;
  document.getElementById("hearts").textContent = hearts;
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move forward
  distance += 0.1;
  updateUI();

  // Advance level
  if (distance >= goal) {
    if (level === 1) { level = 2; goal = 40; }
    else if (level === 2) { level = 3; goal = 89; }
    else {
      clearInterval(gameInterval);
      alert("🎉 You completed all levels!");
      return;
    }
    distance = 0;
    obstacles = [];
  }

  // Draw Rickshaw
  ctx.drawImage(rickshawImg, x, y, 80, 80);

  // Generate obstacles
  if (Math.random() < 0.03) {
    obstacles.push({ x: 800, y: 300 });
  }

  // Move and draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 5;
    ctx.drawImage(obstacleImg, obstacles[i].x, obstacles[i].y, 50, 50);

    // Collision check
    if (
      obstacles[i].x < x + 80 &&
      obstacles[i].x + 50 > x &&
      hearts > 0
    ) {
      hearts--;
      obstacles.splice(i, 1);
      updateUI();
      if (hearts === 0) {
        clearInterval(gameInterval);
        alert("💥 Game Over! Try Again.");
        return;
      }
    }
  }
}

