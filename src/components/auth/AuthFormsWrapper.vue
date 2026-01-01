<script setup lang="ts">
import {type Ref, ref} from "vue";
import LoginForm from "@/components/auth/forms/LoginForm.vue";
import RegisterForm from "@/components/auth/forms/RegisterForm.vue";


const authMode: Ref<"login" | "register"> = ref("login");
</script>

<template>
  <q-card flat id="authFormsWrapper">
    <q-tab-panels v-model="authMode">
      <q-tab-panel class="panelWrapper" name="login">
        <LoginForm class="authFormWrapper"/>
        <div class="altActionsWrapper">
          <p>Don't have an account yet? <a
              class="altAction"
              @click="authMode='register'"
            >Register</a>
          </p>
          <p>Don't want to create an account? <RouterLink
              class="altAction"
              to="/free-editor"
            >Create your CV anonymously</RouterLink>
          </p>
        </div>
      </q-tab-panel>
      <q-tab-panel class="panelWrapper" name="register">
        <RegisterForm class="authFormWrapper"/>
        <div class="altActionsWrapper">
          <p>Already have an account? <a
              class="altAction"
              @click="authMode='login'"
            >Log in</a>
          </p>
          <p>Don't want to create an account? <RouterLink
              class="altAction"
              to="/free-editor"
            >Create your CV anonymously</RouterLink>
          </p>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<style scoped>
#authFormsWrapper {
  width: 60rem;
}

#authFormTabsWrapper > :deep(.q-tabs__content) {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.panelWrapper {
  padding-block: 0;
}

.authFormWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3.2rem;

  & > :deep(.formInputs) {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-bottom: 2.4rem;
    width: 100%;
  }
}

.altActionsWrapper {
  color: var(--q-info);
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  gap: 0.8rem;
  justify-content: center;
  text-align: center;

  & p {
    margin-bottom: 0;
  }
}

.altAction {
  color: var(--q-primary);
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.3s;

  &:hover {
    color: var(--q-accent);
  }
}
</style>