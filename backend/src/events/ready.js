"use strict";

const os = require("os");
const logger = require("../utils/logger");
const config = require("../config/config");
const loader = require("../plugins/loader");

module.exports = async function ready(sock) {
    try {
        // Chaje commands ak plugins
        loader.loadCommands();
        loader.loadPlugins();

        const botName = config.bot.name;
        const owner = config.owner.name;

        const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeMemory = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

        logger.success("====================================");
        logger.success(`${botName} is now online.`);
        logger.info(`Owner      : ${owner}`);
        logger.info(`Platform   : ${os.platform()}`);
        logger.info(`Node.js    : ${process.version}`);
        logger.info(`CPU        : ${os.cpus()[0].model}`);
        logger.info(`Memory     : ${freeMemory} GB / ${totalMemory} GB Free`);
        logger.info(`Commands   : ${loader.getCommands().size}`);
        logger.info(`Plugins    : ${loader.getPlugins().size}`);
        logger.success("====================================");

        if (sock?.user) {
            logger.success(
                `Connected as ${sock.user.name || sock.user.id}`
            );
        }

    } catch (err) {
        logger.error("Ready Event Error", err);
    }
};