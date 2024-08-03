//Define the time limit
let TIME_LIMIT = 120;

//define quotes to be used 
let quotes_array=[
    "A heart is not judged by how much you love; but by how much you are loved by others",
    "I took a deep breath and listened to the old brag of my heart. I am, I am, I am.",
    "The most beautiful things in the world cannot be seen or touched, they are felt with the heart.",
    "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
    "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You’re on your own. And you know what you know. And YOU are the one who’ll decide where to go",
    "You can tell yourself that you would be willing to lose everything you have in order to get something you want. But it’s a catch-22: all of those things you’re willing to lose are what make you recognizable. Lose them, and you’ve lost yourself.",
    "We are the music-makers, And we are the dreamers of dreams, Wandering by lone sea-breakers, And sitting by desolate streams. World-losers and world-forsakers, Upon whom the pale moon gleams; Yet we are the movers and shakers, Of the world forever, it seems."
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
 
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];
   
    // separate each character and make an element
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char
      quote_text.appendChild(charSpan)
    })
   
    // roll over to the first quote
    if (quoteNo < quotes_array.length - 1)
      quoteNo++;
    else
      quoteNo = 0;
}
function processCurrentText() {

  //Splitting current input text
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  //increment total characters typed
  characterTyped++;
  errors= 0;

  let quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char,index)=>{
    let typedChar = curr_input_array[index];

    //When character is not typed yet
    if(typedChar == null){
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');
    }
    //If correct character is typed
    else if(typedChar == char.innerText){
      cpm = Math.round(((characterTyped / timeElapsed) * 60));
      wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
      cpm_text.textContent = cpm;
      wpm_text.textContent = wpm;
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');
    }
    //if it is typed incorrect
    else {
      cpm = Math.round(((characterTyped / timeElapsed) * 60));
      wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
      cpm_text.textContent = cpm;
      wpm_text.textContent = wpm;
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      errors++;
    }
  }); 
  // display the number of errors
  error_text.textContent = total_errors + errors;
 
  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);
 
  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();
 
    // update total errors
    total_errors += errors;
 
    // clear the input area
    input_area.value = "";
  }
}
function startGame() {
 
  resetValues();
  updateQuote();
 
  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}
 
function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;
 
  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  // cpm_group.style.display = "none";
  // wpm_group.style.display = "none";
}
function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;
 
    // increase the time elapsed
    timeElapsed++;
 
    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}
function finishGame() {
  // stop the timer
  clearInterval(timer);
 
  // disable the input area
  input_area.disabled = true;
 
  // show finishing text
  quote_text.textContent = "Click on restart to start a new game.";
 
  // display restart button
  restart_btn.style.display = "block";
 
  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
 
  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;
 
  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}