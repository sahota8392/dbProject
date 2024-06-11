//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
//Update Customer
document.addEventListener("DOMContentLoaded", function () {
    let updateCustomerForm = document.getElementById('updateCustomer');

    // Event listener for update form submission
    updateCustomerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the values from the form fields
        let customer_id = document.querySelector("#updateCustomer input[name='customer_id']").value;
        let customer_first_name = document.querySelector("#updateCustomer input[name='customer_fname']").value;
        let customer_last_name = document.querySelector("#updateCustomer input[name='customer_lname']").value;

        // confirm customer id is not null
        if (!customer_id) {
            console.log("Customer ID is required");
            return;
        }

        // data will contain first/last name
        let data = {
            customer_first_name: customer_first_name,
            customer_last_name: customer_last_name
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `/customers/${customer_id}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Update the table with new data
                updateRow(customer_id, customer_first_name, customer_last_name);
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the update.");
            }
        };

        // Send the request
        xhttp.send(JSON.stringify(data));
    });

    // Updates table row
    function updateRow(customer_id, firstName, lastName) {
        let table = document.querySelector("table.styled-table");
        for (let i = 0, row; row = table.rows[i]; i++) {
            if (table.rows[i].cells[0].innerText == customer_id) {
                table.rows[i].cells[1].innerText = firstName;
                table.rows[i].cells[2].innerText = lastName;
                break;
            }
        }
    }

    // Update form with customer data
    window.editCustomer = function (id, firstName, lastName) {
        document.querySelector("#updateCustomer input[name='customer_id']").value = id;
        document.querySelector("#updateCustomer input[name='customer_fname']").value = firstName;
        document.querySelector("#updateCustomer input[name='customer_lname']").value = lastName;
    };
});
