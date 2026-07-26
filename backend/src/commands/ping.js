"use strict";

module.exports = {
    name: "ping",
    aliases: ["p"],

    description: "Check bot response speed.",

    category: "General",

    usage: ".ping",

    async execute({ sock, msg }) {
        try {
            const start = Date.now();

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "🏓 Pinging..."
                },
                {
                    quoted: msg
                }
            );

            const end = Date.now();

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:
`🏓 *PONG!*

⚡ Speed: ${end - start} ms
🤖 Bot: TOPFEROS MD
🟢 Status: Online`
                },
                {
                    quoted: msg
                }
            );

        } catch (err) {
            console.error(err);
        }
    }
};