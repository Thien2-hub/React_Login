const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
