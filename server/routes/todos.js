import { Router } from "express";
import { pool } from "../db.js";


export const todosRouter = Router();

todosRouter.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM todos ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});


todosRouter.post("/", async (req, res, next) => {
  const { title } = req.body;
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }
  try {
    const { rows } = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});


todosRouter.patch("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  const { done } = req.body;

  if (typeof done !== "boolean") {
    return res.status(400).json({ error: "done must be true or false" });
  }

  try {
    const { rows } = await pool.query(
      "UPDATE todos SET done = $1 WHERE id = $2 RETURNING *",
      [done, id]
    );
    if (!rows[0]) return res.status(404).json({ error: "Todo not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }


})


todosRouter.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id must be an integer" });
  }
  try {
    const { rowCount } = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    if (!rowCount) return res.status(404).json({ error: "Todo not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});


