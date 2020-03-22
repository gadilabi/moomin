const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const socket = require("socket.io");
const GameCollection = require("./GameCollection");
const Game = require("./Game");
var numberConnected = 0;
//Get the list of images
let images = fs.readdirSync("public/images/moomin_cards");

const PORT = process.env.PORT || 3000;

const app = express();
let server = app.listen(PORT, (err) => {
    if (err)
        console.log("Express failed");
    else
        console.log(`Listening on port ${PORT}`);
});

let io = socket(server);
let gameCollection = new GameCollection(images);

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
                    gameId: game.getId(),

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

    let game = new Game(images);
    let deck = game.generateDeck();
    res.render("game", {
        deck
    });

});

app.get("/online/deal/:id", function (req, res) {
    console.log(gameCollection.games);
    let game = gameCollection.getGame(parseInt(req.params.id));
    let boardHTML = game.deal();
    res.json({
        boardHTML
    });
});
