import { useState, useEffect } from 'react';
import axios from 'axios';
import {Note} from "./services/types"
import { createNote, getAllNotes } from './services/noteService';

const App = () => {

    //use a type parameter in situations where the compiler can not infer the type.
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([{id:1, content:'testing'}]);

  useEffect(()=>{getAllNotes().then(data=> setNotes(data))},[])


const noteCreation =(e:React.SyntheticEvent)=>{
  e.preventDefault()
  createNote({content:newNote}).then(data=>{setNotes(notes.concat(data))})

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