const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

const url = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PW}@interventionapi.3qz4z7d.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .set("strictQuery", false)
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connecté à MongoDB !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
    });

app.use("/api/agent", require("./routes/agent.js"));
app.use("/api/intervention", require("./routes/intervention.js"));

module.exports = app;