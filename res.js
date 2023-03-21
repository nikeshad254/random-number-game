// holds data from local storage
var personsData = {};
// total person count of local storage
var totalPersons = 0;

let audio1 = new Audio("./airHorn.mp3")
let audio2 = new Audio("./Offenbach.mp3")

audio2.play()
audio2.loop = true
audio2.volume = 0.6

function retrieveLocal() {
  //retrieve local
  const storedData = localStorage.getItem("personsData");
  personsData = JSON.parse(storedData);

  //update count from local
  totalPersons = Object.keys(personsData).length;
}

//from result.html
const winnerNum = document.getElementById("winnerNum");
const winnerName = document.getElementById("winnerName");

var running = false;
winnerName.style.display = "none"

winnerNum.addEventListener("click", () => {
  if (running) {
    return;
  }
  running = true
  retrieveLocal()
  const min = 10000;
  const max = 20000;
  const gap = 500;
  const randomNumber = Math.floor(Math.random() * ((max - min + 1) / gap)) * gap + min;
  var rand;

  let interval = setInterval(() => {
    rand = Math.floor(Math.random() * totalPersons+1);
    winnerNum.textContent = personsData[rand].id;
    
  }, 300);

  setTimeout(()=>{
    // audio2.pause()
    clearInterval(interval)
    audio1.play()
    confetti.start()
    audio2.volume = 0.9
    winnerName.textContent = personsData[rand].name;
    winnerName.style.display = "block"
  }, randomNumber)

});