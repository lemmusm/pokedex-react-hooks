import React, { useReducer, useEffect } from 'react';
import Loader from './Loader';
import PokemonCard from './PokemonCard';
import Error from './Error';
import Form from './Form';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        loading: false,
        pokemon: action.payload,
        error: '',
      };
    case 'ERROR':
      return {
        loading: false,
        pokemon: {},
        error: action.error,
      };
    default:
      return state;
  }
};

const UseReducerComponent = () => {
  const initialState = {
    pokemon: [],
    loading: true,
    error: '',
  };

  const [{ pokemon, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
    // setLoading(true);
    let randomPokemonId = Math.round(Math.random() * 807);
    getPokemon(randomPokemonId)
      .then((pokemon) => {
        dispatch({ type: 'SUCCESS', payload: pokemon });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error: 'Error to get data' });
      });
  };

  const handleOnChange = (e) => {
    const value = e.target.value;

    value.length > 0
      ? getPokemon(e.target.value)
          .then((pokemon) => {
            dispatch({ type: 'SUCCESS', payload: pokemon });
          })
          .catch((error) => {
            isNaN(value)
              ? dispatch({ type: 'ERROR', error: 'Only numbers is accepted' })
              : dispatch({ type: 'ERROR', error: 'Pokemon ID not found!' });
          })
      : showRandomPokemon();
  };

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
