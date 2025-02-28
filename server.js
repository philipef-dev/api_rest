import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json(allUsers);
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID inválido. Deve ser um número válido" });
  }

  try {
    const deleteUser = await prisma.user.delete({
      where: { id },
    });
    res
      .status(200)
      .json({ message: "Usuário deletado com sucesso", deleteUser });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deletar usuário por favor verificar o ID",
      error: error.message,
    });
  }
});

app.post("/user", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ error: "Por favor preencha todos os campos" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        age,
      },
    });
    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch {
    res.status(500).json({ error: "Erro ao criar usário" });
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID inválido. Deve ser um número válido" });
    }

    if (!name && !email && !age) {
      return res
        .status(400)
        .json({ error: "Envie ao menos 1 campo para atualização" });
    }

    const updateUser = await prisma.user.update({
      where: { id },
      data: { name, email, age },
    });

    return res
      .status(201)
      .json({ message: "Usuário atualizado com sucesso", user: updateUser });
  } catch (error) {
    console.log("Erro ao editar usuário", error);
    res.status(500).json({ error: "Erro ao editar usuário" });
  }
});

app.listen(3000, () => {
  console.log("Server is running port 3000 🚀");
});
