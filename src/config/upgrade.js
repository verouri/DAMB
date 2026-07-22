import {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ComponentType,
    EmbedBuilder
} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("upgrade")
        .setDescription("Upgrade to another DAMB version."),

    async execute(interaction) {

        const menu = new StringSelectMenuBuilder()
            .setCustomId("upgrade")
            .setPlaceholder("Choose a version...")
            .addOptions(
                {
                    label: "DAMB+",
                    description: "Premium version of DAMB",
                    emoji: "⭐",
                    value: "plus"
                },
                {
                    label: "DAMBX",
                    description: "Experimental version",
                    emoji: "🚀",
                    value: "x"
                }
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x5865F2)
                    .setTitle("Upgrade DAMB")
                    .setDescription("Select the version you'd like below.")
            ],
            components: [row],
            ephemeral: true
        });

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000
        });

        collector.on("collect", async i => {

            if (i.user.id !== interaction.user.id) {
                return i.reply({
                    content: "This menu isn't for you.",
                    ephemeral: true
                });
            }

            let link = "";

            switch (i.values[0]) {

                case "plus":
                    link = "https://your-damb-plus-link.com";
                    break;

                case "x":
                    link = "https://your-dambx-link.com";
                    break;

            }

            await i.update({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x57F287)
                        .setTitle("Upgrade Selected")
                        .setDescription(
`Click below to get your selected version.

🔗 ${link}`
                        )
                ],
                components: []
            });

            collector.stop();

        });

    }
};
