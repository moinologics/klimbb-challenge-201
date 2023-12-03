CREATE TABLE "user"(
	id serial,
	name varchar(100) NOT NULL,
	balance FLOAT NOT NULL
);

INSERT INTO "user" ("id", "name", "balance") VALUES
(1, 'Alice Wonderland', 100.00),
(2, 'Bob Builder', 150.00),
(3, 'Charlie Chocolate', 200.00);

CREATE TABLE "game_session"(
	id serial,
	user_id INT NOT NULL,
	amount_played FLOAT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO "game_session" ("id", "user_id", "amount_played", "created_at") VALUES
(1, 1, 10.00, '2023-04-01 12:00:00'),
(2, 1, 20.00, '2023-04-02 13:00:00'),
(3, 2, 15.00, '2023-04-03 14:30:00'),
(4, 2, 25.00, '2023-04-04 15:45:00'),
(5, 3, 10.00, '2023-04-05 16:20:00');

CREATE TABLE "redemption"(
	id serial,
	user_id INT NOT NULL,
	amount FLOAT NOT NULL,
	status varchar(25) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO "redemption" ("id", "user_id", "amount", "status", "created_at") VALUES
(1, 1, 10.00, 'requested', '2023-04-01 17:00:00'),
(2, 2, 20.00, 'processed', '2023-04-02 18:00:00'),
(3, 3, 15.00, 'requested', '2023-04-03 19:30:00');