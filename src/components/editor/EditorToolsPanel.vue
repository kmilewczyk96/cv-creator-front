<script setup lang="ts">
import sections from "@/faker/sections.ts";
import {useEditorStore} from "@/stores/editorStore.ts";

const editorStore = useEditorStore();
</script>

<template>
  <q-card bordered class="editorToolsPanel" flat square>
    <q-list>
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
    <q-separator dark/>
    <q-list>
      <q-item clickable dark>
        <q-item-section avatar>
          <q-avatar
            color="info"
            icon="download"
            rounded
            textColor="white"
          />
        </q-item-section>
        <q-item-section class="text-capitalize">Download</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<style scoped>
.editorToolsPanel {
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
  padding-top: 9.6rem;
  width: 24rem;
}

.activeSectionPanel {
  background: var(--color-blue-900);
  color: var(--color-blue-000);
  font-weight: 500;
}
</style>
