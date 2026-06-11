// Game Variables
const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// 1. Start the game on a keypress
document.addEventListener("keydown", function() {
    if (!started) {
        document.getElementById("level-title").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

// 2. Detect when any game button is clicked
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        if (!started) return; // Prevent clicks before starting the game

        const userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        // Check the user's answer
        checkAnswer(userClickedPattern.length - 1);
    });
});

// 3. Check if user pattern matches game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // If user finished the current sequence round
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // Game Over Scenario
        playSound("wrong");
        
        document.body.classList.add("game-over");
        document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

// 4. Generate the next step in the sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    // Pick a random color
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Flash the chosen button and play its sound
    flashButton(randomChosenColor);
    playSound(randomChosenColor);
}

// 5. Play sound files dynamically using relative paths
function playSound(name) {
    // Correct relative path syntax for seamless local and GitHub deployment
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Helper: Visual Flash effect for game patterns
function flashButton(color) {
    const btn = document.getElementById(color);
    btn.style.opacity = "0";
    setTimeout(() => btn.style.opacity = "1", 100);
}

// Helper: Click animation class toggle
function animatePress(currentColor) {
    const activeButton = document.getElementById(currentColor);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}

// Reset data structures to start fresh
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
