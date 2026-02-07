let musicStarted = false;
// QUESTIONS
const questions = [
  {
    q: "On which day did we talk for the first time?",
    options: [
      "17 April 2024",
      "30 March 2024",
      "13 April 2024",
      "26 March 2024"
    ],
    answer: 0
  },
  {
    q: "Which thing do we both love to do together?",
    options: [
      "Watching movie",
      "Sleeping",
      "Listening music",
      "Dancing"
    ],
    answer: 0
  },
  {
    q: "When did we fight for the first time?",
    options: [
      "21 November 2024",
      "15 December 2024",
      "6 January 2025",
      "2 January 2025"
    ],
    answer: 2
  },
  {
    q: "Where did we meet?",
    options: [
      "Shirdi",
      "Nashik",
      "Arunachalam",
      "Hyderabad"
    ],
    answer: 2
  }
];

// QUOTES
const quotes = [
  "This rose is not just a flower… it’s my heart for you baby — Vaishu",
  "In a garden full of flowers, I still choose you baby — Vaishu",
  "Rose flower okkasarey vikasisthundhi kani naaku nee paina unna prema prathi moment lo vikasisthundhi baby — Vaishu",
  "Rose flower needs sunlight and water to bloom but for me need you baby — Vaishu"
];

let current = 0;

// LOAD QUESTION
function loadQuestion() {
  document.getElementById("question").innerText = questions[current].q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questions[current].options.forEach((opt, i) => {
    optionsDiv.innerHTML += `
      <label>
        <input type="radio" name="option" value="${i}"> ${opt}
      </label>
    `;
  });
}

// NEXT BUTTON
function nextQuestion() {

  // 🎵 start music once (fade-in)
  if (!musicStarted) {
    const music = document.getElementById("bgMusic");
    music.volume = 0;
    music.play().catch(() => {});
    musicStarted = true;

    let v = 0;
    const fade = setInterval(() => {
      if (v < 1) {
        v += 0.05;
        music.volume = v;
      } else {
        clearInterval(fade);
      }
    }, 200);
  }

  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer 💖");
    return;
  }

  if (parseInt(selected.value) !== questions[current].answer) {
    alert("Wrong answer 😢 Try again!");
    return;
  }

  // 🌹 SHOW QUOTE FOR EVERY CORRECT ANSWER
  const quoteBox = document.getElementById("quoteBox");
  quoteBox.innerText = quotes[current];
  quoteBox.classList.remove("hidden");

  // ⏳ wait, then continue
  setTimeout(() => {
    quoteBox.classList.add("hidden");
    current++;

    if (current < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 2500);
}

// SHOW RESULT
function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
}

// FALLING ROSES
function createRose() {
  const rose = document.createElement("span");
  rose.innerText = "🌹";
  rose.style.left = Math.random() * 100 + "vw";
  rose.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.querySelector(".rose-container").appendChild(rose);

  setTimeout(() => rose.remove(), 6000);
}

setInterval(createRose, 300);

// START
loadQuestion();