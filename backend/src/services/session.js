"use strict";

const fs = require("fs-extra");
const path = require("path");

class SessionService {

    constructor() {
        this.sessionDir = path.join(process.cwd(), "sessions");
        this.backupDir = path.join(this.sessionDir, "backup");
    }

    async initialize() {
        await fs.ensureDir(this.sessionDir);
        await fs.ensureDir(this.backupDir);
    }

    async backup() {
        await this.initialize();

        const backupName = `session-${Date.now()}`;

        const destination = path.join(
            this.backupDir,
            backupName
        );

        await fs.copy(
            this.sessionDir,
            destination,
            {
                filter: (src) => !src.includes("backup")
            }
        );

        return destination;
    }

    async restore(folderName) {

        const source = path.join(
            this.backupDir,
            folderName
        );

        if (!(await fs.pathExists(source))) {
            throw new Error("Backup session not found.");
        }

        await fs.emptyDir(this.sessionDir);

        await fs.copy(source, this.sessionDir);

        return true;
    }

    async clear() {

        if (await fs.pathExists(this.sessionDir)) {
            await fs.emptyDir(this.sessionDir);
        }

        return true;
    }

    async exists() {

        return await fs.pathExists(this.sessionDir);

    }

    async listBackups() {

        await this.initialize();

        return await fs.readdir(this.backupDir);

    }

}

module.exports = new SessionService();