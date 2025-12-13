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
          activeClass="activeSectionPanel"
          clickable
          dark
          @click="() => editorStore.setCurrentSection(section.name)"
        >
          <q-item-section avatar>
            <q-avatar
              :color="section.name === editorStore.currentSection ? 'secondary' : 'info'"
              :icon="section.icon"
              rounded
              :textColor="section.name === editorStore.currentSection ? 'primary' : 'white'"
            />
          </q-item-section>
          <q-item-section class="text-capitalize">{{section.name}}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-card>
</template>

<style scoped>
.mainWrapper {
  background: linear-gradient(
    120deg,
    var(--color-gray-900) 0%,
    var(--color-gray-800) 25%,
    var(--color-gray-900) 60%,
    var(--color-gray-900)
  );
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
  width: 24rem;
}

.activeSectionPanel {
  background: var(--color-blue-900);
  color: var(--color-blue-000);
  font-weight: 500;
}
</style>
