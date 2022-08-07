<template>
  <q-page class="background">
      <q-infinite-scroll @load="onLoad" >
          <div class="q-pa-xl full-width grid">
            <pokemon-card 
                v-for="Pokemon in PokemonList" 
                :key="Pokemon.id" 
                :pokemon="Pokemon"
                @on-pokemon-click="onSelected"/> 

          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>   
        </q-infinite-scroll>
      
    <pokemon-modal ref="pokemon_modal"/>
    <q-inner-loading :showing="loading">
        <q-spinner-dots color="primary" size="3em">
        </q-spinner-dots>
    </q-inner-loading>
  </q-page>
</template>

<script>
import PokemonCard from '../components/PokemonCard.vue';
import PokemonModal from '../components/PokemonModal.vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageIndex',
  data() {
    return {
      PokemonList: null
    }
  },
  props: {
    loading: Boolean
  },
  mounted() {    
    this.Init();
  },
  created() {
    this.PokemonList = this.GetPokemons
  },
  methods: {
    Init() {      
    },
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
    async onLoad(index, done) {
      console.log("onload", this.NextUrl)
      await this.LoadPokemons(this.NextUrl);
      done()


    },
    ...mapActions('PokemonStore',['LoadPokemons'])

  },
  computed: {
    ...mapState('PokemonStore',['Pokemons', 'NextUrl']),
    ...mapGetters('PokemonStore',['GetPokemons','GetPokemon']),

  },
  watch: {
    Pokemons(updatedData){
      this.PokemonList = updatedData
    }
  },
  components: {
    PokemonCard,
    PokemonModal
  }

}
</script>
<style>
  .background {
    background: url('/pexels-vincent-ma-janssen-1310847.jpg') no-repeat center center fixed; 
    background-size: cover;
    overflow: hidden;
  }
  .my-card {
    width: 100%;
    padding: 5px;
    background-color: rgba(56, 61, 70, 0.678);
  }
  .my-card:hover {
    background-color: rgba(56, 61, 70, 0.856);
    box-shadow: 2px 5px 21px 5px rgba(0,0,0,0.64);
    transform: translate(0px, -5px);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    grid-row-gap: 2em;
    grid-column-gap: 2em;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    list-style: none;
  }
  .test {
    cursor: pointer
  }

</style>
