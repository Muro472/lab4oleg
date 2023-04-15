<script lang="ts" setup>
import MainLayout from 'src/layouts/MainLayout.vue';
</script>

<template>
  <MainLayout>
    <template #header>
      <div class="q-pa-md q-gutter-sm head">
        <div>
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <template v-slot:separator>
              <q-icon size="1.2em" name="arrow_forward" color="white" />
            </template>
            <q-breadcrumbs-el label="Home" icon="home" />
            <q-breadcrumbs-el label="Components" icon="widgets" />
            <q-breadcrumbs-el label="Toolbar" />
          </q-breadcrumbs>
        </div>
        <div>logIn</div>
      </div>
    </template>
    <template #main>
      <router-view name="MainStack" />
    </template>
  </MainLayout>
</template>

<style lang="scss" scoped>
@import 'src/css/MainStackStyle.scss';
</style>
