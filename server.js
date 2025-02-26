import express from "express";

const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta, ${port} `);
});
