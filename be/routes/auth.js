const express = require("express");
const {
  signup,
  login,
  resetRequest,
  resetPassword,
} = require("../controllers/authController");
const db = require("../config/db");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-request", resetRequest);
router.post("/reset-password", resetPassword);

router.get("/users", (req, res) => {
  db.query("SELECT id, fullname, email FROM users", (err, rows) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.status(200).json(rows);
  });
});

router.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { fullname, email, password } = req.body;

  if (!fullname || !email) {
    return res.status(400).json({ error: "fullname và email là bắt buộc" });
  }

  const sql =
    "UPDATE users SET fullname = ?, email = ?, password = ? WHERE id = ?";
  db.query(sql, [fullname, email, password, userId], (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: { id: userId, fullname, email },
    });
  });
});
router.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body; 

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  const fields = Object.keys(updates)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updates);
  values.push(id);

  db.query(`UPDATE users SET ${fields} WHERE id = ?`, values, (err, result) => {
    if (err) {
      console.error("Patch error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User partially updated successfully" });
  });
});
router.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      userId: userId,
    });
  });
});
module.exports = router;
