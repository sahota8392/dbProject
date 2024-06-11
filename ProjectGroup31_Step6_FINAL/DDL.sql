set foreign_key_checks=0;
set autocommit =0;
--creates Employee table uses employee_id for the primary key tracks employee name both first and last
create or replace table Employees(
	employee_id int(11) not null auto_increment primary key,
	first_name varchar(255) not null,
	last_name varchar(255) not null
);
--creates Games table and generates a table with the id, title, platform, stuido, and inventory amount
create or replace table Games(
	game_id int(11) not null auto_increment primary key,
	title varchar(255) not null,
	platform varchar(255) not null,
	studio varchar(255) not null,
	inventory int not null
);
--creates table that tracks Conditons of the game uses the id value, and name of the game. tracks if game is used and its condition rating 
create or replace table Conditions(
	condition_rating int(11) not null, 
	name_of_game varchar(255) not null,
	game_id int,
	is_used boolean not null default 0,
	foreign key (game_id) references Games(game_id) on delete cascade
);
--creates table that tracks customer data id value assigned and holds both the first and last name
create or replace table Customers(
	customer_id int(11) not null auto_increment primary key,
	customer_first_name varchar(255) not null,
	customer_last_name varchar(255) not null
);
--creates table that tracks transactional invoices and the all the resding data id values etc..
create or replace table Invoices(
	invoice_id int(11) not null auto_increment primary key,
	employee_id int,
	customer_id int,
	game_id int,
	date_of_sale varchar(255) not null,
	price float not null,
	foreign key (game_id) references Games(game_id) on delete cascade,
	foreign key (employee_id) references Employees(employee_id) on delete cascade,
	foreign key (customer_id) references Customers(customer_id) on delete cascade
);

--inserts the neccessary data into each of the given tables using selects to capture id values that are already generated within the tables
insert into Employees (first_name, last_name)
values
	('Michael', 'Harrison'),
	('Janet', 'Jameson'),
	('Harry', 'Oliver');

insert into Games (title, platform, studio, inventory)
values
	('Skyrim', 'Xbox','Bethesda', 4),
	('FarCry', 'Playstation', 'Ubisoft', 5),
	('Rainbow Six', 'PC', 'Ubisoft', 3);

insert into Conditions(condition_rating, name_of_game, game_id, is_used)
values
	(10, 'Skyrim', (select game_id from Games where title = 'Skyrim'), 0),
	(9, 'FarCry', (select game_id from Games where title = 'FarCry'), 1), 
	(8, 'Rainbow Six', (select game_id from Games where title = 'Rainbow Six'), 0);

insert into Customers(customer_first_name, customer_last_name)
values
	('Jon', 'Marston'),
	('Mary', 'Jane'),
	('Harry', 'Osborn');

insert into Invoices(customer_id, employee_id, game_id, date_of_sale, price)
values
	(1, (select employee_id from Employees where first_name = 'Michael' and last_name = 'Harrison'), (select game_id from Games where title ='Skyrim'), '20240514', 59.99),
	(2, (select employee_id from Employees where first_name = 'Janet' and last_name='Jameson'),  (select game_id from Games where title ='FarCry'), '20230615', 49.99),
	(3, (select employee_id from Employees where first_name = 'Harry' and last_name='Oliver'), (select game_id from Games where title ='Rainbow Six'), '20190922', 48.99);

set foreign_key_checks =1;
commit;
--displays the tables after being filled with the neccessary data
select * from Employees;
select * from Games;
select * from Conditions;
select * from Customers;
select * from Invoices;
