
<template>
    <div id="app">
        <HeaderComp />

        <h1 class="title is-1">Seu endereço</h1>

        <form class="address-container" @submit.prevent="registerAddress">
            <div class="inputs-container">
                <label for="cep" class="labels">CEP</label>
                <input type="text" name="cep" class="input is-info" v-model="address.cep">
            </div>
            <div class="inputs-container">
                <label for="city" class="labels">CIDADE</label>
                <input type="text" name="city" class="input is-info" v-model="address.city">
            </div>
            <div class="inputs-container">
                <label for="street" class="labels">RUA</label>
                <input type="text" name="street" class="input is-info" v-model="address.street">
            </div>

            <button class="button is-success is-outlined" id="salvarBtt">Salvar</button>
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
                    <button class="button is-danger" ref="bttModal" @click="retryRegister">Tentar novamente</button>
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
        return{
            userID: this.$route.params.id,
            address: {
                cep: '',
                city: '',
                street: ''
            },
            isModal: false
        }
    },

    async created(){
        try{
            const res = await axios.get(`http://localhost:2300/userData/${this.userID}`)
            //console.log(res.data.userdata[0].address)
            this.address.cep = res.data.userdata[0].address.cep
            this.address.city = res.data.userdata[0].address.city
            this.address.street = res.data.userdata[0].address.street
        }
        catch(error){
            console.error('Error at get userData at axios request', error);
        }
    },

    methods: {
        async registerAddress(){
            try{
                if(this.address.cep === '' || this.address.city === '' || this.address.street === ''){
                    this.$refs.messageModal.innerText = 'Não deixe nenhum campo vazio'
                    this.isModal = true;
                }else{
                    const res = await axios.put(`http://localhost:2300/userAddress/${this.userID}`, {
                        cep: this.address.cep,
                        city: this.address.city,
                        street: this.address.street    
                    })
                    if(res.status === 200){
                        console.log('atualizado com sucesso', res.data);
                        this.$router.push('/minhaConta');
                    }
                }
                
            }
            catch(error){
                console.error('Error at register address at axios request');
            }
        },

        retryRegister(){
            this.isModal = false;
        }
    }
}
</script>

<style>
    @import '../../styles/controlPanelStyles/Address.css';
</style>