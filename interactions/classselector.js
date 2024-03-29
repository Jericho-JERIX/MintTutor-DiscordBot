const {
	Client,
	Intents,
	MessageButton,
	MessageActionRow,
	Message,
} = require("discord.js");
const { ClassRole, AllClassRole } = require("../constants/roles.constant");

async function removeAllClass(interact) {
	for (var i in ClassRole) {
		await interact.member.roles.remove(
			interact.guild.roles.cache.get(ClassRole[i])
		);
	}
}

module.exports = {
	name: "classselector",
	alias: ["classselector"],
	execute: async function (interact, arg) {
		interact.deferUpdate();
		const roleIds = interact.member.roles.cache.map(
			(collection) => collection.id
		);
		if (arg[1] === "programming") {
			if (roleIds.includes(AllClassRole.programming)) {
				return await interact.member.roles.remove(
					AllClassRole.programming
				);
			}
		} else {
			await removeAllClass(interact);
		}
		await interact.member.roles.add(
			interact.guild.roles.cache.get(AllClassRole[arg[1]])
		);
	},
};
