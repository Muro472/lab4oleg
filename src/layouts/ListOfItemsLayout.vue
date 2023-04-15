<script setup lang="ts"></script>

<template>
  <div class="layout">
    <q-card class="layout-basket">
      <slot name="basket"></slot>
    </q-card>
    <q-card class="layout-pool">
      <q-card-section class="layout-pool-main">
        <slot name="pool"></slot>
      </q-card-section>
    </q-card>
    <div class="layout-pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/LIstOfItemsStyle.scss';
</style>
