// CSS
// alert('Please read the instructions and start the Game :)')
let htmlStyles = window.getComputedStyle(document.querySelector('html'));
let rowNum = parseInt(htmlStyles.getPropertyValue('--rowNum'));
let colNum = parseInt(htmlStyles.getPropertyValue('--colNum'));
console.log(rowNum, colNum);

// Variables
let width = colNum;
let umbrellaCount = 28;
let height = rowNum;
let squares = [];

// Bg
const bg = document.createElement('div');
bg.classList.add('bg');

document.body.append(bg);

const bg2 = document.createElement('div');
bg2.classList.add('bg');
bg2.classList.add('bg2');

document.body.append(bg2);

const bg3 = document.createElement('div');
bg3.classList.add('bg');
bg3.classList.add('bg3');

document.body.append(bg3);

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
link2.setAttribute('href', '#');
link2.setAttribute('id', 'timer');
link2.innerText = 'Timer';

navOptions.append(link2);

const link3 = document.createElement('a');
link3.setAttribute('href', '#');
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
instructionsPara.innerHTML = `<div class="flex-content">
<div class="content">
  <h1>LET’S PLAY THE GAME OF TILE FLIP</h1>
  <p>
    1. Tile flip is a card game in which all of the cards are laid
    face down on a surface and two cards are flipped face up over each
    turn
  </p>

  <p>
    2. The object of the game is to turn over pairs of matching cards.
  </p>

  <p>3. You are allowed to select only two cards at a time</p>

  <p>
    4. If both the selected cards have umbrella then you'll receive
    points
  </p>


  <p>5. There will be a game timer which is set for 2 min.The timer gets reset automatically after the time elapses.</p>

  <p>6. Start and Reset button will be available in the instructions Page.</p>

  <p>
    7. More cards you flip correctly , you'll receive high score !!!!
    :)
  </p>
  <button type="button" onclick="modal.style.display = 'none';startTimer();" class = "start-btn">Start</button>
  <button type="button" onclick="modal.style.display = 'none';startTimer();" class = "start-btn">Reset</button>
</div>
<div class="image">
  <img src="./assets/Boy.PNG" alt="pic" />
</div>
</div>`;
instructionsPara.style.color = 'black';

modalContent.append(instructionsPara);

// modal logic
const modal = document.getElementById('myModal');
const instructBtn = document.getElementById('instructions');
const span = document.getElementsByClassName('close')[0];

function openModal() {
  instructionsModal.style.display = 'block';
}
span.onclick = function () {
  modal.style.display = 'none';
};

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

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById('timer').innerText = `Timer:  ${formatTime(
      timeLeft
    )}`;
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

// create board
function createBoard(width, height) {
  console.log(width, height);
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

// dynamic rendering

createBoard(width, height);

let count = 0;
var prevItem = '';
var prevId = 0;
let initialScore = 0;
let flipCount = 0;
let unFlipCount = 0;
let flag = true;
document.querySelectorAll('.card').forEach((item) => {
  item.addEventListener('click', function () {
    count += 1;
    if (count === 1) {
      if (item.classList.contains('danger')) {
        flag = false;
        console.log('BMB CASE');
        console.log('first-danger-count-in', count);
        item.classList.toggle('is-flipped');
        unFlipCount += 1;
        setTimeout(() => {
          item.classList.toggle('is-flipped');
        }, 3000);
        count = 0;
        console.log('first-danger-count-fin', count);
        alert('You clicked bomb on first tap itself');
        return;
      } else if (item.classList.contains('umbrella') && true) {
        console.log('UMB CASE');
        flipCard(item, count);
      }
    }
    if (count === 2) {
      flipCard(item, count);
    }

    if (count === 3) {
      // alert('You can only raise two cards at a time');
      count = 0;
    }

    // item.classList.toggle('is-flipped');
  });
});

function flipCard(item, count) {
  //   store umbrella
  if (count === 1 && item.classList.contains('umbrella')) {
    console.log('first-um-cnt', count);
    if (!item.classList.contains('is-flipped')) {
      item.classList.toggle('is-flipped');
    }
    prevItem = item;
    // print
    console.log('Flip Count', flipCount);
    console.log('Unflip Count', unFlipCount);
    return;
  }

  //   case - 2 (umb,bom)
  if (count === 2 && item.classList.contains('danger')) {
    console.log('UMB_BMB CASE');
    console.log('first-um-bom-in', count);
    unFlipCount += 2;
    if (!item.classList.contains('is-flipped')) {
      count = 0;
      item.classList.toggle('is-flipped');
      setTimeout(() => {
        item.classList.toggle('is-flipped');
      }, 2000);
    }
    prevItem.classList.toggle('is-flipped');
    // print
    console.log('Flip Count', flipCount);
    console.log('Unflip Count', unFlipCount);

    console.log('first-um-bom-fin', count);
    return;
  }

  //   case - 3(umb,umb)

  if (
    count === 2 &&
    item.classList.contains('umbrella') &&
    prevItem.classList.contains('umbrella')
  ) {
    console.log('UMB_UMB CASE');
    console.log('first-um-um-in', count);
    if (!item.classList.contains('is-flipped')) {
      item.classList.toggle('is-flipped');
      flipCount += 2;
      count = 0;
      link3.innerText = `Score: ${flipCount}`;
    }

    // print
    console.log('Flip Count', flipCount);
    console.log('Unflip Count', unFlipCount);

    console.log('first-um-um-fin', count);
    return;
  }
}

// pop up
const popUp = document.createElement('div');
popUp.classList.add('popup');
popUp.classList.add('center');
popUp.innerHTML = `  <div class="icon">
<i class="fa fa-check" id='icon'></i>
</div>
<div class="title" id='title'>
Success!!
</div>
<div class="description" id ="description">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nihil provident voluptatem nulla placeat
</div>
<div class="dismiss-btn">
<button id="dismiss-popup-btn">
  Dismiss
</button>
</div>`;

document.body.append(popUp);

const center = document.createElement('div');
center.classList.add('center');
center.innerHTML = `  <button id="open-popup-btn">
Next
</button>`;

const dismiss = document
  .getElementById('dismiss-popup-btn')
  .addEventListener('click', function () {
    console.log('cliekced');
    document.getElementsByClassName('popup')[0].classList.remove('active');
  });

console.log(dismiss);

function onTimesUp() {
  clearInterval(timerInterval);
  // console.log(width, height);
  // document.documentElement.style.setProperty('--width', '440px');
  // document.documentElement.style.setProperty('--height', '275px');
  // document.documentElement.style.setProperty('--rowNum', 5);
  // document.documentElement.style.setProperty('--colNum', 8);
  if (flipCount > 18) {
    document.getElementsByClassName('popup')[0].classList.add('active');
    document.getElementById('title').innerText = `Success: ${flipCount}`;
    document.getElementById('description').innerText =
      'Congrats!! You have cleared the level';
    setTimeout(() => {
      location.replace('level1.html');
    }, 3000);
  } else {
    document.getElementsByClassName('popup')[0].classList.add('active');
    document.getElementById('title').innerText = `Score: ${flipCount}`;
    document.getElementById('description').innerText =
      'Sorry, you did not cleared the level, please try again!!';
    document.getElementById('icon').classList.add('fa');
    document.getElementById('icon').classList.remove('fa-check');
    document.getElementById('icon').classList.add('fa-times');
    setTimeout(() => {
      location.replace('index.html');
    }, 3000);
  }
}

// Animations

const area = document.createElement('div');
area.classList.add('area');
document.body.append(area);

const circles = document.createElement('ul');
circles.classList.add('circles');

area.append(circles);

circles.innerHTML = `<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>`;
