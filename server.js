const http = require("http");
const express = require("express");
const routes = require("./routes");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

// middlewares
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log("server is listening on PORT " + PORT);
    });
  } catch (err) {
    await prisma.$disconnect();
  }
};

start();
