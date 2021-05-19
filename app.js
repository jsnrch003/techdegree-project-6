// =============================  #2  =============================
// Get the elements needed from HTML

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;


// =============================  #3  =============================
// Attach event listener to the "Start Game" button to hide the start screen overlay

const overlay = document.getElementById('overlay');
const start = overlay.querySelector('a');

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
    const randNum = Math.floor(Math.random() * 10);
    const randPhrase = arr[randNum]; // Create a function that randomly chooses a phrase from phrases array,
    randPhrase.split(''); // splits that phrase into a new array of characters,
    return randPhrase; // and returns the new character array
}

const phraseArray = getRandomPhraseAsArray(phrases);


// =============================  #6  =============================
// Set the game display

function addPhraseToDisplay(arr) {
    const displayDiv = document.getElementById('phrase');
    const displayUl = displayDiv.querySelector('ul');

    for (let i = 0; i < arr.length; i++) {  // Create function that loops through an array of characters,
        const li = document.createElement('li'); // creates a list item for each character,
        li.textContent = arr[i]; // puts the character inside list item,
        if (li.textContent === ' ') { // adds class "space" or "letter" to respective character,
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        displayUl.appendChild(li); // and appends list item to #phrase ul in HTML
    }
    return displayUl;
};

const phraseToDisplay = addPhraseToDisplay(phraseArray);


// =============================  #7  =============================
// Create a checkLetter function

function checkLetter(button) { // function should have one parameter: the button player has clicked
    const getLetters = [...phraseToDisplay.getElementsByClassName('letter')]; // get all elements with class "letter"
    for (let i = 0; i < getLetters.length; i++) { // loop over letters and check if they match button player has clicked

        // I need getLetters[i].textContent.toLowerCase for if button conditional; 
        // but if I do, the whole phrase uncovers with one button click on any letter.

        if (button === getLetters[i].textContent) { // if button matches letter
            getLetters[i].className = 'show'; // add "show" class to list item
            let match = getLetters[i]; // and store matching letter in a variable
        } else {
            null;
        }
    }
}


// =============================  #8  =============================
// Add an event listener to keyboard

qwerty.addEventListener('click', (e) => {
    const buttonSelection = e.target;
    const button = buttonSelection.textContent;
    buttonSelection.className = 'chosen';
    buttonSelection.disabled = true;
    checkLetter(button); // button text.Content is .tolowerCase
});