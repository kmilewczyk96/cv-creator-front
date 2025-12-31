<script setup lang="ts">
import MainNavigation from "@/components/navigation/MainNavigation.vue";
</script>

<template>
  <div id="mainAppWrapper">
    <MainNavigation/>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
#mainAppWrapper {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;

  & main {
    overflow: hidden;
  }
}
</style>
