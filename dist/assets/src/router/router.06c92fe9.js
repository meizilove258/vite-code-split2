import { _ as t } from "../../vite/preload-helper.4d59b9bd.js";
import { f as o, g as e } from "../../vendor.03434855.js";
const _ = o({
  history: e(),
  routes: [
    { path: "/", redirect: "/about" },
    {
      path: "/about",
      name: "about",
      component: () =>
        t(
          () => import("../pages/about.1ee57f65.js"),
          ["assets/src/pages/about.1ee57f65.js", "assets/vendor.03434855.js"]
        ),
    },
    {
      path: "/help",
      name: "help",
      component: () =>
        t(
          () => import("../pages/help.2a1ba544.js"),
          [
            "assets/src/pages/help.2a1ba544.js",
            "assets/vite/preload-helper.4d59b9bd.js",
            "assets/vendor.03434855.js",
          ]
        ),
    },
  ],
});
export { _ as r };
