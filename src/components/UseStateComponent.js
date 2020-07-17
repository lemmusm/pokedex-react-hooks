import React, { useEffect } from 'react';
import { useRandomPokemon } from '../hooks/useCustomHookState';
import Loader from './Loader';
import PokemonCard from './PokemonCard';
import Error from './Error';
import Form from './Form';

const UseStateComponent = () => {
  const [
    pokemon,
    loading,
    error,
    showRandomPokemon,
    handleOnChange,
  ] = useRandomPokemon();

  useEffect(() => {
    showRandomPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>useState</h1>
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
