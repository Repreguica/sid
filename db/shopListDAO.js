'use strict'

const db = require('./firebase-db')
const shopListCollection = db.collection('shopList')

module.exports = {
	getList: () => shopListCollection.get().then(items => items.docs.map(doc => doc.data().name)),
	addItem: item => shopListCollection.doc(String(item)).set({
		name: item
	}, {
		merge: true
	}),
	removeItem: item => shopListCollection.doc(String(item)).delete()
}