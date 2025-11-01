"use client"

import React from 'react'
import modal from './modal.css'
import Link from 'next/link'

const Forgot = ({onClose, onLogin}) => {
  return (
    <div className='modal'>
      <div className="modalContainer forgotContainer">
        <div className="closeButton">
        <button className="close" onClick={onClose}>X</button>
        </div>
        <h1>Reset your Password</h1>
        <input type="text" placeholder="Email Address" />
        <button className="finalButton"><p>Send reset password link</p></button>
        <button className="login" onClick={onLogin}>Go to login</button>
      </div>
    </div>
  )
}

export default Forgot
