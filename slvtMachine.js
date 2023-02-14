const winningCombinations = [
  {combination: new Set(["🐭", "💧", "💕", "💤"]), message: "RICCARDO TI CHIAMA TOPINA. GAYYYY. RIPROVA"},
  {combination: new Set(["😼", "🦶", "💤", "🔪"]), message: "AIAA MUSKI TI ASSALTA I PIEDI NELLA NOTTE!! RIPROVA"},
  {combination: new Set(["😠", "🍫", "🚬", "👨‍🍳"]), message: "OH NO! LO CHEF TI RIFILA UN SIGARONE AL CIOCCOLATO! RIPROVA"},
  {combination: new Set(["🅿️", "🆙", "ℹ️", "❤️‍🔥"]), message: "BUON SANVAAAAAAA PUPIIII", redirect: "https://youtube.com/clip/UgkxJ8FuEgY2uRzZjNKwDLbEjYySTBOeGbBo"}
];

function generateEmojis() {
  const {combination} = shuffleArray(winningCombinations)[0];
  document.getElementById("emojiGrid").innerHTML = [...combination].map(emoji => `<div class="emoji">${emoji}</div>`).join('');
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
      generateEmojis();
    }
    count++;
  }, 100 - Math.sqrt(count));
}

function checkWinningCombination(emojis) {
  const emojiSet = new Set([...emojis].map(emoji => emoji.textContent));
  const {message, redirect} = winningCombinations.find(({combination}) => setEquals(combination, emojiSet)) || {};
  if (message) {
    setTimeout(() => {
      alert(message);
      if (redirect) {
        window.location.href = "https://youtube.com/clip/UgkxJ8FuEgY2uRzZjNKwDLbEjYySTBOeGbBo";
      }
    }, 1000);
  }
}

function setEquals(setA, setB) {
  return setA.size === setB.size && [...setA].every(item => setB.has(item));
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

generateEmojis();