"use strict";

const fs = require("fs-extra");
const path = require("path");
const logger = require("../utils/logger");

class AuthController {

    async getSession(req, res) {

        try {

            const sessionPath = path.join(process.cwd(), "sessions");

            const exists = await fs.pathExists(sessionPath);

            return res.status(200).json({
                success: true,
                exists,
                path: sessionPath
            });

        } catch (err) {

            logger.error("Get Session Error", err);

            return res.status(500).json({
                success: false,
                error: err.message
            });

        }

    }

    async clearSession(req, res) {

        try {

            const sessionPath = path.join(process.cwd(), "sessions");

            await fs.emptyDir(sessionPath);

           