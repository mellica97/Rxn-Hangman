window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];


  var word;              // Selected word
  var guess;             // Geuss
  var geusses = [];      // Stored geusses
  var lives;             // Lives
  var counter;           // Count correct geusses
  var mistakes;           //count mistakes
  var guessNum = 0;           // Count guess

  // Get elements
  var showLives = document.getElementById("mylives");
  var answer = document.getElementById("answer");
  var wrongletters = document.getElementById("wrongletters");
  var wordHolder = document.getElementById('hold');
  var myButtons = document.getElementById('buttons');

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');
    letters.id = 'alphabet';
    for (var i = 0; i < alphabet.length; i++) {
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


  // Create geusses ul
  result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }


  // Show lives
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter === geusses.length && mistakes < 10) {
        showLives.innerHTML = "You Win!";
      }
    }
  }


  // hangman picture
  var updateHangmanPic = function () {
    if (mistakes <= 10) {
      document.getElementById("hangmanPic").src = "images/" + mistakes + ".gif";
    }
  }


  // OnClick Function
  check = function () {
    list.onclick = function () {
      guessNum += 1;
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        wrongletters.innerHTML = wrongletters.innerHTML + "  " + geuss;
        mistakes += 1;
        updateHangmanPic();
      } else {
        comments();
      }
    }
  }


  //countdown function
  function countdown(elementName, minutes, seconds) {
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits(n) {
      return (n <= 9 ? "0" + n : n);
    }

    function updateTimer() {
      msLeft = endTime - (+new Date);
      if (msLeft < 1000) {
        element.innerHTML = "Time is up!";
        showLives.innerHTML = "Game Over";
        answer.innerHTML = "Correct answer: " + word;
        letters.parentNode.removeChild(letters);
      } else {
        time = new Date(msLeft);
        hours = time.getUTCHours();
        mins = time.getUTCMinutes();
        element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
        setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
      }
    }

    element = document.getElementById(elementName);
    endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
  }

  //countdown button
  document.getElementById('countdown-btn').onclick = function () {
    wrongletters.innerHTML = "";
    answer.innerHTML = "";
    myButtons.innerHTML = "";
    wordHolder.innerHTML = "";
    countdown("ten-countdown", 10, 0);
    play();
    updateHangmanPic();
  }


  // Play
  play = function () {

    countries = ['iran', 'america', 'canada', 'china', 'japan', 'france', 'germany', 'greece',
      'hungary', 'inida', 'maldives', 'niger', 'philippines', 'russia', 'spain', 'sweden', 'syria',
      'turkey', 'ukraine', 'vietnam', 'thailand', 'norway', 'mexico', 'finland', 'chile', 'brazil'];

    word = countries[Math.floor(Math.random() * countries.length)];
    console.log(word);
    buttons();
    geusses = [];
    lives = 10;
    counter = 0;
    mistakes = 0;
    guessNum = 0;
    result();
    comments();

  }

}


