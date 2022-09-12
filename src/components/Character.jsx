import axios from "axios";
import React, { useEffect, useState } from "react";

const Character = ({ url }) => {
  const [character, setCharacter] = useState({});

  const getApi = () => {
    axios.get(url).then((res) => {
      setCharacter(res.data);
    });
  };

  useEffect(() => {
    getApi();
  }, []);

  const status = (status) => {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      case "unknown":
        return "rosybrown";
      default:
        return "gray";
    }
  };

  return (
    <li className="card-character">
      <div className="status-character">
        <div
          className="ball-status"
          style={{ backgroundColor: status(character.status) }}
        ></div>
        <p>{character.status}</p>
      </div>
      <img src={character.image !== undefined ? character.image : ""} alt="" />

      <h2>
        {character.name !== undefined
          ? character.name
          : "_____No encontramos más resultados"}
      </h2>
      <hr />
      <div className="card-character-data">
        <h3>Raza</h3>
        <p>{character.species !== undefined ? character.species : ""}</p>
        <h3>Origin</h3>
        <p>
          {character.origin?.name !== undefined ? character.origin?.name : ""}
        </p>
        <h3>Episodes</h3>
        <p>{character.episode?.length}</p>
      </div>
    </li>
  );
};

export default Character;
