import React from 'react';
import Loader from './Loader';
import PokemonCard from './PokemonCard';
import Error from './Error';
import Form from './Form';
import useCustomHookReducer from '../hooks/useCustomHookReducer';

const UseReducerComponent = () => {
  const [
    pokemon,
    loading,
    error,
    showRandomPokemon,
    handleOnChange,
  ] = useCustomHookReducer();
  return (
    <>
      <h1>useReducer</h1>
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

export default UseReducerComponent;
