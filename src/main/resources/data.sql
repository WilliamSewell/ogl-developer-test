INSERT INTO Product (sku, description, price)
VALUES ('AAA001', 'Description for AAA001', 5.99),
       ('AAA002', 'Description for AAA002', 10.00),
       ('BBB001', 'Description for BBB001', 0.69);

INSERT INTO customer (id, name, street, city, county, postcode)
VALUES (DEFAULT, 'Rick Sanchez', '123 Dimension Drive', 'Seattle', 'King County', 'WA 98101'),
       (DEFAULT, 'Walter White', '308 Negra Arroyo Lane', 'Albuquerque', 'Bernalillo County', 'NM 87104'),
       (DEFAULT, 'William Butcher', '42 Wallaby Way', 'Manchester', 'Greater Manchester', 'M1 1AE');