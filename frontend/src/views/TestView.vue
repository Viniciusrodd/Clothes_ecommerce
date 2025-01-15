
<template>
    <div id="app">
        <h1>Teste</h1>
        <p id="p-teste">{{ testMsg }}</p>

        <div id="img">

        </div>

        <h1>My comp test bellow:</h1>
        <TestComp/>
    </div>
</template>

<script>
import axios from 'axios';
import TestComp from '@/components/TestComp.vue';
export default {
    name: 'TestView',
    components: {
        TestComp
    },

    data(){
        return{
            testMsg: ''
        }
    },

    created(){
        axios.get('http://localhost:2300/test')
        .then((res) =>{
            console.log(res)
            this.testMsg = res.data.msg
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>

<style>
    @import '../styles/TesteView.css';
</style>