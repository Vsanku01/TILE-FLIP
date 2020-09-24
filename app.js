// Header

// Components
const header = document.createElement('header');
document.body.append(header);

const topNav = document.createElement('div');
topNav.classList.add('topnav');

header.append(topNav);

const navTitle = document.createElement('div');
navTitle.classList.add('title');

topNav.append(navTitle);

const mainText = document.createElement('h1');
mainText.innerText = 'Tile Flip';
mainText.style.color = 'White';

navTitle.append(mainText);

const navOptions = document.createElement('div');
navOptions.classList.add('nav-options');

topNav.append(navOptions);

const link1 = document.createElement('a');
link1.setAttribute('href', '#');
link1.classList.add('active');
link1.classList.add('instructions');
link1.innerText = 'Instructions';
link1.setAttribute('onclick', 'openModal()');
link1.setAttribute('id', 'instruct');

navOptions.append(link1);

const link2 = document.createElement('a');
link2.setAttribute('href', 'dom.html');
link2.setAttribute('id', 'timer');
link2.innerText = 'Timer';

navOptions.append(link2);

const link3 = document.createElement('a');
link3.setAttribute('href', 'dom.html');
link3.innerText = 'Score';

navOptions.append(link3);

// End Navbar

// Modal
const instructionsModal = document.createElement('div');
instructionsModal.classList.add('modal');
instructionsModal.setAttribute('id', 'myModal');

document.body.append(instructionsModal);

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

instructionsModal.append(modalContent);

const closeSpan = document.createElement('span');
closeSpan.classList.add('close');
closeSpan.innerText = '*';
modalContent.style.color = 'white';

modalContent.append(closeSpan);

const instructionsPara = document.createElement('p');
instructionsPara.innerHTML = '<p>Hello</p>';

modalContent.append(instructionsPara);

// modal logic
const modal = document.getElementById('myModal');
const instructBtn = document.getElementById('instructions');
const span = document.getElementsByClassName('close')[0];

function openModal() {
  instructionsModal.style.display = 'block';
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
// Modal end

// Timer Logic
const cur  = new Date()
console.log(cur.getMinutes(), cur.getSeconds())
const TIME_LIMIT = 10 ;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

startTimer();
function onTimesUp() {
  clearInterval(timerInterval);
  alert('Game Over');
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById('instruct').innerHTML = formatTime(
      timeLeft
    );

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

// Timer End

const grid = document.createElement('div');
grid.classList.add('grid');

document.body.append(grid);

let width = 7;
let umbrellaCount = 20;
let height = 4;
let squares = [];
// create board
function createBoard() {
  // get shuffled umbrella cards
  const umbrellaArray = Array(umbrellaCount).fill('umbrella');
  const dangerArray = Array(width * height - umbrellaCount).fill('danger');
  const gamesArray = dangerArray.concat(umbrellaArray);
  const shuffledArray = gamesArray.sort(() => Math.random() - 0.5);

  for (let i = 0; i < width * height; i++) {
    const square = document.createElement('div');
    square.setAttribute('id', i);
    square.classList.add(shuffledArray[i]);
    square.classList.add('card');
    grid.appendChild(square);
    squares.push(square);

    // test
    const cardFaceFront = document.createElement('div');
    cardFaceFront.classList.add('card__face');
    cardFaceFront.classList.add('card__face--front');

    const cardFaceBack = document.createElement('div');
    cardFaceBack.classList.add('card__face');
    cardFaceBack.classList.add('card__face--back');

    square.append(cardFaceFront);
    square.append(cardFaceBack);
  }
}

createBoard();

let count = 0;
var prevItem = '';
document.querySelectorAll('.card').forEach((item) => {
  item.addEventListener('click', function () {
    count += 1;
    console.log(count);
    if (count === 1) {
      prevItem = item;
      flipCard(item);
    }
    if (count === 2) {
      if (
        item.classList.contains('umbrella') &&
        prevItem.classList.contains('umbrella')
      ) {
        flipCard(item);
        console.log('Score Raised');
      } else {
        flipCard(item);
        console.log('Failed Game');
        return;
      }

      count = 0;
    }

    // item.classList.toggle('is-flipped');
  });
});

function cardSelect(item) {
  flipCard(item);
}

function flipCard(item) {
  item.classList.toggle('is-flipped');
  if (item.classList.contains('umbrella')) {
    return;
  }
  setTimeout(() => {
    item.classList.toggle('is-flipped');
  }, 2000);
}
