
<template>
    <div id="appCart">
        <Header-comp/>

        <h1 class="title is-1">Carrinho de compras</h1>
        <div class="div-products-cart">
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
                    <input type="number" @change="changeQuantity(product._id, product.quantity)" v-model="product.quantity" name="quantity" id="iquantity-cart" class="input is-info" min="1" max="9" autocomplete="off">
                </div>

                <div class="produto-desc">
                    <p class="title is-4">Subtotal</p>
                    <p class="subtitle is-5">R${{ subtotalPrice = parseFloat(product.price * product.quantity).toFixed(2) }}</p>
                </div>

                <div class="produto-desc">
                    <p class="title is-4" id="remover-p">Remover</p>
                    <i class="material-icons" id="deleteIcon" @click="showModal(product._id)">delete_forever</i>
                </div>
            </div>
        </div>


        <div class="div-products-cart">
            <h1 class="title is-1">Detalhes da compra</h1>
            <div id="div-details">
                <div class="final-prices">
                    <h2 class="title is-4">Subtotal: </h2>
                    <h2 class="title is-4">R$ {{ parseFloat(subtotalProcessed).toFixed(2) }}</h2>
                </div>
                <div class="final-prices">
                    <h2 class="title is-4">Entrega: </h2>
                    <button class="button is-info is-outlined" id="calc-entrega" ref="freteBtt" @click="freteCalc()">Calcular entrega</button>
                    <div id="container-frete" ref="containerFrete">
                        <input type="number" name="cep" class="input is-info" id="icep" ref="freteInput" placeholder="Seu cep...">
                        <button class="button is-info is-outlined" ref="enviaCep" id="enviaCep" @click="enviaFreteCalc()">Enviar</button>
                    </div>
                    <p class="subtitle is-5" id="msg-frete" ref="msgfrete">Frete ficou: R${{ parseFloat(frete).toFixed(2) }}</p>
                </div>
                <hr class="hr">
                <div class="final-prices">
                    <h1 class="title is-3">Total: </h1>
                    <h1 class="title is-3">R$ {{ parseFloat(subtotalProcessed + frete).toFixed(2) }}</h1>
                </div>
            </div>
        </div>
        
        <router-link id="link-compra" :to="{name: 'Buy'}">
            <button id="bttCompra" class="button is-info is-dark" @click="buy()">
                COMPRAR
            </button>
        </router-link>

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
            productid: 0,
            subtotalPrice: 0,
            totalFinal: 0,
            frete: 0
        }
    },

    computed: {
        subtotalProcessed() {
            return this.products.reduce((total, product) => {
                return total + (product.price * product.quantity); //acumulando valores no total
            }, 0);
        }
    },

    watch: {
        products: {
            handler(newProducts) {
                this.subtotalPrice = newProducts.reduce((total, product) => {
                    return total + (product.price * product.quantity);
                }, 0);
            },
            deep: true
        }
    },
    
    async created(){
        try{
            // user auth
            const userId = await axios.get('http://localhost:2300/authCheck', { withCredentials: true })
            //console.log(userId.data.user.id)
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

            for(let i = 0; i < this.products.length; i++){
                //console.log(this.products[i])
                //console.log(this.products[i].name)
            }
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
        },

        freteCalc(){
            this.$refs.freteBtt.style.display = 'none'
            this.$refs.containerFrete.style.display = 'flex'
            this.$refs.freteInput.style.display = 'block'
            this.$refs.enviaCep.style.display = 'block'
        },
        
        enviaFreteCalc(){
            this.$refs.msgfrete.style.display = 'block'
            this.$refs.containerFrete.style.display = 'none'
            this.frete = 15
        },

        changeQuantity(id, quantity){
            //console.log('produto: ', id,'quantidade: ',quantity)
            for(let i = 0; i < this.products.length; i++){
                if(this.products[i]._id === id){
                    this.products[i].quantity = quantity
                    //console.log(this.products)
                }
            }
        },

        async buy(){
            try{
                const formattedProducts = this.products.map((item) => ({
                    externalId: item._id,
                    name: item.name,
                    description: item.description,
                    quantity: item.quantity,
                    price: parseFloat(item.price).toFixed(2)
                }))
                //console.log(formattedProducts)
                
                const url = 'https://api.abacatepay.com/v1/billing/create';
                const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Bearer abc_dev_UzEuMMg4H0xDHm6P64PBXSqp'
                },
                body: JSON.stringify({
                    frequency: 'ONE_TIME',
                    methods: ['PIX'],
                    products: formattedProducts,  
                    returnUrl: 'http://localhost:8080/carrinho',
                    completionUrl: 'http://localhost:8080/comprafinalizada',
                    customer: {
                        name: 'Vinicius Rodrigues',
                        cellphone: '11911133169',
                        email: 'vini@gmail.com',
                        taxId: '322.134.124-22'
                    }
                })
                };

                await axios(url, options)
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error(err));
            }
            catch(error){
                console.log('Error at buy product at front request...');
            }
        }
    }
}
</script>

<style>
    @import "../../styles/usersStyles/userCart.css";
</style>