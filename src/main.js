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

const body = document.querySelector('body')

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






//footer
const footer = document.createElement('footer')
footer.classList.add('section')
footer.appendChild(document.createTextNode('Memory Game © 2026'))
body.appendChild(footer)