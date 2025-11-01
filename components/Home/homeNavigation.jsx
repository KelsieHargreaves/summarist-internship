"use client"

import React from 'react'

const HomeNav = ({onLogin}) => {
  return (
    <div>
      <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="/logo.png" alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login" onClick={onLogin}>Login</li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default HomeNav
