"use strict";

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const config = require("./config/config");

const app = express();

// ================================
// Middlewares
// ================================
app.use(helmet());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(compression());

app.use(express.json({
    limit: "50mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}));

app.use(morgan("dev"));

// ================================
// Home Route
// ================================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        bot: config.bot.name,
        version: config.bot.version,
        mode: config.bot.mode,
        owner: config.owner.name,
        status: "Running 🚀",
        timestamp: Date.now()
    });
});

// ================================
// Health Check
// ================================
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        node: process.version
    });
});

// ================================
// 404
// ================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ================================
// Error Handler
// ================================
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

module.exports = app;