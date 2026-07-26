"use strict";

require("dotenv").config();

const chalk = require("chalk");

async function start() {
    console.clear();

    console.log(chalk.green.bold(`
╔══════════════════════════════════════╗
║                                      ║
║           TOPFEROS MD                ║
║    WhatsApp Multi-Device Bot         ║
║                                      ║
╚══════════════════════════════════════╝
`));

    try {
        const startBot = require("./backend/src/index");

        if (typeof startBot !== "function") {
            throw new Error("Invalid export from backend/src/index.js");
        }

        await startBot();

        console.log(
            chalk.green("✓"),
            "TOPFEROS MD has started successfully."
        );
    } catch (error) {
        console.error(
            chalk.red("✗ Startup Error:")
        );
        console.error(error);
        process.exit(1);
    }
}

start();