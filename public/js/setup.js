//Connect to server thorugh websocket
//let socket = io.connect("http://localhost:3000");
let socket = io.connect("https://moominmemorygame.herokuapp.com/");

//Custom Events
let addPairEvent = new CustomEvent("addPair", {});

//Elements
let board = document.querySelector("#game");
let cards = document.querySelectorAll(".card");
let menuWrapper = document.querySelector("#menu-wrapper");
let menu = document.querySelector("#menu");
let options = document.querySelector("#options");
let enterNames = document.querySelector("#enter-names");
let nameInput1 = document.querySelector("#player1-name");
let nameInput2 = document.querySelector("#player2-name");

let game = new Game("card");

//Set the grid coordinates of the cards
//for (let i = 0; i < cards.length; i++) {
//    let rowStart = Math.floor(i / 6) + 1;
//    let columnStart = i % 6 + 1;
//
//    cards[i].style.gridColumnStart = columnStart;
//    cards[i].style.gridColumnEnd = columnStart + 1;
//
//    cards[i].style.gridRowStart = rowStart;
//    cards[i].style.gridRowEnd = rowStart + 1;
//
//}

function setNames(name1, name2) {
	game.setNames(name1, name2);

}

function chooseGameType(gameType) {

	switch (gameType) {
		case "single":
			nameInput2.style.display = "none";
			break;
		case "multi-local":
			nameInput2.style.display = "inline";
			break;
		case "multi-online":
			nameInput2.style.display = "none";
			break;

	}

	if (gameType === "multi-local")
		nameInput2.style.display = "inline";
	else
		nameInput2.style.display = "none";

	//Set the type of the game to single, multi-local or multi-online
	game.setGameType(gameType);



	//Close the menu
	nextScreen();

}

function nextScreen() {

	options.className = "scale-down";
	enterNames.className = "scale-up";
	options.style.height = 0;

}

function startGame(data) {

	let gameType = game.getGameType();

	if (gameType === "single") {
		let player1 = new Player(nameInput1.value);
		game.setPlayers([player1]);
		let nameScoreboard1 = scoreBoard.querySelector(`[data-player="1"]`);
		nameScoreboard1.textContent = nameInput1.value;

		document.querySelector("#scoreboard-2").style.display = "none";

		assignCardsHandler();

	} else if (gameType === "multi-local") {
		let player1 = new Player(nameInput1);
		let player2 = new Player(nameInput2);
		game.setPlayers([player1, player2]);

		let nameScoreboard1 = scoreBoard.querySelector(`[data-player="1"]`);
		nameScoreboard1.textContent = nameInput1.value;

		let nameScoreboard2 = scoreBoard.querySelector(`[data-player="2"]`);
		nameScoreboard2.textContent = nameInput2.value;

		document.querySelector("#scoreboard-2").style.display = "flex";
		assignCardsHandler();

	} else {
		//Online game
		let player1 = new Player(data.names[0]);
		let player2 = new Player(data.names[1]);
		game.setPlayers([player1, player2]);
		game.setId(data.gameId);
		let nameScoreboard1 = scoreBoard.querySelector(`[data-player="1"]`);
		nameScoreboard1.textContent = data.names[0];

		let nameScoreboard2 = scoreBoard.querySelector(`[data-player="2"]`);
		nameScoreboard2.textContent = data.names[1];
		document.querySelector("#scoreboard-2").style.display = "flex";

		//Get the game board from server
		fetch(`/online/deal/${data.gameId}`)
			.then((res) => res.text())
			.then((data) => recreateBoard(data))
			.then(() => assignCardsHandler())
			.catch((err) => console.log(err));

	}

	menuWrapper.style.display = "none";

}

function recreateBoard(data) {

	document.querySelector("#game").remove();
	let div = document.createElement("DIV");
	div.id = "game";
	div.innerHTML = JSON.parse(data).boardHTML;
	document.querySelector("main").appendChild(div);
	card = document.querySelectorAll(".back");

}
