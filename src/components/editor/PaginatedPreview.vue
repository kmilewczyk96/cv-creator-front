<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from 'vue';
import FooterPreview from '@/components/editor/section-previews/FooterPreview.vue';

const props = defineProps<{
  // Changing this value triggers re-pagination (because slot content is reactive)
  watchKey?: string
}>();

const stagingRef = ref<HTMLDivElement | null>(null);
const pagesRootRef = ref<HTMLDivElement | null>(null);
const previewWrapperRef = ref<HTMLDivElement | null>(null);

// simple debounce to avoid rebuilding on every keystroke
let debounceTimer: number | null = null;
function schedulePaginate(delay: number) {
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = window.setTimeout(() => {
    paginate();
  }, delay);
}

async function paginate() {
  await nextTick();
  const staging = stagingRef.value;
  const pagesRoot = pagesRootRef.value;
  if (!staging || !pagesRoot) return;

  // Preserve current scroll position of the scroll container (wrapper)
  const wrapper = previewWrapperRef.value;
  const savedScrollTop = wrapper ? wrapper.scrollTop : 0;

  // Clear previous pages
  pagesRoot.innerHTML = '';

  // Create first page
  let pageIndex = 0;
  const makePage = () => {
    // Create visual frame wrapper which holds preview-only effects
    const frame = document.createElement('div');
    frame.className = 'q-card q-card--bordered no-border-radius';

    // Create the actual printable page element
    const page = document.createElement('div');
    page.className = 'a4-page';
    // Accessibility: expose each page as a labeled region for screen readers
    page.setAttribute('role', 'region');
    page.setAttribute('aria-label', `Page ${pageIndex + 1}`);
    pageIndex++;

    // Attach footer placeholder immediately so pagination accounts for its height
    const footerTemplate = (stagingRef.value as HTMLDivElement | null)?.querySelector('#page-footer-template') as HTMLElement | null;
    if (footerTemplate) {
      const footerClone = footerTemplate.cloneNode(true) as HTMLElement;
      // mark and clean id to avoid duplicates
      footerClone.removeAttribute('id');
      footerClone.classList.add('page-footer');
      page.appendChild(footerClone);
    }

    // Compose frame > page, append frame to pagesRoot immediately
    frame.appendChild(page);
    return { frame, page } as unknown as HTMLElement; // for compatibility with existing typing
  };

  // Create first page; we keep currentPage pointing to the inner .a4-page
  const first = makePage() as unknown as any;
  // first is an object { frame, page }
  // @ts-ignore
  const firstFrame = (first.frame) ? first.frame : first;
  // @ts-ignore
  const firstPage = (first.page) ? first.page : first;
  pagesRoot.appendChild(firstFrame as HTMLElement);
  let currentPage = firstPage as HTMLElement;

  // Take only real content children, skip the footer template (it will be cloned per page)
  const children = (Array.from(staging.children) as HTMLElement[]).filter(
    el => el.id !== 'page-footer-template'
  );

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
    // Insert content before footer so footer stays as the last block
    const footerEl = currentPage.querySelector('.page-footer');
    if (footerEl) {
      currentPage.insertBefore(node, footerEl);
    } else {
      currentPage.appendChild(node);
    }
    if (pageOverflows(currentPage) && withNewPageIfNeeded) {
      currentPage.removeChild(node);
      const next = makePage() as unknown as any;
      // @ts-ignore
      const nextFrame = (next.frame) ? next.frame : next;
      // @ts-ignore
      const nextPage = (next.page) ? next.page : next;
      pagesRoot.appendChild(nextFrame as HTMLElement);
      currentPage = nextPage as HTMLElement;
      const newFooterEl = currentPage.querySelector('.page-footer');
      if (newFooterEl) {
        currentPage.insertBefore(node, newFooterEl);
      } else {
        currentPage.appendChild(node);
      }
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
    // @ts-ignore
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

      shellItemContainer!.appendChild(itemClone);

      if (!shellAttached) {
        // Try attaching shell with its first item; if it overflows, move both to a new page
        // @ts-ignore
        ensureAppendToPage(shell as HTMLElement);
        shellAttached = true;
      }

      if (pageOverflows(currentPage)) {
        // Remove the last item from current shell and move to a new page
        shellItemContainer!.removeChild(itemClone);
        // If shell has no items, also remove the shell from page to keep header with next
        if (shellItemContainer!.children.length === 0) {
          // @ts-ignore
          currentPage.removeChild(shell as HTMLElement);
        }

        // Start a new page and new shell (no header after first segment)
        const next2 = makePage() as unknown as any;
        // @ts-ignore
        const next2Frame = (next2.frame) ? next2.frame : next2;
        // @ts-ignore
        const next2Page = (next2.page) ? next2.page : next2;
        pagesRoot.appendChild(next2Frame as HTMLElement);
        currentPage = next2Page as HTMLElement;

        startNewShell(false);
        shellAttached = false;
        shellItemContainer!.appendChild(itemClone);
        // @ts-ignore
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

  // Restore scroll position (clamped to new max height)
  await nextTick();
  if (wrapper) {
    const maxScroll = Math.max(0, wrapper.scrollHeight - wrapper.clientHeight);
    wrapper.scrollTop = Math.min(savedScrollTop, maxScroll);
  }
}

onMounted(paginate);
watch(
    () => props.watchKey, () => schedulePaginate(50)
);
</script>

<template>
  <!-- Staging area renders live slot content but is kept off-screen. We clone from it into pages. -->
  <div class="previewWrapper q-py-xl" ref="previewWrapperRef">
    <div
      ref="stagingRef"
      class="a4-page staging"
      aria-hidden="true"
      role="presentation"
      inert
      tabindex="-1"
    >
      <slot/>
      <!-- Hidden footer template (cloned into each page). Keep inside staging so it stays reactive to store changes. -->
      <div id="page-footer-template">
        <FooterPreview/>
      </div>
    </div>
    <div ref="pagesRootRef" class="pagesRoot" role="document" aria-label="Preview pages"></div>
  </div>
  
</template>

<style>
.previewWrapper {
  overflow: auto;
  height: 100%;
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
  gap: 10mm; /* gap between rendered pages */
  width: 100%;
}

.a4-page {
  display: flex;
  flex-direction: column;
  gap: 16pt;
  line-height: 1.2;

  width: 210mm;
  height: 297mm;
  padding: 20mm 20mm 5mm;
  background-color: #ffffff;
  overflow: hidden;
}

.page-footer {
  margin-top: auto; /* stick footer to the bottom of the page */
  padding-top: 0.75rem;
}
</style>
