import { useState, useEffect } from "react";
import Message from "./components/Message";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const hook = () => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        console.error("error => ", error);
        setMessageValues(false, `Something went wrong on list persons`);
      });
  };

  useEffect(hook, []);

  const personsToShow =
    filter.length == 0
      ? persons
      : persons.filter((person) =>
          person.name.trim().toLowerCase().includes(filter.toLowerCase())
        );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (newName.length == 0 || newNumber.length == 0) {
      alert("Please fill all inputs");
      return;
    }

    const findPerson = persons.find(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );

    if (findPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const updatePerson = { ...findPerson, number: newNumber };

        personService
          .update(findPerson.id, updatePerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== findPerson.id ? person : updatedPerson
              )
            );
            clearForm();
            setMessageValues(true, `Number of ${updatePerson.name} updated!`);
          })
          .catch((error) => {
            console.error("error => ", error);

            if (error.status === 404) {
              setMessageValues(
                false,
                `Information of ${updatePerson.name} has already been removed from server`
              );
              setPersons(
                persons.filter((person) => person.id !== findPerson.id)
              );
              return;
            }

            let errorMessage = "";

            if (error.status === 400) {
              errorMessage = error.response.data.error;
            } else {
              errorMessage = `Something went wrong on add ${personObject.name}`;
            }

            setMessageValues(false, errorMessage);
          });
      }

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        clearForm();
        setMessageValues(true, `Added ${personObject.name}`);
      })
      .catch((error) => {
        console.error("error => ", error);

        let errorMessage = "";

        if (error.status === 400) {
          errorMessage = error.response.data.error;
        } else {
          errorMessage = `Something went wrong on add ${personObject.name}`;
        }

        setMessageValues(false, errorMessage);
      });
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          //setPersons(persons.filter((person) => person.id !== deletePerson.id));
          setPersons(persons.filter((person) => person.id !== id));
          setMessageValues(true, `${name} deleted!`);
        })
        .catch((error) => {
          console.error("error => ", error);

          if (error.status === 404) {
            setMessageValues(
              false,
              `Information of ${name} has already been removed from server`
            );
            setPersons(persons.filter((person) => person.id !== id));
            return;
          }

          setMessageValues(false, `Something went wrong on delete ${name}`);
        });
    }
  };

  function clearForm() {
    setNewName("");
    setNewNumber("");
  }

  function setMessageValues(type, message) {
    setMessage(message);
    setIsSuccess(type);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Message isSuccess={isSuccess} body={message} />

      <Filter value={filter} onChange={handleFilterChange}></Filter>

      <h2>Add a new</h2>

      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      ></PersonForm>

      <h2>Numbers</h2>

      <Persons persons={personsToShow} handleRemove={removePerson}></Persons>
    </div>
  );
};

export default App;
