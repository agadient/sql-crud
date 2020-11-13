const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API'})
})

app.get('/students', db.getStudents)
app.get('/students/:studentId', db.getStudentById)
app.get('/grades/:studentId', db.getStudentGradesById)
app.post('/students', db.createStudent)
//app.put('/students/:id', db.updateStudent)
//app.delete('/students/:id', db.deleteStudent)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})