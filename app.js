// Get the elements needed from HTML
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;


// Attach event listener to the "Start Game" button to hide the start screen overly
const overlay = document.getElementById('overlay');
const start = overlay.querySelector('a');

start.addEventListener('click', () => {
    overlay.style.display = 'none';
});


// Create array that contains at least 5 different phrases as strings
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


// Create a function that randomly chooses a phrase from phrases array,
// splits that phrase into a new array of characters,
// and returns the new character array
function getRandomPhraseAsArray(arr) {
    const randNum = Math.floor(Math.random() * 10);
    const randPhrase = arr[randNum];
    randPhrase.split('');
    return randPhrase;
}

const phraseArray = getRandomPhraseAsArray(phrases);


// Create function that loops through an array of characters,
// creates a list item for each character,
// puts the character inside list item,
// adds class "space" or "letter" to respective character,
// and appends list item to #phrase ul in HTML
function addPhraseToDisplay(arr) {
    const displayDiv = document.getElementById('phrase');
    const displayUl = displayDiv.querySelector('ul');
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li')
        li.textContent = arr[i];
        if (li.textContent === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        displayUl.appendChild(li);
    }
    return displayUl;
};

const phraseToDisplay = addPhraseToDisplay(phraseArray)

// let content;
// let letterSelection;

// function getLetters() {
//     let buttons = document.querySelectorAll('#qwerty button');
//     for (let i = 0; i < 26; i++) {
//         let content = buttons[i].textContent;
//     }
// }

function checkLetter(button) {
    const phraseLetters = phraseToDisplay.getElementsByClassName('letter');
    const letters = phraseLetters.textContent;
    for (let i = 0; i < 26; i++) {
        if (button === letters) {
            letters[i].className === 'letter';
            letters[i].className = 'show';
            return
        } else {
            null;
        }
    }
}

qwerty.addEventListener('click', (e) => {
    let letterSelection;
    letterSelection = e.target;
    console.log(letterSelection)
    const letterFound = [];
    letterSelection.className = 'chosen';
    letterSelection.disabled = true;
    checkLetter(e);
    letterFound.push(letterSelection);
});