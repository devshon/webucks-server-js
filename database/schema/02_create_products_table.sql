CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  korean_name VARCHAR(200) UNIQUE NOT NULL,
  english_name VARCHAR(200) NULL,
  category_id INT NOT NULL,
  created_at DATETIME DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES categories (id)
);