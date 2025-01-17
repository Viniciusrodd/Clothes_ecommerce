<template>
    <div id="app">
        <h1>Product</h1>
        <hr>
        <div v-for="(product) in products" :key="product._id" id="div-products">
            <h2 id="product-name">{{ product.name }}</h2>
            <p>Tamanho: {{ product.size }}</p>
            <p>Preço: R$ {{ product.price }}</p>
            <p>Descrição: {{ product.description }}</p>
            <div id="divImg" ref="imgRef">
                <img class="newImg" v-if="product.image" :src="'data:image/png;base64,' + product.image" alt="Imagem do produto" />
            </div>
            <hr>
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
                console.log('Error at request products in axios', error);
            });
    }
}
</script>

<style>
    @import "../../styles/TesteView.css";
</style>