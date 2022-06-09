import React, { memo } from "react";
import books from "../assets/json/book.json";

const Main = memo(() => {
  return (
    <>
      {books.map((book, index) => (
        <ul key={index}>
          <a href={book.ridiUrl}>
            <li>{book.title}</li>
            <li>{book.authors.join(", ")}</li>
            <li>
              <img width="100" src={book.thumbnail} alt={book.title} />
            </li>
            <li>{book.categories.join(", ")}</li>
          </a>
        </ul>
      ))}
    </>
  );
});

export default Main;
