const http = require("http");
const express = require("express");
const {
  sendCategorise,
  sendProducts,
  sendProductOne,
} = require("./apis/products");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "/ endpoint" });
});

app.get("/products/categories", sendCategorise);
app.get("/products", sendProducts);
app.get("/products/2", sendProductOne);

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
