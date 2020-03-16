const express = require("express");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const fs = require("fs");

const app = express();
app.listen(3000, (err) => {
    if (err)
        console.log("Express failed");
    else
        console.log(`Listening on port ${PORT}`);
});


app.set("view engine", "ejs");

//Set the public folder as static
app.use(express.static('public'));

app.get("/", function (req, res) {

    let imageName = fs.readdirSync("public/images/moomin_cards");
    let cardImage = imageName.concat(imageName);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(cardImage);

    res.render("game", {
        cardImage
    });

});
