"use strict";

const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

class StickerService {

    async createSticker(input, options = {}) {

        const outputDir = path.join(process.cwd(), "temp");

        await fs.ensureDir(outputDir);

        const output = path.join(
            outputDir,
            `sticker_${Date.now()}.webp`
        );

        await sharp(input)
            .resize(512, 512, {
                fit: "contain",
                background: {
                    r: 0,
                    g: 0,
                    b: 0,
                    alpha: 0
                }
            })
            .webp({
                quality: 100
            })
            .toFile(output);

        return output;
    }

    async createAvatarSticker(input) {

        return this.createSticker(input);

    }

    async createCropSticker(input) {

        const outputDir = path.join(process.cwd(), "temp");

        await fs.ensureDir(outputDir);

        const output = path.join(
            outputDir,
            `crop_${Date.now()}.webp`
        );

        await sharp(input)
            .resize(512, 512, {
                fit: "cover"
            })
            .webp({
                quality: 100
            })
            .toFile(output);

        return output;
    }

    async remove(file) {

        if (await fs.pathExists(file)) {
            await fs.remove(file);
        }

    }

}

module.exports = new StickerService();