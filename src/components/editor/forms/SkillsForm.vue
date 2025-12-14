<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";
import textEditorToolbar from "@/utils/textEditorToolbar.ts";

const editorStore = useEditorStore();
</script>

<template>
  <q-form
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    class="globalFormWrapper"
    spellcheck="false"
  >
    <q-editor
      v-model="editorStore.formData.skills"
      label="Skills"
      outlined
      placeholder="Describe your skills here"
      :toolbar="textEditorToolbar"
    />
  </q-form>
</template>

<style scoped>

</style>