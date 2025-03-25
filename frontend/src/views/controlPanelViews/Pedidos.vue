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

            <div class="charges" v-else>
                <i class="material-icons">inventory_2</i>                
                <h2 class="title is-3">Pedidos...</h2>
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
            charges: []
        }
    },
    
    
    async created(){
        try{
            const response = await axios.get('http://localhost:2300/chargeClients');
            if(response.status === 200){
                this.isProducts = true;

                response.data.data.forEach(element => {
                    element.products.forEach(charges => {
                        this.charges = charges
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