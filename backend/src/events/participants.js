"use strict";

const logger = require("../utils/logger");

module.exports = function registerParticipantsEvent(sock) {

    sock.ev.on("group-participants.update", async (data) => {

        try {

            const metadata = await sock.groupMetadata(data.id);

            for (const participant of data.participants) {

                // Welcome
                if (data.action === "add") {

                    logger.info(
                        `${participant} joined ${metadata.subject}`
                    );

                    await sock.sendMessage(data.id, {
                        text:
`👋 Welcome @${participant.split("@")[0]}!

🎉 Welcome to *${metadata.subject}*.

Enjoy your stay!

🦁 Powered by TOPFEROS MD`,
                        mentions: [participant]
                    });

                }

                // Goodbye
                else if (data.action === "remove") {

                    logger.info(
                        `${participant} left ${metadata.subject}`
                    );

                    await sock.sendMessage(data.id, {
                        text:
`👋 Goodbye @${participant.split("@")[0]}.

We'll miss you!

🦁 TOPFEROS MD`,
                        mentions: [participant