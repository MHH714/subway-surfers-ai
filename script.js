const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let playerPosition = 50; // Percentage position
let score = 0;
let gameSpeed = 5; // Speed of obstacles
let isGameOver = false;

// Handle player movement
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && playerPosition > 10) {
        playerPosition -= 10;
    } else if (e.key === "ArrowRight" && playerPosition < 90) {
        playerPosition += 10;
    }
    player.style.left = playerPosition + "%";
});

// Spawn obstacles
function spawnObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    const randomPosition = Math.random() * 100;
    obstacle.style.left = randomPosition + "%";
    obstacle.style.top = "-50px";

    gameContainer.appendChild(obstacle);

    let obstacleInterval = setInterval(() => {
        const obstacleTop = parseInt(window.getComputedStyle(obstacle).top);
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        // Check for collision
        if (
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left
        ) {
            clearInterval(obstacleInterval);
            isGameOver = true;
            alert("Game Over! Final Score: " + score);
        }

        if (obstacleTop > window.innerHeight) {
            clearInterval(obstacleInterval);
            obstacle.remove();
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            obstacle.style.top = obstacleTop + gameSpeed + "px";
        }
    }, 20);

    setTimeout(spawnObstacle, 1000 - Math.min(score * 10, 900));
}

// Start the game
spawnObstacle();
