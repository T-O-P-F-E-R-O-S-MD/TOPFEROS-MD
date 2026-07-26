"use strict";

module.exports = (req, res) => {

    res.status(404).json({
        success: false,
        error: {
            code: 404,
            message: "Route Not Found",
            path: req.originalUrl,
            method: req.method,
            timestamp: new Date().toISOString()
        }
    });

};