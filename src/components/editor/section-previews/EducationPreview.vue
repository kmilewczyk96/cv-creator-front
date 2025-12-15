<script setup lang="ts">
import SectionWrapper from "@/components/editor/section-previews/SectionWrapper.vue";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <SectionWrapper title="Education">
    <q-list class="globalCVEntryList">
      <template v-for="education in editorStore.formData.education_formset">
        <div
          v-if="education.title || education.start_date || education.end_date || education.school || education.description"
          class="globalCVEntryWrapper"
          data-page-break="item"
        >
          <div class="globalCVEntryHeaderWrapper">
            <p v-if="education.title" class="globalCVEntryHeader">{{education.title}}</p>
            <p v-if="education.start_date || education.end_date">
              {{education.start_date}} - {{education.is_ongoing ? 'present' : education.end_date}}
            </p>
          </div>
          <p v-if="education.school" class="globalCVEntrySubHeader">{{education.school}}</p>
          <p
            v-if="education.description"
            v-html="education.description"
            class="globalCVEntryDescription globalTextArea"
          />
        </div>
      </template>
    </q-list>
  </SectionWrapper>
</template>

<style scoped>
</style>
