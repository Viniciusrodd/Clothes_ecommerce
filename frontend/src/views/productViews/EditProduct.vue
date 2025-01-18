<template>
    <div id="app">
        <h1 class="title is-1">Edite seu produto:</h1>
        <hr class="hr">

        <form @submit.prevent="submitForm">
            <input class="input is-hovered" type="text" name="name" id="iname" v-model="formData.name" placeholder="Nome do produto" autocomplete="off">
            <input class="input is-hovered" type="text" name="size" id="isize" v-model="formData.size" placeholder="Tamanho do produto" autocomplete="off">
            <input step="0.01" class="input is-hovered" type="number" name="price" id="iprice" v-model="formData.price" placeholder="Preço do produto" autocomplete="off">
            <input class="input is-hovered" type="text" name="description" id="idescription" v-model="formData.description" placeholder="Descrição do produto" autocomplete="off">
            <input class="input is-hovered" type="file" name="image" id="iimage" ref="iimage" accept="image/*"> <br>
            <div id="divImg" ref="imgRef">
                <img class="newImg" v-if="formData.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                <img class="newImg" v-if="formData.image" :src="`data:image/png;base64,${formData.image}`" alt="Imagem do produto" />
            </div>
            <button class="button is-link is-light" id="btt-salvar">Salvar</button>
        </form>

        <router-link :to="{name: 'Product'}">
            <button class="button is-link is-light" id="btt-voltar">Voltar</button>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            formData: {
                name: "",
                size: "",
                price: "",
                description: "",
                image: ''
            },
            file: null,
            productIdParams: this.$route.params.id
        }
    },

    created(){
        console.log('product id', this.productIdParams)
        axios.get(`http://localhost:2300/product/${this.productIdParams}`)
        .then((res) =>{
            console.log(res.data)
            this.formData.name = res.data.name;
            this.formData.size = res.data.size;
            this.formData.price = res.data.price;
            this.formData.description = res.data.description;
            this.formData.image = res.data.image;
        })
        .catch((error) =>{
            console.log('Erro at axios request for product by id', error);
        })
    }
}
</script>

<style>
    @import "../../styles/EditProduct.css";
</style>