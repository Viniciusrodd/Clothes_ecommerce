
<template>
    <div id="pai">
        <h1>Carrinho de compras</h1>
        <div id="div-products">
            <p>Nome: {{ products.name }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            products: {
                name: "",
                size: "",
                price: "",
                description: "",
                image: ''
            },
            productId: this.$route.params.id
        }
    },

    created(){
        axios.get(`http://localhost:2300/product/${this.productId}`)
        .then((res) =>{
            console.log('dados pegos', res.data.product)
            this.products.name = res.data.product.name;
            this.products.size = res.data.product.size;
            this.products.price = res.data.product.price;
            this.products.description = res.data.product.description;
            this.products.image = res.data.product.image;
        })
        .catch((error) =>{
            console.log('Erro at axios userCart() request for product by id', error);
        })
    }
}
</script>

<style>
    @import "../../styles/usersStyles/userCart.css";
</style>