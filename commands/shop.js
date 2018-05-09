'use strict'

const bot = require('../bot').bot,
	shopListDao = require('../db/shopListDAO')

module.exports.setup = function () {
	bot.command('/shop', sendShopList)
	bot.command('/shopAdd', addItemToShopList)
	bot.command('/shopRemove', removeItemFromShopList)
}

function sendShopList(ctx) {
	shopListDao.getList().then(items => ctx.reply(items.join('\n')))
}

function addItemToShopList(ctx) {
	let item = ctx.message.text
	shopListDao.addItem(item).then(() => ctx.reply('Item adicionado com sucesso'))
}

function removeItemFromShopList(ctx) {
	let item = ctx.message.text
	shopListDao.removeItem(item)
		.then(() => ctx.reply('Item removido com sucesso'))
		.catch(err => ctx.reply('Falho em remover item. Err: ' + err))
}