"use strict";

const messageHandler = require("../controllers/message");
const logger = require("../utils/logger");

module.exports = function registerMessageEvent(sock) {
    if (!sock) {
        throw new Error("WhatsApp socket is required.");
    }

    sock.ev.on("messages.upsert", async (data) => {
        try {
            if (!data || data.type !== "notify") return;

            await messageHandler(sock, data);
        } catch (err) {
            logger.error("messages.upsert event failed.", err);
        }
    });

    logger.success("Message event registered.");
};