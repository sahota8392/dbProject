//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
//Update Employee
document.addEventListener("DOMContentLoaded", function () {
    let updateEmployeeForm = document.getElementById('updateEmployee');

    // Event listener for update form submission
    updateEmployeeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the values from the form fields
        let employee_id = document.querySelector("#updateEmployee input[name='employee_id']").value;
        let first_name = document.querySelector("#updateEmployee input[name='employee_fname']").value;
        let last_name = document.querySelector("#updateEmployee input[name='employee_lname']").value;

        // confirm customer id is not null
        if (!employee_id) {
            console.log("Employee ID is required");
            return;
        }

        // data will contain first/last name
        let data = {
            first_name: first_name,
            last_name: last_name
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `/${employee_id}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Update the table with new data
                updateRow(employee_id, first_name, last_name);
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the update.");
            }
        };

        // Send the request
        xhttp.send(JSON.stringify(data));
    });

    // Updates table row
    function updateRow(employee_id, firstName, lastName) {
        let table = document.querySelector("table.styled-table");
        for (let i = 0, row; row = table.rows[i]; i++) {
            if (table.rows[i].cells[0].innerText == employee_id) {
                table.rows[i].cells[1].innerText = firstName;
                table.rows[i].cells[2].innerText = lastName;
                break;
            }
        }
    }

    // Update form with customer data
    window.editEmployee = function (id, firstName, lastName) {
        document.querySelector("#updateEmployee input[name='employee_id']").value = id;
        document.querySelector("#updateEmployee input[name='employee_fname']").value = firstName;
        document.querySelector("#updateEmployee input[name='employee_lname']").value = lastName;
    };
});
