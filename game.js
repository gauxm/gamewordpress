let targetNumber;
let attempts = 0;
let leaderboard = [];

const adviceText = document.getElementById("advice");
const guessForm = document.getElementById("guess-form");
const newGameForm = document.getElementById("player-form");
const leaderboardTable = document.querySelector("#leader-board tbody");

function loadLeaderboard() {
    const storedLeaderboard = localStorage.getItem("leaderboard");
    if (storedLeaderboard) {
        leaderboard = JSON.parse(storedLeaderboard);
        console.log("Loaded leaderboard from Local Storage:", leaderboard);
    } else {
        leaderboard = [
            { name: "Tom 🥇", score: 1 },
            { name: "Bill 🥈", score: 3 },
            { name: "Bob 🥉", score: 10 }
        ];
        saveLeaderboard();
        console.log("Initialized leaderboard with default values:", leaderboard);
    }
    displayLeaderboard();
}

function saveLeaderboard() {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    console.log("Saved leaderboard to Local Storage:", leaderboard);
}

function generateRandomNumber() {
    targetNumber = Math.floor(Math.random() * 101);
    console.log("Generated target number:", targetNumber);
}

function startNewGame(event) {
    event.preventDefault();
    const playerName = document.getElementById("player-name").value;
    if (!playerName) {
        alert("Please enter a player name to start the game.");
        return;
    }
    attempts = 0;
    generateRandomNumber();
    adviceText.textContent = "Advice: Try to guess the number!";
    guessForm.style.display = "block";
    newGameForm.style.display = "none";
    document.getElementById("guess").value = "";
    document.getElementById("guess").focus();
    console.log("Started a new game for player:", playerName);
}

function handleGuess(event) {
    event.preventDefault();
    const playerGuess = parseInt(document.getElementById("guess").value, 10);
    if (isNaN(playerGuess)) {
        adviceText.textContent = "Please enter a valid number.";
        document.getElementById("guess").value = "";
        document.getElementById("guess").focus();
        return;
    }

    attempts++;

    if (playerGuess === targetNumber) {
        adviceText.textContent = `🎉 Congratulations! You found the number in ${attempts} attempts.`;
        updateLeaderboard(document.getElementById("player-name").value, attempts);
        guessForm.style.display = "none";
        newGameForm.style.display = "block";
    } else if (playerGuess < targetNumber) {
        adviceText.textContent = "😬 Too low! Try a higher number ↗️";
        document.getElementById("guess").value = "";
        document.getElementById("guess").focus();
    } else {
        adviceText.textContent = "😬 Too high! Try a lower number ↘️";
        document.getElementById("guess").value = "";
        document.getElementById("guess").focus();
    }
}

function updateLeaderboard(name, score) {
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => a.score - b.score);
    saveLeaderboard();
    displayLeaderboard();
    console.log("Updated leaderboard with new score:", leaderboard);
}

function displayLeaderboard() {
    leaderboardTable.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        leaderboardTable.appendChild(row);
    });
    console.log("Displayed leaderboard:", leaderboard);
}

newGameForm.addEventListener("submit", startNewGame);
guessForm.addEventListener("submit", handleGuess);

loadLeaderboard();
