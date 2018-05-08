'use strict'

let {
	bot,
	photoEmitter
} = require('./bot')

module.exports.setup = function (ctx) {

	ctx.reply('Você está chateado com a louça? Aqui estão suas opções: /dishesPhoto')

	bot.command('/dishesPhoto', ctx => this.sendPhoto(ctx))

}

module.exports.sendPhoto = function (ctx) {

	ctx.reply('Estou aguardando a foto. 📷')

	photoEmitter.once(ctx.from.id, ctx => replyPhoto(ctx.message.photo[ctx.message.photo.length - 1].file_id))

	function replyPhoto(photo) {
		bot.telegram.sendPhoto(583734606, photo, {
			caption: 'Shame! 🔔🔔🔔🔔🔔🔔🔔🔔'
		})
	}
}