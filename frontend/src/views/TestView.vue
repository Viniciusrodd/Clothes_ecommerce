
<template>
    <div id="app">
        <h1>Teste</h1>
        <p id="p-teste">{{ testMsg }}</p>

        <form action="/image" method="post">
            <input type="file" name="image" id="iimage" ref="iimage" @change="imageFile"> <br>
            <button>Enviar imagem</button>
        </form>
        <div id="divImg" ref="imgRef">
        
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

    methods: {
        imageFile(event){
            const file = event.target.files[0]
            if(file){
                const reader = new FileReader();
                reader.onload = (e) =>{
                    const img = document.createElement('img');
                    img.src = e.target.result
                    img.classList.add('newImg')

                    let divImg = this.$refs.imgRef;
                    divImg.innerHTML = '';
                    divImg.appendChild(img);
                }
    
                reader.readAsDataURL(file);
            }   
        }
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