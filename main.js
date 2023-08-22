import {
  canvas,
  backgroundImage,
  drawBird,
  drawPipe,
  update,
  gameLoop,
  resetGame,
  bird,
  pipes,
  score,
  gameOver,
} from './script.js';

backgroundImage.onload = () => {
  gameLoop();
};

playAgainButton.addEventListener("click", () => {
  resetGame();
  gameLoop();
});

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) {
    if (!gameOver) {
      bird.velocityY = bird.jumpPower;
    } else {
      startGame();
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 82) {
    resetGame();
    gameLoop();
  }
});
