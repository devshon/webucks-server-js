CREATE TABLE nutritions (
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id),
  product_id INT NOT NULL,
  caffein FLOAT NULL,
  fat FLOAT NULL,
  sugar FLOAT NULL,
  sodium FLOAT NULL,
 	FOREIGN KEY (product_id) REFERENCES products (id),
  created_at DATETIME DEFAULT NOW()
);