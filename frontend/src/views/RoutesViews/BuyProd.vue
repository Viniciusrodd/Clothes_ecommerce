<template>
    <div id="app-buy">
        <h1>Comprar o produto</h1>
        <p>produto id {{ productIdParams }}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            productIdParams: this.$route.params.id
        }
    }
}
</script>

<style>

</style>