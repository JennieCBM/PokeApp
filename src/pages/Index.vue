<template>
  <q-page class="background">
    <div class="fixed q-pa-xs">
      <q-btn round flat size="lg" color="white" icon="favorite" @click="$router.push('/favorites')"/>
        <q-tooltip>
          Ver Favoritos
        </q-tooltip>
    </div>
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
      if(this.NextUrl && window.pageYOffset > 2000){
        await this.LoadPokemons(this.NextUrl);
      }
      done();
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

</style>
