"use strict";

const {
    makeInMemoryStore
} = require("@whiskeysockets/baileys");

const P = require("pino");

const store = makeInMemoryStore({
    logger: P({
        level: "silent"
    })
});

/**
 * Bind store to Baileys socket
 */
function bind(sock) {
    store.bind(sock.ev);
}

/**
 * Load messages
 */
function loadMessage(jid, id) {
    return store.loadMessage(jid, id);
}

/**
 * Get all chats
 */
function chats() {
    return store.chats;
}

/**
 * Get all contacts
 */
function contacts() {
    return store.contacts;
}

/**
 * Get all messages
 */
function messages() {
    return store.messages;
}

/**
 * Save store
 */
async function writeToFile(path = "./sessions/store.json") {
    return await store.writeToFile(path);
}

/**
 * Read store
 */
async function readFromFile(path = "./sessions/store.json") {
    return await store.readFromFile(path);
}

module.exports = {
    store,
    bind,
    loadMessage,
    chats,
    contacts,
    messages,
    writeToFile,
    readFromFile
};