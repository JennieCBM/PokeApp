<template>
    <q-card  
      class="my-card "
      bordered
      >
        <q-img :src="pokemon.image" @click="onClick(pokemon)" class="test">
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
    methods: {
        onClick(pokemon){
            this.$emit('on-pokemon-click',pokemon)
        }
    }
}
</script>