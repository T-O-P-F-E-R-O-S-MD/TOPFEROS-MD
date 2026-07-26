"use strict";

const fs = require("fs-extra");
const path = require("path");
const {
    useMultiFileAuthState
} = require("@whiskeysockets/baileys");

const logger = require("../utils/logger");

const SESSION_DIR = path.join(process.cwd(), "sessions");

async function loadAuth() {

    await fs.ensureDir(SESSION_DIR);

    const { state, saveCreds } =
        await useMultiFileAuthState(SESSION_DIR);

    logger.success("Authentication state loaded.");

    return {
        state,
        saveCreds
    };

}

async function sessionExists() {

    return await fs.pathExists(
        path.join(SESSION_DIR, "creds.json")
    );

}

async function clearSession() {

    if (await fs.pathExists(SESSION_DIR)) {

        await fs.emptyDir(SESSION_DIR);

        logger.warn("Session cleared.");

    }

    return true;

}

async function backupSession() {

    const backupDir = path.join(
        SESSION_DIR,
        "backup"
    );

    await fs.ensureDir(backupDir);

    const backup