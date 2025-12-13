<script setup lang="ts">
import FormPanel from "@/components/editor/FormPanel.vue";
import Preview from "@/components/editor/Preview.vue";
import EditorToolsPanel from "@/components/editor/EditorToolsPanel.vue";
</script>

<template>
  <div id="mainWrapper">
    <q-card class="editorLeftPanel">
      <EditorToolsPanel/>
      <FormPanel/>
    </q-card>
    <Preview/>
  </div>
</template>

<style scoped>
#mainWrapper {
  display: flex;
  gap: 6.4rem;
  height: 100vh;
  overflow: hidden; /* prevent page scroll; children manage their own scroll */
  max-width: 180rem;
  margin-inline: auto;
}

.editorLeftPanel {
  display: flex;
}
</style>
