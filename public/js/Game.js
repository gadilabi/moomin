class Game {

    constructor(cardClass, playersArray, isOnline) {

        this.players = playersArray;

        this.currentPlayer = this.players[0];

        this.totalNumberOfMoves = 0;

        //Get the cards
        this.cards = this.getCards(cardClass);

        //Currently flipped cards
        this.flipped = [];

        //Is this an online game
        this.isOnline = isOnline;

        //Is this my turn?
        this.myTurn = false;

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
            let front = back.previousElementSibling;

            front.style.transform = "rotateY(0deg)";
            front.style.transition = "transform 1s 1s";

            back.style.transform = "rotateY(90deg)";
            back.style.transition = "transform 1s";

        } else {
            this.flipped.push(back);
            let front = back.previousElementSibling;

            front.style.transform = "rotateY(0deg)";
            front.style.transition = "transform 1s 1s";

            back.style.transform = "rotateY(90deg)";
            back.style.transition = "transform 1s";

            //Check if flipped pair
            if (this.isPair()) {
                this.addPair();
                setTimeout(() => {
                    this.removePair();
                    this.endTurn();
                    if (this.isEnded())
                        this.endGame();
                }, 4000);

            } else {
                setTimeout(() => {

                    this.flipBack();
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

    flipBack() {
        for (let back of this.flipped) {
            let front = back.previousElementSibling;
            front.style.transform = "rotateY(90deg)";
            front.style.transition = "transform 1s";

            back.style.transform = "rotateY(0deg)";
            back.style.transition = "transform 1s 1s";


        }

    }

    removePair() {

        for (let card of this.flipped) {

            card.parentElement.remove();
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
    }

    endTurn() {
        this.flipped = [];
        this.myTurn = false;
        this.totalNumberOfMoves++;

        let playerNumber = this.totalNumberOfMoves % this.players.length;
        this.currentPlayer = this.players[playerNumber];

    }

}
