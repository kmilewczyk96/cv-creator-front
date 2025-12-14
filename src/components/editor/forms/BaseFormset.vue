<script setup lang="ts">
import {nextTick, onMounted, type PropType, ref} from "vue";
import {useEditorStore} from "@/stores/editorStore.ts";

const props = defineProps({
  section: {
    required: true,
    type: String as PropType<TSectionWithFormset>,
  }
});

const editorStore = useEditorStore();
const addNewFormBtn = ref<any>(null);

async function handleAddNewForm() {
  editorStore.addNewForm(props.section);
  await nextTick();
  scrollToAddButton();
}

function handleDelete(index: number) {
  editorStore.formData[`${props.section}_formset`].splice(index, 1);
}

function scrollToAddButton() {
  const target = addNewFormBtn.value.$el;
  target.scrollIntoView({ block: "start" });
}

onMounted(() => {
  scrollToAddButton();
});
</script>

<template>
  <div class="globalFormWrapper">
    <q-list v-if="editorStore.formData[`${props.section}_formset`].length !== 0" class="formset">
      <template v-for="(formData, index) in editorStore.formData[`${props.section}_formset`]">
        <div class="formItemWrapper">
          <slot :formData="formData"/>
          <q-btn color="negative" dense unelevated icon="delete" @click="() => handleDelete(index)"/>
        </div>
      </template>
    </q-list>
    <p v-else class="text-info text-center">Add first item to reveal {{props.section}} section.</p>

    <q-btn
      color="primary"
      icon="add"
      label="Add"
      ref="addNewFormBtn"
      unelevated
      @click="handleAddNewForm"
    />
  </div>
</template>

<style scoped>
.formset {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 2rem;
}

.formItemWrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
