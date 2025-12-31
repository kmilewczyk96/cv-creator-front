<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";
import PersonalInfoForm from "@/components/editor/forms/PersonalInfoForm.vue";
import BaseFormset from "@/components/editor/forms/BaseFormset.vue";
import ExperienceForm from "@/components/editor/forms/ExperienceForm.vue";
import EducationForm from "@/components/editor/forms/EducationForm.vue";
import FooterForm from "@/components/editor/forms/FooterForm.vue";
import SkillsForm from "@/components/editor/forms/SkillsForm.vue";

const editorStore = useEditorStore();
</script>

<template>
  <q-card bordered class="formPanel bg-white" flat square>
    <h3 class="text-capitalize q-px-md q-py-lg">{{editorStore.currentSection}}</h3>
    <q-separator/>
    <PersonalInfoForm v-show="editorStore.currentSection === 'personal'"/>
    <BaseFormset v-show="editorStore.currentSection === 'experience'" v-slot="slotProps" section="experience">
      <!--@vue-ignore-->
      <ExperienceForm :formData="slotProps.formData"/>
    </BaseFormset>
    <BaseFormset v-show="editorStore.currentSection === 'education'" v-slot="slotProps" section="education">
      <!--@vue-ignore-->
      <EducationForm :formData="slotProps.formData"/>
    </BaseFormset>
    <SkillsForm v-show="editorStore.currentSection === 'skills'"/>
    <FooterForm v-show="editorStore.currentSection === 'footer'"/>
  </q-card>
</template>

<style scoped>
.formPanel {
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  width: 100%;
}
</style>
