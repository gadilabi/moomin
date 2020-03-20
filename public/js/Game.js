class Game {

    constructor(cardClass) {

        //Array of all player objects
        this.players = [];

        //The player currently playing
        this.currentPlayer = null;

        //The index of the player currently playing in the players array
        this.currentPlayerIndex = 0;

        this.totalNumberOfTurns = 0;

        //Get all the cards on the board
        this.cards = this.getCards(cardClass);

        //Currently flipped cards
        this.flipped = [];

        //Is this an online game
        this.gameType = "single";

        //Is this my turn?
        this.myTurn = false;

    }

    setPlayers(playersArray) {
        this.players = playersArray;
        this.currentPlayer = playersArray[0];

    }

    setGameType(type) {
        this.gameType = type;

    }

    getGameType() {
        return this.gameType;

    }

    getCurrentPlayerName() {

        return this.currentPlayer.getName();
    }

    setNames(name1, name2) {
        this.players[0].setName(name1);
        this.players[1].setName(name2);

    }


    getCards(cardClass) {
        let cardElements = document.querySelectorAll(`.${cardClass}`);
        let cards = Array(cardElements.length);
        for (let i = 0; i < cardElements.length; i++) {
            cards[i] = cardElements[i].dataset.card;

        }

        return cards;

    }

    sameFlipped() {
        if (this.flipped[0] === this.flipped[1])
            return true;
        else
            return false;

    }

    flip(back) {

        if (this.flipped.length === 0) {

            this.flipped.push(back);
            Render.flip(back);


        } else {
            this.flipped.push(back);

            Render.flip(back);

            //Increment the number of moves for current players
            this.currentPlayer.incMoves();

            //Check if flipped pair
            if (this.isPair()) {
                this.addPair();
                setTimeout(() => {
                    this.removePair();
                    this.flipBack();
                    if (this.isEnded())
                        this.endGame();
                }, 4000);

            } else {
                setTimeout(() => {

                    Render.flipBack(this.flipped);
                    this.endTurn();
                }, 4000);
            }
        }
    }

    endGame() {



    }

    isEnded() {
        if (this.cards.length === 0)
            return true;
        else
            return false;

    }


    removePair() {

        for (let card of this.flipped) {

            card.parentElement.style.transform = "scale(0)";
            card.parentElement.style.transition = "transform 1s";

        }

    }

    isPair() {
        if (this.flipped[0].dataset.card === this.flipped[1].dataset.card)
            return true;
        else
            return false;

    }

    addPair() {
        let pairElement = this.flipped[0];
        this.currentPlayer.addPair(pairElement);

        this.cards = this.cards.filter((cardName) =>
            (cardName !== pairElement.dataset.card));

        Render.updateScore(this.currentPlayerIndex + 1);

    }

    flipBack() {
        this.flipped = [];

    }

    endTurn() {
        //Empty flipped array
        this.flipBack();
        this.myTurn = false;

        Render.updateScore(this.currentPlayerIndex + 1);

        if (this.getGameType() !== "single") {

            Render.whoseTurn(this.currentPlayerIndex + 1);

            //Change the current player index            
            this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;

            //Change the current player 
            this.currentPlayer = this.players[this.currentPlayerIndex];
        }

    }

}
