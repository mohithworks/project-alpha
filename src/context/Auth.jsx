import React, { useContext, useState, useEffect } from 'react'
import supabaseClient from '@/utils/supabaseClient'
import { sbEmailSignin, sbEmailSignup, sbSignOut } from '@/services/AuthService'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "@/store/auth/userSlice"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  
    const dispatch = useDispatch();
  
    const authUser = useSelector((state) => state.auth.user)

    console.log(authUser)

    const [user, setuser] = useState()
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      // Check active sessions and sets the user
      //const session = supabaseClient.auth.getSession()
  
      setuser(Object.keys(authUser).length !== 0 ? authUser : null)
      setLoading(false)
  
      // Listen for changes on auth state (logged in, signed out, etc.)
      const { subscription  } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
        console.log('Signed IN' + event);
        if(event === 'SIGNED_IN') {
          dispatch(setUser(session?.user ?? null))
          setuser(session?.user ?? null)
          setLoading(false)
        }
        if(event === 'SIGNED_OUT') {
          setuser(null)
          setLoading(false)
        }
      })

      console.log(user);
  
      return () => {
        subscription?.unsubscribe()
      }
    }, [])
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: ({email, password}) => sbEmailSignup(email, password),
      signIn: ({email, password}) => sbEmailSignin(email, password),
      signOut: () => sbSignOut(),
      user,
    }
  
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
   return useContext(AuthContext)
}