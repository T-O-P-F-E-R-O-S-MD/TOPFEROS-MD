"use strict";

const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("../config/config");

mongoose.set("strictQuery", true);

async function connectMongoDB() {
    try {
        if (!config.database.uri) {
            logger.warn("MongoDB URI not found. Database connection skipped.");
            return false;
        }

        await mongoose.connect(config.database.uri, {
            autoIndex: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000
        });

        logger.success("MongoDB connected successfully.");

        mongoose.connection.on("error", (err) => {
            logger.error("MongoDB Error", err);
        });

        mongoose.connection.on("disconnected", () => {
            logger.warn("MongoDB disconnected.");
        });

        mongoose.connection.on("reconnected", () => {
            logger.success("MongoDB reconnected.");
        });

        return true;

    } catch (err) {
        logger.error("Failed to connect MongoDB.", err);
        return false;
    }
}

module.exports = connectMongoDB;