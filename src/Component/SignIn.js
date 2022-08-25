import React, { useState } from "react";
import "./SignIn.css";
import { Link , useNavigate} from "react-router-dom";
import {auth} from '../firebase'

function SignIn() {
    const navigate=useNavigate();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    let signIn=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
          if(auth){
            navigate('/')
          }
        })
        .catch(error=>alert(error.message))

    }
    let register=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            if(auth){
                navigate('/')
            }
        })
        .catch(error=>alert(error.message))
    }

  return (
    <div className="SignIn">
      <Link to="/">
        <img
          className="SignIn-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="SignIn-container">
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input type="text" value={email} onChange={e=>{
            setEmail(e.target.value)
          }} />
          <h5>Password</h5>
          <input type="password" value={password} onChange={e=>{
            setPassword(e.target.value)
          }} />
          <button type="submit" onClick={signIn} className="SignIn-Button">
            Sign In{" "}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="SignIn-registerButton">Create your Amazon Account</button>
      </div>
    </div>
  );
}

export default SignIn;
