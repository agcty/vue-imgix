// Import vue component
import component from './ImgixImg.vue';
import ImgixClient from "imgix-core-js";

// install function executed by Vue.use()
function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;
  var imgixClient = new ImgixClient({
    //just a sample domain right now, in a real case scenario this should be retrieved somewhere
    domain: options.baseURL
    // Do not use signed URLs with `secureURLToken` on the client side,
    // as this would leak your token to the world. Signed URLs should
    // be generated on the server.
  });

  Vue.prototype.$imgixClient = imgixClient;
  Vue.component('ImgixImg', component);
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// Export component by default
export default component;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
