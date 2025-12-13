<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from 'vue';

const props = defineProps<{
  // Changing this value triggers re-pagination (because slot content is reactive)
  watchKey?: string
}>();

const stagingRef = ref<HTMLDivElement | null>(null);
const pagesRootRef = ref<HTMLDivElement | null>(null);

async function paginate() {
  await nextTick();
  const staging = stagingRef.value;
  const pagesRoot = pagesRootRef.value;
  if (!staging || !pagesRoot) return;

  // Clear previous pages
  pagesRoot.innerHTML = '';

  // Create first page
  let pageIndex = 0;
  const makePage = () => {
    const page = document.createElement('div');
    page.className = 'a4-page';
    // Accessibility: expose each page as a labeled region for screen readers
    page.setAttribute('role', 'region');
    page.setAttribute('aria-label', `Page ${pageIndex + 1}`);
    pageIndex++;
    return page;
  };

  let currentPage = makePage();
  pagesRoot.appendChild(currentPage);

  const children = Array.from(staging.children) as HTMLElement[];
  for (const child of children) {
    const clone = child.cloneNode(true) as HTMLElement;
    currentPage.appendChild(clone);

    // If overflow, move element to a new page
    const overflows = currentPage.scrollHeight > currentPage.clientHeight;
    if (overflows) {
      currentPage.removeChild(clone);
      // add a spacer between pages via CSS gap by wrapping pages in flex column
      currentPage = makePage();
      pagesRoot.appendChild(currentPage);
      currentPage.appendChild(clone);
    }
  }
}

onMounted(paginate);
watch(() => props.watchKey, paginate);
</script>

<template>
  <!-- Staging area renders live slot content but is kept off-screen. We clone from it into pages. -->
  <div class="previewWrapper q-py-xl">
    <div
      ref="stagingRef"
      class="a4-page staging"
      aria-hidden="true"
      role="presentation"
      inert
      tabindex="-1"
    >
      <slot/>
    </div>
    <div ref="pagesRootRef" class="pagesRoot" role="document" aria-label="Preview pages"></div>
  </div>
  
</template>

<style>
.previewWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: max(30rem, 100vh);
  overflow: scroll;
  padding-inline: 0.5rem;
}

.staging {
  position: absolute;
  opacity: 0;
  left: 0;
  top: 0;
  z-index: -999;
  overflow: hidden;
}

.pagesRoot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20mm; /* gap between rendered pages */
  width: 100%;
}

.a4-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  padding: 20mm;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #ddd;
  overflow: hidden;
}

/* Optional: better print rendering */
@media print {
  .staging { display: none !important; }
  .previewWrapper { gap: 0; }
  .a4-page {
    box-shadow: none;
    border: none;
    margin: 0;
    page-break-after: always;
  }
  .a4-page:last-child { page-break-after: auto; }
}
</style>
