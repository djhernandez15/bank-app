require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
const authController = require("./controllers/authController");

const app = express();
//express.json() lets us use req.body => information/data from request
app.use(express.json());

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database connected");
  })
  .catch(err => {
    console.log(err);
  });

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

//Endpoints
app.post("/api/register", authController.registerUser);
app.post("/api/login", authController.loginUser);

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));
