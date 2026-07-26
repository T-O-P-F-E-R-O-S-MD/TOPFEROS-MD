"use strict";

const config = require("../config/config");
const loader = require("../plugins/loader");
const logger = require("../utils/logger");
const serialize = require("../lib/serialize");

module.exports = async function commandHandler(sock, msg) {
    try {
        const m = serialize(sock, msg);

        if (!m || !m.body) return;

        // Ignore messages without prefix
        if (!m.body.startsWith(config.bot.prefix)) return;

        const args = m.body
            .slice(config.bot.prefix.length)
            .trim()
            .split(/\s+/);

        const commandName = args.shift().toLowerCase();

        let command = loader.getCommand(commandName);

        // Check aliases
        if (!command) {
            for (const cmd of loader.getCommands().values()) {
                if (
                    Array.isArray(cmd.aliases) &&
                    cmd.aliases.includes(commandName)
                ) {
                    command = cmd;
                    break;
                }
            }
        }

        if (!command) {
           