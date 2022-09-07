const Note = require('../models/note')

function reverse(string) {
  return string.split('').reverse().join('')
}

function average(array) {
  return array.length === 0
    ? 0
    : array.reduce((a, b) => a + b, 0) / array.length
}

const noteList = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
]

async function nonExistingId() {
  const note = new Note({ content: 'content placeholder', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

async function notesInDb() {
  const notes = await Note.find({})

  return notes.map((n) => n.toJSON())
}

module.exports = { reverse, average, noteList, nonExistingId, notesInDb }
