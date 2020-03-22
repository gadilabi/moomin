let Player = require("./Player");
let Game = require("./Game");

class GameCollection {

    constructor() {

        this.games = [];
        this.currentGame = new Game();
    }

    insertPlayer(id, name) {

        if (this.currentGame.isFull())
            this.currentGame = new Game();


        this.currentGame.insertPlayer(id, name);
        if (this.currentGame.isFull()) {
            this.games.push(this.currentGame);
            this.currentGame.setId = this.games.length;
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
