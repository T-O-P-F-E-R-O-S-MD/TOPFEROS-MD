"use strict";

const os = require("os");
const config = require("../config/config");

class ApiController {

    async home(req, res) {

        res.status(200).json({
            success: true,
            message: "Welcome to TOPFEROS MD API",
            version: "1.0.0",
            author: "TOPFEROS TECH",
            timestamp: new Date().toISOString()
        });

    }

    async status(req, res) {

        res.status(200).json({
            success: true,
            bot: config.bot.name,
            version: config.bot.version,
            mode: config.bot.mode,
            uptime: process.uptime(),
            platform: os.platform(),
            node: process.version,
            memory: process.memoryUsage(),
            cpu: os.cpus().length,
            timestamp: new Date().toISOString()
        });

    }

    async health(req, res) {

        res.status(200).json({
            success: true,
            status: "healthy",
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });

    }

}

module.exports = new ApiController();