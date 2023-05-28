<script setup lang="ts">
import { BuscketItem } from 'src/utils/types/General';
import { defineProps, reactive, defineEmits, watch } from 'vue';
import { capitalize } from 'src/composition/Capitalize';

const props = defineProps<{
  item: BuscketItem;
}>();

const state = reactive({
  count: props.item.count,
});

watch(
  () => props.item.count,
  (val) => {
    state.count = val;
  }
);

const emit = defineEmits<{
  (event: 'newCount', val: number): void;
}>();

watch(
  () => state.count,
  (val) => {
    if (val > 99) {
      state.count = 99;
      return;
    }
    if (val < 1) {
      state.count = 1;
      return;
    }
    if (typeof val !== 'number') {
      state.count = 1;
      return;
    }
    emit('newCount', val);
  }
);
</script>

<template>
  <div class="basket-item">
    <div class="basket-item-image">
      <q-img
        class="basket-item-image-main"
        :src="item.item.imageUrl"
        :ratio="1"
      />
    </div>
    <div class="basket-item-info">
      <div class="basket-item-info-name">
        <span class="text-h6">{{ capitalize(item.item.name) }}</span>
      </div>
      <div class="basket-item-info-price">
        <span class="text-h6">{{ item.count * +item.item.price }}$</span>
        <div class="basket-item-info-price-select">
          <q-icon
            class="basket-item-info-price-select-icons"
            @click="state.count--"
            name="remove"
            size="sm"
          />
          <input
            type="text"
            v-model="state.count"
            size="2"
            class="basket-item-info-price-select-input"
            data-max-count="20"
          />
          <q-icon
            class="basket-item-info-price-select-icons"
            @click="state.count++"
            name="add"
            size="sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/LIstOfItemsStyle.scss';
</style>
