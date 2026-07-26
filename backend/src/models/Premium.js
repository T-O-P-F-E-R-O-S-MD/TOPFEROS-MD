"use strict";

const mongoose = require("mongoose");

const PremiumSchema = new mongoose.Schema(
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

        plan: {
            type: String,
            enum: [
                "basic",
                "pro",
                "vip",
                "lifetime"
            ],
            default: "basic"
        },

        active: {
            type: Boolean,
            default: true
        },

        activatedBy: {
            type: String,
            default: "Owner"
        },

        startDate: {
            type: Date,
            default: Date.now
        },

        expireDate: {
            type: Date,
            required: true
        },

        unlimitedCommands: {
            type: Boolean,
            default: true
        },

        unlimitedAI: {
            type: Boolean,
            default: true
        },

        unlimitedDownloads: {
            type: Boolean,
            default: true
        },

        unlimitedSticker: {
            type: Boolean,
            default: true
        },

        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

PremiumSchema.methods.isExpired = function () {
    return new Date() > this.expireDate;
};

module.exports = mongoose.model("Premium", PremiumSchema);