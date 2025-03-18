
<template>
    <div id="app-myAccount">
        <header-comp/>
        <hr class="hr">

        <div v-if="!isLogged">
            <h1 id="h1-myAccount" class="title is-2">Já possui uma conta ?</h1>
            <p id="subtitle" class="subtitle is-3">Faça seu login</p>

            <form @submit.prevent="login" id="form-myAccount">
                <input class="input is-hovered" v-model="formData.email" type="email" name="email" id="iemail" placeholder="Email" autocomplete="off" required>
                <input class="input is-hovered" v-model="formData.password" type="password" name="password" id="ipassword" placeholder="Senha" autocomplete="off" required>
                <button class="button is-link is-light">Login</button>
            </form>

            <h1 id="h1-myAccount" class="title is-3">Não possui uma conta ?</h1>

            <router-link :to="{name: 'Register'}" target="_blank">
                <p id="p-cadastre" class="subtitle is-3">Cadastre-se aqui</p>
            </router-link>
        </div>

        <div v-else>
            <h1 class="title is-2">Olá, {{ userName }} !</h1>
            <div id="divLogged">
                <div id="painelUser">
                    <h1 class="title is-3">Este é seu painel de controle</h1>
                    <p>
                        A partir do painel de controle de sua conta, você pode ver suas
                        compras recentes, gerenciar seus endereços de entrega e
                        faturamento, e editar sua senha e detalhes da conta.
                    </p>
                </div>
                <div id="controlUser">
                    <router-link :to="{ name: 'accountDetails', params: { id: userId } }">
                        <button class="button" id="btt">
                            Detalhes da conta
                        </button>
                    </router-link>
                    <button class="button" id="btt">Pedidos</button>
                    <button class="button" id="btt">Compras recentes</button>
                    <button class="button" id="btt">Endereço de entrega</button>
                    <button class="button" id="btt">Faturamento</button>
                </div>
            </div>
            <button class="button is-danger is-outlined" @click="logOut">Sair da conta</button>
        </div>

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
            isModal: false,
            isLogged: false,
            userName: '',
            userId: 0
        }
    },

    async created(){ 
        try{
            const res = await axios.get('http://localhost:2300/authCheck', { withCredentials: true })
            if(res){
                console.log('Session logged');
                this.userName = res.data.user.name;
                this.userId = res.data.user.id;
                this.isLogged = true;
            }
        }   
        catch(error){
            console.log('Session not found', error);
        }  
    },
    
    methods: {
        hideModal(){
            return this.isModal = false
        },

        login(){
            axios.post('http://localhost:2300/login', this.formData, { withCredentials: true })
            .then((res) =>{
                //window.location.reload();
                console.log('Login success', res);
                this.userName = res.data.user.name;
                this.userId = res.data.user._id; 
                this.isLogged = true
                console.log(this.userId)
            })
            .catch((error) =>{
                console.log(error);
                this.isModal = true
            })
        },

        logOut(){
            axios.get('http://localhost:2300/logout', { withCredentials: true })
            .then(() => {
                console.log('User logged out');
                this.isLogged = false;
            })
            .catch(error => console.log('Logout error', error));
        }
    }
}
</script>

<style>
    @import "../../styles/usersStyles/myAccount.css";
</style>