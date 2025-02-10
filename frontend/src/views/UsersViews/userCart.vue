
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
            userID: '',
            products: {
                name: "",
                size: "",
                price: "",
                description: "",
                image: ''
            },
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
            console.log(cartProducts)
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