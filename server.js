const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const {
  sendCategorise,
  sendProducts,
  sendProductOne,
  createLike,
  deleteLike,
} = require("./apis/products");

const {
  createUser,
  sendUser,
  updateUserPassword,
  loginUser,
  sendIdentification,
} = require("./apis/users");

const app = express();
app.use(express.json());

// GET
app.get("/", (req, res) => res.json({ message: "/ endpoint" }));
app.get("/products/categories", sendCategorise);
app.get("/products", sendProducts);
app.get("/products/2", sendProductOne);
app.get("/users", sendUser);
app.get("/users/verification", sendIdentification);

// POST
app.post("/users/signup", createUser);
app.post("/users/login", loginUser);
app.post("/products/likes", createLike);

// PUT
app.put("/users", updateUserPassword);

// DELETE
app.delete("/products/likes", deleteLike);

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(8000, () => {
      console.log("server is listening on PORT 8000");
    });
  } catch (err) {
    await prisma.$disconnect();
  }
};

start();
