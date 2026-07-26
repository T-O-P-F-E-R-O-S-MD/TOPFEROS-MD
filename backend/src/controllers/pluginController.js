"use strict";

const pluginHandler = require("../handlers/pluginHandler");
const logger = require("../utils/logger");

class PluginController {

    async list(req, res) {

        try {

            const plugins = pluginHandler.getAll();

            return res.status(200).json({
                success: true,
                total: plugins.length,
                plugins
            });

        } catch (err) {

            logger.error("Plugin List Error", err);

            return res.status(500).json({
                success: false,
                error: err.message
            });

        }

    }

    async reload(req, res) {

        try {

            pluginHandler.reload