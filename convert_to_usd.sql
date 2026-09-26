-- Revert tour prices from INR back to USD (1 USD = 84 INR, rounding to nearest dollar)
UPDATE tours SET price = ROUND(price / 84);
