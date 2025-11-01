"use client"

import React, { useState } from 'react'
import modal from './modal.css'
import Link from 'next/link'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"


const SignUp = ({onClose, onLogin}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.")
      return
    }
    
    try {
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
      onLogin()
    } catch (error) {
      console.error(error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='modal'>
      <div className='modalContainer signUpContainer'>
         <div className="closeButton">
        <button className="close" onClick={onClose}>X</button>
        </div>
        <h1>Sign up to Summarist</h1>
         <button className="googleButton">
          <img src="/google.png" alt="" />
          <p>Login with Google</p>
        </button>
        <p>or</p>
        <input className='emailInput' type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className='passwordInput' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="finalButton" onClick={handleSignUp} disabled={loading}><p>{loading ? "Creating account..." : "Sign up"}</p></button>
        <button className="login" onClick={onLogin}>Already have an account?</button>
      </div>
    </div>
  )
}

export default SignUp
