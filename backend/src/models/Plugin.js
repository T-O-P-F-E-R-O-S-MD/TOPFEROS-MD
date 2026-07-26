"use strict";

const mongoose = require("mongoose");

const PluginSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        description: {
            type: String,
            default: ""
        },

        version: {
            type: String,
            default: "1.0.0"
        },

        author: {
            type: String,
            default: "TOPFEROS TECH"
        },

        category: {
            type: String,
            default: "General"
        },

        enabled: {
            type: Boolean,
            default: true
        },

        autoLoad: {
            type: Boolean,
            default: true
        },

        autoReload: {
            type: Boolean,
            default: true
        },

        premium: {
            type: Boolean,
            default: false
        },

        ownerOnly: {
            type: Boolean,
            default: false
        },

        groupOnly: {
            type: Boolean,
            default: false
        },

        privateOnly: {
            type: Boolean,
            default: false
        },

        aliases: {
            type: [String],
            default: []
        },

        commands: {
            type: [String],
            default: []
        },

        usage: {
            type: String,
            default: ""
        },

        permissions: {
            admin: {
                type: Boolean,
                default: false
            },
            botAdmin: {
                type: Boolean,
                default: false
            }
        },

        downloads: {
            type: Number,
            default: 0
        },

        lastUsed: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

PluginSchema.methods.enable = function () {
    this.enabled = true;
    return this.save();
};

PluginSchema.methods.disable = function () {
    this.enabled = false;
    return this.save();
};

PluginSchema.methods.incrementUsage = function () {
    this.downloads++;
    this.lastUsed = new Date();
    return this.save();
};

module.exports = mongoose.model("Plugin", PluginSchema);