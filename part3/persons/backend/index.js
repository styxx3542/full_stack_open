const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
app.use(express.json())

const generate_id = () => {
  const id = Math.floor(Math.random()*10000)
  return id;
}
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/',(req,res) => {
    res.send("<h1>Hello World</h1>")
})

app.get('/info',(req,res) => {
  res.send(
    `<p>Phonebook has ${persons.length} entries</p>`+
    
    `<p>${Date()}</p>`
  )
})
app.get('/api/persons',(req,res) => {
  res.json(persons)
})

app.get('/api/persons/:id',(req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  person?res.json(person):res.status(404).end()
})

app.delete('/api/persons/:id',(req,res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons',(req,res) => {
  const person = {
    id: generate_id(),
    name: req.body.name,
    number: req.body.number
  }
  if(!person.name)res.status(400).json({
    error: "Please enter a name"
  })
  else if(!person.number)res.status(400).json({
    error: "Please enter a number"
  })
  else{
  persons = persons.concat(person)
  res.json(person)}
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})