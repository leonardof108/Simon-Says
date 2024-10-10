var currentSequence = [];
var userSequence = [];
var level = 0;

function startGame() {
  level = 0;
  currentSequence = [];
  $("h1").text("Level " + level);
  nextSequence();
}

function nextSequence() {
  level++;
  userSequence = [];
  $("h1").text("Level " + level);
  
  // Generate a random color and add it to the sequence
  var colors = ["green", "red", "yellow", "blue"];
  var randomColor = colors[Math.floor(Math.random() * 4)];
  currentSequence.push(randomColor);

  playSequence(); // Display the current sequence
}

function playSequence() {
  var i = 0;
  var interval = setInterval(function() {
    blink("#" + currentSequence[i]);
    i++;
    if (i >= currentSequence.length) {
      clearInterval(interval);
    }
  }, 600); // Adjust time between flashes
}

function blink(item) {
  $(item).animate({ opacity: 0.25 }, 250).animate({ opacity: 1 }, 250);
}

// Handle user's clicks
$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userSequence.push(userChosenColor);
  blink("#" + userChosenColor);
  
  // Check if user clicked correctly
  checkSequence(userSequence.length - 1);
});

function checkSequence(currentIndex) {
  if (userSequence[currentIndex] === currentSequence[currentIndex]) {
    // If the user completed the sequence
    if (userSequence.length === currentSequence.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000); // Wait a second before showing the next sequence
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("h1").text("Game Over! Press A Key to Restart");
  currentSequence = [];
  userSequence = [];
  level = 0;
}

// Start game when pressing "A"
$(document).on("keypress", function(e) {
  if (e.key.toLowerCase() === "a" && level === 0) {
    startGame();
  }else if(e.key.toLowerCase() !== "a" && level === 0){
    $("h1").addClass("shake");
    setTimeout(function () {
      $("h1").removeClass("shake");
    }, 250);
  }
});
