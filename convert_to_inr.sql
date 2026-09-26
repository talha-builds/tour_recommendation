-- Convert all tour prices from USD to INR (1 USD = 84 INR, rounded to nearest 100)
UPDATE tours SET price = ROUND((price * 84) / 100) * 100;
