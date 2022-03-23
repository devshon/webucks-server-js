const http = require("http");
const express = require("express");
const routes = require("./routes");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(routes);

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
