// create game letters
const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let gameLetters = document.querySelector(".game-letters");

// loop over the letters and construct span for each letter
lettersArray.forEach((letter) => {
  let span = document.createElement("span");

  let spanLetter = document.createTextNode(letter.toUpperCase());

  span.className = "letter-box";

  span.append(spanLetter);
  gameLetters.append(span);
});

// fetch data
fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    // getting the word and gategory

    let data = res;

    let allKeys = Object.keys(data);

    let randomKeyIndex = Math.floor(allKeys.length * Math.random());

    let category = allKeys[randomKeyIndex];

    let categorySpan = document.querySelector(".category span");

    categorySpan.innerHTML = category;

    let wordsArray = data[category];

    let randomWordIndex = Math.floor(wordsArray.length * Math.random());

    let word = wordsArray[randomWordIndex];

    // fill the guess letters

    let letterGuess = document.querySelector(".letter-guess");

    let wordArray = Array.from(word.toLowerCase());

    let wordLengthWithoutSpace = word.length;

    wordArray.forEach((letter) => {
      let span = document.createElement("span");

      if (letter === " ") {
        span.className = "space";
        wordLengthWithoutSpace--;
      }

      letterGuess.append(span);
    });

    // the logic of the game

    let guessSpan = document.querySelectorAll(".letter-guess span");

    let wrongAttempts = 0;

    let rightAttempts = 0;

    let theDraw = document.querySelector(".hangman-draw");

    document.addEventListener("click", (e) => {
      let status = false;
      if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        let clickedLetter = e.target.innerHTML.toLowerCase();

        wordArray.forEach((letter, index) => {
          if (clickedLetter === letter) {
            status = true;
            rightAttempts++;
            guessSpan[index].innerHTML = clickedLetter;
          }
        });

        if (status === false) {
          wrongAttempts++;

          theDraw.classList.add(`wrong-${wrongAttempts}`);

          document.getElementById("fail").pause();
          document.getElementById("fail").currentTime = 0;

          document.getElementById("fail").play();

          if (wrongAttempts === 8) {
            endGame();
            gameLetters.classList.add("finished");
          }
        } else {
          // Play Success Sound

          document.getElementById("success").pause();
          document.getElementById("success").currentTime = 0;

          document.getElementById("success").play();

          if (rightAttempts === wordLengthWithoutSpace) {
            winGame();
            gameLetters.classList.add("finished");
          }
        }
      }
    });

    function endGame() {
      // Create Popup Div
      let div = document.createElement("div");

      // Create Text
      let divText = document.createTextNode(`Game Over, The Word Is ${word}`);

      // Append Text To Div
      div.appendChild(divText);

      // Add Class On Div
      div.className = "popup";

      // Append To The Body
      document.body.appendChild(div);

      document.getElementById("game-over").play();
    }

    function winGame() {
      // Create Popup Div
      let div = document.createElement("div");

      // Create Text
      let divText = document.createTextNode(`Congraturlations. You Win!`);

      // Append Text To Div
      div.appendChild(divText);

      // Add Class On Div
      div.className = "popup";

      // Append To The Body
      document.body.appendChild(div);

      document.getElementById("win").play();
    }
  });
