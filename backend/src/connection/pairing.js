"use strict";

const {
    makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    Browsers
} = require("@whiskeysockets/baileys");

const pino = require("pino");

async function createPairing(phoneNumber) {

    const { state, saveCreds } =
        await useMultiFileAuthState("sessions");

    const { version } =
        await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        browser: Browsers.macOS("TOPFEROS MD"),
        logger: pino({
            level: "silent"
        }),
        printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    if (!sock.authState.creds.registered) {

        const code = await sock.requestPairingCode(
            phoneNumber
        );

        console.log("\n==============================");
        console.log("PAIRING CODE");
        console.log(code);
        console.log("==============================\n");

        return {
            sock,
            code
        };
    }

    return {
        sock,
        code: null
    };
}

module.exports = createPairing;