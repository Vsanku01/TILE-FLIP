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
let card1 = false;
let card2 = false;
document.querySelectorAll('.card').forEach((item) => {
  item.addEventListener('click', function () {
    count += 1;
    if (count === 1) {
      let prevItem = item;
    }
    if (count === 2) {
      flipCard(item);
      console.log(prevItem);
      if (item.classList.contains('umbrella') && card1 === true) {
        alert('Score Raised');
      }
    }
    if (count === 3) {
      count = 0;
      console.log('Step Complete');
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
