"use strict";

module.exports = {
    name: "ping",
    aliases: ["p"],
    category: "General",
    description: "Check bot response speed.",
    usage: ".ping",

    async execute({ sock, m }) {

        const start = Date.now();

        await m.reply("🏓 Pong!");

        const end = Date.now();

        await m.reply(
            `⚡ Response Time: ${end - start} ms`
        );

    }
};