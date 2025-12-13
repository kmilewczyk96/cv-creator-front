<script setup lang="ts">
import SectionWrapper from "@/components/editor/section-previews/SectionWrapper.vue";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <SectionWrapper title="Education">
    <q-list class="educationList">
      <template v-for="education in editorStore.formData.education_formset">
        <div
          v-if="education.title || education.start_date || education.end_date || education.school || education.description"
          class="educationWrapper"
          data-page-break="item"
        >
          <div class="educationTitleWrapper">
            <p v-if="education.title" class="educationTitle">{{education.title}}</p>
            <p
              v-if="education.start_date || education.end_date"
              class="educationTimeRange"
            >{{education.start_date}} - {{education.is_ongoing ? 'present' : education.end_date}}
            </p>
          </div>
          <p v-if="education.school" class="educationCompany">{{education.school}}</p>
          <p v-if="education.description" class="educationDescription">{{education.description}}</p>
        </div>
      </template>
    </q-list>
  </SectionWrapper>
</template>

<style scoped>
.educationList {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.educationWrapper {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.educationTitleWrapper {
  align-items: flex-end;
  display: flex;
  font-size: 1.4rem;
  justify-content: space-between;
  margin-bottom: 0;
}

.educationTitle {
  font-weight: 600;
  margin-bottom: 0;
}

.educationTimeRange {
  margin-bottom: 0;
}

.educationCompany {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 0;
}

.educationDescription {
  font-size: 1rem;
  text-align: justify;
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>
