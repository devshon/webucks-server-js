CREATE TABLE product_images (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  image_url VARCHAR(3000) NOT NULL,
  product_id INT NOT NULL,
  created_at DATETIME DEFAULT NOW(),
  FOREIGN KEY (product_id) REFERENCES products (id)
);