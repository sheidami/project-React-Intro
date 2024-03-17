// this page modify the user ability to see uniqe compontent based on their log in situation
// hokes are the function that wee create by using differnt use?
import { useState, useEffect } from "react";
import { getAuth} from 'firebase/auth';
const useUser = () =>{
     
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() =>{
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setUser(user);
            setIsLoading(false);
        })

        return unsubscribe;
    }, [])

    return{user, isLoading};

}
export default useUser;