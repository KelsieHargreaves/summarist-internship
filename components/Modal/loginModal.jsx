"use client";

import React, { useState, useEffect } from "react";
import modal from "./modal.css";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "@/Providers";

const Login = ({ onClose, onForgot, onSignUp }) => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { loginAsGuest } = useModal();

  const handleGuestLogin = () => {
    loginAsGuest();
    onClose();

    if (pathname === "/") {
      router.push("/ForYou");
    }
  };

  const handleEmailLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res.error) {
      onClose();
      if (pathname === "/") router.push("/ForYou");
    } else {
      alert(res.error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      onClose();
    }
  }, [status, onClose]);

  const handleGoogleLogin = async () => {
    if (pathname === "/") {
      await signIn("google", {callbackUrl: "/ForYou"})
    } else {
      await signIn("google")
    }
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="closeButton">
          <button className="close" onClick={onClose}>
            X
          </button>
        </div>
        <h1>Log in to Summarist</h1>
        <button className="guestButton" onClick={handleGuestLogin}>
          <svg
            stroke="white"
            fill="white"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
          </svg>
          <p>Login as a Guest</p>
        </button>
        <p>or</p>
        <button onClick={handleGoogleLogin} className="googleButton">
          <img src="/google.png" alt="" />
          <p>Login with Google</p>
        </button>
        <p>or</p>
        <input
          className="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <div className="passwordInput">
          <input
            className="passwordText"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            className="showPasswordButton"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img className="openEye" src="/showPassword.png" />
            ) : (
              <img className="closedEye" src="/dontShowPassword.png" />
            )}
          </button>
        </div>
        <button
          onClick={handleEmailLogin}
          disabled={loading}
          className="finalButton"
        >
          <p>{loading ? "Logging in..." : "Login"}</p>
        </button>
        <button className="forgot" onClick={onForgot}>
          Forgot our password?
        </button>
        <button className="signUpLink" onClick={onSignUp}>
          Don't have an account?
        </button>
      </div>
    </div>
  );
};

export default Login;
