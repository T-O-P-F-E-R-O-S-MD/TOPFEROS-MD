"use strict";

const logger = require("../utils/logger");

const registerMessageEvent = require("../events/message");
const readyEvent = require("../events/ready");

module.exports = async function eventHandler(sock) {

    try {

        // Register message listener
        registerMessageEvent(sock);

        // Connection Events
        sock.ev.on("connection.update", async (update) => {

            const {
                connection,
                lastDisconnect
            } = update;

            switch (connection) {

                case "connecting":
                    logger.connection("Connecting to WhatsApp...");
                    break;

                case "open":
                    logger.success("WhatsApp connected successfully.");

                    await readyEvent(sock);

                    break;

                case "close":
                    logger.warn("Connection closed.");

                    if (lastDisconnect?.error) {
                        logger.error(
                            "Disconnect Reason",
                            lastDisconnect.error
                        );
                    }

                    break;

                default:
                    break;
            }

        });

        // Contacts Update
        sock.ev.on("contacts.update", (contacts) => {

            logger.info(
                `Updated ${contacts.length} contact(s).`
            );

        });

        // Group Participants Update
        sock.ev.on("group-participants.update", (data) => {

            logger.info(
                `Group participants updated: ${data.id}`
            );

        });

        // Groups Update
        sock.ev.on("groups.update", (groups) => {

            logger.info(
                `Groups updated: ${groups.length}`
            );

        });

        // Chats Update
        sock.ev.on("chats.update", (chats) => {

            logger.info(
                `Chats updated: ${chats.length}`
            );

        });

        logger.success("All events registered successfully.");

    } catch (err) {

        logger.error("Event Handler Error", err);

    }

};