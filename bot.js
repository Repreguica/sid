'use strict'

let Telegraf = require('telegraf'),
	config = require('./config')

module.exports = new Telegraf(config.botToken)