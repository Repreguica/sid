'use strict'

let Telegraf = require('telegraf'),
	config = require('./config'),
	dishes = require('./dishes'),
	db = require('./firebase-db')

let bot = new Telegraf(config.botToken)

bot.start(ctx => ctx.reply('Welcome'))
bot.help(ctx => ctx.reply('Send me a sticker'))
bot.on('sticker', ctx => ctx.reply('👍'))
bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.hears(/buy/i, ctx => ctx.reply('Buy-buy'))
bot.on('text', ctx => {
	let lastMessage = db.collection('lastMessage').doc(String(ctx.message.from.id))
	lastMessage.get()
		.then(doc => ctx.reply(String(doc.data().content)))
		.catch(err => ctx.reply('Failed to load last message: ' + err))
	lastMessage.set({
		content: ctx.message.text
	})
})

// Add your feature here
bot.command('/dishes', ctx => dishes.setup(bot, ctx))

bot.startPolling()