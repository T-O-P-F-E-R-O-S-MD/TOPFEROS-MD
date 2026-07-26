"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        jid: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        name: {
            type: String,
            default: "Unknown"
        },

        xp: {
            type: Number,
            default: 0
        },

        level: {
            type: Number,
            default: 1
        },

        coins: {
            type: Number,
            default: 100
        },

        diamonds: {
            type: Number,
            default: 0
        },

        premium: {
            type: Boolean,
            default: false
        },

        premiumExpire: {
            type: Date,
            default: null
        },

        warnings: {
            type: Number,
            default: 0
        },

        banned: {
            type: Boolean,
            default: false
        },

        banReason: {
            type: String,
            default: ""
        },

        registered: {
            type: Boolean,
            default: false
        },

        language: {
            type: String,
            default: "en"
        },

        prefix: {
            type: String,
            default: "."
        },

        lastSeen: {
            type: Date,
            default: Date.now
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

module.exports = mongoose.model("User", UserSchema);