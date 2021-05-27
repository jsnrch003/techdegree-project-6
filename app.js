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

function getRandomPhraseAsArray(arr) {
    const randNum = Math.floor(Math.random() * 10); // 1 for testing 
    const randPhrase = arr[randNum]; // Create a function that randomly chooses a phrase from phrases array,
    randPhrase.split(''); // splits that phrase into a new array of characters,
    return randPhrase; // and returns the new character array
}

const phraseArray = getRandomPhraseAsArray(phrases);


// =============================  #6  =============================
// Set the game display

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

const phraseToDisplay = addPhraseToDisplay(phraseArray);


// =============================  #7  =============================
// Create a checkLetter function

const phraseLetters = [...phraseToDisplay.getElementsByClassName('letter')];
const numLetters = phraseLetters.length;

function checkLetter(button) {
    let letterFound = false; // default state of letterFound

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
let missed = 0;

qwerty.addEventListener('click', (e) => {
    let letterFound;
    const button = e.target;
    const letter = button.textContent.toUpperCase();
    if (e.target.tagName === 'BUTTON') {
        button.className = 'chosen';
        button.disabled = true;
        letterFound = checkLetter(letter);
    }
    if (letterFound === null) {
        tries[missed].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">';
        missed++;
        if (missed === 5) {
            overlay.className = 'lose';
            overlay.style.display = 'flex';
            overlay.querySelector('.title').textContent = 'You lost!';
            overlay.querySelector('a').outerHTML = '<a class="btn__reset" onclick="location.reload();">Try again?</a>';
        }
    }
    checkWin();
});

// =============================  #10  =============================
// Create a checkWin function

function checkWin() {
    const lettersShown = [...phraseToDisplay.getElementsByClassName('show')];
    const numShown = lettersShown.length;
    for (let i = 0; i < phraseLetters.length; i++) {
        if (numLetters === numShown) {
            overlay.className = 'win';
            overlay.style.display = 'flex';
            overlay.querySelector('.title').textContent = 'You won!';
            overlay.querySelector('a').outerHTML = '<a class="btn__reset" onclick="location.reload();">Try again?</a>';
        }
    }
}