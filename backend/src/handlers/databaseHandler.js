"use strict";

const logger = require("../utils/logger");
const connectMongoDB = require("../database/mongodb");

async function databaseHandler() {
    try {
        logger.database("Initializing MongoDB...");

        await connectMongoDB();

        logger.success("MongoDB initialized successfully.");
    } catch (err) {
        logger.error(
            "Database initialization failed.",
            err
        );
    }
}

module.exports = databaseHandler;