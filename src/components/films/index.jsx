import React from "react";

export const Films = (props) => {
  return (
    <div className="containerFilms">
      <img src={props.poster} alt="filme" />
      <div>
        <h1>{props.title}</h1>
        {props.overview}
      </div>
    </div>
  );
};


