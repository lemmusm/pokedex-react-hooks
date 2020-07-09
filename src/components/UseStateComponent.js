import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import PokemonCard from './PokemonCard';
import Error from './Error';
import Form from './Form';

const UseStateComponent = () => {
  const dataPokemon = {
    id: 0,
    name: '',
    sprites: '',
    types: [],
    abilities: [],
    stats: [],
  };
  const [pokemon, setPokemon] = useState(dataPokemon);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    showRandomPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemon = async (pokeId) => {
    const apiUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    const res = await apiUrl.json();
    return res;
  };

  const showRandomPokemon = () => {
    setLoading(true);
    let randomPokemonId = Math.round(Math.random() * 807);
    getPokemon(randomPokemonId)
      .then((pokemon) => {
        setLoading(false);
        setPokemon(pokemon);
        setError('');
      })
      .catch((error) => {
        setLoading(false);
        setError('Error to get data');
      });
  };

  const handleOnChange = (e) => {
    const value = e.target.value;

    // isNaN(value) ? '<Error error={error} />' : showRandomPokemon();

    value.length > 0
      ? getPokemon(e.target.value)
          .then((pokemon) => {
            setLoading(false);
            setPokemon(pokemon);
            setError('');
          })
          .catch((error) => {
            isNaN(value)
              ? setError('Only numbers is accepted')
              : setError('Pokemon ID not found!');
            setPokemon(dataPokemon);
            setLoading(false);
          })
      : showRandomPokemon();
  };

  return (
    <>
      <h1>POKEDEX</h1>
      <button className="btn" onClick={showRandomPokemon}>
        SHOW RANDOM POKEMON
      </button>
      <h4 className="or"> OR </h4>
      <Form handleOnChange={handleOnChange} />
      {loading ? (
        <Loader />
      ) : !!error ? (
        <Error error={error} />
      ) : (
        <PokemonCard pokemon={pokemon} />
      )}
    </>
  );
};

export default UseStateComponent;
