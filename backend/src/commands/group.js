"use strict";

module.exports = {
    name: "group",
    aliases: ["gc"],

    description: "Group management commands.",

    category: "Group",

    usage: ".group <kick|add|promote|demote|tagall>",

    async execute({ sock, msg, body }) {
        try {
            const jid = msg.key.remoteJid;

            if (!jid.endsWith("@g.us")) {
                return await sock.sendMessage(
                    jid,
                    {
                        text: "❌ This command can only be used in groups."
                    },
                    { quoted: msg }
                );
            }

            const metadata = await sock.groupMetadata(jid);

            const sender = msg.key.participant;

            const isAdmin = metadata.participants.some(
                p => p.id === sender && p.admin
            );

            if (!isAdmin) {
                return await sock.sendMessage(
                    jid,
                    {
                        text: "❌ You must be a group admin."
                    },
                    { quoted: msg }
                );
            }

            const args = body.trim().split(/\s+/);
            const action = (args[1] || "").toLowerCase();

            const mentioned =
                msg.message?.extendedTextMessage?.contextInfo
                    ?.mentionedJid || [];

            switch (action) {

                case "kick":
                    if (!mentioned.length)
                        return sock.sendMessage(jid, {
                            text: "Tag a member."
                        }, { quoted: msg });

                    await sock.groupParticipantsUpdate(
                        jid,
                        mentioned,
                        "remove"
                    );

                    break;

                case "add":
                    if (!args[2])
                        return sock.sendMessage(jid, {
                            text: "Example:\n.group add 509XXXXXXXX"
                        }, { quoted: msg });

                    await sock.groupParticipantsUpdate(
                        jid,
                        [`${args[2]}@s.whatsapp.net`],
                        "add"
                    );

                    break;

                case "promote":
                    if (!mentioned.length)
                        return sock.sendMessage(jid, {
                            text: "Tag a member."
                        }, { quoted: msg });

                    await sock.groupParticipantsUpdate(
                        jid,
                        mentioned,
                        "promote"
                    );

                    break;

                case "demote":
                    if (!mentioned.length)
                        return sock.sendMessage(jid, {
                            text: "Tag a member."
                        }, { quoted: msg });

                    await sock.groupParticipantsUpdate(
                        jid,
                        mentioned,
                        "demote"
                    );

                    break;

                case "tagall":
                    let text = "📢 *TAG ALL*\n\n";
                    let mentions = [];

                    metadata.participants.forEach((user, i) => {
                        text += `${i + 1}. @${user.id.split("@")[0]}\n`;
                        mentions.push(user.id);
                    });

                    await sock.sendMessage(
                        jid,
                        {
                            text,
                            mentions
                        },
                        {
                            quoted: msg
                        }
                    );

                    break;

                default:
                    await sock.sendMessage(
                        jid,
                        {
                            text:
`📋 *Group Commands*

.group kick @user
.group add 509XXXXXXXX
.group promote @user
.group demote @user
.group tagall`
                        },
                        {
                            quoted: msg
                        }
                    );
            }

        } catch (err) {
            console.error(err);

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "❌ Failed to execute group command."
                },
                {
                    quoted: msg
                }
            );
        }
    }
};