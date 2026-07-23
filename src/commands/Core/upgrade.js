

import {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from "discord.js";

export default {

    data: new SlashCommandBuilder()
        .setName("upgrade")
        .setDescription("Upgrade DAMB to premium"),

    async execute(interaction) {

        const upgradeEmbed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("✨ Upgrade DAMB")
            .setDescription(
`Thank you for supporting **DAMB**!

Choose a premium plan below.

## 💎 DAMB+
> Premium moderation features
> Advanced tools
> Priority support
> Early feature access

## ⚡ DAMBX
> Everything in DAMB+
> Exclusive premium features
> Future beta access
> Highest priority support

After purchasing, you will complete a verification form.
Your private DAMB access will be sent to your email after payment confirmation.

⏰ This upgrade session expires in **1 hour**.`
            )
            .setFooter({
                text: "Secure checkout powered by DAMB"
            });


        const upgradeButtons = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setLabel("💎 Buy DAMB+")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://www.paypal.com/ncp/payment/MVK6GKT538NC4"),


                new ButtonBuilder()
                    .setLabel("⚡ Buy DAMBX")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://www.paypal.com/ncp/payment/M3RYZ94MRW6XC"),

            );


        let dmMessage;


        try {

            dmMessage = await interaction.user.send({
                embeds: [upgradeEmbed],
                components: [upgradeButtons]
            });


        } catch (error) {

            return interaction.reply({
                content:
                "❌ I couldn't DM you. Please enable Direct Messages and try again.",
                ephemeral: true
            });

        }


        await interaction.reply({
            content:
            "📩 I've sent your private upgrade menu in DMs.",
            ephemeral: true
        });



        // Expire after 1 hour

        setTimeout(async () => {


            const expiredEmbed = new EmbedBuilder()
                .setColor("#ff4444")
                .setTitle("⌛ Upgrade Session Expired")
                .setDescription(
`This upgrade session has expired.

Run **/upgrade** again to start a new purchase session.`
                );


            await dmMessage.edit({

                embeds: [expiredEmbed],
                components: []

            }).catch(() => {});


        }, 60 * 60 * 1000);


    }
};


