"use strict";

module.exports = {
    name: "download",
    aliases: ["dl"],

    description: "Download commands.",

    category: "Download",

    usage: ".download <play|ytmp3|ytmp4|tiktok|facebook>",

    async execute({ sock, msg, body }) {
        try {
            const jid = msg.key.remoteJid;

            const args = body.trim().split(/\s+/);
            const command = (args[1] || "").toLowerCase();
            const url = args.slice(2).join(" ");

            switch (command) {

                case "play":
                    if (!url) {
                        return await sock.sendMessage(
                            jid,
                            {
                                text: "Example:\n.download play Fally Ipupa"
                            },
                            { quoted: msg }
                        );
                    }

                    return await sock.sendMessage(
                        jid,
                        {
                            text:
`🔍 Searching...

Query: ${url}

⚠️ Music downloader is not connected yet.`
                        },
                        { quoted: msg }
                    );

                case "ytmp3":
                    if (!url) {
                        return await sock.sendMessage(
                            jid,
                            {
                                text: "Example:\n.download ytmp3 https://youtu.be/..."
                            },
                            { quoted: msg }
                        );
                    }

                    return await sock.sendMessage(
                        jid,
                        {
                            text: "🎵 YouTube MP3 downloader will be available soon."
                        },
                        { quoted: msg }
                    );

                case "ytmp4":
                    if (!url) {
                        return await sock.sendMessage(
                            jid,
                            {
                                text: "Example:\n.download ytmp4 https://youtu.be/..."
                            },
                            { quoted: msg }
                        );
                    }

                    return await sock.sendMessage(
                        jid,
                        {
                            text: "🎥 YouTube MP4 downloader will be available soon."
                        },
                        { quoted: msg }
                    );

                case "tiktok":
                    if (!url) {
                        return await sock.sendMessage(
                            jid,
                            {
                                text: "Example:\n.download tiktok https://vm.tiktok.com/..."
                            },
                            { quoted: msg }
                        );
                    }

                    return await sock.sendMessage(
                        jid,
                        {
                            text: "🎬 TikTok downloader will be available soon."
                        },
                        { quoted: msg }
                    );

                case "facebook":
                    if (!url) {
                        return await sock.sendMessage(
                            jid,
                            {
                                text: "Example:\n.download facebook https://facebook.com/..."
                            },
                            { quoted: msg }
                        );
                    }

                    return await sock.sendMessage(
                        jid,
                        {
                            text: "📹 Facebook downloader will be available soon."
                        },
                        { quoted: msg }
                    );

                default:
                    return await sock.sendMessage(
                        jid,
                        {
                            text:
`📥 *TOPFEROS MD DOWNLOAD*

.download play <song>
.download ytmp3 <url>
.download ytmp4 <url>
.download tiktok <url>
.download facebook <url>`
                        },
                        { quoted: msg }
                    );
            }

        } catch (err) {
            console.error(err);

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "❌ Download command failed."
                },
                {
                    quoted: msg
                }
            );
        }
    }
};