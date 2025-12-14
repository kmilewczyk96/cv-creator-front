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
  font-size: 0.8rem;
  font-weight: 300;
  text-align: center;
}
</style>