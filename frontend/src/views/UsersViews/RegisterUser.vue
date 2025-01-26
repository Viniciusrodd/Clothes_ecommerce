<template>
    <div id="appRegister" style="height: 90vh;">
        <h1 class="title is-1">Registro de usuário</h1>
        <hr class="hr">
        <form @submit.prevent="submitForm">
            <input class="input is-hovered" type="text" name="name" id="iname" placeholder="Nome de usuário" autocomplete="off" required>
            <input class="input is-hovered" type="email" name="email" id="iemail" placeholder="Email de usuário" autocomplete="off" required>
            <input class="input is-hovered" type="text" name="password" id="ipassword" placeholder="Senha de usuário" autocomplete="off" required>

            <button class="button is-link is-light">Registrar</button>
        </form>
    </div>
</template>

<script>
export default {


}
</script>

<style>
    @import '../../styles/usersStyles/registerUser.css';
</style>