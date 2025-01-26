<template>
    <div id="appRegister" style="height: 90vh;">
        <h1 class="title is-1">Registro de usuário</h1>
        <hr class="hr">
        <form @submit.prevent="submitForm">
            <input class="input is-hovered" v-model="formData.name" type="text" name="name" id="iname" placeholder="Nome de usuário" autocomplete="off" required>
            <input class="input is-hovered" v-model="formData.email" type="email" name="email" id="iemail" placeholder="Email de usuário" autocomplete="off" required>
            <input class="input is-hovered" v-model="formData.password" type="text" name="password" id="ipassword" placeholder="Senha de usuário" autocomplete="off" required>

            <button class="button is-link is-light">Registrar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
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
            /*
            const newformData = new FormData();
            newformData.append('name', this.formData.name);
            newformData.append('email', this.formData.email);
            newformData.append('password', this.formData.password);
            */
            axios.post('http://localhost:2300/register', this.formData)
            .then(() =>{
                window.open('http://localhost:8080/homepage', '_blank');
                window.location.reload();
            })
            .catch((error) =>{
                console.log('Error at axios request to create a user', error);
            })
        }   
    }
}
</script>

<style>
    @import '../../styles/usersStyles/registerUser.css';
</style>