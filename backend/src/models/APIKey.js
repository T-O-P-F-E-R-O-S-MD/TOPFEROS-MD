"use strict";

const mongoose = require("mongoose");

const APIKeySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        provider: {
            type: String,
            required: true
        },

        key: {
            type: String,
            required: true
        },

        enabled: {
            type: Boolean,
            default: true
        },

        status: {
            type: String,
            enum: [
                "active",
                "inactive",
                "expired",
                "invalid"
            ],
            default: "active"
        },

        dailyLimit: {
            type: Number,
            default: 0
        },

        monthlyLimit: {
            type: Number,
            default: 0
        },

        dailyUsage: {
            type: Number,
            default: 0
        },

        monthlyUsage: {
            type: Number,
            default: 0
        },

        lastUsed: {
            type: Date,
            default: null
        },

        expiresAt: {
            type: Date,
            default: null
        },

        description: {
            type: String,
            default: ""
        },

        createdBy: {
            type: String,
            default: "TOPFEROS TECH"
        }
    },
    {
        timestamps: true
    }
);

APIKeySchema.methods.use = function () {
    this.dailyUsage++;
    this.monthlyUsage++;
    this.lastUsed = new Date();
    return this.save();
};

APIKeySchema.methods.resetDaily = function () {
    this.dailyUsage = 0;
    return this.save();
};

APIKeySchema.methods.resetMonthly = function () {
    this.monthlyUsage = 0;
    return this.save();
};

module.exports = mongoose.model("APIKey", APIKeySchema);