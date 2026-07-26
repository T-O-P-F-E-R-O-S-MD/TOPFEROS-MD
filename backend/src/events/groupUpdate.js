"use strict";

const logger = require("../utils/logger");

module.exports = function registerGroupUpdate(sock) {

    sock.ev.on("groups.update", async (updates) => {

        try {

            for (const update of updates) {

                logger.info(
                    `Group Updated: ${update.id}`
                );

                if (update.subject) {
                    logger.info(
                        `New Group Name: ${update.subject}`
                    );
                }

                if (update.announce !== undefined) {

                    logger.info(
                        update.announce
                            ? "Only admins can send messages."
                            : "All members can send messages."
                    );

                }

                if (update.restrict !== undefined) {

                    logger.info(
                        update.restrict
                            ? "Only admins can edit group info."
                            : "All members can edit group info."
                    );

                }

            }

        } catch (err) {

            logger.error(
                "Group Update Error",
                err
            );

        }

    });

};