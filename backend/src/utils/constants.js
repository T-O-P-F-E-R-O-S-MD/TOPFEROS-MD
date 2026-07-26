"use strict";

module.exports = {

    BOT: {
        NAME: "TOPFEROS MD",
        VERSION: "1.0.0",
        AUTHOR: "TOPFEROS TECH",
        PREFIX: "."
    },

    EVENTS: {
        MESSAGE: "messages.upsert",
        CONNECTION: "connection.update",
        CONTACTS: "contacts.update",
        GROUP_UPDATE: "groups.update",
        PARTICIPANTS: "group-participants.update",
        CREDS_UPDATE: "creds.update"
    },

    DATABASE: {
        MONGODB: "mongodb",
        SQLITE: "sqlite"
    },

    MODE: {
        PUBLIC: "public",
        PRIVATE: "private",
        SELF: "self"
    },

    PERMISSIONS: {
        OWNER: "owner",
        ADMIN: "admin",
        BOT_ADMIN: "botAdmin",
        PREMIUM: "premium"
    },

    GROUP_ACTIONS: {
        ADD: "add",
        REMOVE: "remove",
        PROMOTE: "promote",
        DEMOTE: "demote"
    },

    MESSAGE_TYPES: {
        TEXT: "conversation",
        IMAGE: "imageMessage",
        VIDEO: "videoMessage",
        AUDIO: "audioMessage",
        STICKER: "stickerMessage",
        DOCUMENT: "documentMessage",
        CONTACT