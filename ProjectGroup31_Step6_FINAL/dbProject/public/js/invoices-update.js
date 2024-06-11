//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
//Update Invoice
document.addEventListener("DOMContentLoaded", function () {
    let updateInvoiceForm = document.getElementById('updateInvoice');

    // Event listener for update form submission
    updateInvoiceForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the values from the form fields
        let invoice_id = document.querySelector("#updateInvoice input[name='invoice_id']").value;
        let employee_id = document.querySelector("#updateInvoice input[name='employee_id']").value;
        let customer_id = document.querySelector("#updateInvoice input[name='customer_id']").value;
        let game_id = document.querySelector("#updateInvoice input[name='game_id']").value;
        let date_of_sale = document.querySelector("#updateInvoice input[name='date_of_sale']").value;
        let price = document.querySelector("#updateInvoice input[name='price']").value;


        // confirm customer id is not null
        if (!invoice_id) {
            console.log("Invoice ID is required");
            return;
        }

        // data will contain first/last name
        let data = {
            customer_id: customer_id,
            game_id: game_id,
            date_of_sale: date_of_sale,
            price: price
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `/invoices/${invoice_id}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Update the table with new data
                updateRow(invoice_id, employee_id, customer_id, game_id, date_of_sale, price);
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the update.");
            }
        };

        // Send the request
        xhttp.send(JSON.stringify(data));
    });

    // Updates table row
    function updateRow(invoice_id, employee_id, customer_id, game_id, date_of_sale, price) {
        let table = document.querySelector("table.styled-table");
        for (let i = 0, row; row = table.rows[i]; i++) {
            if (table.rows[i].cells[0].innerText == invoice_id) {
                table.rows[i].cells[1].innerText = employee_id; 
                table.rows[i].cells[2].innerText = customer_id;
                table.rows[i].cells[3].innerText = game_id;
                table.rows[i].cells[4].innerText = date_of_sale;
                table.rows[i].cells[5].innerText = price;
    
                break;
            }
        }
    }

    // Update form with customer data
    window.editInvoice = function (id, employee_id, customer_id, game_id, date_of_sale, price) {
        document.querySelector("#updateInvoice input[name='invoice_id']").value = id;
        document.querySelector("#updateInvoice input[name='employee_id']").value = employee_id;
        document.querySelector("#updateInvoice input[name='customer_id']").value = customer_id;
        document.querySelector("#updateInvoice input[name='game_id']").value = game_id;
        document.querySelector("#updateInvoice input[name='date_of_sale']").value = date_of_sale;
        document.querySelector("#updateInvoice input[name='price']").value = price;
    };
});
