<script setup lang="ts">
import SectionWrapper from "@/components/editor/section-previews/SectionWrapper.vue";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <SectionWrapper title="Skills">
    <p v-html="editorStore.formData.skills" class="skillsPreview globalTextArea no-margin"/>
  </SectionWrapper>
</template>

<style scoped>
.skillsPreview {
  font-size: 8pt;
}
</style>