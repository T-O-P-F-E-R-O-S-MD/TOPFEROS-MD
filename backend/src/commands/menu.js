"use strict";

const config = require("../config/config");

module.exports = {
    name: "menu",
    aliases: ["help", "commands"],

    description: "Show bot command menu.",

    category: "General",

    usage: ".menu",

    async execute({ sock, msg }) {
        try {
            const menu = `
╭━━━〔 🦁 TOPFEROS MD 〕━━━⬣
┃
┃ 👑 Owner : ${config.owner.name}
┃ 🤖 Bot : ${config.bot.name}
┃ ⚡ Version : ${config.bot.version}
┃ 🌐 Mode : ${config.bot.mode}
┃ 🔰 Prefix : ${config.bot.prefix}
┃
┣━━━〔 GENERAL 〕━━━⬣
┃ ${config.bot.prefix}menu
┃ ${config.bot.prefix}ping
┃ ${config.bot.prefix}alive
┃
┣━━━〔 GROUP 〕━━━⬣
┃ ${config.bot.prefix}kick
┃ ${config.bot.prefix}add
┃ ${config.bot.prefix}promote
┃ ${config.bot.prefix}demote
┃ ${config.bot.prefix}tagall
┃
┣━━━〔 DOWNLOAD 〕━━━⬣
┃ ${config.bot.prefix}play
┃ ${config.bot.prefix}ytmp3
┃ ${config.bot.prefix}ytmp4
┃ ${config.bot.prefix}tiktok
┃ ${config.bot.prefix}facebook
┃
┣━━━〔 AI 〕━━━⬣
┃ ${config.bot.prefix}ai
┃ ${config.bot.prefix}gemini
┃ ${config.bot.prefix}gpt
┃
┣━━━〔 TOOLS 〕━━━⬣
┃ ${config.bot.prefix}sticker
┃ ${config.bot.prefix}toimg
┃ ${config.bot.prefix}tourl
┃
┣━━━〔 OWNER 〕━━━⬣
┃ ${config.bot.prefix}restart
┃ ${config.bot.prefix}shutdown
┃ ${config.bot.prefix}eval
┃
╰━━━━━━━━━━━━━━━━━━⬣

© TOPFEROS TECH
`;

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: menu
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