//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
//Update Game
document.addEventListener("DOMContentLoaded", function () {
    let updateGameForm = document.getElementById('updateGame');

    // Event listener for update form submission
    updateGameForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the values from the form fields
        let game_id = document.querySelector("#updateGame input[name='game_id']").value;
        let title = document.querySelector("#updateGame input[name='title']").value;
        let platform = document.querySelector("#updateGame input[name='platform']").value;
        let studio = document.querySelector("#updateGame input[name='studio']").value;
        let inventory = document.querySelector("#updateGame input[name='inventory']").value;

        // confirm game id is not null
        if (!game_id) {
            console.log("Game ID is required");
            return;
        }

        // data will contain first/last name
        let data = {
            title: title,
            platform: platform,
            studio: studio,
            inventory: inventory
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `/games/${game_id}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Update the table with new data
                updateRow(game_id, title, platform, studio, inventory);
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the update.");
            }
        };

        // Send the request
        xhttp.send(JSON.stringify(data));
    });

    // Updates table row
    function updateRow(game_id, title, platform, studio, inventory) {
        let table = document.querySelector("table.styled-table");
        for (let i = 0, row; row = table.rows[i]; i++) {
            if (table.rows[i].cells[0].innerText == game_id) {
                table.rows[i].cells[1].innerText = title;
                table.rows[i].cells[2].innerText = platform;
                table.rows[i].cells[3].innerText = studio;
                table.rows[i].cells[4].innerText = inventory;

                break;
            }
        }
    }

    // Update form with game data
    window.editGame = function (id, title, platform, studio, inventory) {
        document.querySelector("#updateGame input[name='game_id']").value = id;
        document.querySelector("#updateGame input[name='title']").value = title;
        document.querySelector("#updateGame input[name='platform']").value = platform;
        document.querySelector("#updateGame input[name='studio']").value = studio;
        document.querySelector("#updateGame input[name='inventory']").value = inventory;
    };
});
