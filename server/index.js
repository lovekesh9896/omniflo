const express = require("express");
const cors = require("cors");
const db = require("./db");
const UserRouter = require("./router/index");
const app = express();
const apiPort = 3000;
const passport = require("passport");
const passportJWT = require("./config/passsport-jwt");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api", UserRouter);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
	return res.send("<h1>Error 404</h1>");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
