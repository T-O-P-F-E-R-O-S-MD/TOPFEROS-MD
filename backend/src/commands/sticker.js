"use strict";

const fs = require("fs-extra");
const path = require("path");

module.exports = {
    name: "sticker",
    aliases: ["s", "stiker"],

    description: "Convert image or video to sticker.",

    category: "Tools",

    usage: ".sticker",

    async execute({ sock, msg }) {
        try {
            const jid = msg.key.remoteJid;

            const quoted =
                msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

            if (!quoted) {
                return await sock.sendMessage(
                    jid,
                    {
                        text: "❌ Reply to an image or video with *.sticker*."
                    },
                    { quoted: msg }
                );
            }

            const image = quoted.imageMessage;
            const video = quoted.videoMessage;

            if (!image && !video) {
                return await sock.sendMessage(
                    jid,
                    {
                        text: "❌ Only images and short videos can be converted into stickers."
                    },
                    { quoted: msg }
                );
            }

            const media = await sock.downloadMediaMessage({
                message: quoted
            });

            if (!media) {
                return await sock.sendMessage(
                    jid,
                    {
                        text: "❌ Failed to download media."
                    },
                    { quoted: msg }
                );
            }

            const tempDir = path.join(process.cwd(), "temp");

            await fs.ensureDir(tempDir);

            const tempFile = path.join(
                tempDir,
                `${Date.now()}.webp`
            );

            await fs.writeFile(tempFile, media);

            await sock.sendMessage(
                jid,
                {
                    sticker: fs.readFileSync(tempFile)
                },
                {
                    quoted: msg
                }
            );

            await fs.remove(tempFile);

        } catch (err) {
            console.error(err);

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "❌ Failed to create sticker."
                },
                {
                    quoted: msg
                }
            );
        }
    }
};