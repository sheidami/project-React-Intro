import {useState} from 'react';
// usenavigate is used for going to home paage before it was called useHistory
import { Link, useNavigate} from 'react-router-dom';
// for connecting to fiarebase we need
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // after h1 if error exist shows error
    const navigate = useNavigate();
    const logIn = async() =>{
        // always pass getAuth as a first argu
        // use try csatch if the user doesnt exist
        try{

            await signInWithEmailAndPassword(getAuth(), email, password);
            // create const and then use it here to pass the url you want
            navigate('/articles')
        }catch(e){
            setError(e.message);

        }
        

    }
    return(
        <>
        <h1>Log In</h1>
        {error && <p className='error'>{error}</p>}
        <input
        placeholder='Your email address'
        value={email}
        onChange={e => setEmail(e.target.value)}/>
        <input type="password"
        placeholder='Your password'
        value={password}
        onChange={e => setPassword(e.target.value)}/>
        <button onClick={logIn}>Log In</button>
        <Link to="/create-account">Don't have an account? Create one here</Link>
        </>
    )

}

export default LoginPage;