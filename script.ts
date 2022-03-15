import { PrismaClient, todos } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient(); // Query
const app = express();
const port = process.env.PORT || "8000";
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.put("/todos/:id", async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { activity, completed } = req.body;
    const todo = await prisma.todos.update({
        where: { id: Number(id) },
        data: { activity, completed }
    });
    res.json(todo);
});

app.delete("/todos/:id", async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const todos = await prisma.todos.delete({
        where: {
            id: Number(id)
        }
    });
    res.json(todos);
});

app.post("/todos", async (req: express.Request, res: express.Response) => {
  const todos = await prisma.todos.create({
    data: { ...req.body }
  });
  res.json(todos);
})

app.get("/todos", async (req: express.Request, res: express.Response) => {
  const todos = await prisma.todos.findMany();
  res.json(todos);
});

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});