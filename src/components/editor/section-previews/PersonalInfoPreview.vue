<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <div>
    <div class="personalInfoTopWrapper">
      <h2 class="previewFullName">{{editorStore.formData.full_name}}</h2>
      <h3 class="previewTitle text-primary">{{editorStore.formData.position_title}}</h3>
      <div v-if="editorStore.hasContactData" class="contactInformationWrapper">
        <div v-if="editorStore.formData.phone.length !== 0" class="contactInformation">
          <q-icon name="phone"/>
          <span>{{editorStore.formData.phone}}</span>
        </div>
        <div v-if="editorStore.formData.email.length !== 0" class="contactInformation">
          <q-icon name="mail"/>
          <span>{{editorStore.formData.email}}</span>
        </div>
        <div v-if="editorStore.formData.location.length !== 0" class="contactInformation">
          <q-icon name="public"/>
          <span>{{editorStore.formData.location}}</span>
        </div>
      </div>
    </div>
    <template v-if="editorStore.formData.description.length !== 0">
      <q-separator style="margin-bottom: 1rem"/>
      <p class="previewDescription">
        {{editorStore.formData.description}}
      </p>
    </template>
  </div>
</template>

<style scoped>
.personalInfoTopWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.previewFullName {
  font-size: 3rem;
  font-weight: 600;
}

.previewTitle {
  font-size: 2.4rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.contactInformationWrapper {
  display: flex;
  gap: 4rem;
  margin-bottom: 1rem;
}

.contactInformation {
  align-items: center;
  display: flex;
  font-size: 1.2rem;
  font-weight: 300;
  gap: 0.5rem;
}

.previewDescription {
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 0;
  text-align: justify;
}
</style>