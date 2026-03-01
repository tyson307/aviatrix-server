const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password, balance: 5000 });
  res.json({ message: "User registered" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", balance: user.balance });
});

app.get("/", (req, res) => {
  res.send("Aviatrix Server Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
