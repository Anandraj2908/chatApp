import { createContext, useState, useEffect, useContext} from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(()=> {
        setLoading(false)
        getUserOnLoad()

    },[])

    const getUserOnLoad = async () => {
        try {
            const accountDetails =await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    const handleUserSignup = async (e,credentials) => {
        e.preventDefault()

        if(credentials.password1 !== credentials.password2){
            alert('Password do not match')
            return
        }
        try{
            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            )
            await account.createEmailSession(credentials.email,credentials.password1)
            const accountDetails =await account.get()
            console.log("AccDetails",accountDetails)
            setUser(accountDetails)
            navigate('/')
            
        }catch(error){
            console.log(error)
        }

    }

    const handleUserLogin = async (e,credentials) => {
        e.preventDefault()
        try {
            const promise =await account.createEmailSession(credentials.email,credentials.password);
            const accountDetails =await account.get()
            
            setUser(accountDetails)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleUserLogout = async() => {
        account.deleteSession('current')
        setUser(null)
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserSignup
    }

    return <AuthContext.Provider value={contextData}>
                {loading ? <p>Loading</p>:children}
            </AuthContext.Provider>
}

export const userAuth = () => {return useContext(AuthContext)}

export default AuthContext