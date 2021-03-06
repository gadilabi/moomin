let card = document.querySelectorAll(".back");
let option = document.querySelectorAll(".option");
const backButton = document.querySelector("#back-button");
const playButton = document.querySelector("#play-button");

const scoreBoard = document.querySelector("#scoreboard");

socket.on("gameStart", function (data) {
    console.log(data);
    startGame(data);
});

socket.on("flip", function (data) {

    let id = data.cardId;
    let back = document.querySelector(`[data-id="${id}"]`);
    console.log(data);
    game.flip(back);

});

function assignCardsHandler() {

    //Click a card
    assignEventToCollection(card, function (event) {
        if (game.flipped.length < 2) {
            if (game.getGameType() === "multi-online") {

                if (nameInput1.value !== game.getCurrentPlayerName())
                    return;
                game.flip(this);
                socket.emit("flip", {
                    cardId: this.dataset.id,
                    gameId: game.getId()
                });

            } else {

                game.flip(this);
				

            }

        }

    });

}


//Menu options handler
assignEventToCollection(option, function (event) {

    chooseGameType(this.dataset.type);

});

backButton.addEventListener("click", function () {
    enterNames.className = "scale-down";
    options.className = "scale-up";
    options.style.height = 0;
    playButton.classList.remove("ready");


});

playButton.addEventListener("click", function (event) {

    if (this.classList[0] === "ready")
        return;

    if (game.getGameType() === "multi-online") {
        socket.emit("ready", {
            ready: true,
            name: nameInput1.value
        });

        this.classList.add("ready");
        console.log(socket.id);

    } else {

        startGame();

    }
});


function assignEventToCollection(collection, f) {

    let length = collection.length;

    for (let i = 0; i < length; i++)
        collection[i].addEventListener('click', f.bind(collection[i]));
}
