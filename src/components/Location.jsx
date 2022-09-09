import { useEffect, useState } from "react";
import axios from "axios";
import loaders from "../loaders.json";

const Location = () => {
  const randNumber = (max) => {
    const rand = Math.floor(Math.random() * max);
    return rand;
  };

  const [location, setLocation] = useState({});
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState({});

  function getSearch(find) {
    if (find === "") {
      getApi();
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/location/${find}`)
        .then((res) => {
          setLocation(res.data);
          setLoader(false);
          findCharacters(res.data.residents);
        });
    }
  }

  const getApi = () => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${randNumber(126)}`)
      .then((res) => {
        setLocation(res.data);
        setLoader(false);
        findCharacters(res.data.residents);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  const findCharacters = (residents) => {
    const character = [];
    residents.map((item) => {
      axios.get(item).then((res) => {
        character.push(res.data);
        setCharacters(character);
        console.log(characters);
      });
    });

    // residents?.map((resident) => {
    //   axios.get(resident).then((res) => {
    //     console.log(res.data);
    //   });
    // });
  };

  const view = () => {
    if (loader === true) {
      return <img src={loaders[randNumber(3)]}></img>;
    } else {
      return (
        <>
          <article>
            <h2>Nombre:</h2>
            <p>{location.name}</p>
          </article>
          <article>
            <h2>Tipo:</h2>
            <p>{location.type}</p>
          </article>
          <article>
            <h2>Dimención:</h2>
            <p>{location.dimension}</p>
          </article>
          <article>
            <h2>Población:</h2>
            <p>{location.residents?.length}</p>
          </article>
        </>
      );
    }
  };

  return (
    <>
      <header className="header">
        <input
          className="header-input"
          type="text"
          placeholder="Escribe el id de la localidad"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            getSearch(e.target.value);
          }}
        />
      </header>

      <section className="location-container">{view()}</section>
      <section className="characters-container">
        <ul>
          {location.residents?.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Location;
