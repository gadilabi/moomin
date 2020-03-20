class Player {

    constructor(name) {
        this.name = name;
        this.myPairs = [];
        this.moves = 0;
    }

    addPair(cardName) {
        this.myPairs.push(cardName);

    }

    getMoves() {
        return this.moves;

    }

    setName(name) {
        this.name = name;

    }

    getName() {

        return this.name;
    }

    numberOfPairs() {
        return this.myPairs.length;

    }

    incMoves() {
        this.moves++;

    }

}
