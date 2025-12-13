<script setup lang="ts">
import ExperiencePreview from "@/components/editor/section-previews/ExperiencePreview.vue";
import PersonalInfoPreview from "@/components/editor/section-previews/PersonalInfoPreview.vue";
import {useEditorStore} from "@/stores/editorStore.ts";
import EducationPreview from "@/components/editor/section-previews/EducationPreview.vue";

const editorStore = useEditorStore();
</script>

<template>
  <q-card class="a4-page">
    <PersonalInfoPreview/>
    <ExperiencePreview v-if="editorStore.formData.experience_formset.length !== 0"/>
    <EducationPreview v-if="editorStore.formData.education_formset.length !== 0"/>
  </q-card>
</template>

<style scoped>
.a4-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 210mm;
  height: 297mm;
  margin: auto;
  padding: 20mm;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #ddd;
  transform: scale(1.1);
}
</style>
