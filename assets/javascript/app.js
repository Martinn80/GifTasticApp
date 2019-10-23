$(document).ready(function () {
    $('button').on('click', function () {
        var animal = $(this).attr('data-animal');
        var queryURL =
            'https://api.giphy.com/v1/gifs/search?q='
            + animal + '&api_key=54OW39ettXVo75YqlcnCcO934R7xcoXb&limit=10';

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            let results = response.data;
            console.log(results);

            for (let i = 0; i < results.length; i++) {
                let animalDiv = $('<div>');
                let p = $('<p>');
                p.text(results[i].rating);
                let animalImage = $('<img>');
                animalImage.attr('src', results[i].images.fixed_height.url);
                animalDiv.append(p);
                animalDiv.append(animalImage);

                $('#gifContainer').prepend(animalDiv);
            }

        })
    })




})