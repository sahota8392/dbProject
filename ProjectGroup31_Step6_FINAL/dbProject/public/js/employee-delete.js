//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
//Delete Employee
function deleteEmployee(employeeID) {
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/${employeeID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 204) {
                deleteRow(employeeID);  // employee deleted
            } else {
                console.error("Error deleting employee.");  // error deleting
            }
        }
    }
    // Send request
    xhttp.send();
    location.reload()
}

function deleteRow(employeeID) {
    let table = document.getElementById("index-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == employeeID) {
            table.deleteRow(i);
            break;
        }
    }
}