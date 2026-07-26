"use strict";

const axios = require("axios");
const config = require("../config/config");

class AIService {

    async ask(prompt, provider = "groq") {

        switch (provider.toLowerCase()) {

            case "groq":
                return await this.askGroq(prompt);

            case "gemini":
                return await this.askGemini(prompt);

            case "openai":
                return await this.askOpenAI(prompt);

            default:
                throw new Error("Unsupported AI provider.");
        }
    }

    async askGroq(prompt) {

        if (!config.api.groq) {
            throw new Error("Missing GROQ_API_KEY");
        }

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "You are TOPFEROS MD AI."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${config.api.groq}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;
    }

    async askGemini(prompt) {

        if (!config.api.gemini) {
            throw new Error("Missing GEMINI_API_KEY");
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.api.gemini}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            }
        );

        return response.data.candidates[0].content.parts[0].text;
    }

    async askOpenAI(prompt) {

        if (!config.api.openai) {
            throw new Error("Missing OPENAI_API_KEY");
        }

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are TOPFEROS MD AI."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${config.api.openai}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;
    }

}

module.exports = new AIService();