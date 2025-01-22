
<template>
    <div id="app">
        <header id="headerhome">
            <div id="logo"></div>
            <h1 class="title is-1">El Lojita</h1>
            <div id="icons">
                <i class="material-icons">mail</i>
                <i class="material-icons">person</i>
                <i class="material-icons">shopping_cart</i>
            </div>
        </header>
        <hr class="hr">
        <div id="products">
            <div id="product" v-for="(product) in products" :key="product._id" 
            @mouseover="productEnter(product._id)" @mouseout="productOut" ref="product">
                <div id="divImagens" ref="imgRef">
                    <img class="newImg" v-if="product.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                    <img class="newImg" v-if="product.image" :src="`data:image/png;base64,${product.image}`" alt="Imagem do produto" />
                </div>
                <p class="title is-3">{{ product.name }}</p>
                <p class="title is-4">R$ {{ product.price }}</p>
                <router-link :to="{name: 'BuyProd', params: { id: product._id }}">
                    <button v-show="product._id == productID" id="bttcompra" class="button is-link is-inverted" :class="{ buttonClass: bttAtivo }">
                        COMPRAR
                    </button>
                </router-link>
                <router-link>
                    <button v-show="product._id == productID" id="bttcompra" class="button is-info is-inverted" :class="{ buttonClass: bttAtivo }">
                        ADICIONAR NO CARRINHO
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            products: [],
            bttAtivo: false,
            productID: 0
        }
    },

    created(){
        axios.get('http://localhost:2300/products')
        .then((res) =>{
            this.products = res.data.products;
        })
        .catch((error) =>{
            console.log('Error at axios request for find products', error)
        })
    },

    methods: {
        productEnter(id){
            this.productID = id
            this.bttAtivo = true
        },
        productOut(){
            this.bttAtivo = false
        }
    }
}
</script>

<style>
    @import "../../styles/routesStyles/Homepage.css";
</style>