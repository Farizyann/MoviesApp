import React from 'react';
import { IGenre } from '../type/type';
import { Button, Card } from 'react-bootstrap'; // Importing react-bootstrap components

interface GenreProps {
  genre: IGenre[];
  deleteGenre: Function;
}

export const Genre: React.FC<GenreProps> = ({ genre, deleteGenre }) => {
  return (
    <Card className="border-0 shadow-sm p-4">
      <Card.Body>
        <h4 className="mb-4">Genres</h4>
        {genre.length === 0 ? (
          <p>No genres available.</p>
        ) : (
          genre.map((elm) => (
            <div key={elm.id} className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">{elm.name}</h5>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteGenre(elm.id)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
};
