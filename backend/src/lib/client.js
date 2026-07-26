"use strict";

let socket = null;

/**
 * Save WhatsApp socket instance
 * @param {import("@whiskeysockets/baileys").WASocket} sock
 */
function setClient(sock) {
    socket = sock;
}

/**
 * Get current WhatsApp socket instance
 */
function getClient() {
    if (!socket) {
        throw new Error("WhatsApp client has not been initialized.");
    }

    return socket;
}

/**
 * Check if socket exists
 */
function hasClient() {
    return socket !== null;
}

/**
 * Remove socket
 */
function clearClient() {
    socket = null;
}

module.exports = {
    setClient,
    getClient,
    hasClient,
    clearClient
};