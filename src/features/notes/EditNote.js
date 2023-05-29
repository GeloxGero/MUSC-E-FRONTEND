import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'

import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useAuth } from '../../hooks/useAuth'

const EditNote = () => {
    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth();

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        })
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.entities[id]
        })
    })
    
    // const note = useSelector(state => selectNoteById(state, id))
    // const users = useSelector(selectAllUsers)

    const content = note && users ? <EditNoteForm note={note} users={users} /> : <p>Loading...</p>

    return content
}
export default EditNote