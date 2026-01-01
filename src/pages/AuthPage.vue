<script setup lang="ts">
import AuthFormsWrapper from "@/components/auth/AuthFormsWrapper.vue";
</script>

<template>
  <q-card id="authPage" square>
    <div id="authPageLeft">
      <div>
        <h1>CV Creator</h1>
        <h2 class="q-mb-lg">- Build professional CVs with ease -</h2>

        <div class="features q-mb-lg">
          <h5>Features:</h5>
          <ul>
            <li>Free to use, no hidden costs</li>
            <li>Template with live print preview</li>
            <li>Unlimited PDF exports</li>
          </ul>
        </div>

        <div class="features">
          <h5>Registered only:</h5>
          <ul>
            <li>Save your work and access it anytime, anywhere</li>
            <li>Manage your existing CVs: edit, duplicate, rename</li>
          </ul>
        </div>
      </div>
    </div>
    <div id="authPageRight">
      <AuthFormsWrapper/>
    </div>
  </q-card>
</template>

<style scoped>
#authPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  margin-inline: auto;
  max-width: 256rem;
}

#authPageLeft {
  align-items: center;

  background: linear-gradient(
    235deg,
    var(--q-dark),
    hsl(from var(--q-primary) h s l / 0.8),
    var(--q-dark)
  ), url("/src/assets/images/bg.jpg");

  background-size: cover;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  & h1 {
    font-size: 8rem;
    font-weight: 600;
    letter-spacing: 0.1ch;
    margin-bottom: 1.2rem;
    text-transform: uppercase;
  }
  & h2 {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.25ch;
  }
}

.features {
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  gap: 0.8rem;

  & h5 {
    font-size: 1.8rem;
    letter-spacing: 0.5ch;
    text-align: center;
    text-transform: uppercase;
  }
  & ul {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    list-style: inside;
    padding-inline: 1em;

    & > li {
      margin-inline: auto;
    }
  }
}

#authPageRight {
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: center;
}
</style>