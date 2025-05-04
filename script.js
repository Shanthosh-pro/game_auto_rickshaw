const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const rickshawImg = new Image();
rickshawImg.src = "rickshaw.png";  // Add your own Rickshaw image here

let rickshaw = {
  x: 100,
  y: 300,
  width: 80,
  height: 80,
  speed: 5,
};

let obstacles = [];
let isGameRunning = false;
let score = 0;

let keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  isGameRunning = true;
  score = 0;
  rickshaw.x = 100;
  rickshaw.y = 300;
  obstacles = [];
  gameLoop();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Road
  ctx.fillStyle = "#444";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  // Move Rickshaw
  if (keys["ArrowRight"] && rickshaw.x < canvas.width - rickshaw.width) {
    rickshaw.x += rickshaw.speed;
  }
  if (keys["ArrowLeft"] && rickshaw.x > 0) {
    rickshaw.x -= rickshaw.speed;
  }
  if (keys["ArrowUp"] && rickshaw.y > 0) {
    rickshaw.y -= rickshaw.speed;
  }
  if (keys["ArrowDown"] && rickshaw.y < canvas.height - rickshaw.height) {
    rickshaw.y += rickshaw.speed;
  }

  ctx.drawImage(rickshawImg, rickshaw.x, rickshaw.y, rickshaw.width, rickshaw.height);

  // Update obstacles
  if (Math.random() < 0.03) {
    let obstacleX = Math.random() * canvas.width;
    obstacles.push({ x: obstacleX, y: 0 });
  }

  // Move obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 4; // speed of obstacles

    // Draw obstacles
    ctx.fillStyle = "red";
    ctx.fillRect(obstacles[i].x, obstacles[i].y, 50, 50);

    // Check collision
    if (
      rickshaw.x < obstacles[i].x + 50 &&
      rickshaw.x + rickshaw.width > obstacles[i].x &&
      rickshaw.y < obstacles[i].y + 50 &&
      rickshaw.y + rickshaw.height > obstacles[i].y
    ) {
      isGameRunning = false;
      alert("Game Over! Final Score: " + score);
      return;
    }

    // Remove obstacles that move off screen
    if (obstacles[i].y > canvas.height) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Score display
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  if (isGameRunning) {
    requestAnimationFrame(updateGame);
  }
}

rickshawImg.onload = () => {
  // Wait for the image to load before starting the game
  document.getElementById("startBtn").style.display = "block";
};


