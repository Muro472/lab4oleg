<script setup lang="ts">
import { ref, Ref, defineProps, watchEffect, defineEmits, watch } from 'vue';

const props = defineProps<{
  propMaxPages: number;
  propCurrentPage: number;
}>();

const emit = defineEmits<{
  (eventName: 'changed', newValue: number): void;
}>();

let curentValue: Ref<number> = ref(0);

let recentlyChanged = false;

watchEffect(() => {
  recentlyChanged = true;
  curentValue.value = props.propCurrentPage;
});

watch(
  () => curentValue.value,
  (val) => {
    if (recentlyChanged) {
      emit('changed', val);
      return;
    }
    recentlyChanged = false;
  }
);
</script>

<template>
  <div>
    <q-pagination
      v-if="props.propMaxPages > 1"
      v-model="curentValue"
      :max="props.propMaxPages"
      :max-pages="10"
      direction-links
      flat
      color="grey"
      active-color="primary"
    />
  </div>
</template>
