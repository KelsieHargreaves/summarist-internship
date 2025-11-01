"use client"

import Image from "next/image";
import HomeNav from "../components/Home/homeNavigation";
import Landing from "../components/Home/landing";
import Features from "@/components/Home/features";
import Reviews from "../components/Home/reviews";
import Numbers from "../components/Home/numbers";
import Footer from "@/components/Home/footer";
import Login from "@/components/Modal/loginModal";
import Forgot from "@/components/Modal/forgotModal";
import SignUp from "@/components/Modal/signUpModal";
import { useState } from "react";

export default function Home() {

  const [openModal, setOpenModal] = useState(null)

  return (
    <>
      <HomeNav onLogin={() => setOpenModal("login")}  />
      <Landing onLogin={() => setOpenModal("login")} />
      <Features />
      <Reviews onLogin={() => setOpenModal("login")} />
      <Numbers />
      <Footer />

      {openModal === "login" && (
        <Login 
          onClose={() => setOpenModal(null)}
          onForgot={() => setOpenModal("forgot")}
          onSignUp={() => setOpenModal("signup")}
        />
      )}

      {openModal === "forgot" && (
        <Forgot 
            onClose={() => setOpenModal(null)}
            onLogin={() => setOpenModal("login")}
        />
      )}
      
      {openModal === "signup" && (
        <SignUp
            onClose={() => setOpenModal(null)}
            onLogin={() => setOpenModal("login")}
        />
      )}

    </>
  );
}
