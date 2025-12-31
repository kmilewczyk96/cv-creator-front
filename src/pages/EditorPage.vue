<script setup lang="ts">

import EditorToolsPanel from "@/components/editor/EditorToolsPanel.vue";
import FormPanel from "@/components/editor/FormPanel.vue";
import Preview from "@/components/editor/Preview.vue";
</script>

<template>
<div id="editorPage">
  <q-card class="editorLeftPanel" square>
    <EditorToolsPanel/>
    <FormPanel/>
  </q-card>
  <Preview/>
</div>
</template>

<style scoped>
#editorPage {
  display: grid;
  gap: 2.4rem;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  margin-inline: auto;
  max-width: var(--max-content-width);
  overflow: hidden;
}

.editorLeftPanel {
  display: flex;
  overflow: auto;
}
</style>