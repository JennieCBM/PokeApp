<template>
    <q-page class="background">
        <div class="fixed q-pa-xs">
            <q-btn round flat size="lg" color="white" icon="home" @click="$router.push('/home')"/>
            <q-tooltip>
            Volver
            </q-tooltip>
        </div>
        <div class="text-h4 text-white ">
            <div class="q-pa-md q-pl-xl title text-center">Mis Favoritos

            </div>
        </div>
        <div class="q-pa-xl full-width grid">
            <pokemon-card 
                v-for="Pokemon in PokemonList" 
                :key="Pokemon.id" 
                :pokemon="Pokemon"
                @on-pokemon-click="onSelected"
                @change-localstorage="onLocalStorageChanged"/> 

          </div>
          <pokemon-modal ref="pokemon_modal"/>
    </q-page>
</template>
<script>
import PokemonCard from '../components/PokemonCard.vue';
import PokemonModal from '../components/PokemonModal.vue';

export default {
    name: 'Favoritos',
    data () {
        return {
            PokemonList: []
        }
    },
    mounted() {
        this.setPokemonList()
    },
    methods: {
        async onSelected(pokemon) {
            if(pokemon && pokemon.urlDescription){
                const responseDescription = await this.$axios.get(pokemon.urlDescription);
                if(responseDescription.data){
                const description = responseDescription.data.flavor_text_entries.find(item=>item.language.name == "es").flavor_text || ""
                const pokemonObj = 
                {...pokemon,
                    description: description
                }
                this.$refs.pokemon_modal.Show(pokemonObj);
                }
            }
        },
        setPokemonList() {
            let favoriteLS = localStorage.getItem('favorites');
            if(favoriteLS){
                this.PokemonList = JSON.parse(favoriteLS);
            }
        },
        onLocalStorageChanged() {
            this.setPokemonList();
        }
    },
    components: {
        PokemonCard,
        PokemonModal
    }
}
</script>
<style>
    .title {
        background-color: rgba(56, 61, 70, 0.767);
        max-width: 10em;
        border-radius: 5px;
        box-shadow: 0px 2px 15px 3px rgba(0,0,0,0.73);
    }
</style>