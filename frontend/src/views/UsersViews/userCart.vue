
<template>
    <div id="pai">
        <h1>Carrinho de compras</h1>
        <div id="div-products">
            <div id="product" v-for="(product) in products" :key="product._id">
                <p>{{ product._id }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            userID: '',
            products: [],
        }
    },

    async created(){
        try{
            // user auth
            const userId = await axios.get('http://localhost:2300/authCheck', { withCredentials: true })
            console.log(userId.data.user.id)
            this.userID = userId.data.user.id

            // products cart
            const cartProducts = await axios.post('http://localhost:2300/cartProducts', { userid: this.userID })
            cartProducts.data.productsFound.forEach(element => {
                this.products = element
                console.log(element)
            });
        }
        catch(error){
            console.error('Erro created() usercart:', error);
        }
    }
}
</script>

<style>
    @import "../../styles/usersStyles/userCart.css";
</style>