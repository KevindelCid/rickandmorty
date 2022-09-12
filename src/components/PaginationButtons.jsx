import React from "react";

const PaginationButtons = ({ index, setSelectedCharacters }) => {
  return (
    <button
      className="btn-circular-primary
      btn-circular-primary"
      type="button"
      onClick={() => {
        setSelectedCharacters(index);
      }}
    >
      {index + 1}
    </button>
  );
};

export default PaginationButtons;
