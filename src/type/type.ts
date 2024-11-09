export interface IGenre {
    id: number;
    name: string;
  }
  
  export interface IFilm{
      id:number;
      title:string;
      description:string;
      year:number;
      time: number
      genre:string[];
      photo:string;
  }