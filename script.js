// Typing effect
const text = "💰 EMI Calculator";
let index = 0;
function typeText() {
  const typed = document.getElementById("typed-text");
  if (index < text.length) {
    typed.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 100);
  }
}
typeText();

// EMI Calculation
let chart;

function calculateEMI() {
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const loanTerm = parseFloat(document.getElementById("loanTerm").value);
  const interestRate = parseFloat(
    document.getElementById("interestRate").value
  );

  if (!loanAmount || !loanTerm || !interestRate) {
    alert("Please enter all fields!");
    return;
  }

  const monthlyRate = interestRate / (12 * 100);
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
    (Math.pow(1 + monthlyRate, loanTerm) - 1);

  const totalAmount = emi * loanTerm;
  const totalInterest = totalAmount - loanAmount;

  document.getElementById("result").innerHTML =
    `📌 EMI: <strong>₹${emi.toFixed(2)}</strong><br>` +
    `💸 Total Interest: ₹${totalInterest.toFixed(2)}<br>` +
    `💼 Total Payment: ₹${totalAmount.toFixed(2)}`;

  // Render chart
  const ctx = document.getElementById("emiChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [loanAmount, totalInterest],
          backgroundColor: ["#4caf50", "#ff9800"],
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          labels: {
            color: document.body.classList.contains("dark") ? "#eee" : "#222",
          },
        },
      },
    },
  });
}

// Flashing "Shubham"
setInterval(() => {
  for (let i = 0; i < 5; i++) {
    const flash = document.createElement("div");
    flash.className = "flash-text";
    flash.textContent = "Shubham";
    flash.style.left = Math.random() * 100 + "vw";
    flash.style.top = Math.random() * 100 + "vh";
    flash.style.fontSize = Math.floor(Math.random() * 20 + 20) + "px";
    flash.style.color = getRandomColor();
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 1000);
  }
}, 500);

function getRandomColor() {
  const colors = [
    "#ff4081",
    "#673ab7",
    "#e91e63",
    "#ff9800",
    "#00bcd4",
    "#03dac6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Music Control
const musicBtn = document.getElementById("toggle-music");
const bgMusic = document.getElementById("bg-music");
musicBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.textContent = "🔇 Mute";
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🔊 Unmute";
  }
});

// Dark Mode Toggle
const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";

  if (chart) {
    chart.options.plugins.legend.labels.color =
      document.body.classList.contains("dark") ? "#eee" : "#222";
    chart.update();
  }
});
