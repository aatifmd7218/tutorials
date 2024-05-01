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


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  try {
    // Ensure that you have a 'users' table with 'email' and 'password' columns
    const result = await pool.query(
      "SELECT * FROM usr WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length > 0) {
      // If a user with the provided email and password exists
      res.json({ success: true, message: "Login successful" });
    } else {
      // If no user found with the provided email and password
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error checking login credentials:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


module.exports = router;
