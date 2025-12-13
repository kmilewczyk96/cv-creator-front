<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";
import PersonalInfoForm from "@/components/editor/forms/PersonalInfoForm.vue";
import ExperienceFormset from "@/components/editor/forms/ExperienceFormset.vue";

const editorStore = useEditorStore();
</script>

<template>
  <q-card bordered class="mainWrapper bg-white" flat square>
    <h3 class="text-capitalize q-px-md q-py-lg">{{editorStore.currentSection}}</h3>
    <q-separator/>
    <PersonalInfoForm v-if="editorStore.currentSection === 'personal'"/>
    <ExperienceFormset v-if="editorStore.currentSection === 'experience'"/>
  </q-card>
</template>

<style scoped>
.mainWrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 30rem;
  width: 60rem;
  overflow: hidden; /* contain scrolling inside inner form wrapper */
}
</style>
