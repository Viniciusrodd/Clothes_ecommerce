
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

        <div class="buttons" v-if="!isClient">
            <div class="link-compra">
                <button id="bttCompra" class="button is-info is-dark" @click="client()">
                    SE TORNAR CLIENTE
                </button>
            </div>
        </div>
            
        <div class="buttons" v-else>
            <div>
                <button id="bttCompra" class="button is-info is-dark" @click="buy()">
                    COMPRAR
                </button>
            </div>
        </div>

        <div id="pix-container">
            <i class="material-icons" id="pixIcon">pix</i>
            <h2 class="subtitle is-2">**Só aceitamos pix**</h2>
        </div>

        <!-- Modal -->
        <div class="modal" :class="{'is-active': isModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title" ref="modal_title">Espere um momento</p>
            </header>
            <section class="modal-card-body">
                <p ref="modal_msg">Tem certeza de que deseja retirar o produto do carrinho ?</p>
            </section>
            <footer class="modal-card-foot is-justify-content-center">
                <div class="div-buttons">
                    <button class="button" @click="remover_produto()" ref="btt1">Sim, tenho certeza</button>
                    <button class="button" @click="manter_produto()" ref="btt2">Não quero remover</button>
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
            userData: [],
            userID: '',
            products: [],
            isModal: false,
            productid: 0,
            subtotalPrice: 0,
            totalFinal: 0,
            frete: 0,
            isClient: false
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
            this.userID = userId.data.user.id
           
            // products cart
            const cartProducts = await axios.post(`http://localhost:2300/cartProducts/${this.userID}`)
            this.products = cartProducts.data.productsFound.map(product => ({
                ...product, quantity: 1 // Adiciona a propriedade quantity sem modificar o objeto original
            }));

            // user data
            const userDataGet = await axios.get(`http://localhost:2300/userData/${this.userID}`)
            this.userData = userDataGet
            //console.log(userDataGet.data.userdata[0])

            if(userDataGet.data.userdata[0].isClient === true){
                this.isClient = true
            }

            //console.log(this.userData.data.userdata[0])
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

        modalAppear(modal_title, modal_msg, btt1, btt2, timeout){
            this.isModal = true
            this.$refs.modal_title.innerText = modal_title
            this.$refs.modal_msg.innerText = modal_msg
            this.$refs.btt1.style.display = btt1
            this.$refs.btt2.style.display = btt2

            if(timeout){
                setTimeout(() => {
                    this.isModal = false
                }, 5000);
            }

            if(btt1 !== 'none'){
                this.$refs.btt1.innerText = btt1
            }
            if(btt2 !== 'none'){
                this.$refs.btt2.innerText = btt2
            }
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

        async client(){
            try{
                if(this.userData.data.userdata[0].cpf === ''){
                    this.modalAppear(
                        'Espere...',
                        'Você será redirecionado \n para concluir seu registro e \n se tornar cliente...',
                        'none',
                        'none',
                        true
                    );
                    
                    setTimeout(() => {
                        this.$router.push(`/detalhesConta/${this.userID}`);
                    }, 5000);
                }

                const req = await axios.post('http://localhost:2300/createClient', {                    
                    name: this.userData.data.userdata[0].name,
                    cellphone: this.userData.data.userdata[0].cellPhone,
                    email: this.userData.data.userdata[0].email,
                    taxId: this.userData.data.userdata[0].cpf
                })

                if(req.status === 200){
                    await axios.post(`http://localhost:2300/isClientAdd/${this.userID}`);
                    console.log('Cliente criado com sucesso');
                    this.isClient = true

                    this.modalAppear(
                        'Parabéns',
                        'Você se tornou um cliente! \n sinta-se à vontade para fazer suas compras...',
                        'none',
                        'none',
                        true    
                    )
                }
            }
            catch(error){
                console.error('Error at create client at frontend axios request', error);
            }
        },

        async buy(){
            try{
                const formattedProducts = this.products.map((item) => ({
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    quantity: item.quantity,
                    price: Math.round(Number(item.price) * 100) // Convertendo para centavos
                }))

                const productsToOrder = this.products.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }))

                const payReq = await axios.post('http://localhost:2300/compraFinal', {
                    products: formattedProducts,
                    customer: {
                        name: this.userData.data.userdata[0].name,
                        cellphone: this.userData.data.userdata[0].cellPhone,
                        email: this.userData.data.userdata[0].email,
                        taxId: this.userData.data.userdata[0].cpf
                    }
                });

                if(payReq.status === 200){
                    console.log('Compra processada com sucesso');

                    this.modalAppear(
                        'Compra processada com sucesso',
                        'Prosseguiremos com nossa aprovação do pagamento \n notificaremos assim que possivel \n Obrigado/a !!!',
                        'none',
                        'none',
                        true
                    )

                    await axios.post('http://localhost:2300/createOrder', {
                        userId: this.userID,
                        products: productsToOrder,
                        paymentMethod: 'PIX',
                        orderCreatedAt: new Date().toISOString(),
                        status: 'Pendente' 
                    })
                    .then(() => {
                        console.log('Dados enviados para createOrder:')
                        setTimeout(() => {
                            this.$router.push(`/pedidos/${this.userID}`)
                        }, 5000);
                    })
                    .catch((error) => console.log('Error at process order...', error))
                }
            }
            catch(error){
                console.log('Error at buy product at front request...', error.response ? error.response.data : error.message);
            }
        }
    }
}
</script>

<style>
    @import "../../styles/usersStyles/userCart.css";
</style>