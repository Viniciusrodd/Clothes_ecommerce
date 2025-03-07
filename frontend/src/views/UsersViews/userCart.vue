
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
                    <p class="subtitle is-5">R${{ parseFloat(product.price).toFixed(2) }}</p>
                </div>

                <div class="produto-desc">
                    <p class="title is-4">Quantidade</p>
                    <input type="number" v-model="product.quantity" name="quantity" id="iquantity-cart" class="input is-info" min="1" max="9" autocomplete="off">
                </div>

                <div class="produto-desc">
                    <p class="title is-4">Subtotal</p>
                    <p class="subtitle is-5">R${{ parseFloat(product.price * product.quantity).toFixed(2) }}</p>
                </div>

                <div class="produto-desc">
                    <p class="title is-4" id="remover-p">Remover</p>
                    <i class="material-icons" id="deleteIcon" @click="showModal(product._id)">delete_forever</i>
                </div>
            </div>
        </div>


        <!-- Modal -->
        <div class="modal" :class="{'is-active': isModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Espere um momento</p>
            </header>
            <section class="modal-card-body">
                <p>Tem certeza de que deseja retirar o produto do carrinho ?</p>
            </section>
            <footer class="modal-card-foot is-justify-content-center">
                <div class="div-buttons">
                    <button class="button" @click="manter_produto()">Não quero remover</button>
                    <button class="button" @click="remover_produto()">Sim, tenho certeza</button>
                </div>
            </footer>
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
            isModal: false,
            productid: 0
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
    },

    methods: {
        showModal(id){
            this.productid = id
            this.isModal = true;
        },

        remover_produto(){
            axios.delete(`http://localhost:2300/cartRemoveProducts/${this.userID}/${this.productid}`)
            .then((res) => {
                console.log('Produto retirado: ', res.data.message);
                console.log('produtos: ', this.products)
                this.products = this.products.filter(product => product._id !== this.productid);
                this.isModal = false
            })
            .catch((error) => {
                console.log('Error at delete prod from cart in axios request', error);
            })
        },

        manter_produto(){
            this.isModal = false
        }
    }
}
</script>

<style>
    @import "../../styles/usersStyles/userCart.css";
</style>