const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@gmail.com" && password === "123456") {
    res.json({ success: true, message: "Login thành công!" });
  } else {
    res.json({ success: false, message: "Sai email hoặc mật khẩu" });
  }
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
