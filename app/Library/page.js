import React from "react";
import library from "./library.css";
import SideBar from "@/components/SideBarNav";
import SearchBar from "@/components/SearchBar";

const Library = () => {
  return (
    <div>
      <SideBar />
      <SearchBar />
      <div className="libraryContainer container">
        <div className="libraryRow">
            <div className="librarySaved">
                <h1>Saved Books</h1>
            <div className="savedBooks">
              <h3>You currently do not have any books saved.</h3>
              <img src="/undraw_books.svg"></img>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
