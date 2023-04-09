import React from 'react'
import "./styles/Register.scss"
import {useNavigate,Link} from "react-router-dom"
import{BiImageAdd} from "react-icons/bi"
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import {auth , storage , db } from "../firebase";
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc , setDoc} from "firebase/firestore"

const Register = () => {

  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [subload, SetSubload] = useState(false);
  const [imgage, setImage] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmpassword = e.target[3].value;
        const displaypic = e.target[4].files[0];

        


    try{
      if(!displayName || !email || !password || !confirmpassword ) return setErr("All Fields Are Required!")
      if(password !== confirmpassword) return setErr("Password do not match!")
      if(!displaypic) return setErr("Image Required!")

        SetSubload(true)
        const res = await createUserWithEmailAndPassword(auth, email, password)

        //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, displaypic).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            // console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    }catch(err){
        setErr("Something Went Wrong!")
        SetSubload(false)
        // console.log(err)
    }

  
}



  return (
    <div className='parent'>
      <div className='moblink'>
            <p>Already have an account. <Link to="/login"><span style={{color:"red"}}>click here!</span></Link></p>
          </div>
        <div className='main'>
          
            <div className='left-container'>
                <div className='left-containerm'>
                <h3>Already have an Account!</h3>
                <span>Log-In and start chatting with like-minded and non-likeminded at the same time.
                </span>
                <button><Link to="/login">Log-In</Link></button>
                </div>
            </div>
            <div className='Signup-container'>
                <h2>Sign-Up</h2>
                <form  onSubmit={handleSubmit}>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Email' />
                <input type="Password" placeholder='Password' />
                <input type="Password" placeholder='Confirm Password' />
                <input style={{display:"none"}} type="file" id='file' onChange={(e)=>setImage(e.target.files[0])} />
                <label htmlFor="file">
                  {imgage ?
                  <img src={URL.createObjectURL(imgage)} alt='' style={{width:'30px', height:'30px', borderRadius:'50%', objectFit:'cover'}}/>
                :
                  <BiImageAdd size={30}/>
                }
                    
                    <span>Add an avatar</span>
                </label>
                <button disabled={subload}>{subload ? 'loading...' : 'Submit'}</button>
                {loading && "Uploading and compressing the image please wait..."}
                {err && <p>{err}</p>}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register