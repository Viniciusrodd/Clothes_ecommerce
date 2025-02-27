
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
                    <input type="number" v-model="product.quantity" name="quantity" id="iquantity-cart" class="input is-info" min="1" max="9" autocomplete="off">
                </div>

                <div class="produto-desc">
                    <p class="title is-4">Subtotal</p>
                    <p class="subtitle is-5">R${{ product.price * product.quantity }}</p>
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
        }
    },

    async created(){
        try{
            // user auth
            const userId = await axios.get('http://localhost:2300/authCheck', { withCredentials: true })
            console.log(userId.data.user.id)
            this.userID = userId.data.user.id

            /*
            EXEMPLO SPREAD OPERATOR:
            evita mutar(modificar diretamente) o objeto original e mantém a imutabilidade

            const obj1 = { name: "Teclado", price: 150 };
            const obj2 = { ...obj1, quantity: 1 };

            console.log(obj2); 
            // Saída: { name: "Teclado", price: 150, quantity: 1 }
            */
           
            // products cart
            const cartProducts = await axios.post('http://localhost:2300/cartProducts', { userid: this.userID })
            this.products = cartProducts.data.productsFound.map(product => ({
                ...product, quantity: 1 // Adiciona a propriedade quantity sem modificar o objeto original
            }));

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