import { RouteRecordRaw } from 'vue-router';
import { RouterNames } from 'src/utils/enums/RouterNames';
import { RouterLinks } from 'src/utils/enums/RouterLinks';

const routes: RouteRecordRaw[] = [
  {
    path: RouterLinks.ROOT,
    name: RouterNames.ROOT,
    redirect: RouterLinks.LIST_OF_ITEMS,
    components: {
      MainRootStack: () => import('components/stacks/MainStack.vue'),
    },
    children: [
      {
        path: RouterLinks.LIST_OF_ITEMS_ITEM,
        name: RouterNames.LIST_OF_ITEMS_ITEM,
        components: {
          LoggedUserMainStack: () => import('pages/ItemView.vue'),
        },
      },
      {
        path: RouterLinks.ORDER,
        name: RouterNames.ORDER,
        components: {
          LoggedUserMainStack: () => import('pages/OrderView.vue'),
        },
      },
      {
        path: RouterLinks.LIST_OF_ITEMS,
        name: RouterNames.LIST_OF_ITEMS,
        components: {
          MainStack: () => import('pages/ListOfItemsView.vue'),
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
