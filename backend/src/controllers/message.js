"use strict";

const config = require("../config/config");
const logger = require("../utils/logger");
const loader = require("../plugins/loader");

module.exports = async function messageHandler(sock, message) {
    try {
        if (!message || !message.messages) return;

        const msg = message.messages[0];
        if (!msg) return;

        // Ignore status
        if (msg.key.remoteJid === "status@broadcast") return;

        // Ignore own messages
        if (msg.key.fromMe) return;

        const jid = msg.key.remoteJid;

        const body =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            msg.message?.imageMessage?.caption ||
            msg.message?.videoMessage?.caption ||
            "";

        if (!body) return;

        logger.info(`[MESSAGE] ${jid}: ${body}`);

        // Auto Read
        if (config.features.autoRead) {
            await sock.readMessages([msg.key]);
        }

        // Prefix Check
        if (!body.startsWith(config.bot.prefix)) return;

        const args = body
            .slice(config.bot.prefix.length)
            .trim()
            .split(/\s+/);

        const commandName = args.shift().toLowerCase();

        const command = loader.getCommand(commandName);

        if (!command) return;

        await command.execute({
            sock,
            msg,
            jid,
            body,
            args,
            config
        });

    } catch (err) {
        logger.error("Message Handler Error", err);
    }
};