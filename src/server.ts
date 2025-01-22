import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const server = express();

server.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});
