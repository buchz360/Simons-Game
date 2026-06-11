// Game Variables
const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Initialize audio context lazily on user interaction
let audioCtx = null;

// Audio sound maps (Frequencies in Hz)
const soundFrequencies = {
    green: 261.63,  // C4
    red: 329.63,    // E4
    yellow: 392.00, // G4
    blue: 523.25,   // C5
    wrong: 120.00   // Low buzz
};

// Start the game on a keypress
document.addEventListener("keydown", function() {
    if (!started) {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        document.getElementById("level-title").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

// Detect when any game button is clicked
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        if (!started) return; // Prevent clicks before starting

        const userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        // Check the user's answer
        checkAnswer(userClickedPattern.length - 1);
    });
});

// Check if user pattern matches game pattern
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

// Generate the next step in the sequence
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

// Helper: Synthesize arcade sound frequencies
function playSound(color) {
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = color === "wrong" ? "sawtooth" : "triangle";
    osc.frequency.setValueAtTime(soundFrequencies[color], audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
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