const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const app = express();
const apiPort = 3000;
const passport = require("passport");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParse());

app.get("/", (req, res) => {
	return res.send("<h1>Error 404</h1>");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
