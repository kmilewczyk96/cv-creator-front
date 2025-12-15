<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <div>
    <p class="previewFooter">{{editorStore.formData.footer}}</p>
  </div>
</template>

<style scoped>
.previewFooter {
  color: var(--q-info);
  font-size: 6pt;
  font-weight: 400;
  text-align: center;
}
</style>