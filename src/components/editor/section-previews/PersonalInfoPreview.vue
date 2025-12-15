<script setup lang="ts">
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <div data-page-break="item">
    <div class="personalInfoTopWrapper" >
      <h2 class="previewFullName">{{editorStore.formData.full_name}}</h2>
      <h3 class="previewTitle text-primary">{{editorStore.formData.position_title}}</h3>
      <div v-if="editorStore.hasContactData" class="contactInformationWrapper">
        <div v-if="editorStore.formData.phone" class="contactInformation">
          <q-icon name="phone"/>
          <span>{{editorStore.formData.phone}}</span>
        </div>
        <div v-if="editorStore.formData.email" class="contactInformation">
          <q-icon name="mail"/>
          <span>{{editorStore.formData.email}}</span>
        </div>
        <div v-if="editorStore.formData.location" class="contactInformation">
          <q-icon name="public"/>
          <span>{{editorStore.formData.location}}</span>
        </div>
      </div>
    </div>
    <template v-if="editorStore.formData.description">
      <q-separator spaced="4pt"/>
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
  font-size: 24pt;
  font-weight: 600;
}

.previewTitle {
  font-size: 18pt;
  font-weight: 400;
  margin-bottom: 8pt;
}

.contactInformationWrapper {
  display: flex;
  gap: 30pt;

}

.contactInformation {
  align-items: center;
  display: flex;
  font-size: 10pt;
  font-weight: 300;
  gap: 6pt;
}

.previewDescription {
  font-size: 8pt;
  font-weight: 300;
  margin: 0;
  text-align: justify;
}
</style>