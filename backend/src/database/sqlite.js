"use strict";

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs-extra");

const logger = require("../utils/logger");

const databaseFolder = path.join(process.cwd(), "database");
const databaseFile = path.join(databaseFolder, "topferos.db");

let db = null;

async function connectSQLite() {
    try {
        await fs.ensureDir(databaseFolder);

        db = new sqlite3.Database(databaseFile, (err) => {
            if (err) {
                logger.error("SQLite connection failed.", err);
                return;
            }

            logger.success("SQLite connected successfully.");
        });

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS settings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT UNIQUE,
                    value TEXT
                )
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    jid TEXT UNIQUE,
                    name TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS groups (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    jid TEXT UNIQUE,
                    subject TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);
        });

        return db;

    } catch (err) {
        logger.error("Failed to initialize SQLite.", err);
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