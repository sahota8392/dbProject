//Delete Customer
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage

function deleteCustomer(customerID) {
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/customers/${customerID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 204) {
                deleteRow(customerID);  //customer deleted
            } else {
                console.error("Error deleting customer.");  //error deleting
            }
        }
    }
    // Send request
    xhttp.send();
    location.reload()   //reload webpage after deleting
}

function deleteRow(customerID) {
    let table = document.getElementById("customers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == customerID) {
            table.deleteRow(i);
            break;
       }
    }
}