import React, { useState } from 'react'
import './CSS/LoginSignup.css'

function LoginSignup() {

  const [state, setState] = useState("Login");
  const [formData, setterFormData] = useState({
    username:"",
    password:"",
    email:""
  })
  const changeHandler = (e)=>{
    setterFormData({...formData, [e.target.name]:e.target.value})
  }
  const login = async ()=>{
    console.log("Login function executed!");
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors);
    }
  }
  const signup = async ()=>{
    console.log("Signup function executed!");
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors);
    }
  }

  return (
    <div className='logisignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==='Sign Up'?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Your email' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <button onClick={()=>{state==='Login'?login():signup()}}>Continue</button>
        {state==='Sign Up'?
          <p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login</span></p>:
          <p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Sign Up</span></p>
        }
      </div>
    </div>
  )
}

export default LoginSignup
