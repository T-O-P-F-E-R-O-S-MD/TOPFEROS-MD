"use strict";

const logger = require("../utils/logger");
const connectMongoDB = require("../database/mongodb");

class DatabaseService {

    constructor() {
        this.type = "mongodb";
        this.connected = false;
    }

    async connect() {

        if (this.connected) {
            return true;
        }

        await connectMongoDB();

        this.connected = true;

        logger.success("MongoDB database ready.");

        return true;
    }

    async disconnect() {

        if (!this.connected) {
            return;
        }

        const mongoose = require("mongoose");

        await mongoose.connection.close();

        this.connected = false;

        logger.warn("Database disconnected.");
    }

    getType() {
        return "mongodb";
    }

    isConnected() {
        return this.connected;
    }

    getDatabase() {
        return require("mongoose").connection;
    }

}

module.exports = new DatabaseService();