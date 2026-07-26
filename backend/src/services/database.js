"use strict";

const config = require("../config/config");
const logger = require("../utils/logger");

const connectMongoDB = require("../database/mongodb");
const { connectSQLite, getDatabase } = require("../database/sqlite");

class DatabaseService {

    constructor() {
        this.type = (config.database.type || "mongodb").toLowerCase();
        this.connected = false;
    }

    async connect() {

        if (this.connected) {
            return true;
        }

        switch (this.type) {

            case "mongodb":

                await connectMongoDB();
                this.connected = true;

                logger.success("MongoDB database ready.");

                break;

            case "sqlite":

                await connectSQLite();
                this.connected = true;

                logger.success("SQLite database ready.");

                break;

            default:

                throw new Error(
                    `Unsupported database type: ${this.type}`
                );

        }

        return this.connected;
    }

    async disconnect() {

        if (!this.connected) {
            return;
        }

        if (this.type === "mongodb") {

            const mongoose = require("mongoose");

            await mongoose.connection.close();

        }

        this.connected = false;

        logger.warn("Database disconnected.");
    }

    getType() {
        return this.type;
    }

    isConnected() {
        return this.connected;
    }

    getSQLite() {

        if (this.type !== "sqlite") {
            return null;
        }

        return getDatabase();
    }

}

module.exports = new DatabaseService();