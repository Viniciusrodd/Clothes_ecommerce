<template>
    <div id="app">
        <h1 class="title is-1">Edite seu produto:</h1>
        <hr class="hr">

        <form @submit.prevent="submitForm">
            <input class="input is-hovered" type="text" name="name" id="iname" v-model="formData.name" placeholder="Nome do produto" autocomplete="off">
            <input class="input is-hovered" type="text" name="size" id="isize" v-model="formData.size" placeholder="Tamanho do produto" autocomplete="off">
            <input step="0.01" class="input is-hovered" type="number" name="price" id="iprice" v-model="formData.price" placeholder="Preço do produto" autocomplete="off">
            <input class="input is-hovered" type="text" name="description" id="idescription" v-model="formData.description" placeholder="Descrição do produto" autocomplete="off">
            <input class="input is-hovered" type="file" name="image" id="iimage" @change="imageFile" accept="image/*"> <br>
            <div id="divImg" ref="imgRef">
                <img class="newImg" v-if="formData.image == undefined" src="../../styles/images/sem_imagem.png" alt="Imagem do produto" />
                <img class="newImg" v-if="formData.image" :src="`data:image/png;base64,${formData.image}`" ref="iimage" alt="Imagem do produto" />
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
    },

    methods: {
        imageFile(event){
            const file = event.target.files[0]; 
            this.file = event.target.files[0];
            if(file){
                const reader = new FileReader();
                reader.onload = (e) =>{
                    let image = this.$refs.iimage 
                    image.src = e.target.result
                }

                reader.readAsDataURL(file);
            }
        },

        submitForm(){
            const formData = new FormData();
            formData.append("name", this.formData.name);
            formData.append("size", this.formData.size);
            formData.append("price", this.formData.price);
            formData.append("description", this.formData.description);
            formData.append("image", this.file);

            axios.put(`http://localhost:2300/product/${this.productIdParams}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(() =>{
                this.$router.push('/product');
            })
            .catch((error) =>{
                console.log('Error at updated data in axios request', error)
            })
        }
    }
}
</script>

<style>
    @import "../../styles/productStyles/EditProduct.css";
</style>