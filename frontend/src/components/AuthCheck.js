import React, { useState, useEffect, useContext, createContext } from 'react'

// const baseUrl = process.env.REACT_APP_BASE_URL
const baseUrl = '/users/token/obtain/'

const authContext = createContext()

export function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}> {children} </authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
    const [user, setUser] = useState(null)
    const signin = (credentials) => {
        fetch(baseUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(json => setUser(json.user))
    }
    useEffect(() => {
        //check authentication
    }, [])
    return {
        user,
        signin
    }
}