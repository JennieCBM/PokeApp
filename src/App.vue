<template>
    <div id="q-app">
        <div class="error flex flex-center" v-if="errorDetected">
            <q-img src="/SurprisedPikachu.jpg" height="80vh" width="100vh">
                <div class="absolute-bottom text-h5 bg-transparent text-black text-bold">
                    404 Not Found
                </div>
            </q-img>
        </div>
        <router-view v-if="!errorDetected" :loading="loading"/>
    </div>
</template>

<script>
import Vue from 'vue';
import vuex from 'vuex';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'App',
    data() {
        return {
            loading: true,
            errorDetected: false
        }
    },
    async mounted() {
      this.Init();
    },
    methods: {
        async Init() {
            try {
                await this.LoadConfig();
                await this.LoadPokemons(`${this.$CONFIG.API_URL}?offset=0&limit=60'`);
                await this.CheckErrors();
            } finally {
                this.loading = false;               
            }
        },
        async LoadConfig() {
            this.loadingConfig = true;
            await this.$axios.get(`config.json?v=${new Date().toISOString()}`)
                .then(response => {
                    Vue.prototype.$CONFIG = response.data;
                });
        },
        CheckErrors() {
            this.errorDetected = this.error;
        },
        ...mapActions('PokemonStore', ['LoadPokemons']),
    },
    computed: {
        ...mapGetters('PokemonStore',['GetPokemons']),
        ...mapState('PokemonStore', ['error'])
    }
}
</script>
<style>

.error {
    width: 100vw;
    height: 100vh;
    background-color: black;
}
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
</style>
