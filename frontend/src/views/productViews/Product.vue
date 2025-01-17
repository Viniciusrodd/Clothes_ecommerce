<template>
    <div id="app">
        <h1 class="title is-1">Produtos: </h1>
        <hr class="hr">
        <div v-for="(product) in products" :key="product._id" id="div-products">
            <p>ID do Produto: {{ product._id }}</p>
            <p>Nome: {{ product.name }}</p>
            <p>Tamanho: {{ product.size }}</p>
            <p>Preço: R$ {{ product.price }}</p>
            <p>Descrição: {{ product.description }}</p>
            <div id="divImg" ref="imgRef">
                <img class="newImg" v-if="product.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                <img class="newImg" v-if="product.image" :src="`data:image/png;base64,${product.image}`" alt="Imagem do produto" />
            </div>

            <div id="div-buttons">
                <button class="button is-link is-light">Editar</button>
                <button class="button is-danger is-light" @click="modalActive(product._id)">Excluir</button>
            </div>
            <hr class="hr">
        </div>


        <!-- Modal -->
        <div class="modal" :class="{'is-active': isModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Confirmação de Exclusão</p>
            </header>
            <section class="modal-card-body">
                <p>Você tem certeza de que deseja excluir este item? Esta ação não pode ser desfeita.</p>
            </section>
            <footer class="modal-card-foot is-justify-content-center">
                <button class="button is-danger" @click="deleteData">Excluir</button>
                <button class="button" @click="hideModal">Cancelar</button>
            </footer>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            products: [],
            idUser: 0,
            isModal: false,
        }
    },

    created(){
        axios.get('http://localhost:2300/products')
            .then((res) =>{
                this.products = res.data.products;
            })
            .catch((error) =>{
                console.log('Error at request products in axios', error);
            });
    },

    methods: {
        modalActive(id){
            this.idUser = id
            return this.isModal = true
        },

        hideModal(){
            return this.isModal = false
        },
        
        deleteData(){ 
            axios.delete(`http://localhost:2300/product/${this.idUser}`)
            .then((response) =>{
                console.log('Produto excluído:', response.data.message);
                this.products = this.products.filter(product => product._id !== this.idUser);
                this.isModal = false
            })
            .catch(() =>{
                console.log('Error at delete prod in axios request');
            });
        }
    }
}
</script>

<style>
    @import "../../styles/ProductView.css";
</style>