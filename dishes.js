'use strict'

let {
	bot,
	photoEmitter
} = require('./bot')

module.exports.setup = function (ctx) {

	ctx.reply('Now you can do some things like: /sendPhoto')

	bot.command('/sendPhoto', ctx => this.sendPhoto(ctx))

}

module.exports.sendPhoto = function (ctx) {

	ctx.reply('You should send the photo with the command.')

	photoEmitter.once(ctx.from.id, ctx => replyPhoto(ctx.message.photo[ctx.message.photo.length - 1].file_id))

	function replyPhoto(photo) {
		bot.telegram.sendPhoto(583734606, photo)
	}
}