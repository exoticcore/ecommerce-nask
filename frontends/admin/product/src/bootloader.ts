import { createApp } from 'vue';
import App from './App.vue';

import { createRedux } from './redux/storePlugin';
import { store } from 'store/Store';
import router from './router';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import * as BiIcons from 'oh-vue-icons/icons/bi';
import * as FaIcons from 'oh-vue-icons/icons/fa';
import * as IoIcons from 'oh-vue-icons/icons/io';
import * as LaIcons from 'oh-vue-icons/icons/la';

import Vue3ColorPicker from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';

const Fa = Object.values({ ...FaIcons });
const Bi = Object.values({ ...BiIcons });
const Io = Object.values({ ...IoIcons });
const La = Object.values({ ...LaIcons });

addIcons(...Fa, ...Bi, ...Io, ...La);

import 'main/index.scss';

const mount = (
  el: string | Element,
  args?: { pathname: string; navigate: (path: string) => void }
) => {
  const app = createApp(App);

  if (args) {
    router.replace(args.pathname);
  }

  app
    .use(router)
    .use(createRedux(store))
    .use(Vue3ColorPicker)
    .component('v-icon', OhVueIcon)
    .mount(el);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_product-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
