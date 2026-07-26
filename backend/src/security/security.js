"use strict";

const config = require("../config/config");

const cooldown = new Map();
const blacklist = new Set();

/**
 * Verify if sender is the bot owner
 */
function isOwner(jid) {
    if (!jid) return false;

    const owner =
        config.owner.number.replace(/\D/g, "") + "@s.whatsapp.net";

    return jid === owner;
}

/**
 * Verify if sender is a group admin
 */
async function isAdmin(sock, groupJid, sender) {
    try {
        const metadata = await sock.groupMetadata(groupJid);

        const participant = metadata.participants.find(
            (p) => p.id === sender
        );

        return participant ? !!participant.admin : false;

    } catch {
        return false;
    }
}

/**
 * Verify if bot is admin
 */
async function isBotAdmin(sock, groupJid) {
    try {
        const metadata = await sock.groupMetadata(groupJid);

        const botId = sock.user.id.split(":")[0] + "@s.whatsapp.net";

        const participant = metadata.participants.find(
            (p) => p.id === botId
        );

        return participant ? !!participant.admin : false;

    } catch {
        return false;
    }
}

/**
 * Cooldown
 */
function checkCooldown(id, seconds = 3) {
    const now = Date.now();

    if (cooldown.has(id)) {
        const expires = cooldown.get(id);

        if (now < expires) {
            return false;
        }
    }

    cooldown.set(id, now + seconds * 1000);
    return true;
}

/**
 * Blacklist
 */
function addBlacklist(jid) {
    blacklist.add(jid);
}

function removeBlacklist(jid) {
    blacklist.delete(jid);
}

function isBlacklisted(jid) {
    return blacklist.has(jid);
}

module.exports = {
    isOwner,
    isAdmin,
    isBotAdmin,
    checkCooldown,
    addBlacklist,
    removeBlacklist,
    isBlacklisted
};