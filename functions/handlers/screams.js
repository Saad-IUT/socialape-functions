const { db } = require('../util/admin')

exports.getAllScreams = (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let screams = []
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          userImage: doc.data().userImage,
        })
      })
      return res.json(screams)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

exports.postOneScream = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Must not be empty' })
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
  }

  db.collection('screams')
    .add(newScream)
    .then(doc => {
      const resScream = newScream
      resScream.screamId = doc.id
      res.json(resScream)
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}
