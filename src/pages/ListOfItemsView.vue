<script setup lang="ts">
import ListOfItemsLayout from 'src/layouts/ListOfItemsLayout.vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PaginationComponent from 'src/components/general/PaginationComponent.vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ListOfItemsitemComponent from 'src/components/general/ListOfItemsitemComponent.vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ListOfItemsBascketItemComponent from 'src/components/general/ListOfItemsBascketItemComponent.vue';
import { reactive, onMounted } from 'vue';
import { MainApi } from 'src/utils/api/MainApi';
import { Item } from 'src/utils/types/MainApi';
import { BuscketItem } from 'src/utils/types/General';

const state = reactive({
  items: [] as Item[],
  pagination: {
    page: 1,
    size: 6,
    total: 0,
  },
});

const basket = reactive({
  items: [] as BuscketItem[],
  isPrime: false,
});

const getData = () => {
  const response = MainApi.getItems(
    state.pagination.page,
    state.pagination.size
  );

  if (response) {
    state.items = response.content;
    state.pagination.total = response.totalPages;
  }
};

const paginationChanged = (page: number) => {
  state.pagination.page = page;
  getData();
};

const startDrag = (event: DragEvent, item: Item) => {
  if (!event.dataTransfer) return;

  event.dataTransfer.effectAllowed = 'copy';
  event.dataTransfer.dropEffect = 'none';

  event.dataTransfer.setData('id', item.id);
  basket.isPrime = true;
};

const dragEnd = (event: DragEvent) => {
  if (!event.dataTransfer) return;
  event.dataTransfer.clearData();
  basket.isPrime = false;
};

const drop = (event: DragEvent) => {
  if (!event.dataTransfer) return;
  const id = event.dataTransfer.getData('id');

  const item = state.items.find((item) => item.id === id);

  const isAdded = basket.items.some((item) => item.item.id === id);

  if (item) {
    if (isAdded) {
      basket.items = basket.items.map((item) => {
        if (item.item.id === id) {
          item.count++;
        }
        return item;
      });
    } else {
      basket.items.push({
        item: item,
        count: 1,
      });
    }
  }
};

onMounted(getData);
</script>

<template>
  <q-page-sticky
    v-if="basket.items.length"
    position="bottom-right"
    :offset="[18, 18]"
  >
    <div class="floatingButton">
      Order, total:
      {{ basket.items.reduce((acc, item) => acc + item.count, 0) }}$
    </div>
  </q-page-sticky>
  <ListOfItemsLayout>
    <template #basket>
      <div class="basket">
        <div
          class="basket-prime"
          @drop="drop($event)"
          @dragenter.prevent
          @dragover.prevent
          v-if="basket.isPrime"
        >
          <div class="basket-prime-main">Drop heare!!!</div>
        </div>
        <div v-if="basket.items.length > 0" class="basket-items">
          <ListOfItemsBascketItemComponent
            v-for="(item, index) in basket.items"
            :key="index"
            class="basket-item"
            :item="item"
            @newCount="
              (val) => {
                item.count = val;
              }
            "
          />
        </div>
        <div v-else class="basket-drag">
          <span>Drag and drop items that you want</span>
          <q-icon name="local_grocery_store" size="lg"></q-icon>
        </div>
      </div>
    </template>
    <template #pool>
      <ListOfItemsitemComponent
        v-for="(item, index) in state.items"
        :key="index"
        :item="item"
        :overlay="index === 3"
        draggable="true"
        @dragstart="startDrag($event, item)"
        @dragend="dragEnd($event)"
      />
    </template>
    <template #pagination>
      <PaginationComponent
        :prop-current-page="state.pagination.page"
        :prop-max-pages="state.pagination.total"
        @changed="paginationChanged"
      />
    </template>
  </ListOfItemsLayout>
</template>

<style scoped lang="scss">
@import 'src/css/LIstOfItemsStyle.scss';
</style>
