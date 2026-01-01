<script setup lang="ts">
import CustomRouterLink from "@/components/navigation/CustomRouterLink.vue";
import {useAuthStore} from "@/stores/authStore.ts";

const authStore = useAuthStore();
</script>

<template>
  <div v-if="authStore.isAuthenticated" id="mainNavigationWrapper">
    <div id="mainNavigationContentWrapper">
      <div>

      </div>
      <nav>
        <CustomRouterLink to="/" label="My CVs"/>
        <q-separator dark vertical/>
        <q-btn color="accent" label="Log out"/>
      </nav>
    </div>
  </div>
</template>

<style scoped>
#mainNavigationWrapper {
  background: var(--q-dark);
  color: #fff;
  padding: 0.5em 2em;
  width: 100%;
  z-index: 999;
}

#mainNavigationContentWrapper {
  display: flex;
  font-size: 1.6rem;
  justify-content: space-between;
  margin-inline: auto;
  width: var(--max-content-width);

  & nav {
    align-items: center;
    display: flex;
    gap: 2rem;
  }
}
</style>
