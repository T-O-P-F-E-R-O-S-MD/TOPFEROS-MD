"use strict";

const crypto = require("crypto");
const moment = require("moment-timezone");

/**
 * Sleep
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Random ID
 */
function randomId(length = 10) {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
}

/**
 * Random Number
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Capitalize
 */
function capitalize(text = "") {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Current Time
 */
function getTime(timezone = "America/Port-au-Prince") {
    return moment().tz(timezone).format("HH:mm:ss");
}

/**
 * Current Date
 */
function getDate(timezone = "America/Port-au-Prince") {
    return moment().tz(timezone).format("DD/MM/YYYY");
}

/**
 * Current Date & Time
 */
function getDateTime(timezone = "America/Port-au-Prince") {
    return moment().tz(timezone).format("DD/MM/YYYY HH:mm:ss");
}

/**
 * Format Bytes
 */
function formatBytes(bytes = 0) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB"
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
        " " +
        sizes[i]
    );
}

/**
 * Format Duration
 */
function formatDuration(seconds = 0) {
    seconds = Number(seconds);

    const days = Math.floor(seconds / 86400);
    seconds %= 86400;

    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

/**
 * Is Number
 */
function isNumber(value) {
    return !isNaN(value);
}

/**
 * Is URL
 */
function isUrl(text = "") {
    return /^https?:\/\/.+/i.test(text);
}

module.exports = {
    sleep,
    randomId,
    random,
    capitalize,
    getTime,
    getDate,
    getDateTime,
    formatBytes,
    formatDuration,
    isNumber,
    isUrl
};