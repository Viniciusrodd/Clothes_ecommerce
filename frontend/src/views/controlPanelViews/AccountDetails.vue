<template>
    <div id="app">
        <HeaderComp />
        <h1 class="title is-1">Detalhes de conta</h1>

        <form id="form-accountDetails" @submit.prevent="submitForm">
            <div class="account-details">
                <h1 class="title is-3">Seus dados</h1>
                <hr class="hr">

                <div class="container-input">
                    <label for="nome" class="label title is-4" id="label">Nome: </label>
                    <input type="text" name="name" class="input is-hovered" id="inputs" v-model="userData.name">
                </div>

                <div class="container-input">
                    <label for="email" class="title is-4" id="label">Email: </label>
                    <input type="email" name="email" class="input is-hovered" id="inputs" v-model="userData.email">
                </div>

                <div class="container-input">
                    <label for="cellphone" class="label title is-4" id="label">Telefone: </label>
                    <input type="text" name="cellphone" class="input is-hovered" id="inputs" v-model="userData.cellPhone">
                </div>

                <div class="container-input">
                    <label for="cpf" class="label title is-4" id="label">CPF: </label>
                    <input type="text" name="cpf" class="input is-hovered" id="inputs" v-model="userData.cpf"
                    placeholder="000.000.000-00">
                </div>
            </div>

            
            <div class="account-details">
                <h1 class="title is-3">Alteração de senha</h1>
                <hr class="hr">

                <input name="actualPass" v-model="userPass.actualPass" type="password" class="input is-hovered" id="inputs-senhas" placeholder="Senha atual (deixe em branco para não alterar)">
                <input name="newPass" v-model="userPass.newPass" type="password" class="input is-hovered" id="inputs-senhas" placeholder="Nova senha (deixe em branco para não alterar)">
                <input name="confirmPass" v-model="userPass.confirmPass" type="password" class="input is-hovered" id="inputs-senhas" placeholder="Confirmar nova senha">
            </div>


            <button class="button is-success is-outlined">
                Salvar alterações
            </button>
        </form>

        <!-- Modal -->
        <div class="modal" :class="{'is-active': isModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Espere</p>
            </header>
            <section class="modal-card-body">
                <p ref="messageModal">Mensagem de aviso...</p>
            </section>
            <footer class="modal-card-foot is-justify-content-center">
                <div class="div-buttons">
                    <button class="button is-danger" ref="bttModal" @click="retryPassword">Tentar novamente</button>
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
            userID: this.$route.params.id,
            userData: { name:'', email: '' , cellPhone: '', cpf: ''},
            userPass: { actualPass: '', newPass: '', confirmPass: '' },
            isModal: false
        }
    },

    async created(){
        try{
            const userdataRequest = await axios.get(`http://localhost:2300/userData/${this.userID}`)
            this.userData.name = userdataRequest.data.userdata[0].name
            this.userData.email = userdataRequest.data.userdata[0].email
            this.userData.cellPhone = userdataRequest.data.userdata[0].cellPhone
            this.userData.cpf = userdataRequest.data.userdata[0].cpf            
            //console.log(userdataRequest.data.userdata[0])
        }
        catch(error){
            console.error('Error at get userdata at AccountDetails axios request');
        }
    },

    methods: {
        submitForm(){
            if(this.userPass.newPass != this.userPass.confirmPass){
                this.$refs.messageModal.innerText = 'Confirme a senha correta'
                this.isModal = true
            }else{
                axios.put(`http://localhost:2300/user/${this.userID}`, {
                    name: this.userData.name,
                    email: this.userData.email,
                    cellPhone: this.userData.cellPhone,
                    cpf: this.userData.cpf,
                    actualPass: this.userPass.actualPass,
                    newPass: this.userPass.newPass
                })
                .then(() => {                
                    if(this.userPass.actualPass != '' && this.userPass.newPass != '' && this.userPass.confirmPass != ''){                        
                        axios.get('http://localhost:2300/logout', { withCredentials: true })
                        this.$router.push('/minhaConta');
                    }
                    this.$router.push('/minhaConta');
                })
                .catch((error) => {
                    if (error.response.data.errorPass){
                        this.$refs.messageModal.innerText = 'Senha atual está incorreta'
                        this.isModal = true
                    }else{
                        console.log('Error at updated user data in axios request', error);
                    }
                })
            }
        },

        retryPassword(){
            this.isModal = false;
        }
    }
}
</script>

<style>
    @import "../../styles/controlPanelStyles/AccountDetails.css";
</style>