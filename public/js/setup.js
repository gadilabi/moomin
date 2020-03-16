let cards = document.querySelectorAll(".card");
let player1 = new Player("gad");
let player2 = new Player("hagit");

let game = new Game("card", [player1, player2], false);
//Set the grid coordinates of the cards
for (let i = 0; i < cards.length; i++) {
    let rowStart = Math.floor(i / 6) + 1;
    let columnStart = i % 6 + 1;

    cards[i].style.gridColumnStart = columnStart;
    cards[i].style.gridColumnEnd = columnStart + 1;

    cards[i].style.gridRowStart = rowStart;
    cards[i].style.gridRowEnd = rowStart + 1;

}
