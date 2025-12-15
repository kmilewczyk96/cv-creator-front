<script setup lang="ts">
import SectionWrapper from "@/components/editor/section-previews/SectionWrapper.vue";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <SectionWrapper title="Work History">
    <q-list class="globalCVEntryList">
      <template v-for="job in editorStore.formData.experience_formset">
        <div
          v-if="job.title || job.start_date || job.end_date || job.company || job.description"
          class="globalCVEntryWrapper"
          data-page-break="item"
        >
          <div class="globalCVEntryHeaderWrapper">
            <p v-if="job.title" class="globalCVEntryHeader">{{job.title}}</p>
            <p
              v-if="job.start_date || job.end_date"
              class="jobTimeRange"
            >{{job.start_date}} - {{job.is_ongoing ? 'present' : job.end_date}}
            </p>
          </div>
          <p v-if="job.company" class="globalCVEntrySubHeader">{{job.company}}</p>
          <p v-if="job.description" v-html="job.description" class="globalCVEntryDescription globalTextArea"/>
        </div>
      </template>
    </q-list>
  </SectionWrapper>
</template>

<style scoped>
</style>
