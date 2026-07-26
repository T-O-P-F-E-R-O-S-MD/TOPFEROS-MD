"use strict";

function serialize(sock, msg) {
    if (!msg) return null;

    const m = {};

    m.sock = sock;
    m.key = msg.key;
    m.id = msg.key?.id;
    m.isBaileys = m.id?.startsWith("BAE5") || false;

    m.chat = msg.key?.remoteJid;
    m.from = msg.key?.remoteJid;
    m.fromMe = msg.key?.fromMe || false;

    m.isGroup = m.chat?.endsWith("@g.us") || false;

    m.sender = m.isGroup
        ? msg.key.participant
        : msg.key.remoteJid;

    m.pushName = msg.pushName || "Unknown";

    m.message = msg.message || {};

    m.type = Object.keys(m.message)[0] || "unknown";

    m.body =
        m.message?.conversation ||
        m.message?.extendedTextMessage?.text ||
        m.message?.imageMessage?.caption ||
        m.message?.videoMessage?.caption ||
        m.message?.documentMessage?.caption ||
        m.message?.buttonsResponseMessage?.selectedButtonId ||
        m.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
        "";

    m.text = m.body;

    m.mentionedJid =
        m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

    m.quoted = null;

    const context =
        m.message?.extendedTextMessage?.contextInfo;

    if (context?.quotedMessage) {
        m.quoted = {
            message: context.quotedMessage,
            id: context.stanzaId,
            sender: context.participant,
            chat: m.chat
        };
    }

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
}

module.exports = serialize;