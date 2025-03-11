<template>
    <header id="headerhome">
        <router-link :to="{name: 'Homepage'}">
            <div id="logo"></div>
        </router-link>
        <h1 class="title is-1">El Lojita</h1>
        <div id="icons">
            <router-link :to="{name: 'MinhaConta'}">
                <i class="material-icons">person</i>
            </router-link>
            <router-link :to="{name: 'userCart'}">
                <i class="material-icons">shopping_cart</i>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComp'
}
</script>

<style scoped>
    #headerhome{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        height: 15vh;
        width: 100vw;
        background-color: #17232f;
    }

    #icons{
        display: flex;
        justify-content: space-around;
        width: 10vw;
    }

    #logo{
        height: 100px;
        width: 100px;
        background-color: white;
        border-radius: 100%;
        cursor: pointer;
        transition: all 0.5s ease-out;
    }
    #logo:hover{
        transform: scale(1.10);
    }

    .material-icons{
        font-size: 40px;
        color: white;
        cursor: pointer;
        transition: all 0.5s ease-out;
        margin: 5px;
    }
    .material-icons:hover{
        transform: scale(1.2);
    }
</style>