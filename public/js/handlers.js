const card = document.querySelectorAll(".back");
let option = document.querySelectorAll(".option");
const backButton = document.querySelector("#back-button");
const playButton = document.querySelector("#play-button");

const scoreBoard = document.querySelector("#scoreboard");


//scoreBoard.addEventListener("addPair", function (event) {
//    let pairs = scoreBoard.querySelector(`[data-score="pairs"]`);
//    let moves = scoreBoard.querySelector(`[data-score="moves"]`);
//    
//    pairs.textContent = game.
//
//});
//Click a card
assignEventToCollection(card, function (event) {

    if (game.flipped.length < 2)
        //Flip cared
        game.flip(this);

});

//Menu options handler
assignEventToCollection(option, function (event) {

    chooseGameType(this.dataset.type);

});

backButton.addEventListener("click", function () {
    enterNames.className = "scale-down";
    options.className = "scale-up";
    options.style.height = 0;

});

playButton.addEventListener("click", function (event) {
    startGame();
});


function assignEventToCollection(collection, f) {

    let length = collection.length;

    for (let i = 0; i < length; i++)
        collection[i].addEventListener('click', f.bind(collection[i]));
}
