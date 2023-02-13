const winningCombinations = [
  {combination: new Set(["🐭", "💧", "💕", "💤"]), message: "RICCARDO TI CHIAMA TOPINA. GAYYYY. RIPROVA"},
  {combination: new Set(["😼", "🦶", "💤", "🔪"]), message: "AIAA MUSKI TI ASSALTA I PIEDI NELLA NOTTE!! RIPROVA"},
  {combination: new Set(["😠", "🍫", "🚬", "👨‍🍳"]), message: "OH NO! LO CHEF TI RIFILA UN SIGARONE AL CIOCCOLATO! RIPROVA"},
  {combination: new Set(["🅿️", "🆙", "ℹ️", "❤️‍🔥"]), message: "BUON SANVAAAAAAA PUPIIII"}
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateEmojis() {
  let emojiHTML = "";
  const shuffledCombinations = shuffleArray(winningCombinations);
  const selectedCombination = shuffledCombinations[0];
  for (let emoji of selectedCombination.combination) {
    emojiHTML += `<div class="emoji">${emoji}</div>`;
  }
  document.getElementById("emojiGrid").innerHTML = emojiHTML;
}

function spin() {
  const emojiGrid = document.getElementById("emojiGrid");
  emojiGrid.innerHTML = "";
  let count = 0;
  const spinInterval = setInterval(() => {
    if (count === 20) {
      clearInterval(spinInterval);
      generateEmojis();
      const finalEmojis = document.querySelectorAll('.emoji');
      checkWinningCombination(finalEmojis);
    } else {
      const shuffledCombinations = shuffleArray(winningCombinations);
      const selectedCombination = shuffledCombinations[0];
      emojiGrid.innerHTML = Array.from(selectedCombination.combination).map(emoji => `<div class="emoji">${emoji}</div>`).join('');
    }
    count++;
  }, 100 - Math.sqrt(count));
}
function checkWinningCombination(emojis) {
  const winningCombinations = [
    {combination: new Set(["🐭", "💧", "💕", "💤"]), message: "RICCARDO TI CHIAMA TOPINA. GAYYYY. RIPROVA"},
    {combination: new Set(["😼", "🦶", "💤", "🔪"]), message: "AIAA MUSKI TI ASSALTA I PIEDI NELLA NOTTE!! RIPROVA"},
    {combination: new Set(["😠", "🍫", "🚬", "👨‍🍳"]), message: "OH NO! LO CHEF TI RIFILA UN SIGARONE AL CIOCCOLATO! RIPROVA"},
    {combination: new Set(["🅿️", "🆙", "ℹ️", "❤️‍🔥"]), message: "BUON SANVAAAAAAA PUPIIII"}
  ];

  for (let combination of winningCombinations) {
    if (combination.combination.size !== 4) {
      continue;
    }
    let winningCount = 0;
    for (let emoji of emojis) {
      if (combination.combination.has(emoji)) {
        winningCount++;
      }
    }
    if (winningCount === 4) {
      document.querySelector("#message").innerHTML = combination.message;
      break;
    }
  }
}

generateEmojis();
