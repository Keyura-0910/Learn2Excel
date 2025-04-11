const rooms = [
    {
      name: "🏚️ Room 1: Dark Alley",
      clues: [
        "Use your 5 senses to stay alert.",
        "‘Run’ has how many letters?",
        "Middle digit is number of senses.",
        "Ends with how many attackers you spotted: 3.",
        "Think: awareness, speed, danger.",
        "Safety lies in remembering your senses and action."
      ],
      answer: "553",
      hint: "Start and middle digits = number of senses (5), end = attackers seen (3)."
    },
    {
      name: "🏢 Room 2: Crowded Elevator",
      clues: [
        "Personal space is key. How many people too close?",
        "Middle digit: your floor number (4).",
        "You and one more person escaped.",
        "Starts with how many threats you felt.",
        "Avoid panic. Think strategically.",
        "You're surrounded. Focus on positions."
      ],
      answer: "342",
      hint: "Start with 3 threats, you're on 4th floor, and 2 escaped together."
    },
    {
      name: "🚪 Room 3: Hidden Basement",
      clues: [
        "Elbow, Palm, Kick - how many moves?",
        "Middle digit is 0 - silence before defense.",
        "Ends with fingers in a fist.",
        "Start: how many moves were named?",
        "No need to shout. Let actions speak.",
        "Count, stay silent, strike."
      ],
      answer: "305",
      hint: "3 moves, silence (0), and fist uses 5 fingers."
    },
    {
      name: "🛍️ Room 4: Parking Garage",
      clues: [
        "Block triangle - how many sides?",
        "Whistle power (1-5)? Use full strength.",
        "Only 1 attacker visible.",
        "What’s the shape of your stance?",
        "Power up and defend.",
        "A triangle always stands strong."
      ],
      answer: "351",
      hint: "Triangle = 3, whistle = 5, and 1 attacker."
    },
    {
      name: "🏞️ Room 5: Forest Trail",
      clues: [
        "You saw 2 exit trails.",
        "The calm before action is quiet (0).",
        "Fist forms with how many fingers?",
        "Use terrain to your advantage.",
        "Stay low, strike fast.",
        "You’re not alone. Use your hand wisely."
      ],
      answer: "204",
      hint: "2 exits, silence (0), 4 fingers in a fist."
    }
  ];
  
  let currentRoom = 0;
  let score = 100;
  let timeLeft = 120;
  let timer;
  let hintUsed = false;
  
  const grid = document.getElementById("card-grid");
  const timeDisplay = document.getElementById("time");
  const scoreDisplay = document.getElementById("score");
  const roomTitle = document.getElementById("room-title");
  const hintText = document.getElementById("hint");
  const message = document.getElementById("message");
  const lock = document.getElementById("lock");
  const input = document.getElementById("codeInput");
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        message.textContent = "⛔ Time's up! Try again.";
        input.disabled = true;
      }
    }, 1000);
  }
  
  function loadRoom(index) {
    const room = rooms[index];
    roomTitle.textContent = room.name;
    grid.innerHTML = "";
    hintText.textContent = "";
    message.textContent = "";
    lock.textContent = "";
    input.value = "";
    hintUsed = false;
  
    room.clues.forEach(clue => {
      const card = document.createElement("div");
      card.className = "card";
  
      const inner = document.createElement("div");
      inner.className = "card-inner";
  
      const front = document.createElement("div");
      front.className = "card-front";
      front.textContent = "❓";
  
      const back = document.createElement("div");
      back.className = "card-back";
      back.textContent = clue;
  
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
  
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
  
      grid.appendChild(card);
    });
  }
  
  function checkCode() {
    const room = rooms[currentRoom];
    const userCode = input.value.trim();
  
    if (userCode === room.answer) {
      lock.textContent = "🔓 Unlocked!";
      message.textContent = "✅ Great job!";
      currentRoom++;
  
      if (currentRoom < rooms.length) {
        setTimeout(() => loadRoom(currentRoom), 1500);
      } else {
        clearInterval(timer);
        message.textContent = `🎉 Escaped all rooms! Final Score: ${score}`;
      }
    } else {
      message.textContent = "❌ Incorrect code. Try again!";
      score -= 5;
      updateScore();
    }
  }
  
  function showHint() {
    if (!hintUsed) {
      hintUsed = true;
      hintText.textContent = "💡 Hint: " + rooms[currentRoom].hint;
      score -= 15;
      updateScore();
    }
  }
  
  function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadRoom(currentRoom);
    startTimer();
  }

);
  