document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    let direction = { x: 0, y: 0 };
    let score = 0;
    let intervalTime = 200; // Initial snake speed
    let gameInterval;
    let isPaused = false; // Pause state

    // Draw the game board
    function drawGame() {
        if (isPaused) return; // Do nothing if the game is paused

        // Clear the canvas
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the food
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        // Draw the snake
        ctx.fillStyle = "green";
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });

        // Move the snake
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
            updateSpeed(); // Adjust speed when score increases
        } else {
            snake.pop();
        }

        // Check for collisions with walls or itself
        if (
            head.x < 0 || head.x >= tileCount ||
            head.y < 0 || head.y >= tileCount ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            alert(`Game Over! Your score: ${score}`);
            resetGame();
        }

        // Display the score
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`Speed: ${(200 - intervalTime)} ms`, 10, 40); // Display current speed
        ctx.fillText(isPaused ? "Paused" : "", canvas.width / 2 - 50, 20); // Show "Paused" if paused
    }

    // Change direction
    function changeDirection(event) {
        const key = event.key;
        if (key === "ArrowUp" && direction.y === 0) {
            direction = { x: 0, y: -1 };
        } else if (key === "ArrowDown" && direction.y === 0) {
            direction = { x: 0, y: 1 };
        } else if (key === "ArrowLeft" && direction.x === 0) {
            direction = { x: -1, y: 0 };
        } else if (key === "ArrowRight" && direction.x === 0) {
            direction = { x: 1, y: 0 };
        } else if (key === "+" || key === "=") {
            increaseSpeed();
        } else if (key === "-") {
            decreaseSpeed();
        } else if (key === " ") { // Space key toggles pause
            togglePause();
        }
    }

    // Update speed dynamically
    function updateSpeed() {
        if (score % 50 === 0 && intervalTime > 50) { // Speed up every 50 points
            intervalTime -= 10; // Reduce interval time for faster updates
            restartInterval();
        }
    }

    // Manually increase speed
    function increaseSpeed() {
        if (intervalTime > 50) { // Ensure minimum speed
            intervalTime -= 10;
            restartInterval();
        }
    }

    // Manually decrease speed
    function decreaseSpeed() {
        if (intervalTime < 500) { // Set a reasonable maximum speed
            intervalTime += 10;
            restartInterval();
        }
    }

    // Restart the game interval with the updated speed
    function restartInterval() {
        clearInterval(gameInterval);
        gameInterval = setInterval(drawGame, intervalTime);
    }

    // Toggle pause state
    function togglePause() {
        isPaused = !isPaused; // Flip the pause state
        if (!isPaused) {
            restartInterval(); // Resume the game
        } else {
            clearInterval(gameInterval); // Stop the game
        }
    }

    // Reset the game
    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
        intervalTime = 200; // Reset speed
        isPaused = false; // Ensure the game starts unpaused
        restartInterval();
    }

    // Start the game loop
    document.addEventListener("keydown", changeDirection);
    gameInterval = setInterval(drawGame, intervalTime);
});
