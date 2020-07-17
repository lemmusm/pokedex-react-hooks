import { useReducer, useEffect } from 'react';
import { getPokemon } from '../helper/getPokemon';

const useCustomHookReducer = () => {
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

    !!value
      ? getPokemon(value)
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

  return [pokemon, loading, error, showRandomPokemon, handleOnChange];
};

export default useCustomHookReducer;
