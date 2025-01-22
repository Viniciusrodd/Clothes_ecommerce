<template>
    <div id="app">
        <header id="headerhome">
            <router-link :to="{name: 'Homepage'}">
                <div id="logo"></div>
            </router-link>
            <h1 class="title is-1">El Lojita</h1>
            <div id="icons">
                <i class="material-icons">mail</i>
                <i class="material-icons">person</i>
                <i class="material-icons">shopping_cart</i>
            </div>
        </header>

        <hr class="hr">     
        
        <div id="checkout-container">
            <div id="product-container">
                <div id="divImagens" ref="imgRef">
                    <img class="newImg" v-if="product.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                    <img class="newImg" v-if="product.image" :src="`data:image/png;base64,${product.image}`" alt="Imagem do produto" />
                </div>
            </div>
            <div id="infos-container">
                <p class="title is-2">{{ product.name }}</p>
                <p class="title is-3">R$ {{ product.price }}</p>
        
                <div class="select is-info">
                    <select name="size" id="isize">
                        <option value="" selected>Selecione o tamanho</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                    </select>
                </div>

                <div id="quantity-container">
                    <input type="number" name="quantity" id="iquantity" class="input is-info" value="1" min="1" max="9" autocomplete="off">
                    <button id="comprar-btt-perso" class="button is-info is-inverted is-outlined">COMPRAR</button>                    
                </div>

                <hr class="hr">
                <h1 class="title is-3">Descrição:</h1>
                <p>{{ product.description }}</p>
            </div>
        </div>

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
    @import '../../styles/routesStyles/BuyProd.css';
</style>