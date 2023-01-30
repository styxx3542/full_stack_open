import { useState } from "react";
const Filter = ({filter,setFilter}) => {
  return(<div>
    Filter name with <input value = {filter} onChange = {(event) => {
        setFilter(event.target.value);
      }}/>
  </div>)
}

const PersonForm = ({persons,setPersons}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  return(
    <form
        onSubmit={(event) => {
          event.preventDefault();
          if (persons.map((a) => a.name).includes(newName))
            alert(`${newName} already exists in the Phonebook.`);
          else {
            setPersons(persons.concat({ name: newName ,number: newNumber}));
          }
          setNewName("");
          setNewNumber("");
        }}
      >
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => {
              setNewNumber(event.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons }) => {
return(
  <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}: {person.number}</p>
          
        ))}
      </div>
)
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [filter,setFilter] = useState("");
  const displayedPersons = filter?persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())):persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} setFilter = {setFilter}/>
      <h2>Add a New</h2>
      <PersonForm persons = {persons} setPersons = {setPersons}/>
      <h2>Numbers</h2>
      <Persons persons = {displayedPersons}/>
    </div>
  );
};

export default App;
