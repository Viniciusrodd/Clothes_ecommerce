<template>
    <div id="app-myAccount">
        <HeaderComp />

        <h1 class="title is-1" style="margin-top: 40px;">Compras recentes</h1>

        <div class="app-pedidos" v-if="orders.length === 0">
            <div class="pedidos">
                <i class="material-icons">inventory_2</i>
                <h2 class="title is-4" id="title">Nenhuma compra feita ainda...</h2>
                <router-link :to="{ name: 'Homepage' }">
                <button class="button is-info is-outlined" id="btt">Ver produtos</button>
                </router-link>
            </div>
        </div>


        <div class="app-pedidos" v-else>
            <div class="pedido" v-for="(order, index) in orders" :key="order._id">
                <h2 class="title is-4"><ins>Pedido</ins>: {{ ordersids[index] }}</h2>
                
                <div class="pedido-detalhes">
                    <div class="datas-container">
                        <div class="datas-description">
                            <h1 class="title is-5">Método</h1>
                        </div>
                        <div class="datas-boxes">
                            <h1 class="title is-5">{{ order.paymentMethod }}</h1>
                        </div>
                    </div>

                    <div class="datas-container">
                        <div class="datas-description">
                            <h1 class="title is-5">Data de criação</h1>
                        </div>
                        <div class="datas-boxes">
                            <h1 class="title is-5">
                                {{ order.orderCreatedAt.split('T')[0] }}
                            </h1>
                            <h1 class="title is-5">
                                {{ order.orderCreatedAt.split('T')[1].split(':')[0] }}:{{ order.orderCreatedAt.split('T')[1].split(':')[1] }}
                            </h1>
                        </div>
                    </div>
                    
                    <div class="datas-container">
                        <div class="datas-description">
                            <h1 class="title is-5">Status</h1>
                        </div>
                        <div class="datas-boxes">
                            <h1 class="title is-5">{{ order.status }}</h1>
                        </div>
                    </div>
                </div>


                <!-- Renderizando os produtos-->
                <div v-for="product in order.products" :key="product._id">
                    <div class="pedido-detalhes">
                        <div class="datas-container">
                            <div class="datas-description">
                                <h1 class="title is-5">Produto</h1>
                            </div>
                            <div class="datas-boxes">
                                <h1 class="title is-5">{{ product.name }}</h1>
                            </div>
                        </div>
    
                        <div class="datas-container">
                            <div class="datas-description">
                                <h1 class="title is-5">Preço</h1>
                            </div>
                            <div class="datas-boxes">
                                <h1 class="title is-5">
                                    {{ parseFloat(product.price).toFixed(2) }}                                
                                </h1>
                            </div>
                        </div>
                        
                        <div class="datas-container">
                            <div class="datas-description">
                                <h1 class="title is-5">Quantidade</h1>
                            </div>
                            <div class="datas-boxes">
                                <h1 class="title is-5">{{ product.quantity }}</h1>
                            </div>
                        </div>

                        <div class="datas-container">
                            <div class="datas-description">
                                <h1 class="title is-5">Preço total</h1>
                            </div>
                            <div class="datas-boxes">
                                <h1 class="title is-5">{{ parseFloat(product.quantity * product.price).toFixed(2) }}</h1>
                            </div>
                        </div>
                    </div>
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
            orders: [],
            ordersids: [],
            teste: [],
            userId: this.$route.params.id,
        }
    },


    async created() {
        try {
            const response = await axios.get(`http://localhost:2300/findOrders/${this.userId}`);
            if (response.status === 200) {
                this.orders = response.data.orders.filter(order => 
                    order.status === 'Pago' || order.status === 'Enviado' || order.status === 'Entregue' 
                );
                console.log('Pedidos filtrados:', this.orders);
                for(let i = 0; i < this.orders.length; i++){
                    this.ordersids.push(i + 1)
                }
            }
        }catch(error){
            console.error('Error ao buscar os pedidos:', error);
        }
    }
}
</script>

<style>
    @import '../../styles/controlPanelStyles/Pedidos.css';

    #app-recentBuys{
        min-height: 41vh;
    }
</style>