<script setup lang="ts">
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {useQuasar} from "quasar";
import {nextTick} from "vue";
import sections from "@/faker/sections.ts";
import {useEditorStore} from "@/stores/editorStore.ts";


const $q = useQuasar();
const editorStore = useEditorStore();

async function handleExport() {
  // START SPINNER:
  $q.loading.show({
    delay: 0,
    message: "Preparing your PDF",
  });
  await nextTick();
  await new Promise(requestAnimationFrame);

  try {
    const pages = Array.from(document.querySelectorAll('.pagesRoot .a4-page')) as HTMLElement[];
    if (!pages.length) {
      console.warn('[Export] No pages found to export.');
      return;
    }

    // Wait for fonts (Roboto, Material Icons) to be ready
    // @ts-ignore
    if (document.fonts && document.fonts.ready) {
      await (document as any).fonts.ready;
    }

    // Ensure all images inside pages are loaded
    const images = pages.flatMap(p => Array.from(p.querySelectorAll('img')) as HTMLImageElement[]);
    await Promise.all(images.map(img => new Promise<void>(resolve => {
      if (img.complete) return resolve();
      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', () => resolve(), { once: true });
    })));

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const pageWidth = 210; // mm
    const pageHeight = 297; // mm

    // Render each A4 page to canvas with high scale for quality
    const scale = 4; // quality vs size trade-off
    for (let i = 0; i < pages.length; i++) {
      await new Promise(requestAnimationFrame);
      const node = pages[i];

      // @ts-ignore
      const canvas = await html2canvas(node, {
        scale,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        // Ensure the size matches the element's CSS size
        width: node!.offsetWidth,
        height: node!.offsetHeight,
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
      });

      const blob = await new Promise<Blob>((resolve) => canvas.toBlob(
          b => resolve(b!), 'image/jpeg', 0.98)
      );
      const imgData = await new Promise<string>((resolve) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result as string);
        fr.readAsDataURL(blob);
      });

      if (i > 0) pdf.addPage('a4', 'portrait');
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, "SLOW");
    }

    pdf.save('cv.pdf');
  } catch (e) {
    console.error('[Export] PDF export failed', e);
  } finally {
    $q.loading.hide()
  }
}
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
      <q-item clickable dark @click="handleExport">
        <q-item-section avatar>
          <q-avatar
            color="info"
            icon="download"
            rounded
            textColor="white"
          />
        </q-item-section>
        <q-item-section class="text-capitalize">Export</q-item-section>
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
