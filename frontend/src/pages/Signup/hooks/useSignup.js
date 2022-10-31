import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'
// import { dispatch } from 'react'

export const useSignup = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)
    // const { dispatch } = useAuthContext()

    const signup = async (firstname, lastname, email, password, lastLoggedIn ) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch('http://localhost:5000/api/users/signup', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstname, lastname, email, password, lastLoggedIn})
        })
        const json = await res.json()

        if(!res.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(res.ok){
            //save signup user to local storage with json format
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            // dispatch({type: 'SINGUP', payload: json})

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}