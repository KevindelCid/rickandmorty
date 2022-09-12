import React, { useState } from "react";
import Character from "./Character";
import PaginationButtons from "./PaginationButtons";

const Pagination = ({ characters }) => {
  const [selectedCharacters, setSelectedCharacters] = useState(0);

  const actualCharacters = characters[selectedCharacters]?.map((url) => (
    <Character url={url} key={url} />
  ));

  return (
    <>
      <section className="">
        <ul className="characters-container">{actualCharacters}</ul>
      </section>
      <div className="pagination-container">
        {characters?.map((item, index) => (
          <PaginationButtons
            index={index}
            setSelectedCharacters={setSelectedCharacters}
          />
        ))}
      </div>
    </>
  );
};

export default Pagination;
