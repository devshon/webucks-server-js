CREATE TABLE allergies (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
  name VARCHAR(200) UNIQUE NOT NULL,
  created_at DATETIME DEFAULT NOW()
);

CREATE TABLE products_allergies (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
  product_id INT,
  allergy_id INT,
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (allergy_id) REFERENCES allergies (id),
  created_at DATETIME DEFAULT NOW()
);