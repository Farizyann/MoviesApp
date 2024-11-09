import React, { useState } from 'react';
import { IFilm, IGenre } from './type/type';
import { AddGenre } from './component/AddGenre';
import { AddFilm } from './component/AddFilm';
import { Films } from './component/Films';
import { Genre } from './component/Genre';
import { WishList } from './component/WishList';

function App() {

  const photo: string[] = [
    '/photo/1.jpg',
    '/photo/2.jpg',
    '/photo/3.jpg',
    '/photo/4.jpg',
    '/photo/5.jpg',
  ];

  const [genres, setGenres] = useState<IGenre[]>([
    { id: 1, name: "Sci-Fi" },
    { id: 2, name: "Action" },
    { id: 3, name: "Crime" },
    { id: 4, name: "Drama" },
  ]);

  const [films, setFilms] = useState<IFilm[]>([
    {
      id: 1,
      title: "The Dark Knight",
      description: "Batman faces his greatest nemesis, the Joker.",
      year: 2008,
      time: 105,
      genre: ["Action"],
      photo: "1.jpg",
    },
    {
      id: 2,
      title: "World War Z",
      description: "Former United Nations employee Gerry Lane traverses the world in a race against time to stop a zombie pandemic.",
      year: 1994,
      time: 140,
      genre: ["Fantasy"],
      photo: "2.jpg",
    },
    {
      id: 3,
      title: "The Godfather",
      description: "The story of the powerful Corleone mafia family.",
      year: 1972,
      time: 107,
      genre: ["Drama"],
      photo: "3.jpg",
    },
    {
      id: 4,
      title: "Forrest Gump",
      description: "The life journey of a slow-witted, kind-hearted man.",
      year: 1994,
      time: 126,
      genre: ["Drama"],
      photo: "4.jpg",
    },
    {
      id: 5,
      title: "Inception",
      description: "A mind-bending thriller about dreams within dreams.",
      year: 2010,
      time: 110,
      genre: ["Sci-Fi"],
      photo: "5.jpg",
    },
  ]);

  const [wish, setWish] = useState<IFilm[]>([]);

  const createGenre = (data: IGenre) => {
    setGenres([...genres, data]);
  };

  const createFilm = (data: IFilm) => {
    const newFilm = { ...data, id: films.length + 1 };
    setFilms([...films, newFilm]);
  };

  const addWish = (data: IFilm) => {
    if (!wish.some((elm) => elm.id === data.id)) {
      setWish([...wish, data]);
    } else {
      setWish(wish.filter((elm) => elm.id !== data.id));
    }
  };

  const deleteGenre = (id: number) => {
    const genre = genres.find((elm) => elm.id === id);
    if (genre) {
      setGenres(genres.filter((elm) => elm.id !== id));
      setFilms(films.map((elm) => ({...elm, genres: elm.genre.filter((e) => e !== genre.name),
      })));
    }
  };

  const deleteFilm = (id: number) => {
    setFilms(films.filter((elm) => elm.id !== id));
    setWish(wish.filter((elm) => elm.id !== id));
  };

  const deleteWish = (id: number) => {
    setWish(wish.filter((elm) => elm.id !== id));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 border border-1 border-secondary">
          <AddGenre createGenre={createGenre} existingGenres={genres.map(g => g.name)} />
          <AddFilm imgs={photo} genre={genres} createFilm={createFilm} />
        </div>
        <div className="col border border-1 border-secondary">
          <Films
            films={films}
            wish={wish}
            genre={genres}
            addWish={addWish}
            deleteFilm={deleteFilm}
          />
          <WishList wish={wish} deleteWish={deleteWish} />
        </div>
        <div className="col-2 border border-1 border-secondary">
          <Genre  genre={genres} deleteGenre={deleteGenre} />
        </div>
      </div>
    </div>
  );
}

export default App;
