"use strict";

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeInMemoryStore
} = require("@whiskeysockets/baileys");

const P = require("pino");
const chalk = require("chalk");
const fs = require("fs-extra");

const store = makeInMemoryStore({
    logger: P({ level: "silent" })
});

async function connect() {
    const sessionPath = "./sessions";

    await fs.ensureDir(sessionPath);

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        logger: P({ level: "silent" }),
        printQRInTerminal: !process.env.USE_PAIRING_CODE
    });

    store.bind(sock.ev);

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr && !process.env.USE_PAIRING_CODE) {
            console.log(chalk.yellow("\n📲 Eskane QR Code la ak WhatsApp.\n"));
        }

        if (connection === "open") {
            console.log(
                chalk.green(
                    `\n✅ ${process.env.BOT_NAME || "TOPFEROS MD"} konekte avèk siksè!\n`
                )
            );
        }

        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;

            console.log(chalk.red("❌ Koneksyon fèmen."));

            if (shouldReconnect) {
                console.log(chalk.yellow("🔄 Rekonekte..."));
                connect();
            } else {
                console.log(chalk.red("⚠️ Session lan fini. Rekonekte ankò."));
            }
        }
    });

    if (
        process.env.USE_PAIRING_CODE === "true" &&
        !sock.authState.creds.registered
    ) {
        const number = process.env.PAIRING_NUMBER;

        if (number) {
            const code = await sock.requestPairingCode(number);

            console.log(
                chalk.green(
                    `\n🔑 Pairing Code: ${code.match(/.{1,4}/g).join("-")}\n`
                )
            );
        }
    }

    return sock;
}

module.exports = connect;