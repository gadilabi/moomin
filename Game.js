const Player = require("./Player");

class Game {

    constructor() {
        this.FULL_GAME = 2;
        this.playersMap = new Map();
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
