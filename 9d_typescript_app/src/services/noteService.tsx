import axios from 'axios';
import {Note, NewNote} from "./types"

const baseUrl = 'http://localhost:3001/notes'

export const getAllNotes =()=>(axios.get<Note[]>(baseUrl).then(res=>res.data))

export const createNote =(obj:NewNote)=>(axios.post<Note>(baseUrl,obj).then(res=>res.data))

