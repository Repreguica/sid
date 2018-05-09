'use strict'

const bot = require('../bot').bot,
	Markup = require('telegraf').Markup,
	shopListDao = require('../db/shopListDAO')

module.exports.setup = function () {
	bot.command('/shop', ctx => sendShopList(ctx.replyWithMarkdown))
	bot.command('/shopAdd', addItemToShopList)
	bot.action(/REMOVE:.*/, removeItemFromShopList)
}

function sendShopList(callback) {
	shopListDao.getList().then(items => {
		if (!items || !items.length) {
			callback('A LISTA TÁ VAZIA!')
			return
		}
		callback('LISTA DE COMPRAS (Clique para remover)', Markup.inlineKeyboard(
			items.map(item => [Markup.callbackButton(item, 'REMOVE:' + item)])
		).extra())
	})
}

function addItemToShopList(ctx) {
	let item = ctx.message.text.substring('/shopAdd '.length)
	shopListDao.addItem(item).then(() => ctx.reply('Item adicionado com sucesso'))
}

function removeItemFromShopList(ctx) {
	let item = ctx.callbackQuery.data.substring('REMOVE:'.length)
	shopListDao.removeItem(item)
		.then(() => {
			sendShopList(ctx.editMessageText)
		})
		.catch(err => ctx.reply('Falho em remover item. Err: ' + err))
}