<template>
    <div id="app">
        <HeaderComp />

        <h1 class="title is-1" style="margin-top: 40px;">Compras recentes</h1>

        <div id="app-pedidos">        
            <div class="pedidos" v-if="!isBuy">
                <i class="material-icons">inventory_2</i>
                <h2 class="title is-4" id="title">Nenhuma compra recente...</h2>
                <router-link :to="{ name: 'Homepage' }">
                    <button class="button is-info is-outlined" id="btt">Ver produtos</button>
                </router-link>
            </div>

            <div class="pedidos" v-else>
                <i class="material-icons">inventory_2</i>                
                <h2 class="title is-3">Compras...</h2>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
export default {
    components: {
        HeaderComp
    },

    data(){
        return{
            isBuy: false
        }
    }
}
</script>

<style>
    @import '../../styles/controlPanelStyles/Pedidos.css';
</style>