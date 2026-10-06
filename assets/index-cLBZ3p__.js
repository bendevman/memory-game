//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/assets/question_mark.png
var question_mark_default = new URL("question_mark-5cVfaNYh.png", import.meta.url).href;
//#endregion
//#region src/assets/monster_1.png
var monster_1_default = new URL("monster_1-D_d65baf.png", import.meta.url).href;
//#endregion
//#region src/assets/monster_2.png
var monster_2_default = new URL("monster_2-CDmsVi7Y.png", import.meta.url).href;
//#endregion
//#region src/assets/monster_3.png
var monster_3_default = new URL("monster_3-BRS2QRRC.png", import.meta.url).href;
//#endregion
//#region src/assets/monster_4.png
var monster_4_default = new URL("monster_4-Ce1ogdod.png", import.meta.url).href;
//#endregion
//#region src/assets/monster_5.png
var monster_5_default = new URL("monster_5-BHVaZVIK.png", import.meta.url).href;
//#endregion
//#region src/assets/monster_6.png
var monster_6_default = new URL("monster_6-BhyWstGU.png", import.meta.url).href;
//#endregion
//#region src/assets/monster_7.png
var monster_7_default = new URL("monster_7-_kLZH7Kc.png", import.meta.url).href;
//#endregion
//#region src/assets/monster_8.png
var monster_8_default = new URL("monster_8-bOzLdkGf.png", import.meta.url).href;
//#endregion
//#region src/main.js
var cards = [
	{
		id: 1,
		url: monster_1_default
	},
	{
		id: 2,
		url: monster_2_default
	},
	{
		id: 3,
		url: monster_3_default
	},
	{
		id: 4,
		url: monster_4_default
	},
	{
		id: 5,
		url: monster_5_default
	},
	{
		id: 6,
		url: monster_6_default
	},
	{
		id: 7,
		url: monster_7_default
	},
	{
		id: 8,
		url: monster_8_default
	}
];
var deck = [...cards, ...cards];
var openCards = [];
var currentCards = [];
var movesCount = 0;
var matchiesCount = 0;
var now = /* @__PURE__ */ new Date();
var liderBoard = [];
if (localStorage.getItem("liderBoard")) liderBoard.push(...JSON.parse(localStorage.getItem("liderBoard")));
var body = document.querySelector("body");
function shuffle(cards) {
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}
}
shuffle(deck);
function fillBoard(cards) {
	let count = 1;
	cards.forEach((card) => {
		const boardItem = document.createElement("li");
		boardItem.classList.add("board__item");
		boardItem.id = count;
		boardItem.dataset.id = card.id;
		count += 1;
		const boardItemImgFront = document.createElement("img");
		boardItemImgFront.classList.add("board__item-img", "board__item-img-front");
		boardItemImgFront.src = card.url;
		boardItemImgFront.setAttribute("draggable", false);
		const boardItemImgBack = document.createElement("img");
		boardItemImgBack.classList.add("board__item-img", "board__item-img-back");
		boardItemImgBack.setAttribute("draggable", false);
		boardItemImgBack.src = question_mark_default;
		boardItem.appendChild(boardItemImgFront);
		boardItem.appendChild(boardItemImgBack);
		board.appendChild(boardItem);
	});
}
function open() {
	modal.classList.add("active");
	body.classList.add("no-scroll");
}
function close() {
	modal.classList.remove("active");
	body.classList.remove("no-scroll");
}
function resetGame() {
	console.log("new game");
	board.replaceChildren();
	shuffle(deck);
	fillBoard(deck);
	movesCount = 0;
	matchiesCount = 0;
	moves.innerText = `Moves - ${movesCount}`;
	matchies.innerText = `Matchies - ${matchiesCount} of 8`;
	close();
}
var header = document.createElement("header");
header.classList.add("section");
var nav = document.createElement("nav");
var newGameButton = document.createElement("button");
newGameButton.classList.add("btn", "new-game-btn");
newGameButton.appendChild(document.createTextNode("New game"));
nav.appendChild(newGameButton);
var leadersBoardButton = document.createElement("button");
leadersBoardButton.classList.add("btn", "leaders-board-btn");
leadersBoardButton.appendChild(document.createTextNode("Leaders board"));
nav.appendChild(leadersBoardButton);
var newGameBtn = document.createElement("button");
newGameBtn.classList.add("btn", "new-game-btn");
newGameBtn.appendChild(document.createTextNode("New game"));
var closeBtn = document.createElement("button");
closeBtn.classList.add("btn", "close-btn");
closeBtn.appendChild(document.createTextNode("Close"));
header.appendChild(nav);
body.appendChild(header);
var main = document.createElement("main");
main.classList.add("section");
var stats = document.createElement("div");
stats.classList.add("stats");
var moves = document.createElement("span");
moves.classList.add("moves");
moves.appendChild(document.createTextNode("Moves - 0"));
var matchies = document.createElement("span");
matchies.classList.add("matchies");
matchies.appendChild(document.createTextNode("Matchies - 0 of 8"));
stats.appendChild(moves);
stats.appendChild(matchies);
main.appendChild(stats);
var board = document.createElement("ul");
board.classList.add("board");
main.appendChild(board);
body.appendChild(main);
fillBoard(deck);
var footer = document.createElement("footer");
footer.classList.add("section");
footer.appendChild(document.createTextNode("Memory game © 2026"));
body.appendChild(footer);
var modal = document.createElement("div");
modal.classList.add("modal");
var box = document.createElement("div");
box.classList.add("box");
var title = document.createElement("h2");
title.classList.add("title");
var text = document.createElement("div");
text.classList.add("text");
box.appendChild(title);
box.appendChild(text);
box.appendChild(newGameBtn);
box.appendChild(closeBtn);
modal.appendChild(box);
body.appendChild(modal);
board.addEventListener("click", (event) => {
	if (currentCards.length < 2) {
		const boardItem = event.target.closest(".board__item");
		if (boardItem && !boardItem.classList.contains("active")) {
			boardItem.classList.add("active");
			currentCards.push(boardItem);
			if (currentCards.length === 2) {
				movesCount += 1;
				console.log("moves - ", movesCount);
				moves.innerText = `Moves - ${movesCount}`;
				if (currentCards[0].dataset.id === currentCards[1].dataset.id) {
					matchiesCount += 1;
					console.log("matchies -", matchiesCount);
					matchies.innerText = `Matchies - ${matchiesCount} of 8`;
					openCards.push(...currentCards);
					if (openCards.length === 16) {
						console.log("Winner");
						const win = {
							moves: movesCount,
							date: now.toLocaleDateString("en-GB")
						};
						liderBoard.push(win);
						localStorage.setItem("liderBoard", JSON.stringify(liderBoard));
						title.innerText = "Winner!";
						text.innerText = `You found all matchies in ${movesCount} moves`;
						open();
					}
					currentCards.length = 0;
				} else setTimeout(() => {
					currentCards[0].classList.remove("active");
					currentCards[1].classList.remove("active");
					currentCards.length = 0;
				}, 700);
			}
		}
	}
	console.log(openCards);
});
newGameButton.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
closeBtn.addEventListener("click", close);
modal.addEventListener("click", (event) => {
	if (event.target.classList.contains("modal")) close();
});
window.addEventListener("keydown", (event) => {
	if (event.code === "Escape") close();
});
leadersBoardButton.addEventListener("click", () => {
	title.innerText = "Lider board";
	console.log(liderBoard);
	text.replaceChildren();
	if (liderBoard.length) {
		liderBoard.sort((a, b) => a.moves - b.moves);
		liderBoard.splice(10);
		let liderCount = 1;
		liderBoard.forEach((lider) => {
			const line = document.createElement("span");
			line.innerText = `place: ${liderCount} moves: ${lider.moves} date: ${lider.date}`;
			text.appendChild(line);
			liderCount += 1;
		});
	} else text.innerText = "There are no winers yet";
	open();
});
//#endregion

//# sourceMappingURL=index-cLBZ3p__.js.map