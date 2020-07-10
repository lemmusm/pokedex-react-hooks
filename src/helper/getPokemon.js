export const getPokemon = async (poke_id) => {
  const apiUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}`);
  const res = await apiUrl.json();
  return res;
};
