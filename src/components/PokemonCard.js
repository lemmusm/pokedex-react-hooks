import React from 'react';

const PokemonCard = ({ pokemon }) => {
  const { id, name, sprites, types, abilities, stats } = pokemon;

  // Get type
  let category = '';
  let filterCategory = types.filter((type) => type.slot === 1);
  filterCategory.map((cat) => (category = cat));

  // get abilities
  let ability = '';
  let filterAbility = abilities.filter((ability) => ability.slot === 1);
  filterAbility.map((a) => (ability = a));

  let abilityHidden = '';
  let filterAbilityHidden = abilities.filter((ability) => ability.slot === 2);
  filterAbilityHidden.map((ah) => (abilityHidden = ah));

  return (
    <div id="cards">
      <figure
        className={
          !!ability ? `card card--${category.type?.name}` : 'card card--normal'
        }
      >
        <div className="card__image-container">
          <img
            src={sprites.front_default}
            alt="Eevee"
            className="card__image"
          />
        </div>
        <figcaption className="card__caption">
          <h1 className="card__name">{name}</h1>

          <h3 className="card__type">
            {types.map((category) => {
              return (
                <span className="span__type" key={category.slot}>
                  {category.type?.name}
                </span>
              );
            })}
          </h3>

          <table className="card__stats">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{id}</td>
              </tr>
              {stats.map(({ base_stat, stat }, index) => {
                return (
                  <tr key={index}>
                    <th>{stat.name}</th>
                    <td>{base_stat}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="card__abilities">
            <div className="card__ability">
              <h4 className="card__label">Ability</h4>
              <span>{ability.ability?.name}</span>
            </div>
            <div className="card__ability">
              <h4 className="card__label">Hidden Ability</h4>
              {!!abilityHidden.ability?.name ? (
                <span>{abilityHidden.ability?.name}</span>
              ) : (
                'None'
              )}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default PokemonCard;
