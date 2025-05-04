const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const rickshawImg = new Image();
rickshawImg.src = "rickshaw.png";  // <-- Add your image here

let rickshaw = {
  x: 100,
  y: 300,
  width: 80,
  height: 80,
  speed: 3,
};

let keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Road
  ctx.fillStyle = "#444";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  // Movement
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
}

rickshawImg.onload = () => {
  setInterval(updateGame, 20);
};


