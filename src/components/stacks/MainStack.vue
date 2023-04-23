<script lang="ts" setup>
import MainLayout from 'src/layouts/MainLayout.vue';
import { reactive, watch, computed } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LoginOverlay from 'src/components/overlays/LoginOverlay.vue';
import { useOverlaysStore, stateTypeType } from 'src/stores/app/overlays';
import { useUserStore } from 'src/stores/app/user';
const userStore = useUserStore();

const overlaysStore = useOverlaysStore();

const loginClick = () => {
  overlaysStore.setOverlay('login');
};

const user = computed(() => userStore.getUser);

const state = reactive({
  dialog: false,

  dialogType: '' as stateTypeType,
});

watch(
  () => overlaysStore.getOverlay,
  (val) => {
    state.dialogType = val;
    if (val !== '') {
      state.dialog = true;
    } else {
      state.dialog = false;
    }
  }
);

watch(
  () => state.dialog,
  (val) => {
    if (val === false) {
      overlaysStore.setOverlay('');
    }
  }
);
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
        <div v-if="!user" class="login" @click="loginClick">
          Login
          <q-icon name="login" size="sm" />
        </div>
        <div class="logout" v-else @click="userStore.setUser(null)">
          <img
            class="logout-image"
            :src="user.avatar"
            style="margin-right: 5px"
          />
          Log out
          <q-icon name="logout" size="xs" style="margin-left: 5px" />
        </div>
      </div>
    </template>
    <template #main>
      <q-dialog v-model="state.dialog">
        <LoginOverlay />
      </q-dialog>
      <router-view name="MainStack" />
    </template>
  </MainLayout>
</template>

<style lang="scss" scoped>
@import 'src/css/MainStackStyle.scss';
</style>
