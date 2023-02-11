import { useState, useEffect } from "react";
import personService from "./services/persons.js";
import "./index.css"
const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      Filter name with{" "}
      <input
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />
    </div>
  );
};
const Message = ({ isError,text }) => {
  if (!text)return null;
  return( <div className = {isError?"error":"success"}>
    {text}
  </div>)
}

const PersonForm = ({ persons, setPersons,setMessage,setError}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const displayError = (text) => {
    setError(true)
    setMessage(text)
  }
  const displaySuccess = (text) => {
    console.log(text)
    setMessage(text)
    setError(false)
  }
  
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (persons.map((a) => a.name).includes(newName)) {
          if (
            window.confirm(
              `${newName} already exists in the Phonebook,replace the old number with a new one?`
            )
          ) {
            const changedPerson = {
              name: newName,
              number: newNumber,
              id: persons.find((person) => person.name === newName).id,
            };
            personService.update(changedPerson, changedPerson.id)
            .then(
              (changedPerson) => {
                setPersons(
                  persons.map((person) =>
                    person.id != changedPerson.id ? person : changedPerson
                  )
                );
                setNewName("");
                setNewNumber("");
              }
            )
            .catch(error => {
                console.log(error)
                displayError(`${newName} has been deleted from the database.`);
                setTimeout(() => displayError(null), 3000);
                personService.getAll().then(persons => 
                  setPersons(persons)
                );      
            })
          }
        } else {
          const newPerson = { name: newName, number: newNumber };
          personService.create(newPerson).then((newPerson) => {
            displaySuccess(`${newName} successfully added.`);
            setTimeout(() => displaySuccess(null), 5000);
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
          });
        }
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
  );
};

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name}: {person.number}
          </p>
          <button
            onClick={() => {
              if (window.confirm(`Delete ${person.name}?`))
                deletePerson(person.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message,setMessage] = useState(null);
  const [isError,setError] = useState(false);
  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);
  const displayedPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;
  const deletePerson = (id) =>
    personService.del(id).then(
      (deletedPersonId) => {
        setPersons(persons.filter((person) => person.id !== deletedPersonId));
      }
    )
    .catch(error => {
      personService.getAll().then(persons => setPersons(persons))
    })
  return (
    <div>
      <h2>Phonebook</h2>
      <Message isError = {isError} text = {message}/>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a New</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessage = {setMessage} setError = {setError}/>
      <h2>Numbers</h2>
      <Persons persons={displayedPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
