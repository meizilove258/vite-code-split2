import { _ as r } from "../../vite/preload-helper.4d59b9bd.js";
import {
  u as a,
  b as l,
  o as _,
  d as c,
  e as o,
  F as u,
} from "../../vendor.03434855.js";
const i = o("div", null, " help 2 ", -1),
  h = {
    __name: "help",
    setup(p) {
      const t = a(),
        n = l();
      console.log(t), console.log(n);
      function s() {
        r(() => import("../foo.2b68bd11.js"), []).then(({ default: e }) => e);
      }
      return (e, m) => (
        _(), c(u, null, [o("button", { onClick: s }, "\u6309\u94AE"), i], 64)
      );
    },
  };
export { h as default };
