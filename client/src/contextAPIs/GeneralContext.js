import { createContext, useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserAuth } from '../features/auth/authSlice'

export const GeneralContext = createContext()

const GeneralProvider = ({ children }) => {
    const {data} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = { hashedId: token }
        dispatch(fetchUserAuth({method: 'id', user, token}))
    }, [])
    
    return (
        <GeneralContext.Provider value={{me: data?.data?.data}}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralProvider