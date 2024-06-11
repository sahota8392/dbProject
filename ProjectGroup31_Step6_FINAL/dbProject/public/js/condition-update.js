//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
//Update condition
document.addEventListener("DOMContentLoaded", function () {
    let updateConditionForm = document.getElementById('updateCondition');

    // Event listener for update form submission
    updateConditionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the values from the form fields
        let game_id = document.querySelector("#updateCondition input[name='game_id']").value;
        let condition_rating = document.querySelector("#updateCondition input[name='condition_rating']").value;
        let name_of_game = document.querySelector("#updateCondition input[name='name_of_game']").value;
        let is_used = document.querySelector("#updateCondition input[name='is_used']").value;

        // confirm game id is not null
        if (!game_id) {
            console.log("Game ID is required");
            return;
        }

        // data will contain condition rating, name of game, and is_used
        let data = {
            condition_rating: condition_rating,
            name_of_game: name_of_game,
            game_id: game_id,
            is_used: is_used
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `/conditions/${game_id}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Update the table with new data
                updateRow(condition_rating, game_id, name_of_game, is_used);
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the update.");
            }
        };

        // Send the request
        xhttp.send(JSON.stringify(data));
    });

    // Updates table row
    function updateRow(condition_rating, game_id, name_of_game, is_used) {
        let table = document.querySelector("table.styled-table");
        for (let i = 1, row; row = table.rows[i]; i++) {
            if (table.rows[i].cells[2].innerText == game_id) {
                table.rows[i].cells[0].innerText = condition_rating;
                table.rows[i].cells[1].innerText = name_of_game;
                table.rows[i].cells[3].innerText = is_used;
                break;
            }
        }
    }

    // Update form with condition data
    window.editCondition = function (condition_rating, name_of_game, game_id, is_used) {
        document.querySelector("#updateCondition input[name='condition_rating']").value = condition_rating;
        document.querySelector("#updateCondition input[name='name_of_game']").value = name_of_game;
        document.querySelector("#updateCondition input[name='game_id']").value = game_id;
        document.querySelector("#updateCondition input[name='is_used']").value = is_used;
    };
});
