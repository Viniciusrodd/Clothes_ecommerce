
<template>
    <div id="app">
        <header-comp/>
        <hr class="hr">
        <h1 id="h1-myAccount" class="title is-2">Já possui uma conta ?</h1>
        <p id="subtitle" class="subtitle is-3">Faça seu login</p>

        <form @submit.prevent="submitForm" id="form-myAccount">
            <input class="input is-hovered" v-model="formData.name" type="text" name="name" id="iname" placeholder="Nome" autocomplete="off" required>
            <input class="input is-hovered" v-model="formData.email" type="email" name="email" id="iemail" placeholder="Email" autocomplete="off" required>
            <input class="input is-hovered" v-model="formData.password" type="password" name="password" id="ipassword" placeholder="Senha" autocomplete="off" required>

            <button class="button is-link is-light">Login</button>
        </form>

        <h1 id="h1-myAccount" class="title is-3">Não possui uma conta ?</h1>
        <router-link :to="{name: 'Register'}" target="_blank">
            <p id="p-cadastre" class="subtitle is-3">Cadastre-se aqui</p>
        </router-link>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
export default {
    components: {
        HeaderComp
    },

    data(){
        return {
            formData: {
                name: '',
                email: '',
                password: ''
            }
        }
    },

    methods: {
        submitForm(){
            console.log('ads')
        }
    }
}
</script>

<style>
    @import "../../styles/usersStyles/myAccount.css";
</style>