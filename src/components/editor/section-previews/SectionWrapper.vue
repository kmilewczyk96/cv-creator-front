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
    <h3 class="sectionTitle">{{props.title}}</h3>
    <q-separator style="margin-bottom: 1rem;"/>
    <slot/>
  </section>
</template>

<style scoped>
.sectionTitle {
  color: var(--q-primary);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: capitalize;
}
</style>
