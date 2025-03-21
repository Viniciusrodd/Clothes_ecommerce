
<template>
    <div id="app">
        <HeaderComp />

        <h1 class="title is-1">Seu endereço</h1>
        <div class="address-container">
            <div class="inputs-container">
                <label for="cep" class="labels">CEP</label>
                <input type="text" name="cep" class="input is-info">
            </div>
            <div class="inputs-container">
                <label for="city" class="labels">CIDADE</label>
                <input type="text" name="city" class="input is-info">
            </div>
            <div class="inputs-container">
                <label for="street" class="labels">RUA</label>
                <input type="text" name="street" class="input is-info">
            </div>

            <button class="button is-info is-dark" id="salvarBtt">Salvar</button>
        </div>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
export default {
    components: {
        HeaderComp
    }
}
</script>

<style>
    @import '../../styles/controlPanelStyles/Address.css';
</style>