const functions = require('firebase-functions')
const app = require('express')()
const FBAuth = require('./util/fbAuth')

const { db } = require('./util/admin')

const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signup, login, uploadImage } = require('./handlers/users')

//Scream routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)

//Users routes //Todo : Unique handle
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)

exports.api = functions.region('asia-east2').https.onRequest(app)

// firebase serve -p 5000 -o 127.0.0.1
