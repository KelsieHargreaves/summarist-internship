"use client";

import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBarNav";
import React, { useEffect, useState, useRef } from "react";
import book from "../../book.css";
import { useParams } from "next/navigation";
import Skeleton from "@/components/Skeleton/Skeleton";
import { useModal } from "@/Providers";
import Login from "@/components/Modal/loginModal";
import Forgot from "@/components/Modal/forgotModal";
import SignUp from "@/components/Modal/signUpModal";

export default function BookPlay({ params }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const { openModal, showModal, hideModal } = useModal();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [book]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    const utterance = new SpeechSynthesisUtterance(book.summary);

    utterance.voice = speechSynthesis.getVoices()[1];

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10
      );
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        0,
        audioRef.current.currentTime + 10
      );
    }
  };

  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="bookPlayPage">
        <SideBar onLogin={() => showModal("login")} />
        <SearchBar />
        <div className="container play">
          <div className="bookPlayRow">
            <div className="playSpinner"></div>
          </div>
        </div>
        <div className="playBar">
          <div className="playInfo">
            <Skeleton
              width="40px"
              height="60px"
              style={{ marginRight: "12px" }}
            />
            <div className="titleAndAuthor">
              <Skeleton width="300px" height="50px" />
            </div>
          </div>
          <div className="playButtons">
            <button className="playBack">
              <svg
                stroke="white"
                fill="white"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                ></path>
              </svg>
            </button>
            <button className="playButton">
              <svg
                stroke="#032b41"
                fill="#032b41"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="audio__controls--play-icon"
                height="32px"
                width="32px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 448l320-192L96 64v384z"></path>
              </svg>
            </button>
            <button className="playForward">
              <svg
                stroke="white"
                fill="white"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="timeBar">
            <div className="startTime">00:00</div>
            <input
              className="progressTime"
              type="range"
              min={0}
              max={duration || 0}
            ></input>
            <div className="totalTime">00:00</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bookPlayPage">
      <SideBar onLogin={() => showModal("login")} />
      <SearchBar />
      <div className="container play">
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
        <div className="bookPlayRow">
          <h1>{book.title}</h1>
          <br />
          <p>{book.summary}</p>
        </div>
      </div>
      <audio ref={audioRef} src={book.audioLink} />
      <div className="playBar">
        <div className="playInfo">
          <img className="playBook" src={book.imageLink} />
          <div className="titleAndAuthor">
            <p className="playTitle">{book.title}</p>
            <p className="playAuthor">{book.author}</p>
          </div>
        </div>
        <div className="playButtons">
          <button onClick={skipBackward} className="playBack">
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
              ></path>
            </svg>
          </button>
          <button className="playButton" onClick={togglePlay}>
            {isPlaying ? (
              <svg
                stroke="#032b41"
                fill="#032b41"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="32px"
                width="32px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 432h-80V80h80zm144 0h-80V80h80z"></path>
              </svg>
            ) : (
              <svg
                stroke="#032b41"
                fill="#032b41"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="audio__controls--play-icon"
                height="32px"
                width="32px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 448l320-192L96 64v384z"></path>
              </svg>
            )}
          </button>
          <button onClick={skipForward} className="playForward">
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="timeBar">
          <div className="startTime">{formatTime(currentTime)}</div>
          <input
            className="progressTime"
            type="range"
            min={0}
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSliderChange}
          ></input>
          <div className="totalTime">{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
}
