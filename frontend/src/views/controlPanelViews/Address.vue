
<template>
    <div id="app">
        <HeaderComp />

        <h1 class="title is-1">Seu endereço</h1>
        <div class="address-container">
            <div class="inputs-container">
                <label for="cep" class="labels">CEP</label>
                <input type="text" name="cep" class="input is-info">
            </div>
            <div class="inputs-container">
                <label for="city" class="labels">CIDADE</label>
                <input type="text" name="city" class="input is-info">
            </div>
            <div class="inputs-container">
                <label for="street" class="labels">RUA</label>
                <input type="text" name="street" class="input is-info">
            </div>

            <button class="button is-success is-outlined" id="salvarBtt">Salvar</button>
        </div>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import axios from 'axios';
export default {
    components: {
        HeaderComp
    },

    data(){
        return{
            userID: this.$route.params.id
        }
    },

    async created(){
        try{
            const res = await axios.get(`http://localhost:2300/userData/${this.userID}`)
            console.log(res.data.userdata[0].address)
        }
        catch(error){
            console.error('Error at get userData at axios request', error);
        }
    }
}
</script>

<style>
    @import '../../styles/controlPanelStyles/Address.css';
</style>