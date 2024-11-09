import React, { useState } from 'react';
import { IGenre, IFilm } from '../type/type';
import { Button, Form, Row, Col, Card } from 'react-bootstrap'; // Importing react-bootstrap components

interface IType {
  imgs: string[];
  genre: IGenre[];
  createFilm: Function;
}

export const AddFilm: React.FC<IType> = React.memo(({ imgs, genre, createFilm }) => {
  const [title, setTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(genre[0]?.name || '');
  const [selectedPhoto, setSelectedPhoto] = useState(imgs[0] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createFilm({
      id: Math.random(),
      title: title,
      description: '',
      date: new Date().getFullYear(),
      genre: [selectedGenre],
      image: selectedPhoto,
      time: 0,
    });
    setTitle('');
    setSelectedGenre(genre[0]?.name || '');
    setSelectedPhoto(imgs[0] || '');
  };

  return (
    <Card className="border-0 shadow-sm p-4">
      <Card.Body>
        <h4 className="mb-4">Add Film</h4>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="filmTitle">
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="filmGenre">
                <Form.Control
                  as="select"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {genre.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="filmImg">
                <Form.Control
                  as="select"
                  value={selectedPhoto}
                  onChange={(e) => setSelectedPhoto(e.target.value)}
                >
                  {imgs.map((photo, index) => (
                    <option key={index} value={photo}>
                      {photo}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary">
            Add Film
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
});
