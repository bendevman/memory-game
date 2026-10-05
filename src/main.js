import 'modern-normalize'
import './style.css'

import question_mark from './assets/question_mark.png'
import monster_1 from './assets/monster_1.png'
import monster_2 from './assets/monster_2.png'
import monster_3 from './assets/monster_3.png'
import monster_4 from './assets/monster_4.png'
import monster_5 from './assets/monster_5.png'
import monster_6 from './assets/monster_6.png'
import monster_7 from './assets/monster_7.png'
import monster_8 from './assets/monster_8.png'

const cards = [
  {
    id: 1,
    url: monster_1, 
  },
  {
    id: 2,
    url: monster_2, 
  },
  {
    id: 3,
    url: monster_3, 
  },
  {
    id: 4,
    url: monster_4, 
  },
  {
    id: 5,
    url: monster_5, 
  },
  {
    id: 6,
    url: monster_6, 
  },
  {
    id: 7,
    url: monster_7, 
  },
  {
    id: 8,
    url: monster_8, 
  }
]
const deck = [...cards, ...cards]

const body = document.querySelector('body')

function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

shuffle(deck)

function fillBoard(board, cards) {
  cards.forEach(card => {
    const boardItem = document.createElement('li')
    boardItem.classList.add('board__item')
    boardItem.id = card.id
    const boardItemImgFront = document.createElement('img')
    boardItemImgFront.classList.add('board__item-img','board__item-img-front')
    boardItemImgFront.src = card.url
    const boardItemImgBack = document.createElement('img')
    boardItemImgBack.classList.add('board__item-img','board__item-img-back')
    boardItemImgBack.src = question_mark
    boardItem.appendChild(boardItemImgFront)
    boardItem.appendChild(boardItemImgBack)
    board.appendChild(boardItem)
  });
}


//header
const header = document.createElement('header')
header.classList.add('section')

const nav = document.createElement('nav')

const newGameButton = document.createElement('button')
newGameButton.classList.add('btn', 'new-game-btn')
newGameButton.appendChild(document.createTextNode('New game'))
nav.appendChild(newGameButton)

const leadersBoardButton = document.createElement('button')
leadersBoardButton.classList.add('btn', 'leaders-board-btn')
leadersBoardButton.appendChild(document.createTextNode('Leaders board'))
nav.appendChild(leadersBoardButton)

header.appendChild(nav)
body.appendChild(header)

//main
const main = document.createElement('main')
main.classList.add('section')

const board = document.createElement('ul')
board.classList.add('board')
main.appendChild(board)
body.appendChild(main)

fillBoard(board, deck)



//footer
const footer = document.createElement('footer')
footer.classList.add('section')
footer.appendChild(document.createTextNode('Memory Game © 2026'))
body.appendChild(footer)