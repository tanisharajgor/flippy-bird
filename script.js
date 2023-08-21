const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const backgroundImage = new Image();
backgroundImage.src = 'bg_night.png';

const bird = {
  x: 50,
  y: canvas.height / 2,
  width: 30,
  height: 30,
  velocityY: 0,
  gravity: 0.5,
  jumpPower: -10,
};

const pipes = [];
let score = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "#fcdd58";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  const eyeSize = 5;
  const eyeX = bird.x + bird.width / 2 - eyeSize / 2 + 5;
  const eyeY = (bird.y + bird.height / 4) + 2;
  ctx.fillStyle = "#000";
  ctx.fillRect(eyeX, eyeY, eyeSize, eyeSize);

  const beakWidth = 15;
  const beakHeight = 8;
  const beakX = bird.x + bird.width / 2 - beakWidth / 2 + 15;
  const beakY = bird.y + (bird.height * 3) / 4;
  ctx.fillStyle = "#ff9900";
  ctx.fillRect(beakX, beakY, beakWidth, beakHeight);
}

function drawPipe(x, height) {
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(x, 0, 50, height);
  ctx.fillRect(x, height + 150, 50, canvas.height - height - 150);
}

function update() {
  if (!gameOver) {
    bird.velocityY += bird.gravity;
    bird.y += bird.velocityY;

    if (bird.y > canvas.height - bird.height) {
      bird.y = canvas.height - bird.height;
      bird.velocityY = 0;
    }

    if (bird.y < 0) {
      bird.y = 0;
      bird.velocityY = 0;
    }

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
      const gapStart = Math.random() * (canvas.height - 300) + 100;
      pipes.push({ x: canvas.width, gapStart });
    }

    for (const pipe of pipes) {
      pipe.x -= 3;

      if (
        bird.x + bird.width > pipe.x &&
        bird.x < pipe.x + 50 &&
        (bird.y < pipe.gapStart || bird.y + bird.height > pipe.gapStart + 150)
      ) {
        gameOver = true;
      }

      if (pipe.x + 50 < 0) {
        pipes.shift();
        score++;
      }
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    drawBird();
    for (const pipe of pipes) {
      drawPipe(pipe.x, pipe.gapStart);
    }
    update();
    requestAnimationFrame(gameLoop);
  } else {
    ctx.fillStyle = "#f8f9fa";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
    ctx.fillText("Score: " + score, canvas.width / 2 - 60, canvas.height / 2 + 40);
  }
}

function resetGame() {
  pipes.length = 0;
  bird.y = canvas.height / 2;
  bird.velocityY = 0;
  score = 0;
  gameOver = false;
}

export {
  canvas,
  ctx,
  backgroundImage,
  bird,
  pipes,
  score,
  gameOver,
  drawBird,
  drawPipe,
  update,
  gameLoop,
  resetGame,
};


