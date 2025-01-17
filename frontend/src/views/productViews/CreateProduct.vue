
<template>
    <div id="app">
        <h1>Teste</h1>

        <form @submit.prevent="submitForm">
            <input class="input is-focused" type="text" name="name" id="iname" v-model="formData.name" placeholder="Nome do produto" autocomplete="off">
            <input class="input is-focused" type="text" name="size" id="isize" v-model="formData.size" placeholder="Tamanho do produto" autocomplete="off">
            <input class="input is-focused" type="number" name="price" id="iprice" v-model="formData.price" placeholder="Preço do produto" autocomplete="off">
            <input class="input is-focused" type="text" name="description" id="idescription" v-model="formData.description" placeholder="Descrição do produto" autocomplete="off">
            <input class="input is-focused" type="file" name="image" id="iimage" ref="iimage" @change="imageFile" accept="image/*"> <br>
            <div id="divImg" ref="imgRef">
                
            </div>
            <button>Enviar</button>
        </form>
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
            },
            file: null
        }
    },

    methods: {
        imageFile(event){
            const file = event.target.files[0];
            this.file = event.target.files[0];
            if(file){
                const reader = new FileReader();
                reader.onload = (e) =>{
                    const img = document.createElement('img');
                    img.src = e.target.result
                    img.classList.add('newImg')

                    let divImg = this.$refs.imgRef;
                    divImg.innerHTML = '';
                    divImg.appendChild(img);
                }
    
                reader.readAsDataURL(file);
            }   
        },

        async submitForm(){
            const newformData = new FormData();
            newformData.append("name", this.formData.name);
            newformData.append("size", this.formData.size);
            newformData.append("price", this.formData.price);
            newformData.append("description", this.formData.description);
            newformData.append("image", this.file);
            
            try {
                const response = await axios.post("http://localhost:2300/product", newformData);
                if (response) {
                    this.$router.push("/product");
                }
            } catch (error) {
                console.error("Error at send create product fórm:", error);
            }
        }
    }
}
</script>

<style>
    @import '../../styles/TesteView.css';
</style>