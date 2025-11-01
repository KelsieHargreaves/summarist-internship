"use client";

import React, { useEffect, useState } from "react";
import settings from "./settings.css";
import SideBar from "@/components/SideBarNav";
import SearchBar from "@/components/SearchBar";
import { useModal } from "@/Providers";
import Login from "@/components/Modal/loginModal";
import Forgot from "@/components/Modal/forgotModal";
import SignUp from "@/components/Modal/signUpModal";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

const Settings = () => {
  const { openModal, showModal, hideModal, isSubscribed, isGuest } = useModal();
  const [userEmail, setUserEmail] = useState("");

  const isLoggedIn = isSubscribed || isGuest || userEmail;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <SideBar onLogin={() => showModal("login")} />
      <SearchBar />
      <div className="container">
        {openModal === "login" && (
          <Login
            onClose={() => showModal(null)}
            onForgot={() => showModal("forgot")}
            onSignUp={() => showModal("signup")}
          />
        )}

        {openModal === "forgot" && (
          <Forgot
            onClose={() => showModal(null)}
            onLogin={() => showModal("login")}
          />
        )}

        {openModal === "signup" && (
          <SignUp
            onClose={() => showModal(null)}
            onLogin={() => showModal("login")}
          />
        )}
        {isLoggedIn ? (
          <div className="settingsRow">
            <h1>Settings</h1>
            <br />
            <div className="plan">
              <h3>Your Subscription plan</h3>
              {isSubscribed ? (
                <>
                  <p>Premium</p>
                  <p className="premiumText">Thank you for subscribing!</p>
                </>
              ) : (
                <>
                  <p>Basic</p>
                  <Link className="planButton" href="/Plan">
                    Upgrade to Premium
                  </Link>
                </>
              )}
            </div>
            <br />
            <div className="userInfo">
              <h3>Email</h3>
              <p>{userEmail || "Not signed in"}</p>
            </div>
          </div>
        ) : (
          <div className="loggedOut">
            <div className="loggedOutContainer container">
              <h1>Settings</h1>
              <img src="/login.png" />
              <h2>Log in to your account to see your details</h2>
              <button onClick={() => showModal("login")}>Login</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
