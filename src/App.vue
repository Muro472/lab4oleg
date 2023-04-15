<script setup lang="ts">
import MainStack from 'src/components/stacks/MainStack.vue';

import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

watch(
  () => router.currentRoute.value.name,
  (val) => {
    console.log('Home');
  }
);
</script>

<template>
  <MainStack />
</template>
