import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/*
  GET /builds
*/
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM builds ORDER BY updated_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /builds error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
  GET /builds/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM builds WHERE id=$1", [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /builds/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
  POST /builds
*/
router.post("/", async (req, res) => {
  const b = req.body;

  try {
    const query = `
      INSERT INTO builds (
        id, title, motherboard, cpu, ram, gpu, storage, psu, cooling, case_name, total_price, updated_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())
      RETURNING *;
    `;

    const params = [
      b.id, b.title, b.motherboard, b.cpu, b.ram, b.gpu,
      b.storage, b.psu, b.cooling, b.caseName, b.totalPrice
    ];

    const result = await pool.query(query, params);
    res.json(result.rows[0]);

  } catch (err) {
    console.error("POST /builds error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
  PUT /builds/:id
*/
router.put("/:id", async (req, res) => {
  const b = req.body;

  try {
    const query = `
      UPDATE builds SET 
        title=$1,
        motherboard=$2,
        cpu=$3,
        ram=$4,
        gpu=$5,
        storage=$6,
        psu=$7,
        cooling=$8,
        case_name=$9,
        total_price=$10,
        updated_at=NOW()
      WHERE id=$11
      RETURNING *;
    `;

    const params = [
      b.title, b.motherboard, b.cpu, b.ram, b.gpu,
      b.storage, b.psu, b.cooling, b.caseName, b.totalPrice,
      req.params.id
    ];

    const result = await pool.query(query, params);
    if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });

    res.json(result.rows[0]);

  } catch (err) {
    console.error("PUT /builds error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
  DELETE /builds/:id
*/
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM builds WHERE id=$1 RETURNING *;", [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });

    res.json({ success: true });

  } catch (err) {
    console.error("DELETE /builds error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
