<script setup lang="ts">
import { Item } from 'src/utils/types/MainApi';
import { defineProps } from 'vue';

const props = defineProps<{
  item: Item;
}>();
</script>

<template>
  <div class="card">
    <div class="card-image">
      <q-img class="card-image-main" :src="item.imageUrl" :ratio="1" />
    </div>
    <div class="card-separator"></div>
    <div class="card-info"></div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/LIstOfItemsStyle.scss';
</style>
