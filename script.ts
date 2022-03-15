import { PrismaClient, todos } from '@prisma/client'

const prisma = new PrismaClient() // Query
const express = require("express");
const app = express();
const port = process.env.PORT || "8000";
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.post("/todos/", async (req: any, res: any) => {
  const todos = await prisma.todos.create({
    data: { ...req.body }
  });
  res.json(todos);
})

app.get("/todos", async (req: any, res: any) => {
  const todos = await prisma.todos.findMany();
  res.json(todos);
});

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});