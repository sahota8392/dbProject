/*
    SETUP
*/
// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
var router = express.Router();

PORT = 6200;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));

app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');
app.use(express.static('public'));


/*
    ROUTES
*/

//SELECT CUSTOMER
app.get('/customers', function(req, res){   
    let query1 = "SELECT * FROM Customers;";
    db.pool.query(query1, function(error, rows, fields){    
        res.render('customers', {data: rows});
    })
});

//INSERT CUSTOMER
app.post('/customers', async function(req, res){    
    const first_name = req.body.customer_fname;
    const last_name = req.body.customer_lname;
    let query1 = "INSERT INTO Customers (customer_first_name, customer_last_name) VALUES(?, ?)";
    db.pool.query(query1, [first_name, last_name]);
    res.redirect('/customers')
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

//INVOICES
app.get('/invoices', function(req, res){
    let query1 = "SELECT * FROM Invoices;";
    let query2 = "SELECT * FROM Games;";
    db.pool.query(query1, function(error, rows, fields){
        let invoices = rows;
        db.pool.query(query2, (error, rows, fields)=>{
            let games = rows;    
            res.render('invoices', {data: invoices, games:games});
        })
    })
});
app.post('/invoices', async function(req, res){
    const employee_id = req.body.employee_id;
    const customer_id = req.body.customer_id;
    const game_id = req.body.game_id;
    const date_of_sale = req.body.date;
    const price = req.body.price;

    let query1 = "INSERT INTO Invoices (employee_id, customer_id, game_id, date_of_sale, price) VALUES(?, ?, ?, ?, ?)";
    db.pool.query(query1, [employee_id, customer_id, game_id, date_of_sale, price]);
    res.redirect('/invoices')
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


//GAMES
app.get('/games', function(req, res){       //SELECT GAMES
    let query1 = "SELECT * FROM Games;";
    let query2 = "SELECT condition_rating, is_used FROM Conditions;";
    db.pool.query(query1, function(error, rows, fields){
        db.pool.query(query2, function(error, results, fields){
        res.render('games', {data: rows, data2: results});
        });
    });
});

app.post('/games', async function(req, res){    //INSERT GAMES
    const title = req.body.title;
    const platform = req.body.platform;
    const studio = req.body.studio;
    const inventory = req.body.inventory;

    let query1 = "INSERT INTO Games (title, platform, studio, inventory) VALUES(?, ?, ?, ?, ?)";
    db.pool.query(query1, [title, platform, studio, inventory]);
    res.redirect('/games')
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


//EMPLOYEES
app.get('/', function(req, res){
        let query1 = "SELECT * FROM Employees;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('index', {data: rows});
        })
    });
app.post('/', async function(req, res){
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    let query1 = "INSERT INTO Employees (first_name, last_name) VALUES(?, ?)";
    db.pool.query(query1, [first_name, last_name]);
    res.redirect('/')
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

//CONDITIONS
app.get('/conditions', function(req, res){
    let query1 = "SELECT * FROM Conditions;";
    db.pool.query(query1, function(error, rows, fields){    
        res.render('conditions', {data: rows});
    })
});

app.post('/conditions', async function(req, res){
    const condition_rating = req.body.condition_rating;
    const name_of_game = req.body.name_of_game;
    const game_id = req.body.game_id;
    const is_used = req.body.is_used;

    let query1 = "INSERT INTO Conditions (condition_rating, name_of_game, game_id, is_used) VALUES(?, ?, ?, ?)";
    db.pool.query(query1, [condition_rating, name_of_game, game_id, is_used]);
    res.redirect('/conditions')
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

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
