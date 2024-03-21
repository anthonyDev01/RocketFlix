import React, { useState } from "react";
import { API_KEY, BASE_URL, IMG_URL, language } from "../api";
import { Films } from "./components/films";
import "./App.css";

function App() {
  /*
    mostrar meu componente film ao clicar no botao(feito)
    passar a overview do filme atraves de props(feito)
    mudar a linguagem(feito)
    passar a poster_path atraves de props(feito)
    buscar um filme aleatorio de 62 a 76341(feito)
  */

  const [dataMovie, setDataMovie] = useState({
    overview: "",
    poster: "",
    title: "",
  });

  //gero um valor aleatorio para buscar um filme
  const randomMovie = () => {
    const max = 76341;
    const min = 62;
    return String(Math.round(Math.random() * (max - min) + min));
  };

  //busco os dados de filmes aleatorios
  async function fetchData(randomValue) {
    const url = `${BASE_URL}/${randomValue}?${API_KEY}&${language}`;

    const response = await fetch(url);
    const data = await response.json();
    let poster = IMG_URL + data.poster_path;

    //se algum dos valores for invalido busco novamente
    if (!data.overview || !data.poster_path || !data.title) {
      randomValue = randomMovie();
      fetchData(randomValue);
    } else {
      //se nao atualizo o estado dos dados do filme
      setDataMovie({
        overview: data.overview,
        poster: poster,
        title: data.title,
      });
    }
  }

  const renderMovies = () => {
    //renderizo novos filmes aleatorios ao clicar no botao
    const randomValue = randomMovie();

    fetchData(randomValue);
    console.log(dataMovie.title);
  };

  return (
    <div className="container">
      <div className="header">
        <img src="./assets/favico/android-chrome-512x512.png" alt="icon" />
        <h1>Não sabe o que assistir?</h1>
      </div>

      {
        //se tiver tiver algum dado em dataMovie chamo meu componete Films se nao tiver comeca com um <h1>
        dataMovie.overview && (
          <Films
            overview={dataMovie.overview}
            poster={dataMovie.poster}
            title={dataMovie.title}
          ></Films>
        )
      }
      <button onClick={renderMovies}>
        <img src="./assets/favico/android-chrome-192x192.png" alt="icon"></img>
        Econtrar Filme
      </button>
      <p>
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje.
      </p>
    </div>
  );
}

export default App;
