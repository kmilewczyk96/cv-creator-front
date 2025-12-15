<script setup lang="ts">
const props = defineProps({
  title: {
    required: true,
    type: String,
  }
});
</script>

<template>
  <section>
    <div data-page-break="keep-with-next" style="margin-bottom: 4pt;">
      <h3 class="sectionTitle">{{props.title}}</h3>
      <q-separator/>
    </div>
    <slot/>
  </section>
</template>

<style scoped>
.sectionTitle {
  color: var(--q-primary);
  font-size: 12pt;
  font-weight: 600;
  line-height: 1;
}
</style>
