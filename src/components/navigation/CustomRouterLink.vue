<script setup lang="ts">
const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  to: {
    required: true,
    type: String,
  }
});
</script>

<template>
  <RouterLink :to="props.to" activeClass="customRouterLinkActive" class="customRouterLink">{{props.label}}</RouterLink>
</template>

<style scoped>
.customRouterLink {
  all: unset;

  border: 1px solid transparent;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 0 0.5rem;
  transition: border-bottom-color 0.5s;

  &:hover {
    border-bottom-color: #fff;
  }
}

.customRouterLinkActive {
  border-bottom-color: #fff;
}
</style>