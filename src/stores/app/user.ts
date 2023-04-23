import { defineStore } from 'pinia';
import { User } from 'src/utils/types/MainApi';

export type stateTypeUser = null | User;

type stateType = {
  user: stateTypeUser;
};

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      user: null,
    } as stateType),

  getters: {
    getUser: (state: stateType) => state.user,
  },

  actions: {
    setUser(val: stateTypeUser) {
      this.user = val;
    },
  },
});
