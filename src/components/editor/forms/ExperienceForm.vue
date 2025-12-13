<script setup lang="ts">
import type {PropType} from "vue";
import type IExperienceForm from "@/interfaces/experienceForm.ts";

const props = defineProps({
  formData: {
    type: Object as PropType<IExperienceForm>,
    required: true
  }
});
</script>

<template>
  <q-form class="experienceForm">
    <q-input v-model="props.formData.title" class="span2" label="Position" outlined/>
    <q-input v-model="props.formData.company" class="span2" label="Company" outlined/>
    <q-input v-model="props.formData.start_date" label="Start Date" outlined type="date"/>
    <q-input
      v-model="props.formData.end_date"
      :disable="props.formData.is_ongoing"
      label="End Date"
      outlined
      type="date"
    />
    <q-toggle v-model="props.formData.is_ongoing" label="Current position"/>
    <q-input v-model="props.formData.description" class="span2" label="Description" outlined type="textarea"/>
  </q-form>
</template>

<style scoped>
.experienceForm {
  column-gap: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
  width: 100%;
}

.span2 {
  grid-column: 1/3;
}
</style>
