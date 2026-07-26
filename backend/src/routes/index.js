"use strict";

const express = require("express");

const router = express.Router();

const apiRoutes = require("./api");

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        name: "TOPFEROS MD",
        version: "1.0.0",
        author: "TOPFEROS TECH",
        status: "Running",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route Not Found"
    });
});

module.exports = router;