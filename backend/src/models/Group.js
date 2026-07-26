"use strict";

const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
        jid: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        name: {
            type: String,
            default: "Unknown Group"
        },

        welcome: {
            type: Boolean,
            default: true
        },

        goodbye: {
            type: Boolean,
            default: true
        },

        welcomeMessage: {
            type: String,
            default: "👋 Welcome @user to @group!"
        },

        goodbyeMessage: {
            type: String,
            default: "👋 Goodbye @user!"
        },

        antiLink: {
            type: Boolean,
            default: false
        },

        antiBot: {
            type: Boolean,
            default: false
        },

        antiSpam: {
            type: Boolean,
            default: true
        },

        antiDelete: {
            type: Boolean,
            default: false
        },

        antiViewOnce: {
            type: Boolean,
            default: false
        },

        nsfw: {
            type: Boolean,
            default: false
        },

        economy: {
            type: Boolean,
            default: true
        },

        leveling: {
            type: Boolean,
            default: true
        },

        prefix: {
            type: String,
            default: "."
        },

        language: {
            type: String,
            default: "en"
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Group", GroupSchema);