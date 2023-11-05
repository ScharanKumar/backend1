const express = require('express')
const path = require('path')
const cors = require("cors")

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(cors());
app.use(express.json());
const dbPath = path.join(__dirname, 'x.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3566, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()

// Get Books API
app.get('/', async (request, response) => {
  const getBooksQuery = `
    SELECT
      *
    FROM
      player;`;
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})
