<script setup lang="ts">
import ExperiencePreview from "@/components/editor/section-previews/ExperiencePreview.vue";
import PersonalInfoPreview from "@/components/editor/section-previews/PersonalInfoPreview.vue";
import {useEditorStore} from "@/stores/editorStore.ts";
import EducationPreview from "@/components/editor/section-previews/EducationPreview.vue";
import PaginatedPreview from "@/components/editor/PaginatedPreview.vue";
import { computed } from 'vue';

const editorStore = useEditorStore();
// create a lightweight watch key to trigger re-pagination on data changes
const watchKey = computed(() => JSON.stringify({
  full_name: editorStore.formData.full_name,
  position_title: editorStore.formData.position_title,
  phone: editorStore.formData.phone,
  email: editorStore.formData.email,
  location: editorStore.formData.location,
  description: editorStore.formData.description,
  exp: editorStore.formData.experience_formset,
  edu: editorStore.formData.education_formset,
}));
</script>

<template>
  <PaginatedPreview :watch-key="watchKey">
    <PersonalInfoPreview/>
    <ExperiencePreview v-if="editorStore.formData.experience_formset.length !== 0"/>
    <EducationPreview v-if="editorStore.formData.education_formset.length !== 0"/>
  </PaginatedPreview>
</template>

<style scoped>
</style>
