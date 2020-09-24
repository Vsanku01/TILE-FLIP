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
link3.setAttribute('id', 'score');
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
instructionsPara.style.color = 'black';

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
const cur = new Date();
console.log(cur.getMinutes(), cur.getSeconds());
const TIME_LIMIT = 120;
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
    document.getElementById('timer').innerHTML = formatTime(timeLeft);

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

    // cards
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
let initialScore = 0;
let flipCount = 0;
let unFlipCount = 0;
document.querySelectorAll('.card').forEach((item) => {
  item.addEventListener('click', function () {
    count += 1;
    if (count === 1) {
      flipCard(item, count);
    }
    if (count === 2) {
      flipCard(item, count);
      //   if (
      //     item.classList.contains('umbrella') &&
      //     prevItem.classList.contains('umbrella')
      //   ) {
      //     flipCard(item, count);
      //     link3.innerText = `Score: ${initialScore + 10}`;
      //     flipCount += 2;
      //     console.log('Score Raised', flipCount);
      //   } else {
      //     flipCard(item, count);
      //     unFlipCount += 1;
      //     console.log('Failed Game', unFlipCount);
      //   }
      //   count = 0;
    }

    if (count === 3) {
      alert('You can only raise two cards at a time');
      return;
    }

    // item.classList.toggle('is-flipped');
  });
});

function flipCard(item, count) {
  console.log('Master count', count);
  // case - 1(bom)
  if (count === 1 && item.classList.contains('danger')) {
    console.log('entering case-1 case');
    item.classList.toggle('is-flipped');
    unFlipCount += 1;
    setTimeout(() => {
      item.classList.toggle('is-flipped');
    }, 2000);
    // print
    console.log('Flip Count', flipCount);
    console.log('Unflip Count', unFlipCount);
    return;
  }

  //   store umbrella
  if (count === 1 && item.classList.contains('umbrella')) {
    item.classList.toggle('is-flipped');
    prevItem = item;
    // print
    console.log('Flip Count', flipCount);
    console.log('Unflip Count', unFlipCount);
    return;
  }

  //   case - 3 (umb,bom)
  if (count === 2 && item.classList.contains('danger')) {
    console.log('entering case - 3');
    unFlipCount += 2;
    prevItem.classList.toggle('is-flipped');
    item.classList.toggle('is-flipped');
    setTimeout(() => {
      item.classList.toggle('is-flipped');
    }, 2000);
    // print
    console.log('Flip Count', flipCount);
    console.log('Unflip Count', unFlipCount);
    return;
  }

  //   case - 4(umb,umb)

  if (
    count === 2 &&
    item.classList.contains('umbrella') &&
    prevItem.classList.contains('umbrella')
  ) {
    console.log('entering case - 4');
    item.classList.toggle('is-flipped');
    flipCount += 2;
    // print
    console.log('Flip Count', flipCount);
    console.log('Unflip Count', unFlipCount);
    return;
  }
}
