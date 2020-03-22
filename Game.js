const Player = require("./Player");

class Game {

    constructor(cards, id) {
        this.FULL_GAME = 2;
        this.playersMap = new Map();
        this.cards = cards;
        this.boardHTML = this.generateBoard();
        this.id = id;
    }

    setId(id) {
        this.id = id;

    }

    getId() {
        return this.id;

    }

    deal() {

        return this.boardHTML;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }

    generateDeck() {
        let deck = (this.cards).concat(this.cards);
        this.shuffle(deck);
        return deck;

    }

    generateBoard() {
        let cardImage = (this.cards).concat(this.cards);
        this.shuffle(cardImage);
        let HTML = "";
        for (let [index, src] of cardImage.entries()) {
            HTML += `<div data-card="${src}" class="card"><div data-card="${src}" class="front"><img src="images/moomin_cards/${src}" alt=""></div><div data-id="${index}" data-card="${src}" class="back"><img src="/images/moomin_house.svg" alt=""></div></div>`
        }

        return HTML;
    }

    size() {
        return this.playersMap.size;

    }

    insertPlayer(id, name) {
        let player = new Player(id, name);
        this.playersMap.set(id, player);

    }

    isFull() {

        if (this.playersMap.size === this.FULL_GAME)
            return true;
        else
            return false;

    }

    getPlayer(id) {
        return this.playersMap.get(id);

    }

    *[Symbol.iterator]() {
        for (let player of this.playersMap) {
            yield player[1];
        }
    }

    getNames() {
        let names = [];
        for (let player of this.playersMap) {
            names.push(player[1].getName());

        }

        return names;
    }
}

module.exports = Game;
