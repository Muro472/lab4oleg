import { defineStore } from 'pinia';
export type stateTypeType = '' | 'login' | 'overview';
type stateType = {
  type: stateTypeType;
};

export const useOverlaysStore = defineStore('overlays', {
  state: () =>
    ({
      type: '',
    } as stateType),
  getters: {
    getOverlay: (state: stateType) => state.type,
  },
  actions: {
    setOverlay(val: stateTypeType) {
      this.type = val;
    },
  },
});
