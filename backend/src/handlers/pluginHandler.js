"use strict";

const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

class PluginHandler {

    constructor() {
        this.plugins = new Map();
        this.pluginPath = path.join(process.cwd(), "plugins");
    }

    loadAll() {

        if (!fs.existsSync(this.pluginPath)) {
            fs.mkdirSync(this.pluginPath, { recursive: true });
            logger.warn("Plugins folder created.");
            return;
        }

        const files = fs.readdirSync(this.pluginPath)
            .filter(file => file.endsWith(".js"));

        this.plugins.clear();

        for (const file of files) {
            try {

                const pluginFile = path.join(this.pluginPath, file);

                delete require.cache[
                    require.resolve(pluginFile)
                ];

                const plugin = require(pluginFile);

                if (!plugin.name) {
                    logger.warn(`${file} has no plugin name.`);
                    continue;
                }

                this.plugins.set(plugin.name, plugin);

                logger.plugin(
                    `Loaded Plugin: ${plugin.name}`
                );

            } catch (err) {

                logger.error(
                    `Failed to load ${file}`,
                    err
                );

            }
        }

        logger.success(
            `${this.plugins.size} plugins loaded.`
        );
    }

    reload() {
        this.loadAll();
    }

    get(name) {
        return this.plugins.get(name);
    }

    getAll() {
        return [...this.plugins.values()];
    }

    execute(sock, message) {

        for (const plugin of this.plugins.values()) {

            try {

                if (typeof plugin.execute === "function") {
                    plugin.execute(sock, message);
                }

            } catch (err) {

                logger.error(
                    `Plugin Error (${plugin.name})`,
                    err
                );

            }
        }
    }

}

module.exports = new PluginHandler();