
<template>
    <div id="appHome">
        <HeaderComp/>

        <div id="products">
            <div id="product" v-for="(product) in products" :key="product._id" 
            @mouseover="productEnter(product._id)" @mouseout="productOut" ref="product">
                <div id="divImagens" ref="imgRef">
                    <img class="newImg" v-if="product.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                    <img class="newImg" v-if="product.image" :src="`data:image/png;base64,${product.image}`" alt="Imagem do produto" />
                </div>
                <p class="title is-3">{{ product.name }}</p>
                <p class="title is-4">R$ {{ parseFloat(product.price).toFixed(2) }}</p>

                <div>
                    <button @click="cartAdd(product._id, userID)" v-show="product._id == productID" id="bttcompra" class="button is-info is-dark" :class="{ buttonClass: bttAtivo }">
                        ADICIONAR NO CARRINHO
                    </button>
                </div>
                
                <router-link :to="{name: 'BuyProd', params: { id: product._id }}">
                    <button v-show="product._id == productID" id="bttcompra" class="button is-info is-dark" :class="{ buttonClass: bttAtivo }">
                        COMPRAR
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComp from '@/components/HeaderComp.vue';
export default {
    components: {
        HeaderComp
    },

    data(){
        return {
            products: [],
            bttAtivo: false,
            productID: 0,
            userID: 0
        }
    },

    async created(){
        try{
            //search products:
            const productsRequest = await axios.get('http://localhost:2300/products')        
            this.products = productsRequest.data.products;
            
            //login verify:
            const authRequest = await axios.get('http://localhost:2300/authCheck', { withCredentials: true })
            this.userID = authRequest.data.user.id
            //console.log('User id: ', authRequest.data.user)
        }
        catch(error){
            console.error('Erro created() homePage:', error);
        }
    },

    methods: {
        productEnter(id){
            this.productID = id
            this.bttAtivo = true
        },
        productOut(){
            this.bttAtivo = false
        },

        async cartAdd(productId, userId){
            try{
                await axios.post('http://localhost:2300/cart', { userId, productId });
                this.$router.push({ name: 'userCart' });
            }
            catch(error){
                console.error('Erro:', error.response?.data || error.message);            
            }
        }
    }
}
</script>

<style>
    @import "../../styles/routesStyles/Homepage.css";
</style>