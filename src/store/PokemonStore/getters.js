export function GetPokemons (state) {
    return state.Pokemons;
}
export const GetPokemon = (state) => (id) => {
    return state.Pokemons.find(Pokemon => Pokemon.id == id);
}
export function GetNextUrl(state) {
    return state.NetxUrl;
}