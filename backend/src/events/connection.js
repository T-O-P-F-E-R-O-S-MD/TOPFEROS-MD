"use strict";

const {
    DisconnectReason
} = require("@whiskeysockets/baileys");

const logger = require("../utils/logger");

module.exports = function registerConnectionEvent(sock, reconnect) {

    sock.ev.on("connection.update", async (update) => {

        const {
            connection,
            lastDisconnect,
            qr
        } = update;

        if (qr) {
            logger.info("📱 QR Code generated.");
        }

        if (connection === "connecting") {
            logger.info("🔄 Connecting to WhatsApp...");
        }

        if (connection === "open") {
            logger.success("✅ WhatsApp Connected Successfully.");
        }

        if (connection === "close") {

            const statusCode =
                lastDisconnect?.error?.output?.statusCode;

            const shouldReconnect =
                statusCode !== DisconnectReason.loggedOut;

            logger.warn(
                `❌ Connection Closed (${statusCode || "Unknown"})`
            );

            if (shouldReconnect) {

                logger.info("♻️ Reconnecting...");

                if (typeof reconnect === "function") {
                    reconnect();
                }

            } else {

                logger.error(
                    "🚫 Session Logged Out. Delete sessions and pair again."
                );

            }

        }

    });

};