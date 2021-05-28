// =============================  #2  =============================
// Get the elements needed from HTML

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const start = overlay.querySelector('.start a');




// =============================  #3  =============================
// Attach event listener to the "Start Game" button to hide the start screen overlay

start.addEventListener('click', () => {
    overlay.style.display = 'none';
});


// =============================  #4  =============================
// Create a phrases array that contains at least 5 different phrases as strings

const phrases = [
    "May the Force be with you",
    "I see dead people",
    "To be or not to be",
    "Just keep swimming",
    "Fat guy in a little coat",
    "Yabba dabba doo",
    "Your guess is as good as mine",
    "Hit the nail on the head",
    "Better late than never",
    "Whoa"
];


// =============================  #5  =============================
// Create a getRandomPhraseArray

let phraseArray = getRandomPhraseAsArray(phrases);
function getRandomPhraseAsArray(arr) {
    const randNum = Math.floor(Math.random() * 10); // 1 for testing 
    const randPhrase = arr[randNum]; // Create a function that randomly chooses a phrase from phrases array,
    randPhrase.split(''); // splits that phrase into a new array of characters,
    return randPhrase; // and returns the new character array
}


// =============================  #6  =============================
// Set the game display

let phraseToDisplay = addPhraseToDisplay(phraseArray);
function addPhraseToDisplay(arr) {
    const displayDiv = document.getElementById('phrase'); // get #phrase <div> in HTML
    const displayUl = displayDiv.querySelector('ul'); // get <ul> child from parent #phrase <div> in HTML

    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li'); // creates a list item for each character,
        li.textContent = arr[i].toUpperCase(); // puts the character inside list item,
        if (li.textContent === ' ') { // adds class "space" or "letter" to respective character,
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        displayUl.appendChild(li); // and appends list item to #phrase <ul> in HTML
    }
    return displayUl;
};


// =============================  #7  =============================
// Create a checkLetter function

function checkLetter(button) {
    let letterFound = false; // default state of letterFound
    let phraseLetters = [...phraseToDisplay.getElementsByClassName('letter')];

    for (let i = 0; i < phraseLetters.length; i++) { // loop through phraseLetters
        let liText = phraseLetters[i].textContent; // get text of <li> items making up phraseLetters
        if (button === liText) { // if button clicked matches any phraseLetters
            (phraseLetters[i].className = 'show'); // add class "show" to <li> item(s) containg matched letter
            letterFound = true; // since button clicked matches a letter of the phrase, set letterFound to true
        }
    }
    if (letterFound === false) { // back outside loop, if letterFound is still false
        return null; // return null
    } else // if letterFound is true
        return letterFound; // return letterFound
}

// =============================  #8/#9 =============================
// Add an event listener to keyboard

const scoreboard = document.getElementById('scoreboard');
const tries = scoreboard.querySelectorAll('.tries');
let letterFound;
let missed = 0;

qwerty.addEventListener('click', (e) => {
    let button = e.target;
    let letter = button.textContent.toUpperCase();
    if (e.target.tagName === 'BUTTON') {
        button.className = 'chosen';
        button.disabled = true;
        letterFound = checkLetter(letter);
        checkWin();
    }
    if (letterFound === null) {
        tries[missed].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">';
        missed++;
        if (missed === 5) {
            overlay.className = 'lose';
            overlay.style.display = 'flex';
            overlay.querySelector('.title').textContent = 'You lost!';
            overlay.querySelector('a').outerHTML = '<a class="btn__reset" onclick="reset()">Try again?</a>';
        }
    }
});

// =============================  #10  =============================
// Create a checkWin function

function checkWin() {
    let lettersShown = phraseToDisplay.innerText;
    if (letterFound === lettersShown.length) {
        console.log(letterFound);
        console.log(lettersShown.length);
        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'You won!';
        overlay.querySelector('a').outerHTML = '<a class="btn__reset" onclick="reset()">Try again?</a>';
    }
}


// =============================  #Extra Credit  =============================
// Reset game


function reset() {
    overlay.style.display = 'none';
    clearPhraseFromDisplay();
    resetButtons();
    resetTries();
    newPhrase();
}

function clearPhraseFromDisplay() {
    const displayDiv = document.getElementById('phrase'); // get #phrase <div> in HTML
    const displayUl = displayDiv.querySelector('ul'); // get <ul> child from parent #phrase <div> in HTML
    const displayLi = displayUl.querySelectorAll('li');
    for (let i = 0; i < displayLi.length; i++) {
        displayLi[i].remove();
    }
};

function resetButtons() {
    const buttons = qwerty.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = '';
        buttons[i].disabled = false;
    }
}

function resetTries() {
    missed = 0;
    for (let i = 0; i < tries.length; i++) {
        tries[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
    }
}

function newPhrase() {
    let nextRound = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(nextRound);
}