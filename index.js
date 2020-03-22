const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const socket = require("socket.io");
const GameCollection = require("./GameCollection");
var numberConnected = 0;
//Get the list of images
let imageName = fs.readdirSync("public/images/moomin_cards");

//Double the imageName array 
var cardImage = imageName.concat(imageName);

const PORT = process.env.PORT || 3000;

const app = express();
let server = app.listen(PORT, (err) => {
    if (err)
        console.log("Express failed");
    else
        console.log(`Listening on port ${PORT}`);
});

let io = socket(server);
let gameCollection = new GameCollection();

io.on("connection", function (socket) {

    console.log("Connection has been made!");

    socket.on("ready", function (data) {
        let game = gameCollection.insertPlayer(socket.id, data.name);
        console.log(game.size());
        console.log(game);
        if (game.isFull()) {
            for (let player of game) {

                io.to(`${player.getId()}`).emit("gameStart", {
                    names: game.getNames(),
                    gameId: gameCollection.generateGameId()
                });
            }
        }
    });

    socket.on("flip", function (data) {
        let game = gameCollection.getGame(data.gameId);
        for (let player of game) {
            if (player.getId() !== socket.id)
                io.to(`${player.getId()}`).emit("flip", data);
        }
    });

});

app.set("view engine", "ejs");

//Set the public folder as static
app.use(express.static('public'));

app.get("/", function (req, res) {

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }

    if (numberConnected === 0) {
        shuffleArray(cardImage);

    }
    numberConnected++;

    if (numberConnected === 2)
        numberConnected = 0;

    res.render("game", {
        cardImage
    });

});
