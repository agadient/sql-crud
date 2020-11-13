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
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createStudent = (request, response) => {
    const { name, grades } = request.body
  
    pool.query('INSERT INTO students (name, grades) VALUES ($1, $2)', [name, grades], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Student added with ID: ${result.insertId}`)
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
    createStudent,
    updateStudent,
    deleteStudent,
  }