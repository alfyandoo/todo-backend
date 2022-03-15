import { PrismaClient, todos } from '@prisma/client'

const prisma = new PrismaClient() // Query
const express = require("express");
const app = express();
const port = process.env.PORT || "8000";

app.use(express.json());

app.get("/", async (req: any, res: any) => {
  const todos = await prisma.todos.findMany();
  res.json(todos);
});

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});