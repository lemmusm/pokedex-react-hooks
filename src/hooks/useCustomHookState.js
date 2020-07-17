import { useState } from 'react';
import { getPokemon } from '../helper/getPokemon';

export const useRandomPokemon = (
  initialState = {
    id: 0,
    name: '',
    sprites: '',
    types: [],
    abilities: [],
    stats: [],
  }
) => {
  const [pokemon, setPokemon] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const showRandomPokemon = () => {
    setLoading(true);
    let randomPokemonId = Math.round(Math.random() * 807);
    getPokemon(randomPokemonId)
      .then((res) => {
        setLoading(false);
        setPokemon(res);
        setError('');
      })
      .catch((e) => {
        setLoading(false);
        setError('Error to get data');
      });
  };

  const handleOnChange = (e) => {
    const value = e.target.value;

    !!value &&
      getPokemon(e.target.value)
        .then((data) => {
          setLoading(false);
          setPokemon(data);
          setError('');
        })
        .catch((e) => {
          isNaN(value)
            ? setError('Only numbers is accepted')
            : setError('Pokemon ID not found!');
          setPokemon(initialState);
          setLoading(false);
        });
  };

  return [pokemon, loading, error, showRandomPokemon, handleOnChange];
};
