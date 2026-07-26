"use strict";

require("dotenv").config();

module.exports = {
    // Bot
    bot: {
        name: process.env.BOT_NAME || "TOPFEROS MD",
        version: process.env.BOT_VERSION || "1.0.0",
        prefix: process.env.PREFIX || ".",
        mode: process.env.MODE || "public"
    },

    // Owner
    owner: {
        name: process.env.OWNER_NAME || "TOPFEROS TECH",
        number: process.env.OWNER_NUMBER || ""
    },

    // Server
    server: {
        port: Number(process.env.PORT) || 3000
    },

    // Database
    database: {
        type: process.env.DATABASE || "mongodb",
        uri: process.env.MONGODB_URI || ""
    },

    // Session
    session: {
        id: process.env.SESSION_ID || ""
    },

    // Pairing
    pairing: {
        enabled: process.env.USE_PAIRING_CODE === "true",
        number: process.env.PAIRING_NUMBER || ""
    },

    // APIs
    api: {
        openai: process.env.OPENAI_API_KEY || "",
        gemini: process.env.GEMINI_API_KEY || "",
        groq: process.env.GROQ_API_KEY || "",
        removebg: process.env.REMOVE_BG_API_KEY || "",
        imgbb: process.env.IMGBB_API_KEY || "",
        weather: process.env.OPENWEATHER_API_KEY || "",
        youtube: process.env.YOUTUBE_API_KEY || ""
    },

    // Features
    features: {
        autoRead: process.env.AUTO_READ === "true",
        autoTyping: process.env.AUTO_TYPING === "true",
        autoRecording: process.env.AUTO_RECORDING === "true",
        autoReact: process.env.AUTO_REACT === "true",
        welcome: process.env.WELCOME === "true",
        goodbye: process.env.GOODBYE === "true",
        antiLink: process.env.ANTI_LINK === "true",
        antiDelete: process.env.ANTI_DELETE === "true",
        autoStatusView: process.env.AUTO_STATUS_VIEW === "true"
    },

    // Security
    security: {
        jwtSecret: process.env.JWT_SECRET || "",
        sessionSecret: process.env.SESSION_SECRET || ""
    },

    // Logs
    logs: {
        level: process.env.LOG_LEVEL || "info"
    },

    // Timezone
    timezone: process.env.TIMEZONE || "America/Port-au-Prince"
};