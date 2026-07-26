"use strict";

const NodeCache = require("node-cache");

const logger = require("../utils/logger");

const cache = new NodeCache({
    stdTTL: 10,
    checkperiod: 5
});

module.exports = function rateLimiter(options = {}) {

    const {
        windowMs = 10000,
        maxRequests = 10
    } = options;

    return (req, res, next) => {

        try {

            const ip =
                req.headers["x-forwarded-for"] ||
                req.socket.remoteAddress ||
                "unknown";

            const key = `rate:${ip}`;

            let data = cache.get(key);

            if (!data) {

                data = {
                    count: 1,
                    firstRequest: Date.now()
                };

                cache.set(key, data, Math.ceil(windowMs / 1000));

                return next();

            }

            data.count++;

            cache.set(key, data, Math.ceil(windowMs / 1000));

            if (data.count > maxRequests) {

                logger.warn(`Rate limit exceeded: ${ip}`);

                return res.status(429).json({
                    success: false,
                    error: "Too many requests.",
                    retryAfter: Math.ceil(windowMs / 1000)
                });

            }

            next();

        } catch (err) {

            logger.error("RateLimiter Error", err);

            next();

        }

    };

};