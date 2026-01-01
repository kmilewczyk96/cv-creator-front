<script setup lang="ts">

</script>

<template>
  <q-form>
    <div class="formInputs">
      <q-input model-value="" label="Full Name" outlined/>
      <q-input model-value="" label="Email" outlined type="email"/>
      <q-input model-value="" label="Password" outlined type="password"/>
      <q-input model-value="" label="Password Confirmation" outlined type="password"/>
    </div>
    <q-btn
      color="primary"
      icon="login"
      label="Register"
      unelevated
    />
  </q-form>
</template>

<style scoped>
</style>