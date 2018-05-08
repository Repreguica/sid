'use strict'

const usersDAO = require('../db/usersDAO'),
	config = require('../config')

module.exports = (from, text) => {
	if (!from) {
		return Promise.reject(new Error('Usuario invalido'))
	}
	return usersDAO.getUser(from.id).then(user => {
		if (user) {
			return user
		} else if (text === config.authPassword) {
			return usersDAO.setUser(from.id, {
				firstName: from.first_name,
				lastName: from.last_name || '',
				username: from.username || ''
			})
		}
		return Promise.reject(new Error('Senha invalida'))
	})
}