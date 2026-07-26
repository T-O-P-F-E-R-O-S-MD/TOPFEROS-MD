"use strict";

const mongoose = require("mongoose");

const WarningSchema = new mongoose.Schema(
    {
        jid: {
            type: String,
            required: true,
            index: true
        },

        group: {
            type: String,
            default: null
        },

        warnedBy: {
            type: String,
            required: true
        },

        reason: {
            type: String,
            default: "No reason provided."
        },

        count: {
            type: Number,
            default: 1
        },

        action: {
            type: String,
            enum: [
                "warn",
                "kick",
                "ban",
                "mute"
            ],
            default: "warn"
        },

        active: {
            type: Boolean,
            default: true
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

WarningSchema.statics.getWarnings = async function (jid) {
    return this.find({
        jid,
        active: true
    });
};

WarningSchema.statics.clearWarnings = async function (jid) {
    return this.deleteMany({
        jid
    });
};

module.exports = mongoose.model("Warning", WarningSchema);