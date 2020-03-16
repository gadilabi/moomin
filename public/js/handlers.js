const card = document.querySelectorAll(".back");

//Click a card
assignEventToCollection(card, function (event) {

    if (game.flipped.length < 2)
        //Flip cared
        game.flip(this);

});


function assignEventToCollection(collection, f) {

    let length = collection.length;

    for (let i = 0; i < length; i++)
        collection[i].addEventListener('click', f.bind(collection[i]));
}
