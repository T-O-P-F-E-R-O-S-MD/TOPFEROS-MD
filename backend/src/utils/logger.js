"use strict";

const chalk = require("chalk");

class Logger {
    info(message) {
        console.log(
            chalk.blue("[INFO]"),
            chalk.white(message)
        );
    }

    success(message) {
        console.log(
            chalk.green("[SUCCESS]"),
            chalk.white(message)
        );
    }

    warn(message) {
        console.log(
            chalk.yellow("[WARNING]"),
            chalk.white(message)
        );
    }

    error(message, err = null) {
        console.log(
            chalk.red("[ERROR]"),
            chalk.white(message)
        );

        if (err) {
            console.error(chalk.red(err));
        }
    }

    loading(message) {
        console.log(
            chalk.cyan("[LOADING]"),
            chalk.white(message)
        );
    }

    database(message) {
        console.log(
            chalk.magenta("[DATABASE]"),
            chalk.white(message)
        );
    }

    plugin(message) {
        console.log(
            chalk.greenBright("[PLUGIN]"),
            chalk.white(message)
        );
    }

    command(message) {
        console.log(
            chalk.yellowBright("[COMMAND]"),
            chalk.white(message)
        );
    }

    connection(message) {
        console.log(
            chalk.cyanBright("[CONNECTION]"),
            chalk.white(message)
        );
    }

    api(message) {
        console.log(
            chalk.blueBright("[API]"),
            chalk.white(message)
        );
    }
}

module.exports = new Logger();