'use strict'

const admin = require('firebase-admin')
const firebaseKey = require('./firebaseKey')

admin.initializeApp({
	credential: admin.credential.cert(firebaseKey)
})

module.exports = admin.firestore()