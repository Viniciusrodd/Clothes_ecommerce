
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
            <div id="product" v-for="(product) in products" :key="product._id">
                <div id="divImagens" ref="imgRef">
                    <img class="newImg" v-if="product.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                    <img class="newImg" v-if="product.image" :src="`data:image/png;base64,${product.image}`" alt="Imagem do produto" />
                </div>
                <p class="title is-3">{{ product.name }}</p>
                <p class="title is-4">R$ {{ product.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            products: []
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
    }
}
</script>

<style>
    @import "../../styles/routesStyles/Homepage.css";
</style>