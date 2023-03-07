import { combineReducers } from '@reduxjs/toolkit'
import session from '@/store/auth/sessionSlice'
import user from '@/store/auth/userSlice'

const reducer = combineReducers({
    session,
    user
})

export default reducer