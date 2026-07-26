"use strict";

const express = require("express");
const http = require("http");
const chalk = require("chalk");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

module.exports = async function startBot() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.status(200).json({
            bot: process.env.BOT_NAME || "TOPFEROS MD",
            version: process.env.BOT_VERSION || "1.0.0",
            status: "online"
        });
    });

    const port = process.env.PORT || 3000;

    server.listen(port, () => {
        console.log(
            chalk.cyan(
                `[SERVER] Running on http://localhost:${port}`
            )
        );
    });

    // Start WhatsApp Connection
    const connect = require("./connection/baileys");
    await connect();
};