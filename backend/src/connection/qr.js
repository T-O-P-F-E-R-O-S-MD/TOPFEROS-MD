"use strict";

const qrcode = require("qrcode-terminal");
const logger = require("../utils/logger");

function registerQRCode(sock) {

    sock.ev.on("connection.update", ({ qr, connection }) => {

        if (qr) {

            logger.info("Scan the QR Code below to connect:");

            qrcode.generate(qr, {
                small: true
            });

        }

        if (connection === "open") {
            logger.success("WhatsApp connected successfully.");
        }

    });

}

module.exports = registerQRCode;