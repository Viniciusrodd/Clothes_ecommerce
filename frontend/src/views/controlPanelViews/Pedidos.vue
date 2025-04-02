<template>
    <div id="app-myAccount">
        <header-comp />

        <h1 class="title is-1" id="pedidos-title">Pedidos</h1>


        <!-- Se não houver pedidos -->
        <div class="app-pedidos" v-if="orders.length === 0">
            <div class="pedidos">
                <i class="material-icons">inventory_2</i>
                <h2 class="title is-4" id="title">Nenhum pedido feito ainda...</h2>
                <router-link :to="{ name: 'Homepage' }">
                <button class="button is-info is-outlined" id="btt">Ver produtos</button>
                </router-link>
            </div>
        </div>


        <!-- Para cada pedido -->
        <div class="app-pedidos" v-else>
            <div class="pedido" v-for="(order, index) in orders" :key="order._id">
                <h2 class="title is-4">Pedido: {{ ordersids[index] }}</h2>
                
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
                <div class="pedido-produtos">
                    <div id="pedido-container">
                        <div class="datas-container" v-for="product in order.products" :key="product._id">
                            <div class="datas-description">
                                <h1 class="title is-5">Produto</h1>
                            </div>
                            <div class="datas-boxes">
                                <h1 class="title is-5">{{ product.name }}</h1>
                            </div>

                            <div class="datas-description">
                                <h1 class="title is-5">Preço</h1>
                            </div>
                            <div class="datas-boxes">
                                <h1 class="title is-5">{{ parseFloat(product.price).toFixed(2) }}</h1>
                            </div>

                            <div class="datas-description">
                                <h1 class="title is-5">Quantidade</h1>
                            </div>
                            <div class="datas-boxes">
                                <h1 class="title is-5">{{ product.quantity }}</h1>
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

    data() {
        return {
            orders: [],
            ordersids: [],
            userId: this.$route.params.id,
        }
    },
  
  
    async created() {
        try {
            const response = await axios.get(`http://localhost:2300/findOrders/${this.userId}`);
            if (response.status === 200) {
                this.orders = response.data.orders;
                for(let i = 0; i < this.orders.length; i++){
                    this.ordersids.push(i + 1)
                }
                console.log('orders',this.orders)
                console.log('orders id',this.ordersids)
            }
        } catch (error) {
            console.error('Error ao buscar os pedidos:', error);
        }
    }
}
</script>

<style>
    @import '../../styles/controlPanelStyles/Pedidos.css';
</style>