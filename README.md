# 🕹️ Simon Game

A classic memory game clone built with vanilla web technologies. Players must listen to and watch an ever-growing sequence of flashing colors and matching audio cues, then replicate the pattern perfectly to advance levels.

## 🚀 Features
* **Dynamic Sequencing:** Automatically generates random color chains that grow longer each round.
* **Synchronized Effects:** Audio files play in perfect sync with custom CSS flash animations.
* **Autoplay Compliant:** Designed to initialize via keyboard press to safely comply with modern browser audio policies.
* **State Management:** Automatically resets score arrays on a "Game Over" condition without requiring a page refresh.

## 🛠️ Tech Stack
* **HTML5:** Semantic structure.
* **CSS3:** Flexbox layouts, transition scaling, and active state animations.
* **JavaScript (ES6):** Global keydown listeners, DOM manipulation loops, and native HTML5 `Audio()` tracking.

## 🎮 How to Play
1. Open `index.html` in your web browser.
2. **Press any key on your keyboard** to start the game (Level 1).
3. Watch the color flash and listen to its sound.
4. Click the matching color buttons in the exact order shown.
5. Get it right to advance to the next level. If you miss a step, you'll hit the Game Over screen and can press any key to try again!