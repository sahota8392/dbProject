-- Query for add a new character functionality with colon : character being used to 

-- SELECT
select * FROM Employees;
select * FROM Customers;
select * FROM Games;
select * FROM Invoices;
select * FROM Conditions;


-- add a new employee
INSERT INTO Employees (first_name, last_name) 
VALUES(:first_name_input, last_name_input)

--update an employee at a given value 
UPDATE Employees SET first_name = ?, last_name = ? WHERE employee_id = ?

--delete an employee at a given value
DELETE FROM EMPLOYEES WHERE employee_id = ?

-- add a new game
INSERT INTO Games (title, platform, studio, inventory) 
VALUES(:title_input, :platform_input, :studio_input, :inventory_input)


-- add a new condition rating
INSERT INTO Conditions (condition_rating, name_of_game, game_id, is_used)
VALUES (:condition_rating_input, :name_of_game_input, :game_id_input, :is_used_input)

--update a condition at a given value
UPDATE Conditions SET condition_rating = ?, name_of_game = ?, is_used = ? WHERE game_id = ?

--delete a condition at a given value
DELETE FROM Conditions WHERE game_id = ?

-- add a new Customer
INSERT INTO Customers(customer_first_name, customer_last_name)
VALUES(:customer_first_name_input, :customer_last_name_input)

--update a customer at a given value
UPDATE Customers SET customer_first_name = ?, customer_last_name = ? WHERE customer_id = ?

--delete a customer at a given value
DELETE FROM Customers WHERE customer_id = ?

-- add a new invoice
INSERT INTO Invoices(customer_id, employee_id, game_id, date_of_sale, price)
VALUES(:customer_id_input, employee_id_input, game_id_input, date_of_sale_input, price_input)

--update an invoice at a given value
UPDATE Invoices SET customer_id = ?, game_id = ?, date_of_sale = ?, price = ? WHERE invoice_id = ?

--delete an invoice at a given value
DELETE FROM Invoices WHERE invoice_id = ?

-- update a game
UPDATE Games SET title = :title_input, platform= :platform_input, studio = :studio_input, inventory = :inventory_input 
WHERE game_id=:game_id_input

-- delete a game
DELETE FROM Games WHERE game_id = :game_id_input
