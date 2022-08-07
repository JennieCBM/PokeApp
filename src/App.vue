<template>
    <div id="q-app">
        <div class="error flex flex-center" v-if="errorDetected">
            <q-img src="/SurprisedPikachu.jpg" height="80vh" width="100vh">
                <div class="absolute-bottom text-h5 bg-transparent text-black text-bold">
                    404 Not Found
                </div>
            </q-img>
        </div>
        <q-inner-loading :showing="true">
            <q-spinner-dots color="primary" size="3em">
            </q-spinner-dots>
        </q-inner-loading>
        <router-view v-if="!loading && !errorDetected" :loading="loading"/>

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
            await this.LoadConfig();
            await this.LoadPokemons(`${this.$CONFIG.API_URL}?offset=0&limit=60'`);
            await this.CheckErrors();
        },
        async LoadConfig() {
            this.loadingConfig = true;
            await this.$axios.get(`config.json?v=${new Date().toISOString()}`)
                .then(response => {
                    Vue.prototype.$CONFIG = response.data;
                });
            this.loading = false;
        },
        CheckErrors() {
            console.log(this.error)
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
</style>
