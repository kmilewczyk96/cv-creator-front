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

  // Utility: replicate an element shallowly (tag, classes, attributes)
  const shallowClone = (el: HTMLElement): HTMLElement => {
    const clone = document.createElement(el.tagName.toLowerCase());
    clone.className = el.className;
    // copy attributes
    for (const attr of Array.from(el.attributes)) {
      // Skip id to avoid duplicates
      if (attr.name === 'id') continue;
      clone.setAttribute(attr.name, attr.value);
    }
    return clone as HTMLElement;
  };

  const pageOverflows = (page: HTMLElement) => page.scrollHeight > page.clientHeight;

  // Append node to page, if overflow then move to a fresh page first
  const ensureAppendToPage = (node: HTMLElement, withNewPageIfNeeded = true) => {
    currentPage.appendChild(node);
    if (pageOverflows(currentPage) && withNewPageIfNeeded) {
      currentPage.removeChild(node);
      currentPage = makePage();
      pagesRoot.appendChild(currentPage);
      currentPage.appendChild(node);
    }
  };

  // Handle a section that contains breakable items
  const paginateSectionWithItems = (sectionEl: HTMLElement) => {
    const items = Array.from(sectionEl.querySelectorAll('[data-page-break="item"]')) as HTMLElement[];
    if (items.length === 0) {
      // fallback to block-level
      const sectionClone = sectionEl.cloneNode(true) as HTMLElement;
      ensureAppendToPage(sectionClone);
      return;
    }

    // Find header (keep-with-next) if present
    const header = sectionEl.querySelector('[data-page-break="keep-with-next"]') as HTMLElement | null;
    // Find the container that directly holds the items (assume same parent for all items)
    const itemParent = items[0].parentElement as HTMLElement;

    let isFirstSegment = true;
    let shell: HTMLElement | null = null;
    let shellItemContainer: HTMLElement | null = null;

    const startNewShell = (includeHeader: boolean) => {
      // Create outer shell based on the section element
      const outer = shallowClone(sectionEl);
      // Include header if needed
      if (includeHeader && header) {
        outer.appendChild(header.cloneNode(true));
      }
      // Create an item container based on the original parent
      const container = shallowClone(itemParent);
      outer.appendChild(container);
      shell = outer;
      shellItemContainer = container;
    };

    // Start with a fresh shell but only append it to page when we add the first item
    startNewShell(true);
    let shellAttached = false;

    for (const item of items) {
      const itemClone = item.cloneNode(true) as HTMLElement;

      // Ensure shell exists
      if (!shell || !shellItemContainer) {
        startNewShell(false); // subsequent shells have no header
        shellAttached = false;
      }

      shellItemContainer.appendChild(itemClone);

      if (!shellAttached) {
        // Try attaching shell with its first item; if it overflows, move both to a new page
        ensureAppendToPage(shell as HTMLElement);
        shellAttached = true;
      }

      if (pageOverflows(currentPage)) {
        // Remove the last item from current shell and move to a new page
        shellItemContainer.removeChild(itemClone);
        // If shell has no items, also remove the shell from page to keep header with next
        if (shellItemContainer.children.length === 0) {
          currentPage.removeChild(shell as HTMLElement);
        }

        // Start a new page and new shell (no header after first segment)
        currentPage = makePage();
        pagesRoot.appendChild(currentPage);

        startNewShell(false);
        shellAttached = false;
        shellItemContainer!.appendChild(itemClone);
        ensureAppendToPage(shell as HTMLElement);
        shellAttached = true;
      }
      // After placing at least one item, the segment is no longer the first
      if (isFirstSegment) isFirstSegment = false;
    }
  };

  for (const child of children) {
    const childEl = child as HTMLElement;
    // If the child contains breakable items, paginate inside it
    if (childEl.querySelector('[data-page-break="item"]')) {
      paginateSectionWithItems(childEl);
      continue;
    }

    // Otherwise treat as a single block
    const clone = childEl.cloneNode(true) as HTMLElement;
    ensureAppendToPage(clone);
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
