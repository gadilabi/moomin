let Player = require("./Player");
let Game = require("./Game");

class GameCollection {

    constructor(images) {

        this.images = images;
        this.games = [];
        this.currentGame = new Game(images, this.games.length);
    }

    insertPlayer(id, name) {

        if (this.currentGame.isFull())
            this.currentGame = new Game(this.images, this.games.length);

        this.currentGame.insertPlayer(id, name);
        if (this.currentGame.isFull()) {
            this.games.push(this.currentGame);
        }

        return this.currentGame;

    }

    generateGameId() {
        return this.games.length - 1;


    }

    getGame(id) {
        return this.games[id];

    }

}

module.exports = GameCollection;
