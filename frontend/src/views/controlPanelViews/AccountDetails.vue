<template>
    <div id="app">
        <HeaderComp />
        <hr class="hr">
        <h1 class="title is-1">Detalhes de conta</h1>

        <div class="account-details">
            <h1 class="title is-3">Seus dados</h1>
            <hr class="hr">

            <div class="container-input">
                <label for="nome" class="title is-4" id="label">Nome: </label>
                <input type="text" name="nome" class="input is-hovered" id="inputs">                
            </div>

            <div class="container-input">
                <label for="email" class="title is-4" id="label">Email: </label>
                <input type="email" name="email" class="input is-hovered" id="inputs">
            </div>
        </div>


        <div class="account-details">
            <h1 class="title is-3">Alteração de senha</h1>
            <hr class="hr">

            <input type="password" class="input is-hovered" id="inputs-senhas" placeholder="Senha atual (deixe em branco para não alterar)">
            <input type="password" class="input is-hovered" id="inputs-senhas" placeholder="Nova senha (deixe em branco para não alterar)">
            <input type="password" class="input is-hovered" id="inputs-senhas" placeholder="Confirmar nova senha">
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

    created() {
        
    }
}
</script>

<style>
    @import "../../styles/controlPanelStyles/AccountDetails.css";
</style>