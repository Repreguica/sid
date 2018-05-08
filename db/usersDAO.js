'use strict'

const db = require('./firebase-db')
const usersCollection = db.collection('users')

module.exports = {
	getUsers: () => usersCollection.get(),
	getUser: id => usersCollection.doc(String(id)).get().then(doc => doc.data()),
	setUser: (id, user) => usersCollection.doc(String(id)).set(user, {
		merge: true
	})
}