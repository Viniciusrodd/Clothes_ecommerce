<template>
    <div id="app">
        <HeaderComp />
        <hr class="hr">
        <h1 class="title is-1">Detalhes de conta</h1>

        <div class="account-details">
            <h1 class="title is-3">Seus dados</h1>
            <hr class="hr">

            <div class="container-input">
                <label for="nome" class="label title is-4" id="label">Nome: </label>
                <input type="text" name="nome" class="input is-hovered" id="inputs" v-model="userData.name">                
            </div>

            <div class="container-input">
                <label for="email" class="title is-4" id="label">Email: </label>
                <input type="email" name="email" class="input is-hovered" id="inputs" v-model="userData.email">
            </div>
        </div>


        <div class="account-details">
            <h1 class="title is-3">Alteração de senha</h1>
            <hr class="hr">

            <input type="password" class="input is-hovered" id="inputs-senhas" placeholder="Senha atual (deixe em branco para não alterar)">
            <input type="password" class="input is-hovered" id="inputs-senhas" placeholder="Nova senha (deixe em branco para não alterar)">
            <input type="password" class="input is-hovered" id="inputs-senhas" placeholder="Confirmar nova senha">
        </div>

        <button class="button is-success is-outlined">Salvar alterações</button>
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
        return {
            userID: this.$route.params.id,
            userData: {name:'', email: ''}
        }
    },

    async created(){
        try{
            const userdataRequest = await axios.get(`http://localhost:2300/userData/${this.userID}`)
            this.userData.name = userdataRequest.data.userdata[0].name
            this.userData.email = userdataRequest.data.userdata[0].email
            //console.log(userdataRequest.data.userdata[0])
        }
        catch(error){
            console.error('Error at get userdata at AccountDetails axios request');
        }
    }
}
</script>

<style>
    @import "../../styles/controlPanelStyles/AccountDetails.css";
</style>