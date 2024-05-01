const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user", // Change this to your actual database name
  password: "root",
  port: 5432,
});

router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if the email is already registered
    const existingUser = await pool.query(
      "SELECT * FROM usr WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered" });
    }

    // Insert the new user into the 'usr' table
    const result = await pool.query(
      "INSERT INTO usr (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, phone]
    );

    res.json({
      success: true,
      message: "Registration successful",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
