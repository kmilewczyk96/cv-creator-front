<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <q-form class="globalFormWrapper">
    <q-input v-model="editorStore.formData.full_name" label="Full Name" outlined/>
    <q-input v-model="editorStore.formData.position_title" label="Title" outlined/>
    <q-input v-model="editorStore.formData.email" label="Email" outlined type="email"/>
    <q-input v-model="editorStore.formData.phone" label="Phone" outlined type="tel"/>
    <q-input v-model="editorStore.formData.location" label="Location" outlined/>
    <q-input v-model="editorStore.formData.description" label="Description" outlined type="textarea"/>
  </q-form>
</template>

<style scoped>

</style>
