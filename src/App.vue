<script setup lang="ts">
import RootStack from 'src/components/stacks/RootStack.vue';

import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

watch(
  () => router.currentRoute.value.name,
  (val) => {
    console.log(val);
  }
);
</script>

<template>
  <RootStack />
</template>
