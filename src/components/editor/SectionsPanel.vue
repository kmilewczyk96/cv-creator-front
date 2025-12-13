<script setup lang="ts">
import sections from "@/faker/sections.ts";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <q-card bordered class="mainWrapper" flat square>
    <q-list padding>
      <template v-for="section in sections">
        <q-item
          :active="section.name === editorStore.currentSection"
          clickable
          @click="() => editorStore.setCurrentSection(section.name)"
        >
          <q-item-section avatar>
            <q-icon :name="section.icon"/>
          </q-item-section>
          <q-item-section>
            <p class="no-margin text-capitalize">{{section.name}}</p>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-card>
</template>

<style scoped>
.mainWrapper {
  background: linear-gradient(
    120deg,
    var(--color-gray-000) 0%,
    var(--color-gray-100) 25%,
    var(--color-gray-000) 60%,
    var(--color-gray-000)
  );
  min-height: 100vh;
  min-width: 30rem;
}
</style>
