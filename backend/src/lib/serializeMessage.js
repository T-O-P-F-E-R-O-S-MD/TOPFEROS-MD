"use strict";

module.exports = function serializeMessage(sock, msg) {

    if (!msg) return null;

    const m = {};

    m.id = msg.key?.id;
    m.chat = msg.key?.remoteJid;
    m.from = msg.key?.remoteJid;
    m.sender = msg.key?.participant || msg.key?.remoteJid;
    m.fromMe = msg.key?.fromMe || false;
    m.isGroup = m.chat?.endsWith("@g.us") || false;

    m.pushName = msg.pushName || "Unknown";

    m.message = msg.message || {};

    m.type = Object.keys(m.message)[0] || "unknown";

    m.body =
        m.message.conversation ||
        m.message.extendedTextMessage?.text ||
        m.message.imageMessage?.caption ||
        m.message.videoMessage?.caption ||
        "";

    m.mentions =
        m.message.extendedTextMessage?.contextInfo?.mentionedJid ||
        [];

    m.quoted =
        m.message.extendedTextMessage?.contextInfo?.quotedMessage ||
        null;

    m.timestamp =
        msg.messageTimestamp || Math.floor(Date.now() / 1000);

    m.reply = async (text, options = {}) => {

        return await sock.sendMessage(
            m.chat,
            {
                text,
                ...options
            },
            {
                quoted: msg
            }
        );

    };

    m.react = async (emoji) => {

        return await sock.sendMessage(
            m.chat,
            {
                react: {
                    text: emoji,
                    key: msg.key
                }
            }
        );

    };

    return m;

};