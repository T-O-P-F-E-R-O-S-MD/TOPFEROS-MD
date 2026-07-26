"use strict";

const config = require("../config/config");

module.exports = {
    name: "owner",
    aliases: ["admin"],

    description: "Owner management commands.",

    category: "Owner",

    usage: ".owner <restart|shutdown|eval>",

    async execute({ sock, msg, body }) {
        try {
            const sender = msg.key.participant || msg.key.remoteJid;
            const owner = config.owner.number.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

            if (sender !== owner) {
                return await sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text: "❌ This command is only available for the bot owner."
                    },
                    { quoted: msg }
                );
            }

            const args = body.trim().split(/\s+/);
            const action = (args[1] || "").toLowerCase();

            switch (action) {

                case "restart":
                    await sock.sendMessage(
                        msg.key.remoteJid,
                        {
                            text: "♻️ Restarting TOPFEROS MD..."
                        },
                        { quoted: msg }
                    );

                    process.exit(0);
                    break;

                case "shutdown":
                    await sock.sendMessage(
                        msg.key.remoteJid,
                        {
                            text: "🛑 Shutting down TOPFEROS MD..."
                        },
                        { quoted: msg }
                    );

                    process.exit(1);
                    break;

                case "eval":
                    if (!args[2]) {
                        return await sock.sendMessage(
                            msg.key.remoteJid,
                            {
                                text: "Example:\n.owner eval 2+2"
                            },
                            { quoted: msg }
                        );
                    }

                    try {
                        const code = args.slice(2).join(" ");
                        let result = await eval(code);

                        if (typeof result !== "string") {
                            result = require("util").inspect(result);
                        }

                        await sock.sendMessage(
                            msg.key.remoteJid,
                            {
                                text: "```" + result + "```"
                            },
                            { quoted: msg }
                        );
                    } catch (err) {
                        await sock.sendMessage(
                            msg.key.remoteJid,
                            {
                                text: "❌ " + err.message
                            },
                            { quoted: msg }
                        );
                    }
                    break;

                default:
                    await sock.sendMessage(
                        msg.key.remoteJid,
                        {
                            text:
`👑 *TOPFEROS MD OWNER*

.owner restart
.owner shutdown
.owner eval <javascript>`
                        },
                        { quoted: msg }
                    );
            }

        } catch (err) {
            console.error(err);
        }
    }
};