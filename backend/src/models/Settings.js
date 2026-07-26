"use strict";

const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
    {
        botName: {
            type: String,
            default: "TOPFEROS MD"
        },

        ownerName: {
            type: String,
            default: "TOPFEROS TECH"
        },

        ownerNumber: {
            type: String,
            default: ""
        },

        prefix: {
            type: String,
            default: "."
        },

        mode: {
            type: String,
            enum: ["public", "private", "self"],
            default: "public"
        },

        language: {
            type: String,
            default: "en"
        },

        autoRead: {
            type: Boolean,
            default: true
        },

        autoTyping: {
            type: Boolean,
            default: false
        },

        autoRecording: {
            type: Boolean,
            default: false
        },

        alwaysOnline: {
            type: Boolean,
            default: true
        },

        antiCall: {
            type: Boolean,
            default: true
        },

        antiSpam: {
            type: Boolean,
            default: true
        },

        maintenance: {
            type: Boolean,
            default: false
        },

        maxWarnings: {
            type: Number,
            default: 3
        },

        sessionBackup: {
            type: Boolean,
            default: true
        },

        plugins: {
            type: Boolean,
            default: true
        },

        apiKeys: {
            groq: {
                type: String,
                default: ""
            },
            gemini: {
                type: String,
                default: ""
            },
            openai: {
                type: String,
                default: ""
            },
            imgbb: {
                type: String,
                default: ""
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Settings", SettingsSchema);