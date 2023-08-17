import { useState } from 'react';


const App = () => {

  interface Note{
    id:number;
    content: string; 
    }
    //use a type parameter in situations where the compiler can not infer the type.
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([{id:1, content:'testing'}]);

const noteCreation =(e:React.SyntheticEvent)=>{
  e.preventDefault()
  const noteToAdd={
    content: newNote,
    id:notes.length+1
  }
  setNotes(notes.concat(noteToAdd))
  setNewNote("")
}


  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={e=>setNewNote(e.target.value)}/>
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note=><li key = {note.id}>{note.content}</li>)}
      </ul>
    </div>
  )
}

export default App