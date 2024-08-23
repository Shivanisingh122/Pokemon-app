
import './App.css';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const results = data.results;
        const pokemonData = await Promise.all(
          results.map(async (result) => {
            const pokemonResponse = await fetch(result.url);
            return pokemonResponse.json();
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1 className="my-4">Pokemon App</h1>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Row>
        {filteredPokemon.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={p.sprites.front_default}
                alt={p.name}
              />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>
                  Type: {p.types.map((type) => type.type.name).join(', ')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;