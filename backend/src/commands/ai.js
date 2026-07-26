"use strict";

const axios = require("axios");
const config = require("../config/config");

module.exports = {
    name: "ai",
    aliases: ["gpt", "gemini", "ask"],

    description: "AI Chat Command",

    category: "AI",

    usage: ".ai <question>",

    async execute({ sock, msg, body }) {
        try {
            const jid = msg.key.remoteJid;

            const prompt = body.split(" ").slice(1).join(" ").trim();

            if (!prompt) {
                return await sock.sendMessage(
                    jid,
                    {
                        text: "❌ Example:\n.ai What is JavaScript?"
                    },
                    { quoted: msg }
                );
            }

            if (!config.api.groq) {
                return await sock.sendMessage(
                    jid,
                    {
                        text: "❌ GROQ_API_KEY is missing in your .env file."
                    },
                    { quoted: msg }
                );
            }

            const response = await axios.post(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: "You are TOPFEROS MD AI Assistant."
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

            const reply =
                response.data.choices?.[0]?.message?.content ||
                "No response.";

            await sock.sendMessage(
                jid,
                {
                    text: `🤖 *TOPFEROS AI*\n\n${reply}`
                },
                {
                    quoted: msg
                }
            );

        } catch (err) {
            console.error(err);

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "❌ AI request failed."
                },
                {
                    quoted: msg
                }
            );
        }
    }
};