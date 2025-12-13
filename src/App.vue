<script setup lang="ts">
import FormPanel from "@/components/editor/FormPanel.vue";
import Preview from "@/components/editor/Preview.vue";
import SectionsPanel from "@/components/editor/SectionsPanel.vue";
</script>

<template>
  <div id="mainWrapper">
    <SectionsPanel/>
    <FormPanel/>
    <Preview/>
  </div>
</template>

<style scoped>
#mainWrapper {
  display: flex;
  height: 100vh;
  overflow: hidden; /* prevent page scroll; children manage their own scroll */
  max-width: 180rem;
  margin-inline: auto;
}
</style>
