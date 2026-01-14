CREATE TABLE customer (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    street   VARCHAR(255),
    city     VARCHAR(100),
    county   VARCHAR(100),
    postcode VARCHAR(10),
    PRIMARY KEY (id)
);

CREATE TABLE Product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

ALTER TABLE product
    ADD CONSTRAINT UK_q1mafxn973ldq80m1irp3mpvq UNIQUE (sku);