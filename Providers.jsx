"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function Providers({ children, session }) {
  const [openModal, setOpenModal] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const showModal = (type) => setOpenModal(type);
  const hideModal = () => setOpenModal(null);
  const loginAsGuest = () => {
    setIsGuest(true);
    setIsSubscribed(false);
  };
  const logoutGuest = () => {
    setIsGuest(false);
    setIsSubscribed(false);
  };

  const logout = () => {
    setIsGuest(false)
    setIsSubscribed(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().isSubscriber) {
            setIsSubscribed(true);
          } else {
            setIsSubscribed(false);
          }
        } catch (error) {
          console.error("Error checking subscription", error);
        }
      } else {
        setIsSubscribed(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const subscribe = async () => {
    const user = auth.currentUser
    if (user) {
      await setDoc(doc(db, "users", user.uid), {isSubscriber: true }, {merge: true})
      setIsSubscribed(true);
    }
  };

  return (
    <SessionProvider session={session}>
      <ModalContext.Provider
        value={{
          openModal,
          showModal,
          hideModal,
          isGuest,
          loginAsGuest,
          logoutGuest,
          isSubscribed,
          subscribe,
          logout,
        }}
      >
        {children}
      </ModalContext.Provider>
    </SessionProvider>
  );
}
