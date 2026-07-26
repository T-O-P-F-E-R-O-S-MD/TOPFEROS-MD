"use strict";

const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema(
    {
        jid: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        xp: {
            type: Number,
            default: 0
        },

        level: {
            type: Number,
            default: 1
        },

        rank: {
            type: Number,
            default: 0
        },

        messages: {
            type: Number,
            default: 0
        },

        voiceMessages: {
            type: Number,
            default: 0
        },

        commands: {
            type: Number,
            default: 0
        },

        lastMessage: {
            type: Date,
            default: Date.now
        },

        lastReward: {
            type: Date,
            default: null
        },

        prestige: {
            type: Number,
            default: 0
        },

        rewards: [
            {
                level: Number,
                reward: String,
                claimed: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

LevelSchema.methods.addXP = function(amount) {
    this.xp += amount;

    while (this.xp >= this.level * 100) {
        this.xp -= this.level * 100;
        this.level++;
    }

    return this.save();
};

LevelSchema.methods.addCommand = function() {
    this.commands++;
    return this.save();
};

LevelSchema.methods.addMessage = function() {
    this.messages++;
    this.lastMessage = new Date();
    return this.save();
};

module.exports = mongoose.model("Level", LevelSchema);