"use strict";

const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        botName: {
            type: String,
            default: "TOPFEROS MD"
        },

        owner: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        platform: {
            type: String,
            default: "WhatsApp"
        },

        device: {
            type: String,
            default: "Unknown"
        },

        status: {
            type: String,
            enum: [
                "connected",
                "connecting",
                "disconnected",
                "logged_out"
            ],
            default: "connecting"
        },

        lastConnected: {
            type: Date,
            default: Date.now
        },

        lastDisconnected: {
            type: Date,
            default: null
        },

        backupEnabled: {
            type: Boolean,
            default: true
        },

        backupPath: {
            type: String,
            default: ""
        },

        reconnectCount: {
            type: Number,
            default: 0
        },

        qrGenerated: {
            type: Number,
            default: 0
        },

        authVersion: {
            type: String,
            default: "multi-file"
        },

        metadata: {
            type: Object,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

SessionSchema.methods.connect = function () {
    this.status = "connected";
    this.lastConnected = new Date();
    return this.save();
};

SessionSchema.methods.disconnect = function () {
    this.status = "disconnected";
    this.lastDisconnected = new Date();
    return this.save();
};

SessionSchema.methods.reconnect = function () {
    this.reconnectCount++;
    this.status = "connecting";
    return this.save();
};

module.exports = mongoose.model("Session", SessionSchema);