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
const getLetters = [...phraseToDisplay.getElementsByClassName('letter')];
const numLetters = getLetters.length;
let letterFound = 0;
let missed = 0;

function checkLetter(button) {
    let match = false; // default state of match Letter

    for (let i = 0; i < getLetters.length; i++) { // loop through letters of phrase
        let liText = getLetters[i].textContent; // get text of <li> items making up phrase
        if (button === liText) { // if button clicked matches a letter of the phrase
            (getLetters[i].className = 'show'); // add class "show" to <li> item containg matched letter
            letterFound++; // keep count of number of letters shown
            match = true; // since button clicked matches a letter of the phrase, set match to true
        }
    }
    if (match === false) { // back outside loop, if match is still false
        return null; // return null
    } else // if match is true
        return letterFound; // return number of letters shown
}

// =============================  #8/#9  =============================
// Add an event listener to keyboard
const scoreboard = document.getElementById('scoreboard');
const tries = scoreboard.querySelectorAll('.tries');

qwerty.addEventListener('click', (e) => {
    const buttonSelection = e.target;
    const button = buttonSelection.textContent.toUpperCase();
    buttonSelection.className = 'chosen';
    buttonSelection.disabled = true;
    letterFound = checkLetter(button);
    console.log(letterFound);
    checkWin();
});

// =============================  #10  =============================
// Create a checkWin function
function checkWin() {
    const showLetters = [...phraseToDisplay.getElementsByClassName('show')];
    const numShown = showLetters.length;
    for (let i = 0; i < getLetters.length; i++) {
        if (numLetters === numShown) {
            overlay.className = 'win';
            overlay.style.display = 'flex';
            window.setTimeout(2);
            overlay.querySelector('.title').textContent = 'You won!';
            overlay.querySelector('a').outerHTML = '<a class="btn__reset" onclick="location.reload();">Try again?</a>';
        }
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


}