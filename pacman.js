
// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var ghosts = [];
function createGhost(name, colour, character) {
  var createGhost = {
    'menu_option': ghosts.length + 1,
    'name': name,
    'colour': colour,
    'character': character,
    'edible': false,
  }
  ghosts.push(createGhost);
  return createGhost;
}

// replace this comment with your four ghosts setup as objects

var inky = createGhost('Inky', 'Red', 'Shadow');
var blinky = createGhost('Blinky', 'Cyan', 'Speedy');
var pinky = createGhost('Pinky', 'Pink', 'Bashful');
var clyde = createGhost('Clyde', 'Orange', 'Pokey');


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayPellets();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
}

function displayPellets() {
  console.log('Power Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if ( powerPellets > 0 ) {
    console.log('(p) Eat Power Pellet');
  }
  ghosts.forEach(function(ghost) {
    console.log('(' + ghost.menu_option + ') Eat ' + ghost.name + " (" + ghostEdible(ghost) + ")");
  });
  console.log('(q) Quit');
}

function ghostEdible(ghost) {
  if (ghost.edible === true) {
    return 'edible';
  } else if (ghost.edible === false) {
    return 'inedible';
  }
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    console.log(' ');
    lives --;
    if (lives < 0) {
      process.exit();
    };
    console.log('The ' + ghost.colour + ' ghost ' + ghost.name + ' ate Pac-man.');
  } else if (ghost.edible === true) {
    score += 200;
    console.log('\nPac-man consumes ' + ghost.name + ' and begins digestion. He feels ' + ghost.character);
    ghost.edible = false;
  }
}

function eatPowerPellet() {
  score += 50;
  powerPellets --;
  ghosts.forEach(function(ghost) {
    ghost.edible = true;
  });
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) {
      eatPowerPellet();
      break;
    } else {
      console.log('\nNo more pellets');
      break;
    }
    case '1':
    case '2':
    case '3':
    case '4':
      eatGhost(ghosts[key - 1]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
