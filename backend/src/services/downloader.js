"use strict";

const axios = require("axios");

class Downloader {

    async downloadYouTube(url, type = "mp3") {
        if (!url) {
            throw new Error("YouTube URL is required.");
        }

        return {
            success: false,
            service: "YouTube",
            type,
            url,
            message: "YouTube downloader is not configured yet."
        };
    }

    async downloadTikTok(url) {
        if (!url) {
            throw new Error("TikTok URL is required.");
        }

        return {
            success: false,
            service: "TikTok",
            url,
            message: "TikTok downloader is not configured yet."
        };
    }

    async downloadFacebook(url) {
        if (!url) {
            throw new Error("Facebook URL is required.");
        }

        return {
            success: false,
            service: "Facebook",
            url,
            message: "Facebook downloader is not configured yet."
        };
    }

    async downloadInstagram(url) {
        if (!url) {
            throw new Error("Instagram URL is required.");
        }

        return {
            success: false,
            service: "Instagram",
            url,
            message: "Instagram downloader is not configured yet."
        };
    }

    async downloadPinterest(url) {
        if (!url) {
            throw new Error("Pinterest URL is required.");
        }

        return {
            success: false,
            service: "Pinterest",
            url,
            message: "Pinterest downloader is not configured yet."
        };
    }

    async request(api, data = {}) {
        try {
            const response = await axios.post(api, data, {
                timeout: 30000
            });

            return response.data;

        } catch (err) {
            throw new Error(err.message);
        }
    }

}

module.exports = new Downloader();