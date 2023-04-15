<script setup lang="ts">
import ListOfItemsLayout from 'src/layouts/ListOfItemsLayout.vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PaginationComponent from 'src/components/general/PaginationComponent.vue';
import ListOfItemsitemComponent from 'src/components/general/ListOfItemsitemComponent.vue';
import { reactive, onMounted } from 'vue';
import { MainApi } from 'src/utils/api/MainApi';
import { Item } from 'src/utils/types/MainApi';

const state = reactive({
  items: [] as Item[],
  basket: [],
  pagination: {
    page: 1,
    size: 6,
    total: 0,
  },
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

onMounted(getData);
</script>

<template>
  <ListOfItemsLayout>
    <template #basket>
      <div class="basket">
        <div class="basket-drag">
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
