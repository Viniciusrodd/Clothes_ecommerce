<template>
    <div id="app">
        <h1 class="title is-1">Product</h1>
        <hr class="hr">
        <div v-for="(product) in products" :key="product._id" id="div-products">
            <p>Nome: {{ product.name }}</p>
            <p>Tamanho: {{ product.size }}</p>
            <p>Preço: R$ {{ product.price }}</p>
            <p>Descrição: {{ product.description }}</p>
            <div id="divImg" ref="imgRef">
                <img class="newImg" v-if="product.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                <img class="newImg" v-if="product.image" :src="`data:image/png;base64,${product.image}`" alt="Imagem do produto" />
            </div>

            <div id="div-buttons">
                <button class="button is-link is-light">Editar</button>
                <button class="button is-danger is-light">Excluir</button>
            </div>
            <hr class="hr">
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
    @import "../../styles/ProductView.css";
</style>