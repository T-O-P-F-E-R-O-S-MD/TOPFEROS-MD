"use strict";

const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");

/**
 * Sleep
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Random Number
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Random String
 */
function randomString(length = 10) {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
}

/**
 * Format Bytes
 */
function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB"
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return (
        (bytes / Math.pow(1024,