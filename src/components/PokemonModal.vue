<template>
    <q-dialog v-model="openModal" transition-show="flip-left">
        <q-card class="bg-blue-grey-10 text-white" v-if="pokemon" bordered style="width: 80vw">
            <q-bar class="">
                <q-icon 
                    v-for="(type,index) in pokemon.types" 
                    :key="index" :name='`img:/icons/types/${type}.png`'
                    size="md">
                    <q-tooltip>{{type}}</q-tooltip>
                </q-icon>
                <div class="text-overline">
                    {{ pokemon.name }}
                </div>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
            </q-btn>
            </q-bar>
            <q-card-section class="">
                <div class="flex flex-center">
                    <q-img :src="pokemon.image"  width="50%">
                    </q-img>
                </div>
            <div class="">
                <q-scroll-area
                    visible
                    style="height: 15em; "
                    >
                    <div class="text-subtitle1" v-if="pokemon.description">
                        <div class="text-subtitle1">
                            Descripcion: 
                        </div>
                        <div class="text-body-1 q-mr-xs q-ml-xs">
                            {{pokemon.description}}
                        </div>

                    </div>
                    <div class="text-subtitle1">
                        Movimientos: 
                    </div>
                    <div class="text-justify q-mr-sm">
                        <q-badge class="q-mr-xs q-ml-xs" color="dark" v-for="(move, index) in pokemon.moves" :key="index">{{move}}</q-badge>

                    </div>
                </q-scroll-area>               
            </div>
            </q-card-section>      
        </q-card>
    </q-dialog>
</template>
<script>
export default {
    name: 'PokemonModal',
    data() {
        return {
            bar2: null,
            openModal: false,
            pokemon: null
        }
    },
    methods: {
        Show(pokemon) {
            if(pokemon){
                this.pokemon = pokemon;
                this.openModal = true;
                this.loading = true;
                console.log(pokemon);

            }
        },
        Hide(){
            this.openModal = false;
        },
        GetPokemonData(url){

        }
    }
}
</script>