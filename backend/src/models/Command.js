"use strict";

const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        aliases: {
            type: [String],
            default: []
        },

        category: {
            type: String,
            default: "General"
        },

        description: {
            type: String,
            default: ""
        },

        usage: {
            type: String,
            default: ""
        },

        enabled: {
            type: Boolean,
            default: true
        },

        ownerOnly: {
            type: Boolean,
            default: false
        },

        groupOnly: {
            type: Boolean,
            default: false
        },

        adminOnly: {
            type: Boolean,
            default: false
        },

        premiumOnly: {
            type: Boolean,
            default: false
        },

        cooldown: {
            type: Number,
            default: 3
        },

        permissions: {
            botAdmin: {
                type: Boolean,
                default: false
            },
            admin: {
                type: Boolean,
                default: false
            }
        },

        totalUses: {
            type: Number,
            default: 0
        },

        successCount: {
            type: Number,
            default: 0
        },

        errorCount: {
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

CommandSchema.methods.incrementUsage = function () {
    this.totalUses++;
    this.lastUsed = new Date();
    return this.save();
};

CommandSchema.methods.incrementSuccess = function () {
    this.successCount++;
    return this.save();
};

CommandSchema.methods.incrementError = function () {
    this.errorCount++;
    return this.save();
};

module.exports = mongoose.model("Command", CommandSchema);