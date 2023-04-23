<script setup lang="ts">
import { reactive } from 'vue';
import { useUserStore } from 'src/stores/app/user';
import { MainApi } from 'src/utils/api/MainApi';
import { useOverlaysStore } from 'src/stores/app/overlays';

const userStore = useUserStore();
const overlaysStore = useOverlaysStore();

const state = reactive({
  email: '',
  password: '',
  showPassword: true,
  error: false,
});

const logInButtonClick = () => {
  const response = MainApi.logIn(state.email, state.password);

  if (typeof response === 'string') {
    state.error = true;
    return;
  }

  userStore.setUser(response);
  overlaysStore.setOverlay('');
};
</script>

<template>
  <div class="log_in_bg">
    <div class="main_layout">
      <div class="main_layout-logo">
        <q-icon name="account_circle" size="48px" />
      </div>
      <div class="main_layout-main_text">
        <div class="text-h6">Log in</div>
      </div>
      <div class="main_layout-text_field_1">
        <q-input
          @keyup:key.enter="logInButtonClick"
          v-model="state.email"
          label="Email"
          @keyup.enter="logInButtonClick"
          :error="state.error"
          :error-message="state.error ? 'Wrong email or password' : ''"
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>
      </div>
      <div class="main_layout-text_field_2">
        <q-input
          @keyup:key.enter="logInButtonClick"
          v-model="state.password"
          label="Password"
          :type="state.showPassword ? 'password' : 'text'"
          @keyup.enter="logInButtonClick"
          :error="state.error"
          :error-message="state.error ? 'Wrong email or password' : ''"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-if="state.password !== ''" v-slot:append>
            <q-icon
              @click="state.showPassword = !state.showPassword"
              :name="state.showPassword ? 'visibility' : 'visibility_off'"
            />
          </template>
        </q-input>
      </div>
      <div class="main_layout-log_in_button">
        <q-btn
          @click="logInButtonClick"
          class="q_button"
          color="primary"
          label="log in"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/overlays.scss';
</style>
