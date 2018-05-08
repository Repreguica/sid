'use strict'

let Telegraf = require('telegraf'),
	config = require('./config'),
	dishes = require('./dishes')

let bot = new Telegraf(config.botToken)

bot.start(ctx => ctx.reply('Welcome'))
bot.help(ctx => ctx.reply('Send me a sticker'))
bot.on('sticker', ctx => ctx.reply('👍'))
bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.hears(/buy/i, ctx => ctx.reply('Buy-buy'))

// Add your feature here
bot.command('/dishes', ctx => dishes.setup(bot, ctx))

bot.startPolling()