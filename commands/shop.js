'use strict'

const bot = require('../bot').bot,
	Markup = require('telegraf').Markup,
	shopListDao = require('../db/shopListDAO')

module.exports.setup = function () {
	bot.command('/shop', sendShopList)
	bot.command('/shopAdd', addItemToShopList)
	bot.action(/REMOVE:.*/, removeItemFromShopList)
}

function sendShopList(ctx) {
	shopListDao.getList().then(items => {
		if (!items || !items.length) {
			ctx.reply('A LISTA TÁ VAZIA!')
			return
		}
		ctx.replyWithMarkdown('LISTA DE COMPRAS (Clique para remover)', Markup.inlineKeyboard(
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
			ctx.reply('Item removido com sucesso')
			sendShopList(ctx)
		})
		.catch(err => ctx.reply('Falho em remover item. Err: ' + err))
}