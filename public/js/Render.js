class Render {

    //update the scoreboard
    static updateScore(player) {
        let pairs = scoreBoard.querySelector(`[data-pairs="${player}"]`);
        let moves = scoreBoard.querySelector(`[data-moves="${player}"]`);

        pairs.textContent = "Pairs: " + game.currentPlayer.numberOfPairs();
        moves.textContent = "Moves: " + game.currentPlayer.getMoves();
    }

    static flip(back) {
        let front = back.previousElementSibling;

        front.style.transform = "rotateY(0deg)";
        front.style.transition = "transform 1s 1s";

        back.style.transform = "rotateY(90deg)";
        back.style.transition = "transform 1s";



    }

    static flipBack(flipped) {
        for (let back of flipped) {
            let front = back.previousElementSibling;
            front.style.transform = "rotateY(90deg)";
            front.style.transition = "transform 1s";

            back.style.transform = "rotateY(0deg)";
            back.style.transition = "transform 1s 1s";


        }

    }
}
