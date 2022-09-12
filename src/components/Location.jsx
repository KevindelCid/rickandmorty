import { useEffect, useState } from "react";
import axios from "axios";
import loaders from "../loaders.json";
import Character from "./Character";
import Pagination from "./Pagination";

const Location = () => {
  const [location, setLocation] = useState({});
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");

  // generar numero random
  const randNumber = (max) => {
    const rand = Math.floor(Math.random() * max);
    return rand;
  };

  // hace la busqueda del input del header

  function getSearch(find) {
    if (find === "") {
      getApi();
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/location/${find}`)
        .then((res) => {
          setLocation(res.data);
          setLoader(false);
        });
    }
  }

  // obtener los datos inciales de la api
  const getApi = () => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${randNumber(126)}`)
      .then((res) => {
        setLocation(res.data);

        setLoader(false);
      });
  };

  // Ejecutamos la funcion getApi
  useEffect(() => {
    getApi();
  }, []);

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

  const getPaginationLength = (pagination) => {
    const paginateResidents = [[]];

    let contador = 1;

    for (let i = 0; i <= location.residents?.length; i++) {
      if (i === pagination * contador) {
        contador++;

        paginateResidents.push([]);
        paginateResidents[contador - 1]?.push(location.residents[i]);
      } else {
        paginateResidents[contador - 1]?.push(location.residents[i]);
      }
    }
    return paginateResidents;
  };

  return (
    <>
      <header className="header">
        <img
         className="header-ricknmorty"
          src="https://i.postimg.cc/Bb3VYBn1/Rick-and-Morty.webp"
          alt="rick and morty"
          width="200"
        />
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
      <button
        type="button"
        className="btn-circular-primary
btn-circular-primary"
        onClick={getApi}
      >
        <i class="fa-solid fa-shuffle"></i>
      </button>
      Characters
      <Pagination characters={getPaginationLength(5)} />
      {/* {location.residents?.map((url) => (
            <Character url={url} key={url} />
          ))} */}
    </>
  );
};

export default Location;
