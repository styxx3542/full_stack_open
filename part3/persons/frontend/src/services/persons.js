import axios from 'axios'
const baseUrl = "/api/persons"
const getAll = () =>  axios
.get(baseUrl)
.then(response => response.data)

const create = (newPerson) => axios
.post(baseUrl,newPerson)
.then(response => response.data)

const update = (changedPerson,id) => axios
.put(baseUrl+ `/${id}`,changedPerson)
.then(response => response.data)

const del = (id) => axios
.delete(baseUrl + `/${id}`)
.then(response => id)


export default { getAll,create,update,del}