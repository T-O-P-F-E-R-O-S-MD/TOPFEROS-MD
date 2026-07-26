"use strict";

const config = require("../../config/config");

module.exports = {
    name: "menu",
    aliases: ["help", "commands"],
    category: "General",
    description: "Display the bot command menu.",
    usage: ".menu",

    async execute({ m }) {

        const prefix = config.bot?.prefix || ".";

        const menu = `
╭━━━〔 🦁 TOPFEROS MD 〕━━━⬣

🤖 Bot: ${config.bot?.name || "TOPFEROS MD"}
📌 Version: ${config.bot?.version || "1.0.0"}
⚡ Prefix: ${prefix}

╭━━〔 GENERAL 〕━━⬣
┃ ${prefix}menu
┃ ${prefix}ping
┃ ${prefix}help
╰