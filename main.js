// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

//Levels

let lvls = {
  "Easy" : 5,
  "Normal" : 3,
  "Hard" : 2,
}
let selectValue = document.querySelector(".select")




//Default levels



let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;


selectValue.addEventListener('change', function() {
  let level = this.value
    lvlNameSpan.innerHTML =level;
    secondsSpan.innerHTML = lvls[lvlNameSpan.innerHTML];
    timeLeftSpan.innerHTML = lvls[lvlNameSpan.innerHTML];
  });

//Disable Paste Event 

input.onpaste = function(e){
  return false
}

// Start Game

startButton.onclick = function (){
  this.remove()
  input.focus()

  // Generate Random Word From Array Function
  genWords()
}

function genWords (){
  // Random Word From Array
  let randomWord = words[Math.floor(Math.random()*words.length)];

  // Index of Random Word
  let wordIndex = words.indexOf(randomWord);
  // Show The Random Word 
  theWord.innerHTML = randomWord;
  // Remove Word From Array
  words.splice(wordIndex,1);
  //Empty Upcoming Words 
  upcomingWords.innerHTML="";
  // Add Words To Upcoming Div
  for (let i = 0 ; i < words.length ; i++){
    let div =document.createElement("div") ;
    let txt = document.createTextNode(words[i])
    div.appendChild(txt);
    upcomingWords.append(div)
  }
  //Start Play Function
  startPlay ()
}

function startPlay (){
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0"){
      clearInterval(start)
      if (theWord.innerHTML.toLocaleLowerCase() === input.value.toLowerCase()){
        input.value ="";
        //increase Score
        scoreGot.innerHTML++;
        if (words.length > 0){
          genWords ()
        } else {
          let span = document.createElement("span");
          span.className = 'good';
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span")
        span.className="bad"
        let spanText =document.createTextNode("Game Over")
        span.appendChild(spanText);
        finishMessage.appendChild(span )
      }
    }
  }, 1000);
}