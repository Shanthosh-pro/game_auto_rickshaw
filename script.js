// Get the canvas and context for drawing
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const truckWidth = 60;
const truckHeight = 100;

// Truck properties
let truck = {
  x: canvas.width / 2 - truckWidth / 2,
  y: canvas.height - truckHeight - 20,
  width: truckWidth,
  height: truckHeight,
  speed: 0,
  maxSpeed: 5,
  acceleration: 0.1,
  deceleration: 0.05,
  turnSpeed: 3,
};

// Game state variables
let distanceTraveled = 0;
let isGameRunning = false;
let obstacles = [];
let keys = {};

// Event listeners for controlling the truck
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Start button event listener
document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  isGameRunning = true;
  distanceTraveled = 0;
  truck.x = canvas.width / 2 - truckWidth / 2;
  truck.y = canvas.height - truckHeight - 20;
  truck.speed = 0;
  obstacles = [];
  gameLoop();
}

// Game loop function
function gameLoop() {
  // Clear the canvas for the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw road
  ctx.fillStyle = "#228B22"; // Road color (green)
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw lane markings
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(canvas.width / 2 - 10, 0, 20, canvas.height);

  // Update truck movement
  updateTruck();

  // Draw obstacles
  updateObstacles();

  // Display distance traveled
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Distance: " + distanceTraveled.toFixed(2) + " km", 10, 30);

  // Collision detection
  checkCollisions();

  // Check if the player has won or lost
  if (isGameRunning) {
    requestAnimationFrame(gameLoop);
  }
}

// Update truck position and movement
function updateTruck() {
  // Control truck's acceleration
  if (keys["ArrowUp"] && truck.speed < truck.maxSpeed) {
    truck.speed += truck.acceleration;
  }
  if (keys["ArrowDown"] && truck.speed > 0) {
    truck.speed -= truck.deceleration;
  }

  // Turn truck
  if (keys["ArrowLeft"] && truck.x > 0) {
    truck.x -= truck.turnSpeed;
  }
  if (keys["ArrowRight"] && truck.x + truck.width < canvas.width) {
    truck.x += truck.turnSpeed;
  }

  // Move the truck forward based on speed
  truck.y -= truck.speed;

  // Draw the truck (represented as a rectangle)
  ctx.fillStyle = "blue";
  ctx.fillRect(truck.x, truck.y, truck.width, truck.height);

  // Track distance traveled
  distanceTraveled += 0.01; // Update every frame
}

// Create obstacles
function updateObstacles() {
  if (Math.random() < 0.03) {
    let obstacleX = Math.random() * (canvas.width - 50);
    obstacles.push({ x: obstacleX, y: 0 });
  }

  // Move obstacles down
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 4; // Speed of obstacles

    // Draw obstacles (represented as red squares)
    ctx.fillStyle = "red";
    ctx.fillRect(obstacles[i].x, obstacles[i].y, 50, 50);

    // Remove obstacles that have passed off-screen
    if (obstacles[i].y > canvas.height) {
      obstacles.splice(i, 1);
      distanceTraveled += 0.1;
    }
  }
}

// Collision detection
function checkCollisions() {
  for (let i = 0; i < obstacles.length; i++) {
    // Check if the truck collides with an obstacle
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
  }

  // Check if the player has won
  if (distanceTraveled >= 45) {
    isGameRunning = false;
    alert("You reached 45 km! You win!");
  }
}


