<script setup lang="ts">
import { Item } from 'src/utils/types/MainApi';
import { defineProps } from 'vue';
import { capitalize } from 'src/composition/Capitalize';

const textShortener = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};

const props = defineProps<{
  item: Item;
  overlay: boolean;
}>();
</script>

<template>
  <div class="card">
    <!-- <div class="overlay" v-if="overlay">overlay</div> -->
    <div class="card-image">
      <q-img class="card-image-main" :src="item.imageUrl" :ratio="1" />
    </div>
    <q-separator vertical inset />
    <div class="card-info">
      <div class="card-info-head">
        <span class="text-h6">
          {{ capitalize(item.name) }}
        </span>
        <span class="text-h6"> {{ item.price }}$ </span>
      </div>
      <div class="card-info-desc">
        {{ textShortener(item.description, 180) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/LIstOfItemsStyle.scss';
</style>
