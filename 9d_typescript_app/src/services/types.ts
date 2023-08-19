export interface Note{
    id: number,
    content: string
}
//exporting a new type called NewNote for a new note, one that doesn't have the 'id' field assigned
export type NewNote = Omit<Note,'id'>