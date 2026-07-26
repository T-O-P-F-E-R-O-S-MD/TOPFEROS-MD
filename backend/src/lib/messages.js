"use strict";

class Messages {

    success(text = "Success") {
        return {
            text: `✅ ${text}`
        };
    }

    error(text = "An error occurred") {
        return {
            text: `❌ ${text}`
        };
    }

    warning(text = "Warning") {
        return {
            text: `⚠️ ${text}`
        };
    }

    info(text = "Information") {
        return {
            text: `ℹ️ ${text}`
        };
    }

    loading(text = "Loading...") {
        return {
            text: `⏳ ${text}`
        };
    }

    ownerOnly() {
        return {
            text: "👑 This command is only available to the bot owner."
        };
    }

    adminOnly() {
        return {
            text: "🛡️ This command is only available to group admins."
        };
    }

    botAdminOnly() {
        return {
            text: "🤖 I