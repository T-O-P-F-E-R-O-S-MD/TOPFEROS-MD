"use strict";

const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            enum: [
                "info",
                "success",
                "warn",
                "error",
                "debug"
            ],
            default: "info",
            index: true
        },

        type: {
            type: String,
            enum: [
                "system",
                "command",
                "connection",
                "database",
                "plugin",
                "api",
                "security",
                "group",
                "user"
            ],
            default: "system"
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            default: ""
        },

        command: {
            type: String,
            default: null
        },

        user: {
            type: String,
            default: null
        },

        group: {
            type: String,
            default: null
        },

        plugin: {
            type: String,
            default: null
        },

        api: {
            type: String,
            default: null
        },

        ip: {
            type: String,
            default: null
        },

        stack: {
            type: String,
            default: null
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        createdAt: {
            type: Date,
            default: Date.now,
            index: true
        }
    },
    {
        timestamps: true
    }
);

LogSchema.statics.write = async function (data) {
    return await this.create(data);
};

LogSchema.statics.latest = async function (limit = 50) {
    return await this.find()
        .sort({ createdAt: -1 })
        .limit(limit);
};

module.exports = mongoose.model("Log", LogSchema);