# Techdegree Project 6 -- Game Show App

In this project, I created a word guessing game, “Wheel of Success”, where players click letters from an onscreen keyboard to try to guess a random phrase.

Team Treehouse provided the HTML and CSS. All JavaScript is my own.

Using Javascript, I created an array of phrases and write functions to choose a random phrase from that array, split the phrase into letters, and put those letters onto the game board.

Each time the player guesses a letter, the letter the player has chosen is compared with the random phrase. If the letter is in the phrase, the game board is updated with the chosen letters.

A player can keep choosing letters until they make five incorrect guesses. If the letter they chose isn’t in the phrase, one of the player’s 5 guesses is removed.

If the player completes the phrase before they run out of guesses, a winning screen will display. If the player guesses incorrectly 5 times, a losing screen will display.

A player can guess a letter only once. After they’ve guessed a letter, that letter is disabled.
