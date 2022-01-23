import * as API from '../api/api';

export function getAllNotes({notes, setNotes}) {
    return API.getAllNotes()
        .then(res=>setNotes(res))
}
export function createNote({title, text}, {notes, setNotes}) {
    return API.createNote({title, text})
        .then(res=>setNotes([res].concat(notes)))
}
export function getNote({id}, {note, setNote}) {
    return API.getNote({id})
        .then(res=>setNote(res))
}
export function updateNote({id, title, text}, {note, setNote, notes, setNotes}) {
    return API.updateNote({id, title, text})
        .then(res=>{
            let newNote = {id, title, text}
            setNote(newNote);
            setNotes([newNote].concat(notes.filter(e => e.id !== id)))
        })
}
export function deleteNote({id}, {note, setNote, notes, setNotes}) {
    return API.deleteNote({id})
        .then(res=>{
            setNotes(notes.filter(e => e.id !== id))
            setNote(null);
        })
}

export function login({username, password}, {setUsername}) {
    return API.login({username, password})
        .then(res=>setUsername(username))
}
export function register({username, password}, {setUsername}) {
    return API.register({username, password})
        .then(res=>setUsername(username))
}
export function logout({username, setUsername}) {
    API.logout()
    setUsername(null)
}
