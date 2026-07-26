"use strict";

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

class PluginLoader {
    constructor() {
        this.commands = new Map();
        this.plugins = new Map();
    }

    loadCommands() {
        const commandsPath = path.join(__dirname, "../commands");

        if (!fs.existsSync(commandsPath)) {
            fs.mkdirSync(commandsPath, { recursive: true });
            console.log(chalk.yellow("[PLUGIN] commands folder created."));
            return;
        }

        const files = fs.readdirSync(commandsPath)
            .filter(file => file.endsWith(".js"));

        for (const file of files) {
            try {
                const cmd = require(path.join(commandsPath, file));

                if (!cmd.name) {
                    console.log(chalk.red(`[PLUGIN] ${file} has no command name.`));
                    continue;
                }

                this.commands.set(cmd.name, cmd);

                console.log(
                    chalk.green(`[COMMAND] Loaded → ${cmd.name}`)
                );
            } catch (err) {
                console.log(
                    chalk.red(`[ERROR] Failed loading ${file}`)
                );
                console.error(err);
            }
        }
    }

    loadPlugins() {
        const pluginsPath = path.join(__dirname, "../../plugins");

        if (!fs.existsSync(pluginsPath)) {
            fs.mkdirSync(pluginsPath, { recursive: true });
            console.log(chalk.yellow("[PLUGIN] plugins folder created."));
            return;
        }

        const files = fs.readdirSync(pluginsPath)
            .filter(file => file.endsWith(".js"));

        for (const file of files) {
            try {
                const plugin = require(path.join(pluginsPath, file));

                this.plugins.set(file, plugin);

                console.log(
                    chalk.cyan(`[PLUGIN] Loaded → ${file}`)
                );
            } catch (err) {
                console.log(
                    chalk.red(`[ERROR] Failed loading plugin ${file}`)
                );
                console.error(err);
            }
        }
    }

    getCommand(name) {
        return this.commands.get(name);
    }

    getCommands() {
        return this.commands;
    }

    getPlugins() {
        return this.plugins;
    }
}

module.exports = new PluginLoader();