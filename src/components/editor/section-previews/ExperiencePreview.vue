<script setup lang="ts">
import SectionWrapper from "@/components/editor/section-previews/SectionWrapper.vue";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <SectionWrapper title="Work History">
    <q-list class="jobList">
      <div v-for="job in editorStore.formData.experience_formset" class="jobWrapper">
        <div class="jobTitleWrapper">
          <p class="jobTitle">{{job.title}}</p>
          <p class="jobTimeRange">{{job.start_date}} - {{job.is_ongoing ? 'present' : job.end_date}}</p>
        </div>
        <p class="jobCompany">{{job.company}}</p>
        <p v-if="job.description.length !== 0" class="jobDescription">{{job.description}}</p>
      </div>
    </q-list>
  </SectionWrapper>
</template>

<style scoped>
.jobList {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.jobWrapper {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.jobTitleWrapper {
  align-items: flex-end;
  display: flex;
  font-size: 1.4rem;
  justify-content: space-between;
  margin-bottom: 0;
}

.jobTitle {
  font-weight: 600;
  margin-bottom: 0;
}

.jobTimeRange {
  margin-bottom: 0;
}

.jobCompany {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 0;
}

.jobDescription {
  font-size: 1rem;
  text-align: justify;
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>
