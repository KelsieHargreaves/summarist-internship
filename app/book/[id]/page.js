"use client";

import React, { useEffect, useState } from "react";
import book from "../book.css";
import SideBar from "@/components/SideBarNav";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import RunTime from "@/components/Duration";
import { useParams } from "next/navigation";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useSession } from "next-auth/react";
import Login from "@/components/Modal/loginModal";
import Forgot from "@/components/Modal/forgotModal";
import SignUp from "@/components/Modal/signUpModal";
import { useModal } from "@/Providers";

export default function Book({ params }) {
  const { id } = useParams();
  const { data: session } = useSession();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { openModal, showModal, hideModal, isSubscribed } = useModal();

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const book = await res.json();
        setBook(book);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  const handleProtectedClick = (e, path) => {
    if (!session) {
      e.preventDefault();
      showModal("login");
    }
  };

  if (loading) {
    return (
      <div>
        <SideBar onLogin={() => showModal("login")} />
        <SearchBar />
        <div className="book">
          <div className="bookInformation">
            <Skeleton
              width="400px"
              height="90px"
              style={{ marginBottom: "12px" }}
            />
            <Skeleton
              width="300px"
              height="20px"
              style={{ marginBottom: "8px" }}
            />

            <div className="details">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  width="80%"
                  height="24px"
                  style={{ marginBottom: "16px" }}
                />
              ))}
            </div>

            <div className="buttons">
              <Skeleton width="120px" height="40px" />
              <Skeleton width="120px" height="40px" />
            </div>

            <Skeleton
              width="100%"
              height="100%"
              style={{ marginTop: "24px" }}
            />
          </div>
          <Skeleton width="400px" height="500px" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <SideBar onLogin={() => showModal("login")} />
      <SearchBar />
      <div className="book">
        <div className="bookInformation">
          <h1 className="title">
            {book.title}
            {book.subscriptionRequired === true && <div>(Premium)</div>}
          </h1>
          <h3 className="author">{book.author}</h3>
          <p className="subTitle">{book.subTitle}</p>
          <div className="details">
            <div className="rating">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
              </svg>
              <p>
                {book.averageRating} ({book.totalRating} ratings)
              </p>
            </div>
            <div className="time">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
              </svg>
              <p>
                <RunTime audioLink={book.audioLink} />
              </p>
            </div>
            <div className="audio">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1zM512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z"></path>
              </svg>
              <p>{book.type}</p>
            </div>
            <div className="ideas">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
              <p>{book.keyIdeas}</p>
            </div>
          </div>
          <div className="buttons">
            <Link
              href={!isSubscribed && book.subscriptionRequired
                    ? "/Plan"
                    :`/book/${book.id}/bookPlay`}
              // onClick={handleProtectedClick}
            >
              <button className="button">
                <svg
                  stroke="white"
                  fill="white"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path>
                </svg>
                Read
              </button>
            </Link>
            <Link
              href={!isSubscribed && book.subscriptionRequired
                    ? "/Plan"
                    :`/book/${book.id}/bookPlay`}
              // onClick={handleProtectedClick}
            >
              <button className="button">
                <svg
                  stroke="white"
                  fill="white"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1zM512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z"></path>
                </svg>
                Listen
              </button>
            </Link>
          </div>
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
          <button className="addToLibrary">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
            </svg>
            Add title to My Library
          </button>
          <div className="description">
            <h3 className="descriptionTitle">What's it about?</h3>
            <h4 className="genre">{book.tags.join(" ~ ")}</h4>
            <p className="summary">{book.bookDescription}</p>
          </div>
          <div className="aboutTheAuthor">
            <h3 className="descriptionTitle">About the Author</h3>
            <p className="authorAbout">{book.authorDescription}</p>
          </div>
        </div>
        <div>
          <img className="insideBookImage" src={book.imageLink} />
        </div>
      </div>
    </div>
  );
}
