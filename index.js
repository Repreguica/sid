'use strict'

let bot = require('./bot').bot,
	dishes = require('./commands/dishes'),
	shop = require('./commands/shop'),
	authenticate = require('./middlewares/authenticate')

bot.start(ctx => ctx.reply('Manda a senha!'))
bot.use((ctx, next) => {
	const msg = ctx.message || {},
		from = ctx.from || msg.from,
		text = msg.text
	authenticate(from, text).then(() => next()).catch(err => {
		console.log(err)
		ctx.reply('Qual o seu problema mané?')
	})
})
bot.help(ctx => ctx.reply('Send me a sticker'))
bot.on('sticker', ctx => ctx.reply('👍'))
bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.hears(/buy/i, ctx => ctx.reply('Buy-buy'))

// Add your feature here
dishes.setup()
shop.setup()
bot.startPolling()