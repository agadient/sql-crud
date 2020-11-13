const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pair',
  host: 'localhost',
  database: 'students',
  password: 'password',
  port: 5432,
})

const getStudents = (request, response) => {
let query = request.query

if(JSON.stringify(query)==JSON.stringify({})){
  pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
else{
  pool.query('SELECT * FROM students WHERE name = $1', [query.search], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

}

const getStudentById = (request, response) => {
  const studentId = parseInt(request.params.studentId)

  pool.query('SELECT * FROM students WHERE id = $1', [studentId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getStudentGradesById = (request, response) => {
  const studentId = parseInt(request.params.studentId)

  pool.query('SELECT grades FROM students WHERE id = $1', [studentId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const submitGrade = (request, response) => {
  // const studentId = parseInt(request.params.studentId)
  const grade = request.body

  pool.query('INSERT INTO students (grades) VALUES ($1) WHERE id = ($2)', [grade, studentId], (error, results) => {
    if (error) {
      response.send("Could not add grade")
    }
    response.status(201).send(`Successfully added new grade`)
  })
}

const createStudent = (request, response) => {
  const { name, grades } = request.body
  if (!name || grades.length === 0) {
    request.send("Could not log student, invalid input params")
    return
  }
  console.log(grades)
  console.log(name)
  pool.query('INSERT INTO students (name, grades) VALUES ($1, $2)', [name, grades], (error, results) => {
    if (error) {
      response.send("Could not add student, database error")
    }
    response.status(201).send(`Student added`)
  })
}

const updateStudent = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, grades } = request.body

  pool.query(
    'UPDATE students SET name = $1, grades = $2 WHERE id = $3',
    [name, grades, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Student modified with ID: ${id}`)
    }
  )
}

const deleteStudent = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Student deleted with ID: ${id}`)
  })
}

module.exports = {
  getStudents,
  getStudentById,
  getStudentGradesById,
  createStudent,
  updateStudent,
  deleteStudent,
  submitGrade
}