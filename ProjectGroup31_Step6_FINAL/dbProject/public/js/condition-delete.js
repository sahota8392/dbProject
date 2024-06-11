//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//Delete Condition
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage

function deleteCondition(gameID) {
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/conditions/${gameID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 204) {
                deleteRow(gameID);  //customer deleted
            } else {
                console.error("Error deleting condition.");  //error deleting
            }
        }
    }
    // Send request
    xhttp.send();
    location.reload()   //reload webpage after deleting
}

function deleteRow(gameID) {
    let table = document.getElementById("conditions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == gameID) {
            table.deleteRow(i);
            break;
       }
    }
}