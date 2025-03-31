<template>
    <div id="app-myAccount">
        <header-comp />

        <h1 class="title is-1" id="pedidos-title">Pedidos</h1>

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
                <div class="datas-container">
                    <div class="datas-description">
                        <h1 class="title is-5">Produto</h1>
                    </div>
                    <div class="datas-boxes" v-for="(product) in products" :key="product.productId">
                        <h1 class="title is-5">{{ product.name }}</h1>
                    </div>
                </div>

                <div class="datas-container">
                    <div class="datas-description">
                        <h1 class="title is-5">Preço</h1>
                    </div>
                    <div class="datas-boxes" v-for="(product) in products" :key="product.productId">
                        <h1 class="title is-5">{{ parseFloat(product.price).toFixed(2) }}</h1>
                    </div>
                </div>

                <div class="datas-container">
                    <div class="datas-description">
                        <h1 class="title is-5">Quantidade</h1>
                    </div>
                    <div class="datas-boxes" v-for="(product) in products" :key="product.productId">
                        <h1 class="title is-5">{{ product.quantity }}</h1>
                    </div>
                </div>
            </div>

            <h1 class="title is-1" id="pedidos-title">DETALHES DE PAGAMENTO</h1>

            <div class="charges">
                <div class="datas-container">
                    <div class="datas-description">
                        <h1 class="title is-5">Método</h1>
                    </div>
                    <div class="datas-boxes" v-for="(order) in orders" :key="order.id">
                        <h1 class="title is-5">{{ order.paymentMethod  }}</h1>
                    </div>
                </div>

                <div class="datas-container">
                    <div class="datas-description">
                        <h1 class="title is-5">Data de criação</h1>
                    </div>
                    <div class="datas-boxes" v-for="(order) in orders" :key="order.id">
                        <h1 class="title is-6" id="title">
                            {{ order.orderCreatedAt.split('T')[0] }}
                        </h1>
                        <h1 class="title is-6" id="title">
                            {{ order.orderCreatedAt.split('T')[1].split(':')[0] }}:{{ order.orderCreatedAt.split('T')[1].split(':')[1] }}
                        </h1>
                    </div>
                </div>

                <div class="datas-container">
                    <div class="datas-description">
                        <h1 class="title is-5">Status</h1>
                    </div>
                    <div class="datas-boxes" v-for="(order) in orders" :key="order.id">
                        <h1 class="title is-5">{{ order.status }}</h1>
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
            isProducts: false,
            products: [],
            orders: [],
            teste: '',
            userId: this.$route.params.id
        }
    },
    
    
    async created(){
        try{
            const response = await axios.get(`http://localhost:2300/findOrders/${this.userId}`);
            if(response.status === 200){
                this.isProducts = true;

                response.data.orders.forEach((elements) => {
                    elements.products.forEach((product) => {
                        this.products.push(product);
                    })
                    console.log('elementos: ', elements)
                    this.orders.push(elements)
                })
            }

            if(response.status === 404){
                this.isProducts = false;
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