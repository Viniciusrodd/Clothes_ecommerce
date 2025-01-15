
<template>
    <div>
        <title>aaa</title>
        <h1>Teste</h1>
        <p>{{ testMsg }}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
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

</style>