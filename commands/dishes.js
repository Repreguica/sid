'use strict'

const {
	bot,
	photoEmitter
} = require('../bot')
const usersDAO = require('../db/usersDAO')

module.exports.setup = function () {
	bot.command('/dishes', ctx => ctx.reply('Você está chateado com a louça? Aqui estão suas opções: /dishesPhoto'))
	bot.command('/dishesPhoto', ctx => askForPhoto(ctx))
}

function askForPhoto(ctx) {
	ctx.reply('Estou aguardando a foto. 📷')
	photoEmitter.once(ctx.from.id, ctx => sendPhotoToAll(ctx.message.photo[ctx.message.photo.length - 1].file_id))
}

function sendPhotoToAll(photo) {
	usersDAO.getUsers().then(users => {
		for (let user of users) {
			bot.telegram.sendPhoto(user.id, photo, {
				caption: 'Shame! 🔔🔔🔔🔔🔔🔔🔔🔔'
			})
		}
	})
}