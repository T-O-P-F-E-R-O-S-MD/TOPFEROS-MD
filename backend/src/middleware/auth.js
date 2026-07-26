"use strict";

const security = require("../security/security");

module.exports = {

    /**
     * Verify Bot Owner
     */
    async owner({ msg, sock }) {

        const sender =
            msg.key.participant ||
            msg.key.remoteJid;

        if (!security.isOwner(sender)) {

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "❌ This command is only available for the bot owner."
                },
                {
                    quoted: msg
                }
            );

            return false;
        }

        return true;
    },

    /**
     * Verify Group Admin
     */
    async admin({ sock, msg }) {

        const jid = msg.key.remoteJid;

        if (!jid.endsWith("@g.us")) {

            await sock.sendMessage(
                jid,
                {
                    text: "❌ This command only works in groups."
                },
                {
                    quoted: msg
                }
            );

            return false;
        }

        const sender = msg.key.participant;

        const isAdmin = await security.isAdmin(
            sock,
            jid,
            sender
        );

        if (!isAdmin) {

            await sock.sendMessage(
                jid,
                {
                    text: "❌ You must be a group admin."
                },
                {
                    quoted: msg
                }
            );

            return false;
        }

        return true;
    },

    /**
     * Verify Bot Admin
     */
    async botAdmin({ sock, msg }) {

        const jid = msg.key.remoteJid;

        const botAdmin = await security.isBotAdmin(
            sock,
            jid
        );

        if (!botAdmin) {

            await sock.sendMessage(
                jid,
                {
                    text: "❌ I need admin permissions."
                },
                {
                    quoted: msg
                }
            );

            return false;
        }

        return true;
    },

    /**
     * Cooldown Protection
     */
    async cooldown({ sock, msg, seconds = 3 }) {

        const sender =
            msg.key.participant ||
            msg.key.remoteJid;

        const allowed = security.checkCooldown(
            sender,
            seconds
        );

        if (!allowed) {

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: `⏳ Please wait ${seconds} seconds before using another command.`
                },
                {
                    quoted: msg
                }
            );

            return false;
        }

        return true;
    },

    /**
     * Blacklist Protection
     */
    async blacklist({ sock, msg }) {

        const sender =
            msg.key.participant ||
            msg.key.remoteJid;

        if (security.isBlacklisted(sender)) {

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "🚫 You are blacklisted from using this bot."
                },
                {
                    quoted: msg
                }
            );

            return false;
        }

        return true;
    }

};