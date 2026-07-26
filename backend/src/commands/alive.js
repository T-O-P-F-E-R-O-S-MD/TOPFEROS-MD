"use strict";

const os = require("os");

module.exports = {
    name: "alive",
    aliases: ["online", "status"],

    description: "Check if the bot is online.",

    category: "General",

    usage: ".alive",

    async execute({ sock, msg, config }) {
        try {
            const uptime = process.uptime();

            const days = Math.floor(uptime / 86400);
            const hours = Math.floor((uptime % 86400) / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);

            const text = `
╭━━━〔 🤖 BOT STATUS 〕━━━⬣

🟢 Status : Online
🦁 Bot : ${config.bot.name}
⚡ Version : ${config.bot.version}
👑 Owner : ${config.owner.name}
🌐 Mode : ${config.bot.mode}
🔰 Prefix : ${config.bot.prefix}

⏱️ Uptime :
${days}d ${hours}h ${minutes}m ${seconds}s

💻 Platform : ${os.platform()}
🟩 Node.js : ${process.version}

╰━━━━━━━━━━━━━━━━━━⬣

© TOPFEROS TECH
`;

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text
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