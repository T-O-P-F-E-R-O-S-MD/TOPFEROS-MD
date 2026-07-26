"use strict";

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const config = require("../config/config");

class Uploader {

    async uploadToImgBB(filePath) {

        if (!config.api.imgbb) {
            throw new Error("Missing IMGBB_API_KEY");
        }

        const form = new FormData();

        form.append(
            "image",
            fs.createReadStream(filePath)
        );

        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${config.api.imgbb}`,
            form,
            {
                headers: form.getHeaders()
            }
        );

        return response.data;
    }

    async uploadToCatbox(filePath) {

        const form = new FormData();

        form.append("reqtype", "fileupload");
        form.append(
            "fileToUpload",
            fs.createReadStream(filePath)
        );

        const response = await axios.post(
            "https://catbox.moe/user/api.php",
            form,
            {
                headers: form.getHeaders()
            }
        );

        return {
            success: true,
            url: response.data
        };
    }

    async uploadToTelegraph(filePath) {

        const form = new FormData();

        form.append(
            "file",
            fs.createReadStream(filePath)
        );

        const response = await axios.post(
            "https://telegra.ph/upload",
            form,
            {
                headers: form.getHeaders()
            }
        );

        return {
            success: true,
            url: "https://telegra.ph" + response.data[0].src
        };
    }

}

module.exports = new Uploader();