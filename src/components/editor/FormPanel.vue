<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";
import PersonalInfoForm from "@/components/editor/forms/PersonalInfoForm.vue";
import BaseFormset from "@/components/editor/forms/BaseFormset.vue";
import ExperienceForm from "@/components/editor/forms/ExperienceForm.vue";

const editorStore = useEditorStore();
</script>

<template>
  <q-card bordered class="mainWrapper bg-white" flat square>
    <h3 class="text-capitalize q-px-md q-py-lg">{{editorStore.currentSection}}</h3>
    <q-separator/>
    <PersonalInfoForm v-if="editorStore.currentSection === 'personal'"/>
    <BaseFormset v-else-if="editorStore.currentSection === 'experience'" v-slot="slotProps" section="experience">
      <ExperienceForm :form-data="slotProps.formData"/>
    </BaseFormset>
  </q-card>
</template>

<style scoped>
.mainWrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 30rem;
  width: 60rem;
}
</style>
