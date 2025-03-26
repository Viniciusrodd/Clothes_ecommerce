<template>
    <div id="app">
        <header-comp />
        <h1 class="title is-1" style="margin-top: 40px;">Pedidos</h1>

        <div class="app-pedidos" v-if="!isProducts">        
            <div class="pedidos">
                <i class="material-icons">inventory_2</i>
                <h2 class="title is-4" id="title">Nenhum pedido feito ainda...</h2>
                <router-link :to="{ name: 'Homepage' }">
                    <button class="button is-info is-outlined" id="btt">Ver produtos</button>
                </router-link>
            </div>
        </div>

        <div class="app-pedidos" v-else>
            <div class="charges">
                <div class="infos-charges">
                    <h2 class="subtitle is-3">Valor</h2>
                    <h2 class="subtitle is-3">Frequência</h2>
                    <h2 class="subtitle is-3">Método</h2>
                    <h2 class="subtitle is-3">Data de criação</h2>
                    <h2 class="subtitle is-3">Status</h2>
                </div>
            </div>
        </div>            
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import axios from 'axios';
export default {
    components: {
        HeaderComp
    },

    data(){
        return{
            isProducts: false,
            charges: [],
            teste: ''
        }
    },
    
    
    async created(){
        try{
            const response = await axios.get('http://localhost:2300/chargeClients');
            if(response.status === 200){
                this.isProducts = true;

                response.data.data.forEach(element => {
                    element.products.forEach(charges => {
                        this.charges.push(charges)
                        console.log(this.charges)
                        //console.log(element.products)
                    });
                });
            }
        }
        catch(error){
            console.error('Error at request charges of client at frontend', error);
        }
    }
}
</script>

<style>
    @import '../../styles/controlPanelStyles/Pedidos.css';
</style>