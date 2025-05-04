const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const truckImg = new Image();
truckImg.src = "truck.png";  // Your truck image

const roadImg = new Image();
roadImg.src = "road.png";  // Your road image

let truck = {
  x: 350,  // Start at the middle of the canvas
  y: 400,
  width: 80,
  height: 80,
  speed: 0,
  maxSpeed: 5,
  acceleration: 0.1,
  deceleration: 0.05,
  turnSpeed: 3,
};

let isGameRunning = false;
let keys = {};
let distanceTraveled = 0;
let obstacles = [];
let gameSpeed = 2;

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  isGameRunning = true;
  distanceTraveled = 0;
  truck.x = 350;
  truck.y = 400;
  truck.speed = 0;
  obstacles = [];
  gameLoop();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Road background
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);

  // Move truck forward or backward
  if (keys["ArrowUp"] && truck.speed < truck.maxSpeed) {
    truck.speed += truck.acceleration;
  }
  if (keys["ArrowDown"] && truck.speed > 0) {
    truck.speed -= truck.deceleration;
  }

  // Turn truck left or right
  if (keys["ArrowLeft"]) {
    truck.x -= truck.turnSpeed;
  }
  if (keys["ArrowRight"]) {
    truck.x += truck.turnSpeed;
  }

  // Apply the truck's speed to the Y position (moving forward)
  truck.y -= truck.speed;

  // Draw truck
  ctx.drawImage(truckImg, truck.x, truck.y, truck.width, truck.height);

  // Obstacles (randomly spawning objects on the road)
  if (Math.random() < 0.02) {
    let obstacleX = Math.random() * (canvas.width - 50);
    obstacles.push({ x: obstacleX, y: 0 });
  }

  // Move obstacles down the screen
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += gameSpeed;

    // Draw obstacles
    ctx.fillStyle = "red";
    ctx.fillRect(obstacles[i].x, obstacles[i].y, 50, 50);

    // Collision detection
    if (
      truck.x < obstacles[i].x + 50 &&
      truck.x + truck.width > obstacles[i].x &&
      truck.y < obstacles[i].y + 50 &&
      truck.y + truck.height > obstacles[i].y
    ) {
      isGameRunning = false;
      alert("Game Over! You crashed.");
      return;
    }

    // Remove obstacles that move off-screen
    if (obstacles[i].y > canvas.height) {
      obstacles.splice(i, 1);
      distanceTraveled += 0.1;
    }
  }

  // Display Distance Traveled
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Distance: " + distanceTraveled.toFixed(1) + " km", 10, 30);

  // Check if the player reached the target distance
  if (distanceTraveled >= 45) {
    isGameRunning = false;
    alert("You reached 45 km! You win!");
  }

  if (isGameRunning) {
    requestAnimationFrame(updateGame);
  }
}

truckImg.onload = () => {
  document.getElementById("startBtn").style.display = "block";
};

