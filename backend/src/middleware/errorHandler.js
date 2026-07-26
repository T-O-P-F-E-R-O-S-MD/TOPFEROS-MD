"use strict";

const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {

    logger.error(
        err.message || "Internal Server Error",
        err.stack
    );

    if (res.headersSent) {
        return next(err);
    }

    let statusCode = err.status || err.statusCode || 500;

    let message = err.message || "Internal Server Error";

    if (statusCode < 400 || statusCode > 599) {
        statusCode = 500;
    }

    res.status(statusCode).json({
        success: false,
        error: {
            status: statusCode,
            message,
            timestamp: new Date().toISOString()
        }
    });
};