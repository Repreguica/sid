'use strict'

let bot

module.exports.setup = function (bot, ctx) {

	this.bot = bot

	ctx.reply('Now you can do some things like: /test')

	bot.command('/test', ctx => this.test(ctx))
}

module.exports.test = function (ctx) {
	ctx.reply('Tested!')
}