
<template>
    <div id="pai">
        <h1>Carrinho de compras</h1>
        <div id="div-products">
            <p>Nome: {{ products.name }}</p>
        </div>
    </div>
</template>

<script>
//import axios from 'axios';
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
        }
    },

    created(){
        
    }
}
</script>

<style>
    @import "../../styles/usersStyles/userCart.css";
</style>