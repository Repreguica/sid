'use strict'

let Telegraf = require('telegraf'),
	config = require('./config'),
	bot = new Telegraf(config.botToken),
	EventEmitter = require('events'),
	photoEmitter = new EventEmitter

module.exports.bot = bot

module.exports.photoEmitter = photoEmitter

bot.on('photo', (ctx, next) => {
	photoEmitter.emit(ctx.from.id, ctx)
	next()
})