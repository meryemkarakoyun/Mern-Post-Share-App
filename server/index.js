const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const database = require("./config/database.js");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");

dotenv.config();

// JWT_SECRET kontrolü
if (!process.env.JWT_SECRET) {
  console.error("HATA: JWT_SECRET .env dosyasında tanımlanmamış!");
  console.error("Lütfen server/.env dosyasına JWT_SECRET ekleyin.");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

const PORT = process.env.PORT || 5000;

database();

app.listen(PORT, () => {
  console.log("server is running", PORT);
});
