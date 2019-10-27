$(document).ready(function () {

    let animals = ['dog', 'cat', 'lizard', 'turtle', 'dolphin', 'snake', 'tiger', 'elephant', 'gorilla', 'eagle'];

    //

    $('#buttons-view').on('click', '.animal-btn', displayInfo);

    function displayInfo() {
        let animal = $(this).attr('data-animal');
        console.log(animal)
        let queryURL =
            'https://api.giphy.com/v1/gifs/search?q='
            + animal + '&api_key=54OW39ettXVo75YqlcnCcO934R7xcoXb&limit=10';

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            // Storing an array of results in the results variable
            let results = response.data;
            console.log(results);
            // Looping over every result item
            for (let i = 0; i < results.length; i++) {
                // Creating a div for the gif
                let animalDiv = $('<div>');
                // Creating a paragraph tag with the result item's rating
                let p = $('<p>');
                p.text(results[i].rating);
                // Creating an image tag
                let animalImage = $('<img>');
                // result item
                animalImage.attr('src', results[i].images.fixed_height.url);
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                animalDiv.append(p);
                animalDiv.append(animalImage);
                // prepnding the animalDiv to the HTML
                $('#gifContainer').prepend(animalDiv);
            }

        });
    }

    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of animal-btn to our button
            a.addClass("animal-btn");
            // Adding a data-attribute
            a.attr("data-animal", animals[i]);
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
    // function displayInfo() {
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        let animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "animal-btn" (event propagation / delegation)
    //$(document).on("click", ".animal-btn", displayInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    let state = $(this).attr('data-animal');
    console.log(state);

    if (state === 'still') {
        $(this).attr('data-state', 'animate');
        let animateUrl = $(this).attr('data-animate');
        $(this).attr('src', animateUrl);

    } else {
        $(this).attr('data-state', 'still');
        let stillUrl = $(this).attr('data-still');
        $(this).attr('src', stillUrl);
    }

});
