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
        <h1>Comprar o produto</h1>
        <p>produto id {{ productIdParams }}</p>

        <div id="divImagens" ref="imgRef">
            <img class="newImg" v-if="product.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
            <img class="newImg" v-if="product.image" :src="`data:image/png;base64,${product.image}`" alt="Imagem do produto" />
        </div>
        <p class="title is-3">{{ product.name }}</p>
        <p class="title is-4">R$ {{ product.price }}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            product: {
                name: "",
                size: "",
                price: "",
                description: "",
                image: ''
            },
            file: null,
            productIdParams: this.$route.params.id
        }
    },

    created(){
        axios.get(`http://localhost:2300/product/${this.productIdParams}`)
        .then((res) =>{
            console.log(res.data)
            this.product.name = res.data.name;
            this.product.size = res.data.size;
            this.product.price = res.data.price;
            this.product.description = res.data.description;
            this.product.image = res.data.image;
        })
        .catch((error) =>{
            console.log('Erro at axios request for product by id', error);
        })
    }
}
</script>

<style>

</style>