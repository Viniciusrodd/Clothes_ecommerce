
<template>
    <div id="app">
        <header-comp/>
        <hr class="hr">
        <h1 id="h1-myAccount" class="title is-2">Já possui uma conta ?</h1>
        <p id="subtitle" class="subtitle is-3">Faça seu login</p>

        <form @submit.prevent="submitForm" id="form-myAccount">
            <input class="input is-hovered" v-model="formData.email" type="email" name="email" id="iemail" placeholder="Email" autocomplete="off" required>
            <input class="input is-hovered" v-model="formData.password" type="password" name="password" id="ipassword" placeholder="Senha" autocomplete="off" required>

            <button class="button is-link is-light">Login</button>
        </form>

        <h1 id="h1-myAccount" class="title is-3">Não possui uma conta ?</h1>
        <router-link :to="{name: 'Register'}" target="_blank">
            <p id="p-cadastre" class="subtitle is-3">Cadastre-se aqui</p>
        </router-link>

        <!-- Modal -->
        <div class="modal" :class="{'is-active': isModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Erro de login</p>
            </header>
            <section class="modal-card-body">
                <p>Verifique se os dados passados estão corretos</p>
            </section>
            <footer class="modal-card-foot is-justify-content-center">
                <div class="div-buttons">
                    <button class="button" @click="hideModal">Tentar novamente</button>
                </div>
            </footer>
        </div>
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
        return {
            formData: {
                email: '',
                password: ''
            },
            isModal: false
        }
    },

    methods: {
        hideModal(){
            return this.isModal = false
        },

        submitForm(){
            axios.post('http://localhost:2300/login', this.formData)
            .then(() =>{
                window.open('http://localhost:8080/homepage');
                window.location.reload();
            })
            .catch((error) =>{
                console.log(error);
                this.isModal = true
            })
        }
    }
}
</script>

<style>
    @import "../../styles/usersStyles/myAccount.css";
</style>