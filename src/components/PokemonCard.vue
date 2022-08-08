<template>
    <q-card  
      class="my-card "
      bordered
      >
      <div class="q-pa-xs absolute" style="z-index:1">
        <q-btn round dense flat size="md" :color="colorFavoriteIcon" icon="favorite" @click="checkFavorite"/>
            <q-tooltip>
                {{colorFavoriteIcon == 'dark'? 'Agregar a Favoritos' : 'Eliminar de Favoritos'}}
            </q-tooltip>
        </div>
        <q-img :src="pokemon.image" @click="onClick" class="pointer">
          <div class="absolute-bottom text-h6">
            {{ pokemon.name}}
          </div>
        </q-img>
      <q-card-section class="text-white">
        <q-list>
          <q-item class="q-pa-xs flex" style="min-height:1em">
            <q-item-section class="text-bold">
              Tipos: 
            </q-item-section>
              <q-icon 
                v-for="(type,index) in pokemon.types" 
                :key="index" :name='`img:/icons/types/${type}.png`'
                size="md">
                <q-tooltip>{{type}}</q-tooltip>
              </q-icon>
          </q-item>
          <q-item class="q-pa-xs flex" style="min-height:1em">
            <q-item-section class="text-bold">
              Peso:  
            </q-item-section>
              {{pokemon.weight}}
          </q-item>          
        </q-list>        
        <span ></span>
      </q-card-section>
    </q-card>
</template>
<script>
export default {
    name: 'PokemonCard',
    props: {
        pokemon: {
            type: Object,
            default: _=> {}
        }
    },
    data() {
        return {
            colorFavoriteIcon: 'dark'
        }
    },
    mounted(){
        let favorites = localStorage.getItem('favorites');
        if(favorites){
            let favoritesParsed = JSON.parse(favorites);
            favoritesParsed.forEach(favorite=>{
                if(favorite.id == this.pokemon.id) {
                    this.colorFavoriteIcon = 'white'
                };
            })
        }
    },
    methods: {
        onClick() {
            this.$emit('on-pokemon-click',this.pokemon)
        },
        checkFavorite() {
            if(this.colorFavoriteIcon == 'white'){
                this.deleteToFavorites();
            }else{
                this.addToFavorites();
            }
            this.$emit('change-localstorage')
        },
        addToFavorites() {
            let favorites = localStorage.getItem('favorites');
            if(favorites){
                let newFavorites = JSON.parse(favorites);
                newFavorites.push(this.pokemon);
                localStorage.setItem('favorites',[JSON.stringify(newFavorites)]);

            }else{
                let newFavorite = []
                newFavorite.push(this.pokemon)
                localStorage.setItem('favorites', JSON.stringify(newFavorite))
            }
            this.colorFavoriteIcon = 'white'
        },
        deleteToFavorites() {
            let favorites = localStorage.getItem('favorites');
            let newFavorites = JSON.parse(favorites);
            newFavorites = newFavorites.filter(favorite => favorite.id != this.pokemon.id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
            this.colorFavoriteIcon = 'dark';
        }
    }
}
</script>
<style>
.pointer {
  cursor: pointer
}
</style>