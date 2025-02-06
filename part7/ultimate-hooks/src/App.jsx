import { useField, useResource } from './hooks'

const App = () => {
  const { inputProps: content, reset: resetContent } = useField('text')
  const { inputProps: name, reset: resetName } = useField('text')
  const { inputProps: number, reset: resetNumber } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    
    if(content.value.length === 0) {
      alert("content can't be empty");
      return;
    }
    
    noteService.create({ content: content.value })
    resetContent()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()

    if(name.value.length === 0) {
      alert("name can't be empty");
      return;
    }

    if(number.value.length === 0) {
      alert("number can't be empty");
      return;
    }

    personService.create({ name: name.value, number: number.value})
    resetName()
    resetNumber()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App