"use strict";

const config = require("../config/config");
const logger = require("../utils/logger");

const connectMongoDB = require("../database/mongodb");
const { connectSQLite } = require("../database/sqlite");

async function databaseHandler() {

    try {

        const type = (config.database.type || "mongodb").toLowerCase();

        switch (type) {

            case "mongodb":

                logger.database("Initializing MongoDB...");

                await connectMongoDB();

                logger.success("MongoDB initialized successfully.");

                break;

            case "sqlite":

                logger.database("Initializing SQLite...");

                await connectSQLite();

                logger.success("SQLite initialized successfully.");

                break;

            default:

                logger.warn(
                    `Unknown database type "${type}". Falling back to MongoDB.`
                );

                await connectMongoDB();

                break;
        }

    } catch (err) {

        logger.error(
            "Database initialization failed.",
            err
        );

    }

}

module.exports = databaseHandler;