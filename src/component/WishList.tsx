import React from 'react';
import { IFilm } from '../type/type';
import { Button, Table, Image, Card } from 'react-bootstrap'; // Importing react-bootstrap components

interface IType {
  wish: IFilm[];
  deleteWish: Function;
}

export const WishList: React.FC<IType> = React.memo(
  ({ wish, deleteWish }: IType): JSX.Element => {
    return (
      <Card className="border-0 shadow-sm p-4">
        <Card.Body>
          <h4 className="mb-4">Wish List</h4>

          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Genres</th>
                <th>Image</th>
                <th>Time</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {wish.map((elm) => (
                <tr key={elm.id}>
                  <td>{elm.title}</td>
                  <td>{elm.description}</td>
                  <td>{elm.year}</td>
                  <td>{elm.genre.join(', ')}</td>
                  <td>
                    <Image src={elm.photo} width={100} alt={elm.title} rounded />
                  </td>
                  <td>{elm.time}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteWish(elm.id)}
                    >
                      &times;
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
);
