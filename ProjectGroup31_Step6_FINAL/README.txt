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
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//Update Condition
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage

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

//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//Delete Customer
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

//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//Update Customer
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage

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

//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
//Delete Game

function deleteGame(gameID) {
    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `/games/${gameID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 204) {
                deleteRow(gameID);  //game deleted
            } else {
                console.error("Error deleting game.");  //error deleting
            }
        }
    }
    // Send request
    xhttp.send();
    location.reload()   //reload webpage after deleting
}


function deleteRow(gameID) {
    let table = document.getElementById("games-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == gameID) {
            table.deleteRow(i);
            break;
       }
    }
}

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


//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
//Delete Invoice

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
//DELETE CUSTOMER
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.delete('/customers/:customer_id', function(req, res) {
    const customer_id = req.params.customer_id;
    let delete_customer = "DELETE FROM Customers WHERE customer_id = ?";

    db.pool.query(delete_customer, [customer_id], function(error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('ERROR - unable to delete customer');
        } else {
            res.status(204).send('Customer deletion successful');
        }
    });
});

//UPDATE CUSTOMER
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.put('/customers/:customer_id', function(req, res) { 
    const customer_id = req.params.customer_id; 
    const customer_first_name = req.body.customer_first_name;
    const customer_last_name = req.body.customer_last_name;

    const update_customer = "UPDATE Customers SET customer_first_name = ?, customer_last_name = ? WHERE customer_id = ?";

    db.pool.query(update_customer, [customer_first_name, customer_last_name, customer_id], (error, results, fields) => {  
        if (error) {
            console.error(error);
            res.status(500).send('Error updating customer');
        } else {
            res.status(200).send('Customer Update successful'); 
        }
    });
});

//DELETE INVOICES
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.delete('/invoices/:invoice_id', function(req, res) {
    const invoice_id = req.params.invoice_id;

    let delete_invoice = "DELETE FROM Invoices WHERE invoice_id = ?";
    db.pool.query(delete_invoice, [invoice_id], function(error, results, fields) {
        if (error) {
            console.error("Error deleting invoice:", error);
            return res.status(500).json({ error: "Failed to delete invoice" });
        }

        res.status(204).json({ message: 'Invoice deletion successful' });
    });
});

//UPDATE INVOICE
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.put('/invoices/:invoice_id', function(req, res) { 
    const invoice_id = req.params.invoice_id; 
    const customer_id = req.body.customer_id;
    const game_id = req.body.game_id;
    const date_of_sale = req.body.date_of_sale;
    const price = req.body.price;

    const update_invoice = "UPDATE Invoices SET customer_id = ?, game_id = ?, date_of_sale = ?, price = ? WHERE invoice_id = ?";

    db.pool.query(update_invoice, [customer_id, game_id, date_of_sale, price, invoice_id], (error, results, fields) => {  
        if (error) {
            console.error(error);
            res.status(500).send('Error updating invoice');
        } else {
            res.status(200).send('Invoice Update successful'); 
        }
    });
});

//UPDATE GAMES
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.put('/games/:game_id', function(req, res) {
    const game_id = req.params.game_id;
    const title = req.body.title;
    const platform = req.body.platform;
    const studio = req.body.studio;
    const inventory = req.body.inventory;

    console.log("Received data to update:", req.body);

    const update_game = "UPDATE Games SET title = ?, platform = ?, studio = ?, inventory = ? WHERE game_id = ?";
    db.pool.query(update_game, [title, platform, studio, inventory, game_id], (error, results, fields) => {
        if (error) {
            console.error("Error updating game:", error);
            res.status(500).send('Error updating game');
        } else {
            res.status(200).send('Game Update successful');
        }
    });
});

//DELETE GAMES
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.delete('/games/:game_id', function(req, res) {
    const game_id = req.params.game_id;

    // Delete from Conditions since FOREIGN
    let delete_conditions = "DELETE FROM Conditions WHERE game_id = ?";
    db.pool.query(delete_conditions, [game_id], function(error, results, fields) {
        if (error) {
            console.error("Error deleting conditions:", error);
            return res.status(500).json({ error: "Failed to delete conditions" });
        }

        // Delete from Invoices since FOREIGN KEY
        let delete_invoices = "DELETE FROM Invoices WHERE game_id = ?";
        db.pool.query(delete_invoices, [game_id], function(error, results, fields) {
            if (error) {
                console.error("Error deleting invoices:", error);
                return res.status(500).json({ error: "Failed to delete invoices" });
            }

            // Delete from Games
            let delete_game = "DELETE FROM Games WHERE game_id = ?";
            db.pool.query(delete_game, [game_id], function(error, results, fields) {
                if (error) {
                    console.error("Error deleting game:", error);
                    return res.status(500).json({ error: "Failed to delete game" });
                }

                res.status(204).json({ message: 'Game deletion successful' });
            });
        });
    });
});

//UPDATE Employee
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.put('/:employee_id', function(req, res) { 
    const employee_id = req.params.employee_id; 
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    const update_employee = "UPDATE Employees SET first_name = ?, last_name = ? WHERE employee_id = ?";

    db.pool.query(update_employee, [first_name, last_name, employee_id], (error, results, fields) => {  
        if (error) {
            console.error(error);
            res.status(500).send('Error updating employee');
        } else {
            res.status(200).send('Employee Update successful'); 
        }
    });
});

//DELETE Employee
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.delete('/:employee_id', function(req, res) {
    const employee_id = req.params.employee_id;
    let delete_employee = "DELETE FROM EMPLOYEES WHERE employee_id = ?";

    db.pool.query(delete_employee, [employee_id], function(error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('ERROR - unable to delete employee');
        } else {
            res.status(204).send('Employee deletion successful');
        }
    });
});
//UPDATE Condition
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.put('/conditions/:game_id', function(req, res) { 
    const game_id = req.params.game_id; 
    const condition_rating = req.body.condition_rating;
    const name_of_game = req.body.name_of_game;
    const is_used = req.body.is_used;

    const update_condition = "UPDATE Conditions SET condition_rating = ?, name_of_game = ?, is_used = ? WHERE game_id = ?";

    db.pool.query(update_condition, [condition_rating, name_of_game, is_used, game_id], (error, results, fields) => {  
        if (error) {
            console.error(error);
            res.status(500).send('Error updating Condition');
        } else {
            res.status(200).send('Condition Update successful'); 
        }
    });
});

//DELETE Condition
//source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//copied from example of creating delete conditions
//originality is the insertion and reformatting for own data usage
app.delete('/conditions/:game_id', function(req, res) {
    const game_id = req.params.game_id;
    let delete_condition = "DELETE FROM Conditions WHERE game_id = ?";

    db.pool.query(delete_condition, [game_id], function(error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('ERROR - unable to delete condition');
        } else {
            res.status(204).send('Condition deletion successful');
        }
    });
});

// CSS button style borrowed from https://codepen.io/

.button-29 {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 30px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-29:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.button-29:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-29:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}
