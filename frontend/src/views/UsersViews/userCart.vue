
<template>
    <div id="appCart">
        <Header-comp/>
        <hr class="hr">
        <h1 class="title is-1">Carrinho de compras</h1>
        <div id="div-products-cart">
            <div id="product-cart" v-for="(product) in products" :key="product._id">
                <div id="divImagens-cart" ref="imgRef">
                    <img class="newImg" v-if="product.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                    <img class="newImg" v-if="product.image" :src="`data:image/png;base64,${product.image}`" alt="Imagem do produto" />
                </div>

                <div class="produto-desc">
                    <p class="title is-4">Produto</p>
                    <p class="subtitle is-5">{{ product.name }}</p>
                </div>

                <div class="produto-desc">
                    <p class="title is-4">Preço</p>
                    <p class="subtitle is-5">R${{ product.price }}</p>
                </div>

                <div class="produto-desc">
                    <p class="title is-4">Quantidade</p>
                    <input type="number" name="quantity" id="iquantity-cart" class="input is-info" v-model="quantity" min="1" max="9" autocomplete="off">
                </div>

                <div class="produto-desc">
                    <p class="title is-4">Subtotal</p>
                    <p class="subtitle is-5">R${{ product.price * quantity }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComp from '@/components/HeaderComp.vue';
export default {
    components: {
        HeaderComp
    },

    data(){
        return {
            userID: '',
            products: [],
            quantity: 1
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
            this.products = cartProducts.data.productsFound
            console.log(this.products)
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