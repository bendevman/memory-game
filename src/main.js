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
const openCards = []
const currentCards = []
let movesCount = 0;
let matchiesCount = 0;
const now = new Date(); 

const liderBoard = []
if (localStorage.getItem('liderBoard')) {
  liderBoard.push(...JSON.parse(localStorage.getItem('liderBoard')))
}


const body = document.querySelector('body')

function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

shuffle(deck)

function fillBoard(cards) {
  let count = 1;
  cards.forEach(card => {
    const boardItem = document.createElement('li')
    boardItem.classList.add('board__item')
    boardItem.id = count
    boardItem.dataset.id = card.id
    count += 1
    const boardItemImgFront = document.createElement('img')
    boardItemImgFront.classList.add('board__item-img','board__item-img-front')
    boardItemImgFront.src = card.url
    boardItemImgFront.setAttribute('draggable', false);
    const boardItemImgBack = document.createElement('img')
    boardItemImgBack.classList.add('board__item-img','board__item-img-back')
    boardItemImgBack.setAttribute('draggable', false);
    boardItemImgBack.src = question_mark
    boardItem.appendChild(boardItemImgFront)
    boardItem.appendChild(boardItemImgBack)
    board.appendChild(boardItem)
  });
}

function open(){
  modal.classList.add('active')
  body.classList.add('no-scroll')
}

function close(){
  modal.classList.remove('active')
  body.classList.remove('no-scroll')
}

function resetGame(){
  console.log('new game')
  board.replaceChildren();
  shuffle(deck)
  fillBoard(deck)
  movesCount = 0
  matchiesCount = 0
  moves.innerText = `Moves - ${movesCount}`
  matchies.innerText = `Matchies - ${matchiesCount} of 8`
  close()
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

const newGameBtn = document.createElement('button')
newGameBtn.classList.add('btn', 'new-game-btn')
newGameBtn.appendChild(document.createTextNode('New game'))

const closeBtn = document.createElement('button')
closeBtn.classList.add('btn', 'close-btn')
closeBtn.appendChild(document.createTextNode('Close'))

header.appendChild(nav)
body.appendChild(header)

//main
const main = document.createElement('main')
main.classList.add('section')

const stats = document.createElement('div')
stats.classList.add('stats')
const moves = document.createElement('span')
moves.classList.add('moves')
moves.appendChild(document.createTextNode('Moves - 0'))
const matchies = document.createElement('span')
matchies.classList.add('matchies')
matchies.appendChild(document.createTextNode('Matchies - 0 of 8'))

stats.appendChild(moves)
stats.appendChild(matchies)
main.appendChild(stats)

const board = document.createElement('ul')
board.classList.add('board')
main.appendChild(board)
body.appendChild(main)

fillBoard(deck)

//footer
const footer = document.createElement('footer')
footer.classList.add('section')
footer.appendChild(document.createTextNode('Memory game © 2026'))
body.appendChild(footer)

//modal
const modal = document.createElement('div')
modal.classList.add('modal')
const box = document.createElement('div')
box.classList.add('box')
const title = document.createElement('h2')
title.classList.add('title')
const text = document.createElement('div')
text.classList.add('text')

box.appendChild(title)
box.appendChild(text)
box.appendChild(newGameBtn)
box.appendChild(closeBtn)
modal.appendChild(box)
body.appendChild(modal)

board.addEventListener('click',(event)=>{
  if (currentCards.length < 2) { 
    const boardItem = event.target.closest('.board__item')
    if (boardItem && !boardItem.classList.contains('active')) {
      boardItem.classList.add('active')
      currentCards.push(boardItem)
      if (currentCards.length === 2) {
        movesCount += 1
        console.log("moves - ", movesCount)
        moves.innerText = `Moves - ${movesCount}`      
        if (currentCards[0].dataset.id === currentCards[1].dataset.id) {
          matchiesCount += 1
          console.log("matchies -", matchiesCount)
          matchies.innerText = `Matchies - ${matchiesCount} of 8`  
          openCards.push(...currentCards)
          if (openCards.length === 16) {
            console.log('Winner')
            const win = {
              moves: movesCount,
              date: now.toLocaleDateString('en-GB')
            }
            liderBoard.push(win)
            localStorage.setItem('liderBoard', JSON.stringify(liderBoard))
            title.innerText = 'Winner!' 
            text.innerText = `You found all matchies in ${movesCount} moves`
            open()
          }
          currentCards.length = 0;
        } else {
          setTimeout(()=>{
            currentCards[0].classList.remove('active');
            currentCards[1].classList.remove('active');
            currentCards.length = 0;
          },700)
        }
      }
    }
  }
  console.log(openCards)
})

newGameButton.addEventListener('click', resetGame)
newGameBtn.addEventListener('click', resetGame)
closeBtn.addEventListener('click', close)
modal.addEventListener('click', (event)=>{
  if (event.target.classList.contains('modal')) {
    close()
  }
})

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    close()
  }
});

leadersBoardButton.addEventListener('click',()=>{
  title.innerText = 'Lider board'
  console.log(liderBoard)
  text.replaceChildren();
  if (liderBoard.length) {
    liderBoard.sort((a, b)=> a.moves - b.moves)
    liderBoard.splice(10)
    let liderCount = 1
    liderBoard.forEach(lider => {
      const line = document.createElement('span')
      line.innerText= `place: ${liderCount} moves: ${lider.moves} date: ${lider.date}`
      text.appendChild(line)
      liderCount += 1
    });
  } else {
    text.innerText = 'There is no winers yet'
  }
  open()
})