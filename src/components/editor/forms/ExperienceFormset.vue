<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import ExperienceForm from "@/components/editor/forms/ExperienceForm.vue";
import type IExperienceForm from "@/interfaces/experienceForm.ts";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();

const addExperienceFormBtn = ref<any>(null);

async function handleAddExperienceForm() {
  const newForm: IExperienceForm = {
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    is_ongoing: false,
  }
  editorStore.addExperienceForm(newForm);
  await nextTick();
  scrollToAddButton();
}

function scrollToAddButton() {
  const target = addExperienceFormBtn.value.$el;
  target.scrollIntoView({ block: "start" });
}

onMounted(() => {
  scrollToAddButton();
});
</script>

<template>
  <div id="experienceFormsetWrapper" class="globalFormWrapper">
    <q-list v-if="editorStore.formData.experience_forms.length !== 0" class="experienceFormset">
      <template v-for="form in editorStore.formData.experience_forms">
        <q-item class="no-padding">
          <ExperienceForm :form-data="form"/>
        </q-item>
      </template>
    </q-list>
    <p v-else class="text-info text-center">Add first item to reveal Experience section.</p>

    <q-btn
      color="primary"
      icon="add"
      label="Add"
      ref="addExperienceFormBtn"
      unelevated
      @click="handleAddExperienceForm"
    />
  </div>
</template>

<style scoped>
.experienceFormset {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}
</style>
