"use strict";

const {
    makeWASocket,
    Browsers,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");

async function createSocket() {

    const { state, saveCreds } = await useMultiFileAuthState("sessions");

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        browser: Browsers.macOS("TOPFEROS MD"),
        printQRInTerminal: true,
        logger: pino({
            level: "silent"
        }),
        syncFullHistory: false,
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true
    });

    sock.ev.on("creds.update", saveCreds);

    return sock;
}

module.exports = createSocket;