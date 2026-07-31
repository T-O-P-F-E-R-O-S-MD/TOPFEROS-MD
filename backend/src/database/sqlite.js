"use strict";

const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("../config/config");

let db = null;

async function connectSQLite() {
    try {
        if (!config.database.uri) {
            logger.warn("MongoDB URI not found. Database connection skipped.");
            return null;
        }

        if (mongoose.connection.readyState === 1) {
            db = mongoose.connection;
            return db;
        }

        await mongoose.connect(config.database.uri, {
            autoIndex: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000
        });

        db = mongoose.connection;

        logger.success("MongoDB connected successfully.");

        db.on("error", (err) => {
            logger.error("MongoDB Error", err);
        });

        db.on("disconnected", () => {
            logger.warn("MongoDB disconnected.");
        });

        db.on("reconnected", () => {
            logger.success("MongoDB reconnected.");
        });

        return db;

    } catch (err) {
        logger.error("Failed to initialize MongoDB.", err);
        return null;
    }
}

function getDatabase() {
    return db;
}

module.exports = {
    connectSQLite,
    getDatabase
};