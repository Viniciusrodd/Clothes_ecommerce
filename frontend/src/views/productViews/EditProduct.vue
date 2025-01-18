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
                
            </div>
            <button class="button is-link is-light" id="btt-salvar">Salvar</button>
        </form>
    </div>
</template>

<script>
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
    }
}
</script>

<style>
    @import "../../styles/EditProduct.css";
</style>