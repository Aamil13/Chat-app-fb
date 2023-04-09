import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import "./styles/Login.scss"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {

    const navigate = useNavigate();

    const [error , SetError] = useState(false)
    const [loading, SetLoading] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();

        
        const email = e.target[0].value;
        const password = e.target[1].value;
        

    try{
        if(!email || !password) return SetError(true)
        

            SetLoading(true)
            await signInWithEmailAndPassword(auth,email,password)
            navigate("/")

        
    }catch(err){
        SetLoading(false)
        SetError(true)
        // console.log(err)
    }

  
}

    const guestLogin = async(val)=>{
        let email
        let password
        if(val === 1){
         email = 'test2@gmail.com'
         password = 'qwerty'
        }if(val === 2){
             email = 'test@gmail.com'
           password = 'qwerty'
        }

        try{
           
            
    
                SetLoading(true)
                await signInWithEmailAndPassword(auth,email,password)
                navigate("/")
    
            
        }catch(err){
            SetLoading(false)
            SetError(true)
            // console.log(err)
        }
    }
  return (
    <div className='parent'>
        <div className='moblink'>
            <p>Create an account. <Link to="/register"><span style={{color:"red"}}>click here!</span></Link></p>
          </div>
        <div className='main'>
            <div className='left-container'>
                <div className='left-containerm'>
                <h3>Don't have a account?</h3>
                <span>Join us now to chat with users around the world!
                    Chatter is an online connecter of willing parties.
                </span>
                <button><Link to="/register">Sign-up </Link></button>
                </div>
            </div>
            <div className='login-container'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Password' />
                <button disabled={loading}>{loading ? 'loading...' : 'Submit'}</button>
                {error && <p>Something went wrong!</p>}
                </form>
            </div>
            <div className='guest'>
            <button className='b1' onClick={()=>guestLogin(1)} disabled={loading}>{loading ? 'loading...' : 'Guest1'}</button>
            <button className='b2' onClick={()=>guestLogin(2)} disabled={loading}>{loading ? 'loading...' : 'Guest2'}</button>
            </div>
        </div>
    </div>
  )
}

export default Login