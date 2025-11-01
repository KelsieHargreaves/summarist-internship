"use client";

import React, { useEffect, useState } from "react";
import forYou from "./forYou.css";
import SideBar from "@/components/SideBarNav";
import SearchBar from "@/components/SearchBar";
import StarRating from "@/components/StarRating";
import Link from "next/link";
import RunTime from "@/components/Duration";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useModal } from "@/Providers";
import Login from "@/components/Modal/loginModal";
import Forgot from "@/components/Modal/forgotModal";
import SignUp from "@/components/Modal/signUpModal";
import { useSession } from "next-auth/react";

const ForYou = ({ audioLink }) => {
  const [selected, setSelected] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const { openModal, showModal, hideModal, isSubscribed } = useModal();

  const fetchBooksByStatus = async (status) => {
    const url = `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const loadAllBooks = async () => {
      try {
        const [recommendedData, suggestedData, selectedData] =
          await Promise.all([
            fetchBooksByStatus("recommended"),
            fetchBooksByStatus("suggested"),
            fetchBooksByStatus("selected"),
          ]);

        setRecommended(recommendedData.slice(0, 5));
        setSuggested(suggestedData.slice(0, 5));
        setSelected(selectedData[0]);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAllBooks();
  }, []);

  if (loading) {
    return (
      <div>
        <SideBar onLogin={() => showModal("login")} />
        <SearchBar />
        <div className="ForYouContainer">
          <div className="container selected">
            <h2>Selected just for you</h2>
            {selected && (
              <div className="selectedBookContainer">
                <Skeleton
                  width="33%"
                  height="50px"
                  style={{ marginBottom: "12px" }}
                />
                <div className="bookLine"></div>
                <Skeleton width="100px" height="150px" />
                <div className="selectedInfo">
                  <Skeleton
                    width="200px"
                    height="80px"
                    style={{ marginBottom: "12px" }}
                  />
                  <div className="runTime">
                    <Skeleton
                      circle={true}
                      width="32px"
                      height="32px"
                      style={{ marginRight: "8px" }}
                    />
                    <Skeleton
                      width="50px"
                      height="15px"
                      style={{ marginBottom: "12px" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="container recommended">
            <h2>Recommended For You</h2>
            <p className="sectionDescription">We think you'll like these</p>
            <div className="recommendedContainer">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bookContainer">
                  <Skeleton
                    width="200px"
                    height="150px"
                    style={{ marginBottom: "4px" }}
                  />
                  <Skeleton
                    width="200px"
                    height="50px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton
                    width="70px"
                    height="15px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton
                    width="200px"
                    height="30px"
                    style={{ marginBottom: "12px" }}
                  />
                  <div className="bookTime">
                    <Skeleton
                      width="60px"
                      height="15px"
                      style={{ marginRight: "8px" }}
                    />
                    <Skeleton width="60px" height="15px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container suggested">
            <h2>Suggested Books</h2>
            <p className="sectionDescription">Browse these books</p>
            <div className="suggestedContainer">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bookContainer">
                  <Skeleton
                    width="200px"
                    height="150px"
                    style={{ marginBottom: "4px" }}
                  />
                  <Skeleton
                    width="200px"
                    height="50px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton
                    width="70px"
                    height="15px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton
                    width="200px"
                    height="30px"
                    style={{ marginBottom: "12px" }}
                  />
                  <div className="bookTime">
                    <Skeleton
                      width="60px"
                      height="15px"
                      style={{ marginRight: "8px" }}
                    />
                    <Skeleton width="60px" height="15px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SideBar onLogin={() => showModal("login")} />
      <SearchBar />
      <div className="ForYouContainer">
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
        <div className="container selected">
          <h2>Selected just for you</h2>
          {selected && (
            <Link
              href={`/book/${selected.id}`}
              className="selectedBookContainer"
            >
              <p>{selected.subTitle}</p>
              <div className="bookLine"></div>
              <img className="bookImage" src={selected.imageLink} />
              <div className="selectedInfo">
                <h3>{selected.title}</h3>
                <p>{selected.author}</p>
                <div className="runTime">
                  <svg
                    className="runTimeImg"
                    stroke="white"
                    fill="white"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                  </svg>
                  <p className="runTimeText">
                    <RunTime audioLink={selected.audioLink} />
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="container recommended">
          <h2>Recommended For You</h2>
          <p className="sectionDescription">We think you'll like these</p>
          <div className="recommendedContainer">
            {recommended.map((book) => (
              <Link
                key={book.id}
                href={
                  !isSubscribed && book.subscriptionRequired
                    ? "/Plan"
                    : `/book/${book.id}`
                }
                className="bookContainer"
              >
                <div className="subscription">
                  {(!session || !isSubscribed) && book.subscriptionRequired && (
                    <div className="subscriptionStatus">Premium</div>
                  )}
                </div>
                <img className="bookImage" src={book.imageLink} />
                <h3 className="bookTitle">{book.title}</h3>
                <p className="bookAuthor">{book.author}</p>
                <p className="bookDescription">{book.subTitle}</p>
                <div className="bookTime">
                  <img className="clock" src="/time.svg" />
                  <p className="TimeStar">
                    <RunTime audioLink={book.audioLink} />
                  </p>
                  <img className="star" src="/star.svg" />
                  <p className="TimeStar">{book.averageRating}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="container suggested">
          <h2>Suggested Books</h2>
          <p className="sectionDescription">Browse these books</p>
          <div className="suggestedContainer">
            {suggested.map((book) => (
              <Link
                key={book.id}
                href={
                  !isSubscribed && book.subscriptionRequired
                    ? "/Plan"
                    : `/book/${book.id}`
                }
                className="bookContainer"
              >
                <div className="subscription">
                  {(!session || !isSubscribed) && book.subscriptionRequired && (
                    <div className="subscriptionStatus">Premium</div>
                  )}
                </div>
                <img className="bookImage" src={book.imageLink} />
                <h3 className="bookTitle">{book.title}</h3>
                <p className="bookAuthor">{book.author}</p>
                <p className="bookDescription">{book.subTitle}</p>
                <div className="bookTime">
                  <img className="clock" src="/time.svg" />
                  <p className="TimeStar">
                    <RunTime audioLink={book.audioLink} />
                  </p>
                  <img className="star" src="/star.svg" />
                  <p className="TimeStar">{book.averageRating}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
