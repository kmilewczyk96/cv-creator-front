<script setup lang="ts">
import SectionWrapper from "@/components/editor/section-previews/SectionWrapper.vue";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <SectionWrapper title="Work History">
    <q-list class="jobList">
      <template v-for="job in editorStore.formData.experience_formset">
        <div
          v-if="job.title || job.start_date || job.end_date || job.company || job.description"
          class="jobWrapper"
          data-page-break="item"
        >
          <div class="jobTitleWrapper">
            <p v-if="job.title" class="jobTitle">{{job.title}}</p>
            <p
              v-if="job.start_date || job.end_date"
              class="jobTimeRange"
            >{{job.start_date}} - {{job.is_ongoing ? 'present' : job.end_date}}
            </p>
          </div>
          <p v-if="job.company" class="jobCompany">{{job.company}}</p>
          <p v-if="job.description" class="jobDescription">{{job.description}}</p>
        </div>
      </template>
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
