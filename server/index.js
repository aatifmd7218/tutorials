const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser"); // Import body-parser
const cors = require("cors"); // Import cors
const cron = require("node-cron"); 

const app = express();
const port = 9000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "root",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Unable to connect to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

const signinRouter = require("./routes/signin");
app.use("/api/signin", signinRouter);

const signupRouter = require("./routes/signup");
app.use("/api/signup", signupRouter);

const loginRouter = require("./routes/login1");
app.use("/api/login1", loginRouter);

cron.schedule('* * * * *', () => {
  console.log('Cron job running every minute');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
