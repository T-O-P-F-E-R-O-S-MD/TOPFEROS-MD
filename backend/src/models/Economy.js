"use strict";

const mongoose = require("mongoose");

const EconomySchema = new mongoose.Schema(
    {
        jid: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        wallet: {
            type: Number,
            default: 500
        },

        bank: {
            type: Number,
            default: 0
        },

        gems: {
            type: Number,
            default: 0
        },

        exp: {
            type: Number,
            default: 0
        },

        level: {
            type: Number,
            default: 1
        },

        reputation: {
            type: Number,
            default: 0
        },

        dailyClaim: {
            type: Date,
            default: null
        },

        weeklyClaim: {
            type: Date,
            default: null
        },

        monthlyClaim: {
            type: Date,
            default: null
        },

        workCooldown: {
            type: Date,
            default: null
        },

        robCooldown: {
            type: Date,
            default: null
        },

        huntCooldown: {
            type: Date,
            default: null
        },

        mineCooldown: {
            type: Date,
            default: null
        },

        fishCooldown: {
            type: Date,
            default: null
        },

        inventory: {
            type: [String],
            default: []
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

module.exports = mongoose.model("Economy", EconomySchema);