<template>
    <div id="app">
        <header-comp />
        <h1 class="title is-1" style="margin-top: 40px;">Pedidos</h1>

        <div id="app-pedidos">        
            <div class="pedidos" v-if="!isProducts">
                <i class="material-icons">inventory_2</i>
                <h2 class="title is-4" id="title">Nenhum pedido feito ainda...</h2>
                <router-link :to="{ name: 'Homepage' }">
                    <button class="button is-info is-outlined" id="btt">Ver produtos</button>
                </router-link>
            </div>

            <div class="pedidos" v-else>
                <i class="material-icons">inventory_2</i>                
                <h2 class="title is-3">Pedidos...</h2>
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
            isProducts: false
        }
    }

}
</script>

<style>
    @import '../../styles/controlPanelStyles/Pedidos.css';
</style>