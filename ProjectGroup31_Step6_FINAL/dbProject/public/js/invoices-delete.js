//Delete Invoices
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
function deleteInvoice(invoiceID) {
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/invoices/${invoiceID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 204) {
                deleteRow(invoiceID);  //invoice deleted
            } else {
                console.error("Error deleting Invoice.");  //error deleting
            }
        }
    }
    // Send request
    xhttp.send();
    location.reload()   //reload webpage after deleting
}

function deleteRow(invoiceID) {
    let table = document.getElementById("invoices-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == invoiceID) {
            table.deleteRow(i);
            break;
       }
    }
}