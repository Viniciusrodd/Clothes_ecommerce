<template>
    <div id="app">
       <HeaderComp/>

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
                <p class="title is-3">R$ {{ parseFloat(product.price).toFixed(2) }}</p>
        
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
                    <button @click="cartAdd(productIdParams, userId)" id="comprar-btt-perso" class="button is-info is-inverted is-outlined">
                        COMPRAR
                    </button>                    
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
import HeaderComp from '@/components/HeaderComp.vue';
export default {
    components: {
        HeaderComp
    },

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
            productIdParams: this.$route.params.id,
            userId: 0
        }
    },

    async created(){
        try{
            const res = await axios.get(`http://localhost:2300/product/${this.productIdParams}`)

            console.log('dados pegos', res.data.product)
            this.product.name = res.data.product.name;
            this.product.size = res.data.product.size;
            this.product.price = res.data.product.price;
            this.product.description = res.data.product.description;
            this.product.image = res.data.product.image;

            const authRequest = await axios.get('http://localhost:2300/authCheck', { withCredentials: true })
            this.userId = authRequest.data.user.id
            //console.log('User id: ', authRequest.data.user)
        }
        catch(error){
            console.log('Erro at axios request for product by id', error);
        }
    },

    methods: {
        async cartAdd(productId, userId){
            try{
                await axios.post('http://localhost:2300/cart', { productId, userId });
                this.$router.push({ name: 'userCart' });
            }
            catch(error){
                console.error('Erro:', error.response?.data || error.message);            
            }
        }
    }
}
</script>

<style>
    @import '../../styles/routesStyles/BuyProd.css';
</style>