import React, { useState } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap'; // Importing react-bootstrap components

interface IAddGenreProps {
  createGenre: Function;
  existingGenres: string[];
}

export const AddGenre: React.FC<IAddGenreProps> = React.memo(({ createGenre, existingGenres }) => {
  const [newGenre, setNewGenre] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddGenre = () => {
    const trimmedGenre = newGenre.trim();

    if (trimmedGenre && !existingGenres.includes(trimmedGenre)) {
      const newGenreData = { id: Date.now(), name: trimmedGenre };
      createGenre(newGenreData);
      setNewGenre('');
      setError(''); // Clear error on successful addition
    } else {
      setError('This genre already exists or is empty!');
    }
  };

  return (
    <Card className="border-0 shadow-sm p-4">
      <Card.Body>
        <h4 className="mb-4">Add Genre</h4>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3" controlId="newGenre">
            <Form.Control
              type="text"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              placeholder="Enter new genre"
            />
          </Form.Group>
          
          <Button variant="primary" onClick={handleAddGenre}>
            Add Genre
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
});
