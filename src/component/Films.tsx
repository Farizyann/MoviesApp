import React, { useState } from 'react';
import { IFilm, IGenre } from '../type/type';
import { Button, Form, Card, Row, Col, InputGroup } from 'react-bootstrap'; // Importing react-bootstrap components

interface IType {
  films: IFilm[];
  wish: IFilm[];
  genre: IGenre[];
  deleteFilm: Function;
  addWish: Function;
}

export const Films: React.FC<IType> = React.memo(
  ({ films, wish, genre, deleteFilm, addWish }: IType): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string>('All');

    const filteredFilms = films.filter((film) => {
      const matchesSearchTerm = film.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || film.genre.includes(selectedGenre);
      return matchesSearchTerm && matchesGenre;
    });

    return (
      <div>
        <Row className="mb-4">
          <Col sm={12} md={6} lg={4}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search films..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary">
                Search
              </Button>
            </InputGroup>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <Form.Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="All">All Genres</option>
              {genre.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <div>
          {filteredFilms.length === 0 ? (
            <p>No films found matching the criteria.</p>
          ) : (
            filteredFilms.map((film) => (
              <Card key={film.id} className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{film.title}</Card.Title>
                  <Card.Text>{film.description}</Card.Text>
                  <div>
                    <Button
                      variant="outline-primary"
                      onClick={() => addWish(film)}
                      className="me-2"
                    >
                      Add to Wishlist
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteFilm(film.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }
);
