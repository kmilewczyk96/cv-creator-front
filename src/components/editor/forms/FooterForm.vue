<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <q-form class="globalFormWrapper">
    <q-card bordered class="bg-yellow-1 flex flex-center q-pa-md" flat>
      <q-icon class="q-mb-sm" color="info" name="warning" size="3.2rem"/>
      <p class="text-center text-info">Please remember the importance of including necessary footer agreements, particularly data processing permissions under RODO (General Data Protection Regulation). Otherwise, your application may not be processed.</p>
    </q-card>
    <q-input v-model="editorStore.formData.footer" rows="16" label="Footer" outlined type="textarea"/>
  </q-form>
</template>

<style scoped>

</style>