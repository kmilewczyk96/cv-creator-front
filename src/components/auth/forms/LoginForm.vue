<script setup lang="ts">

</script>

<template>
  <q-form>
    <div class="formInputs">
      <q-input model-value="" label="Email" outlined type="email"/>
      <q-input model-value="" label="Password" outlined type="password"/>
      <p class="cursor-pointer text-info text-right no-margin">Forgot password?</p>
    </div>
    <q-btn
      color="primary"
      icon="login"
      label="Log in"
      unelevated
    />
  </q-form>
</template>

<style scoped>
</style>
