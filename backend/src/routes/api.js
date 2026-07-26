"use strict";

const express = require("express");
const os = require("os");
const config = require("../config/config");

const router = express.Router();

/**
 * API Home
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to TOPFEROS MD API",
        version: config.bot.version
    });
});

/**
 * Bot Information
 */
router.get("/bot", (req, res) => {
    res.status(200).json({
        success: true,
        bot: {
            name: config.bot.name,
            version: config.bot.version,
            prefix: config.bot.prefix,
            mode: config.bot.mode
        },
        owner: config.owner
    });
});

/**
 * System Information
 */
router.get("/system", (req, res) => {
    res.status(200).json({
        success: true,
        system: {
            platform: os.platform(),
            arch: os.arch(),
            cpu: os.cpus()[0].model,
            cores: os.cpus().length,
            memory: {
                total: os.totalmem(),
                free: os.freemem()
            },
            uptime: process.uptime(),
            node: process.version
        }
    });
});

/**
 * Ping
 */
router.get("/ping", (req, res) => {
    res.status(200).json({
        success: true,
        latency: `${Date.now() - req.startTime || 0} ms`,
        timestamp: Date.now()
    });
});

module.exports = router;