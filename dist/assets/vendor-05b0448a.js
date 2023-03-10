function Dn(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function Wn(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = se(s) ? ao(s) : Wn(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (se(e)) return e;
    if (G(e)) return e;
  }
}
const co = /;(?![^(]*\))/g,
  uo = /:([^]+)/,
  fo = /\/\*.*?\*\//gs;
function ao(e) {
  const t = {};
  return (
    e
      .replace(fo, "")
      .split(co)
      .forEach((n) => {
        if (n) {
          const s = n.split(uo);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function zn(e) {
  let t = "";
  if (se(e)) t = e;
  else if (L(e))
    for (let n = 0; n < e.length; n++) {
      const s = zn(e[n]);
      s && (t += s + " ");
    }
  else if (G(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const ho =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  po = Dn(ho);
function sr(e) {
  return !!e || e === "";
}
const X = {},
  at = [],
  xe = () => {},
  go = () => !1,
  mo = /^on[^a-z]/,
  on = (e) => mo.test(e),
  qn = (e) => e.startsWith("onUpdate:"),
  ce = Object.assign,
  Qn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  _o = Object.prototype.hasOwnProperty,
  D = (e, t) => _o.call(e, t),
  L = Array.isArray,
  At = (e) => ln(e) === "[object Map]",
  bo = (e) => ln(e) === "[object Set]",
  B = (e) => typeof e == "function",
  se = (e) => typeof e == "string",
  Vn = (e) => typeof e == "symbol",
  G = (e) => e !== null && typeof e == "object",
  rr = (e) => G(e) && B(e.then) && B(e.catch),
  yo = Object.prototype.toString,
  ln = (e) => yo.call(e),
  vo = (e) => ln(e).slice(8, -1),
  Eo = (e) => ln(e) === "[object Object]",
  Yn = (e) =>
    se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Yt = Dn(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  cn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  xo = /-(\w)/g,
  Ne = cn((e) => e.replace(xo, (t, n) => (n ? n.toUpperCase() : ""))),
  wo = /\B([A-Z])/g,
  vt = cn((e) => e.replace(wo, "-$1").toLowerCase()),
  un = cn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  bn = cn((e) => (e ? `on${un(e)}` : "")),
  Ft = (e, t) => !Object.is(e, t),
  yn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  en = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  or = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let ps;
const Ro = () =>
  ps ||
  (ps =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let Me;
class Po {
  constructor(t = !1) {
    (this.detached = t),
      (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Me),
      !t && Me && (this.index = (Me.scopes || (Me.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Me;
      try {
        return (Me = this), t();
      } finally {
        Me = n;
      }
    }
  }
  on() {
    Me = this;
  }
  off() {
    Me = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this.active = !1);
    }
  }
}
function Co(e, t = Me) {
  t && t.active && t.effects.push(e);
}
const Jn = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  ir = (e) => (e.w & Ve) > 0,
  lr = (e) => (e.n & Ve) > 0,
  Oo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ve;
  },
  Ao = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        ir(r) && !lr(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~Ve),
          (r.n &= ~Ve);
      }
      t.length = n;
    }
  },
  An = new WeakMap();
let Ot = 0,
  Ve = 1;
const Tn = 30;
let ye;
const nt = Symbol(""),
  In = Symbol("");
class Xn {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Co(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ye,
      n = qe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ye),
        (ye = this),
        (qe = !0),
        (Ve = 1 << ++Ot),
        Ot <= Tn ? Oo(this) : gs(this),
        this.fn()
      );
    } finally {
      Ot <= Tn && Ao(this),
        (Ve = 1 << --Ot),
        (ye = this.parent),
        (qe = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ye === this
      ? (this.deferStop = !0)
      : this.active &&
        (gs(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function gs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let qe = !0;
const cr = [];
function Et() {
  cr.push(qe), (qe = !1);
}
function xt() {
  const e = cr.pop();
  qe = e === void 0 ? !0 : e;
}
function he(e, t, n) {
  if (qe && ye) {
    let s = An.get(e);
    s || An.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Jn())), ur(r);
  }
}
function ur(e, t) {
  let n = !1;
  Ot <= Tn ? lr(e) || ((e.n |= Ve), (n = !ir(e))) : (n = !e.has(ye)),
    n && (e.add(ye), ye.deps.push(e));
}
function Le(e, t, n, s, r, o) {
  const i = An.get(e);
  if (!i) return;
  let u = [];
  if (t === "clear") u = [...i.values()];
  else if (n === "length" && L(e)) {
    const c = or(s);
    i.forEach((d, a) => {
      (a === "length" || a >= c) && u.push(d);
    });
  } else
    switch ((n !== void 0 && u.push(i.get(n)), t)) {
      case "add":
        L(e)
          ? Yn(n) && u.push(i.get("length"))
          : (u.push(i.get(nt)), At(e) && u.push(i.get(In)));
        break;
      case "delete":
        L(e) || (u.push(i.get(nt)), At(e) && u.push(i.get(In)));
        break;
      case "set":
        At(e) && u.push(i.get(nt));
        break;
    }
  if (u.length === 1) u[0] && Mn(u[0]);
  else {
    const c = [];
    for (const d of u) d && c.push(...d);
    Mn(Jn(c));
  }
}
function Mn(e, t) {
  const n = L(e) ? e : [...e];
  for (const s of n) s.computed && ms(s);
  for (const s of n) s.computed || ms(s);
}
function ms(e, t) {
  (e !== ye || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const To = Dn("__proto__,__v_isRef,__isVue"),
  fr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Vn)
  ),
  Io = Zn(),
  Mo = Zn(!1, !0),
  So = Zn(!0),
  _s = Fo();
function Fo() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = W(this);
        for (let o = 0, i = this.length; o < i; o++) he(s, "get", o + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(W)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Et();
        const s = W(this)[t].apply(this, n);
        return xt(), s;
      };
    }),
    e
  );
}
function Zn(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && o === (e ? (t ? Yo : gr) : t ? pr : hr).get(s))
      return s;
    const i = L(s);
    if (!e && i && D(_s, r)) return Reflect.get(_s, r, o);
    const u = Reflect.get(s, r, o);
    return (Vn(r) ? fr.has(r) : To(r)) || (e || he(s, "get", r), t)
      ? u
      : ie(u)
      ? i && Yn(r)
        ? u
        : u.value
      : G(u)
      ? e
        ? mr(u)
        : Kt(u)
      : u;
  };
}
const No = ar(),
  jo = ar(!0);
function ar(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (gt(i) && ie(i) && !ie(r)) return !1;
    if (
      !e &&
      (!tn(r) && !gt(r) && ((i = W(i)), (r = W(r))), !L(n) && ie(i) && !ie(r))
    )
      return (i.value = r), !0;
    const u = L(n) && Yn(s) ? Number(s) < n.length : D(n, s),
      c = Reflect.set(n, s, r, o);
    return (
      n === W(o) && (u ? Ft(r, i) && Le(n, "set", s, r) : Le(n, "add", s, r)), c
    );
  };
}
function Ho(e, t) {
  const n = D(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Le(e, "delete", t, void 0), s;
}
function $o(e, t) {
  const n = Reflect.has(e, t);
  return (!Vn(t) || !fr.has(t)) && he(e, "has", t), n;
}
function Bo(e) {
  return he(e, "iterate", L(e) ? "length" : nt), Reflect.ownKeys(e);
}
const dr = { get: Io, set: No, deleteProperty: Ho, has: $o, ownKeys: Bo },
  Lo = {
    get: So,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Uo = ce({}, dr, { get: Mo, set: jo }),
  Gn = (e) => e,
  fn = (e) => Reflect.getPrototypeOf(e);
function Dt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = W(e),
    o = W(t);
  n || (t !== o && he(r, "get", t), he(r, "get", o));
  const { has: i } = fn(r),
    u = s ? Gn : n ? ns : Nt;
  if (i.call(r, t)) return u(e.get(t));
  if (i.call(r, o)) return u(e.get(o));
  e !== r && e.get(t);
}
function Wt(e, t = !1) {
  const n = this.__v_raw,
    s = W(n),
    r = W(e);
  return (
    t || (e !== r && he(s, "has", e), he(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function zt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && he(W(e), "iterate", nt), Reflect.get(e, "size", e)
  );
}
function bs(e) {
  e = W(e);
  const t = W(this);
  return fn(t).has.call(t, e) || (t.add(e), Le(t, "add", e, e)), this;
}
function ys(e, t) {
  t = W(t);
  const n = W(this),
    { has: s, get: r } = fn(n);
  let o = s.call(n, e);
  o || ((e = W(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? Ft(t, i) && Le(n, "set", e, t) : Le(n, "add", e, t), this
  );
}
function vs(e) {
  const t = W(this),
    { has: n, get: s } = fn(t);
  let r = n.call(t, e);
  r || ((e = W(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Le(t, "delete", e, void 0), o;
}
function Es() {
  const e = W(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Le(e, "clear", void 0, void 0), n;
}
function qt(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      u = W(i),
      c = t ? Gn : e ? ns : Nt;
    return (
      !e && he(u, "iterate", nt), i.forEach((d, a) => s.call(r, c(d), c(a), o))
    );
  };
}
function Qt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = W(r),
      i = At(o),
      u = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      d = r[e](...s),
      a = n ? Gn : t ? ns : Nt;
    return (
      !t && he(o, "iterate", c ? In : nt),
      {
        next() {
          const { value: h, done: p } = d.next();
          return p
            ? { value: h, done: p }
            : { value: u ? [a(h[0]), a(h[1])] : a(h), done: p };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function ke(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Ko() {
  const e = {
      get(o) {
        return Dt(this, o);
      },
      get size() {
        return zt(this);
      },
      has: Wt,
      add: bs,
      set: ys,
      delete: vs,
      clear: Es,
      forEach: qt(!1, !1),
    },
    t = {
      get(o) {
        return Dt(this, o, !1, !0);
      },
      get size() {
        return zt(this);
      },
      has: Wt,
      add: bs,
      set: ys,
      delete: vs,
      clear: Es,
      forEach: qt(!1, !0),
    },
    n = {
      get(o) {
        return Dt(this, o, !0);
      },
      get size() {
        return zt(this, !0);
      },
      has(o) {
        return Wt.call(this, o, !0);
      },
      add: ke("add"),
      set: ke("set"),
      delete: ke("delete"),
      clear: ke("clear"),
      forEach: qt(!0, !1),
    },
    s = {
      get(o) {
        return Dt(this, o, !0, !0);
      },
      get size() {
        return zt(this, !0);
      },
      has(o) {
        return Wt.call(this, o, !0);
      },
      add: ke("add"),
      set: ke("set"),
      delete: ke("delete"),
      clear: ke("clear"),
      forEach: qt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Qt(o, !1, !1)),
        (n[o] = Qt(o, !0, !1)),
        (t[o] = Qt(o, !1, !0)),
        (s[o] = Qt(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [ko, Do, Wo, zo] = Ko();
function es(e, t) {
  const n = t ? (e ? zo : Wo) : e ? Do : ko;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(D(n, r) && r in s ? n : s, r, o);
}
const qo = { get: es(!1, !1) },
  Qo = { get: es(!1, !0) },
  Vo = { get: es(!0, !1) },
  hr = new WeakMap(),
  pr = new WeakMap(),
  gr = new WeakMap(),
  Yo = new WeakMap();
function Jo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Xo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Jo(vo(e));
}
function Kt(e) {
  return gt(e) ? e : ts(e, !1, dr, qo, hr);
}
function Zo(e) {
  return ts(e, !1, Uo, Qo, pr);
}
function mr(e) {
  return ts(e, !0, Lo, Vo, gr);
}
function ts(e, t, n, s, r) {
  if (!G(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = Xo(e);
  if (i === 0) return e;
  const u = new Proxy(e, i === 2 ? s : n);
  return r.set(e, u), u;
}
function dt(e) {
  return gt(e) ? dt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function gt(e) {
  return !!(e && e.__v_isReadonly);
}
function tn(e) {
  return !!(e && e.__v_isShallow);
}
function _r(e) {
  return dt(e) || gt(e);
}
function W(e) {
  const t = e && e.__v_raw;
  return t ? W(t) : e;
}
function br(e) {
  return en(e, "__v_skip", !0), e;
}
const Nt = (e) => (G(e) ? Kt(e) : e),
  ns = (e) => (G(e) ? mr(e) : e);
function yr(e) {
  qe && ye && ((e = W(e)), ur(e.dep || (e.dep = Jn())));
}
function vr(e, t) {
  (e = W(e)), e.dep && Mn(e.dep);
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function Go(e) {
  return Er(e, !1);
}
function ei(e) {
  return Er(e, !0);
}
function Er(e, t) {
  return ie(e) ? e : new ti(e, t);
}
class ti {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : W(t)),
      (this._value = n ? t : Nt(t));
  }
  get value() {
    return yr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || tn(t) || gt(t);
    (t = n ? t : W(t)),
      Ft(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Nt(t)), vr(this));
  }
}
function ht(e) {
  return ie(e) ? e.value : e;
}
const ni = {
  get: (e, t, n) => ht(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ie(r) && !ie(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function xr(e) {
  return dt(e) ? e : new Proxy(e, ni);
}
var wr;
class si {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[wr] = !1),
      (this._dirty = !0),
      (this.effect = new Xn(t, () => {
        this._dirty || ((this._dirty = !0), vr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = W(this);
    return (
      yr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
wr = "__v_isReadonly";
function ri(e, t, n = !1) {
  let s, r;
  const o = B(e);
  return (
    o ? ((s = e), (r = xe)) : ((s = e.get), (r = e.set)),
    new si(s, r, o || !r, n)
  );
}
function Qe(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    an(o, t, n);
  }
  return r;
}
function we(e, t, n, s) {
  if (B(e)) {
    const o = Qe(e, t, n, s);
    return (
      o &&
        rr(o) &&
        o.catch((i) => {
          an(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(we(e[o], t, n, s));
  return r;
}
function an(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      u = n;
    for (; o; ) {
      const d = o.ec;
      if (d) {
        for (let a = 0; a < d.length; a++) if (d[a](e, i, u) === !1) return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Qe(c, null, 10, [e, i, u]);
      return;
    }
  }
  oi(e, n, r, s);
}
function oi(e, t, n, s = !0) {
  console.error(e);
}
let jt = !1,
  Sn = !1;
const oe = [];
let Fe = 0;
const pt = [];
let $e = null,
  et = 0;
const Rr = Promise.resolve();
let ss = null;
function Pr(e) {
  const t = ss || Rr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ii(e) {
  let t = Fe + 1,
    n = oe.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Ht(oe[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function rs(e) {
  (!oe.length || !oe.includes(e, jt && e.allowRecurse ? Fe + 1 : Fe)) &&
    (e.id == null ? oe.push(e) : oe.splice(ii(e.id), 0, e), Cr());
}
function Cr() {
  !jt && !Sn && ((Sn = !0), (ss = Rr.then(Ar)));
}
function li(e) {
  const t = oe.indexOf(e);
  t > Fe && oe.splice(t, 1);
}
function ci(e) {
  L(e)
    ? pt.push(...e)
    : (!$e || !$e.includes(e, e.allowRecurse ? et + 1 : et)) && pt.push(e),
    Cr();
}
function xs(e, t = jt ? Fe + 1 : 0) {
  for (; t < oe.length; t++) {
    const n = oe[t];
    n && n.pre && (oe.splice(t, 1), t--, n());
  }
}
function Or(e) {
  if (pt.length) {
    const t = [...new Set(pt)];
    if (((pt.length = 0), $e)) {
      $e.push(...t);
      return;
    }
    for ($e = t, $e.sort((n, s) => Ht(n) - Ht(s)), et = 0; et < $e.length; et++)
      $e[et]();
    ($e = null), (et = 0);
  }
}
const Ht = (e) => (e.id == null ? 1 / 0 : e.id),
  ui = (e, t) => {
    const n = Ht(e) - Ht(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Ar(e) {
  (Sn = !1), (jt = !0), oe.sort(ui);
  const t = xe;
  try {
    for (Fe = 0; Fe < oe.length; Fe++) {
      const n = oe[Fe];
      n && n.active !== !1 && Qe(n, null, 14);
    }
  } finally {
    (Fe = 0),
      (oe.length = 0),
      Or(),
      (jt = !1),
      (ss = null),
      (oe.length || pt.length) && Ar();
  }
}
function fi(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || X;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const a = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: p } = s[a] || X;
    p && (r = n.map((v) => (se(v) ? v.trim() : v))), h && (r = n.map(or));
  }
  let u,
    c = s[(u = bn(t))] || s[(u = bn(Ne(t)))];
  !c && o && (c = s[(u = bn(vt(t)))]), c && we(c, e, 6, r);
  const d = s[u + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[u]) return;
    (e.emitted[u] = !0), we(d, e, 6, r);
  }
}
function Tr(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    u = !1;
  if (!B(e)) {
    const c = (d) => {
      const a = Tr(d, t, !0);
      a && ((u = !0), ce(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !o && !u
    ? (G(e) && s.set(e, null), null)
    : (L(o) ? o.forEach((c) => (i[c] = null)) : ce(i, o),
      G(e) && s.set(e, i),
      i);
}
function dn(e, t) {
  return !e || !on(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      D(e, t[0].toLowerCase() + t.slice(1)) || D(e, vt(t)) || D(e, t));
}
let ve = null,
  Ir = null;
function nn(e) {
  const t = ve;
  return (ve = e), (Ir = (e && e.type.__scopeId) || null), t;
}
function ai(e, t = ve, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Ms(-1);
    const o = nn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      nn(o), s._d && Ms(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function vn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: u,
    attrs: c,
    emit: d,
    render: a,
    renderCache: h,
    data: p,
    setupState: v,
    ctx: O,
    inheritAttrs: I,
  } = e;
  let $, T;
  const H = nn(e);
  try {
    if (n.shapeFlag & 4) {
      const z = r || s;
      ($ = Se(a.call(z, z, h, o, v, p, O))), (T = c);
    } else {
      const z = t;
      ($ = Se(
        z.length > 1 ? z(o, { attrs: c, slots: u, emit: d }) : z(o, null)
      )),
        (T = t.props ? c : di(c));
    }
  } catch (z) {
    (It.length = 0), an(z, e, 1), ($ = ge($t));
  }
  let N = $;
  if (T && I !== !1) {
    const z = Object.keys(T),
      { shapeFlag: re } = N;
    z.length && re & 7 && (i && z.some(qn) && (T = hi(T, i)), (N = mt(N, T)));
  }
  return (
    n.dirs && ((N = mt(N)), (N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (N.transition = n.transition),
    ($ = N),
    nn(H),
    $
  );
}
const di = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || on(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  hi = (e, t) => {
    const n = {};
    for (const s in e) (!qn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function pi(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: u, patchFlag: c } = t,
    d = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? ws(s, i, d) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const p = a[h];
        if (i[p] !== s[p] && !dn(d, p)) return !0;
      }
    }
  } else
    return (r || u) && (!u || !u.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? ws(s, i, d)
        : !0
      : !!i;
  return !1;
}
function ws(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !dn(n, o)) return !0;
  }
  return !1;
}
function gi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const mi = (e) => e.__isSuspense;
function _i(e, t) {
  t && t.pendingBranch
    ? L(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ci(e);
}
function Jt(e, t) {
  if (ne) {
    let n = ne.provides;
    const s = ne.parent && ne.parent.provides;
    s === n && (n = ne.provides = Object.create(s)), (n[e] = t);
  }
}
function Re(e, t, n = !1) {
  const s = ne || ve;
  if (s) {
    const r =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && B(t) ? t.call(s.proxy) : t;
  }
}
const Vt = {};
function Xt(e, t, n) {
  return Mr(e, t, n);
}
function Mr(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = X
) {
  const u = ne;
  let c,
    d = !1,
    a = !1;
  if (
    (ie(e)
      ? ((c = () => e.value), (d = tn(e)))
      : dt(e)
      ? ((c = () => e), (s = !0))
      : L(e)
      ? ((a = !0),
        (d = e.some((N) => dt(N) || tn(N))),
        (c = () =>
          e.map((N) => {
            if (ie(N)) return N.value;
            if (dt(N)) return ft(N);
            if (B(N)) return Qe(N, u, 2);
          })))
      : B(e)
      ? t
        ? (c = () => Qe(e, u, 2))
        : (c = () => {
            if (!(u && u.isUnmounted)) return h && h(), we(e, u, 3, [p]);
          })
      : (c = xe),
    t && s)
  ) {
    const N = c;
    c = () => ft(N());
  }
  let h,
    p = (N) => {
      h = T.onStop = () => {
        Qe(N, u, 4);
      };
    },
    v;
  if (Lt)
    if (
      ((p = xe),
      t ? n && we(t, u, 3, [c(), a ? [] : void 0, p]) : c(),
      r === "sync")
    ) {
      const N = al();
      v = N.__watcherHandles || (N.__watcherHandles = []);
    } else return xe;
  let O = a ? new Array(e.length).fill(Vt) : Vt;
  const I = () => {
    if (T.active)
      if (t) {
        const N = T.run();
        (s || d || (a ? N.some((z, re) => Ft(z, O[re])) : Ft(N, O))) &&
          (h && h(),
          we(t, u, 3, [N, O === Vt ? void 0 : a && O[0] === Vt ? [] : O, p]),
          (O = N));
      } else T.run();
  };
  I.allowRecurse = !!t;
  let $;
  r === "sync"
    ? ($ = I)
    : r === "post"
    ? ($ = () => fe(I, u && u.suspense))
    : ((I.pre = !0), u && (I.id = u.uid), ($ = () => rs(I)));
  const T = new Xn(c, $);
  t
    ? n
      ? I()
      : (O = T.run())
    : r === "post"
    ? fe(T.run.bind(T), u && u.suspense)
    : T.run();
  const H = () => {
    T.stop(), u && u.scope && Qn(u.scope.effects, T);
  };
  return v && v.push(H), H;
}
function bi(e, t, n) {
  const s = this.proxy,
    r = se(e) ? (e.includes(".") ? Sr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  B(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = ne;
  _t(this);
  const u = Mr(r, o.bind(s), n);
  return i ? _t(i) : st(), u;
}
function Sr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function ft(e, t) {
  if (!G(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ie(e))) ft(e.value, t);
  else if (L(e)) for (let n = 0; n < e.length; n++) ft(e[n], t);
  else if (bo(e) || At(e))
    e.forEach((n) => {
      ft(n, t);
    });
  else if (Eo(e)) for (const n in e) ft(e[n], t);
  return e;
}
function Fr(e) {
  return B(e) ? { setup: e, name: e.name } : e;
}
const Zt = (e) => !!e.type.__asyncLoader,
  Nr = (e) => e.type.__isKeepAlive;
function yi(e, t) {
  jr(e, "a", t);
}
function vi(e, t) {
  jr(e, "da", t);
}
function jr(e, t, n = ne) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((hn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Nr(r.parent.vnode) && Ei(s, t, n, r), (r = r.parent);
  }
}
function Ei(e, t, n, s) {
  const r = hn(t, e, s, !0);
  Hr(() => {
    Qn(s[t], r);
  }, n);
}
function hn(e, t, n = ne, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Et(), _t(n);
          const u = we(t, n, e, i);
          return st(), xt(), u;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Ue =
    (e) =>
    (t, n = ne) =>
      (!Lt || e === "sp") && hn(e, (...s) => t(...s), n),
  xi = Ue("bm"),
  wi = Ue("m"),
  Ri = Ue("bu"),
  Pi = Ue("u"),
  Ci = Ue("bum"),
  Hr = Ue("um"),
  Oi = Ue("sp"),
  Ai = Ue("rtg"),
  Ti = Ue("rtc");
function Ii(e, t = ne) {
  hn("ec", e, t);
}
function Xe(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const u = r[i];
    o && (u.oldValue = o[i].value);
    let c = u.dir[s];
    c && (Et(), we(c, n, 8, [e.el, u, e, t]), xt());
  }
}
const $r = "components";
function jc(e, t) {
  return Si($r, e, !0, t) || e;
}
const Mi = Symbol();
function Si(e, t, n = !0, s = !1) {
  const r = ve || ne;
  if (r) {
    const o = r.type;
    if (e === $r) {
      const u = cl(o, !1);
      if (u && (u === t || u === Ne(t) || u === un(Ne(t)))) return o;
    }
    const i = Rs(r[e] || o[e], t) || Rs(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Rs(e, t) {
  return e && (e[t] || e[Ne(t)] || e[un(Ne(t))]);
}
const Fn = (e) => (e ? (Yr(e) ? cs(e) || e.proxy : Fn(e.parent)) : null),
  Tt = ce(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Fn(e.parent),
    $root: (e) => Fn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => os(e),
    $forceUpdate: (e) => e.f || (e.f = () => rs(e.update)),
    $nextTick: (e) => e.n || (e.n = Pr.bind(e.proxy)),
    $watch: (e) => bi.bind(e),
  }),
  En = (e, t) => e !== X && !e.__isScriptSetup && D(e, t),
  Fi = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: u,
        appContext: c,
      } = e;
      let d;
      if (t[0] !== "$") {
        const v = i[t];
        if (v !== void 0)
          switch (v) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (En(s, t)) return (i[t] = 1), s[t];
          if (r !== X && D(r, t)) return (i[t] = 2), r[t];
          if ((d = e.propsOptions[0]) && D(d, t)) return (i[t] = 3), o[t];
          if (n !== X && D(n, t)) return (i[t] = 4), n[t];
          Nn && (i[t] = 0);
        }
      }
      const a = Tt[t];
      let h, p;
      if (a) return t === "$attrs" && he(e, "get", t), a(e);
      if ((h = u.__cssModules) && (h = h[t])) return h;
      if (n !== X && D(n, t)) return (i[t] = 4), n[t];
      if (((p = c.config.globalProperties), D(p, t))) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return En(r, t)
        ? ((r[t] = n), !0)
        : s !== X && D(s, t)
        ? ((s[t] = n), !0)
        : D(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i
    ) {
      let u;
      return (
        !!n[i] ||
        (e !== X && D(e, i)) ||
        En(t, i) ||
        ((u = o[0]) && D(u, i)) ||
        D(s, i) ||
        D(Tt, i) ||
        D(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : D(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Nn = !0;
function Ni(e) {
  const t = os(e),
    n = e.proxy,
    s = e.ctx;
  (Nn = !1), t.beforeCreate && Ps(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: u,
    provide: c,
    inject: d,
    created: a,
    beforeMount: h,
    mounted: p,
    beforeUpdate: v,
    updated: O,
    activated: I,
    deactivated: $,
    beforeDestroy: T,
    beforeUnmount: H,
    destroyed: N,
    unmounted: z,
    render: re,
    renderTracked: ae,
    renderTriggered: Ce,
    errorCaptured: je,
    serverPrefetch: rt,
    expose: Oe,
    inheritAttrs: Ke,
    components: Ae,
    directives: ot,
    filters: Ye,
  } = t;
  if ((d && ji(d, s, null, e.appContext.config.unwrapInjectedRef), i))
    for (const Y in i) {
      const Q = i[Y];
      B(Q) && (s[Y] = Q.bind(n));
    }
  if (r) {
    const Y = r.call(n, n);
    G(Y) && (e.data = Kt(Y));
  }
  if (((Nn = !0), o))
    for (const Y in o) {
      const Q = o[Y],
        me = B(Q) ? Q.bind(n, n) : B(Q.get) ? Q.get.bind(n, n) : xe,
        Je = !B(Q) && B(Q.set) ? Q.set.bind(n) : xe,
        _e = pe({ get: me, set: Je });
      Object.defineProperty(s, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => _e.value,
        set: (ue) => (_e.value = ue),
      });
    }
  if (u) for (const Y in u) Br(u[Y], s, n, Y);
  if (c) {
    const Y = B(c) ? c.call(n) : c;
    Reflect.ownKeys(Y).forEach((Q) => {
      Jt(Q, Y[Q]);
    });
  }
  a && Ps(a, e, "c");
  function ee(Y, Q) {
    L(Q) ? Q.forEach((me) => Y(me.bind(n))) : Q && Y(Q.bind(n));
  }
  if (
    (ee(xi, h),
    ee(wi, p),
    ee(Ri, v),
    ee(Pi, O),
    ee(yi, I),
    ee(vi, $),
    ee(Ii, je),
    ee(Ti, ae),
    ee(Ai, Ce),
    ee(Ci, H),
    ee(Hr, z),
    ee(Oi, rt),
    L(Oe))
  )
    if (Oe.length) {
      const Y = e.exposed || (e.exposed = {});
      Oe.forEach((Q) => {
        Object.defineProperty(Y, Q, {
          get: () => n[Q],
          set: (me) => (n[Q] = me),
        });
      });
    } else e.exposed || (e.exposed = {});
  re && e.render === xe && (e.render = re),
    Ke != null && (e.inheritAttrs = Ke),
    Ae && (e.components = Ae),
    ot && (e.directives = ot);
}
function ji(e, t, n = xe, s = !1) {
  L(e) && (e = jn(e));
  for (const r in e) {
    const o = e[r];
    let i;
    G(o)
      ? "default" in o
        ? (i = Re(o.from || r, o.default, !0))
        : (i = Re(o.from || r))
      : (i = Re(o)),
      ie(i) && s
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (u) => (i.value = u),
          })
        : (t[r] = i);
  }
}
function Ps(e, t, n) {
  we(L(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Br(e, t, n, s) {
  const r = s.includes(".") ? Sr(n, s) : () => n[s];
  if (se(e)) {
    const o = t[e];
    B(o) && Xt(r, o);
  } else if (B(e)) Xt(r, e.bind(n));
  else if (G(e))
    if (L(e)) e.forEach((o) => Br(o, t, n, s));
    else {
      const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(o) && Xt(r, o, e);
    }
}
function os(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    u = o.get(t);
  let c;
  return (
    u
      ? (c = u)
      : !r.length && !n && !s
      ? (c = t)
      : ((c = {}), r.length && r.forEach((d) => sn(c, d, i, !0)), sn(c, t, i)),
    G(t) && o.set(t, c),
    c
  );
}
function sn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && sn(e, o, n, !0), r && r.forEach((i) => sn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const u = Hi[i] || (n && n[i]);
      e[i] = u ? u(e[i], t[i]) : t[i];
    }
  return e;
}
const Hi = {
  data: Cs,
  props: Ge,
  emits: Ge,
  methods: Ge,
  computed: Ge,
  beforeCreate: le,
  created: le,
  beforeMount: le,
  mounted: le,
  beforeUpdate: le,
  updated: le,
  beforeDestroy: le,
  beforeUnmount: le,
  destroyed: le,
  unmounted: le,
  activated: le,
  deactivated: le,
  errorCaptured: le,
  serverPrefetch: le,
  components: Ge,
  directives: Ge,
  watch: Bi,
  provide: Cs,
  inject: $i,
};
function Cs(e, t) {
  return t
    ? e
      ? function () {
          return ce(
            B(e) ? e.call(this, this) : e,
            B(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function $i(e, t) {
  return Ge(jn(e), jn(t));
}
function jn(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ge(e, t) {
  return e ? ce(ce(Object.create(null), e), t) : t;
}
function Bi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ce(Object.create(null), e);
  for (const s in t) n[s] = le(e[s], t[s]);
  return n;
}
function Li(e, t, n, s = !1) {
  const r = {},
    o = {};
  en(o, gn, 1), (e.propsDefaults = Object.create(null)), Lr(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : Zo(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function Ui(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    u = W(r),
    [c] = e.propsOptions;
  let d = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        let p = a[h];
        if (dn(e.emitsOptions, p)) continue;
        const v = t[p];
        if (c)
          if (D(o, p)) v !== o[p] && ((o[p] = v), (d = !0));
          else {
            const O = Ne(p);
            r[O] = Hn(c, u, O, v, e, !1);
          }
        else v !== o[p] && ((o[p] = v), (d = !0));
      }
    }
  } else {
    Lr(e, t, r, o) && (d = !0);
    let a;
    for (const h in u)
      (!t || (!D(t, h) && ((a = vt(h)) === h || !D(t, a)))) &&
        (c
          ? n &&
            (n[h] !== void 0 || n[a] !== void 0) &&
            (r[h] = Hn(c, u, h, void 0, e, !0))
          : delete r[h]);
    if (o !== u) for (const h in o) (!t || !D(t, h)) && (delete o[h], (d = !0));
  }
  d && Le(e, "set", "$attrs");
}
function Lr(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    u;
  if (t)
    for (let c in t) {
      if (Yt(c)) continue;
      const d = t[c];
      let a;
      r && D(r, (a = Ne(c)))
        ? !o || !o.includes(a)
          ? (n[a] = d)
          : ((u || (u = {}))[a] = d)
        : dn(e.emitsOptions, c) ||
          ((!(c in s) || d !== s[c]) && ((s[c] = d), (i = !0)));
    }
  if (o) {
    const c = W(n),
      d = u || X;
    for (let a = 0; a < o.length; a++) {
      const h = o[a];
      n[h] = Hn(r, c, h, d[h], e, !D(d, h));
    }
  }
  return i;
}
function Hn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const u = D(i, "default");
    if (u && s === void 0) {
      const c = i.default;
      if (i.type !== Function && B(c)) {
        const { propsDefaults: d } = r;
        n in d ? (s = d[n]) : (_t(r), (s = d[n] = c.call(null, t)), st());
      } else s = c;
    }
    i[0] &&
      (o && !u ? (s = !1) : i[1] && (s === "" || s === vt(n)) && (s = !0));
  }
  return s;
}
function Ur(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    u = [];
  let c = !1;
  if (!B(e)) {
    const a = (h) => {
      c = !0;
      const [p, v] = Ur(h, t, !0);
      ce(i, p), v && u.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c) return G(e) && s.set(e, at), at;
  if (L(o))
    for (let a = 0; a < o.length; a++) {
      const h = Ne(o[a]);
      Os(h) && (i[h] = X);
    }
  else if (o)
    for (const a in o) {
      const h = Ne(a);
      if (Os(h)) {
        const p = o[a],
          v = (i[h] = L(p) || B(p) ? { type: p } : Object.assign({}, p));
        if (v) {
          const O = Is(Boolean, v.type),
            I = Is(String, v.type);
          (v[0] = O > -1),
            (v[1] = I < 0 || O < I),
            (O > -1 || D(v, "default")) && u.push(h);
        }
      }
    }
  const d = [i, u];
  return G(e) && s.set(e, d), d;
}
function Os(e) {
  return e[0] !== "$";
}
function As(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Ts(e, t) {
  return As(e) === As(t);
}
function Is(e, t) {
  return L(t) ? t.findIndex((n) => Ts(n, e)) : B(t) && Ts(t, e) ? 0 : -1;
}
const Kr = (e) => e[0] === "_" || e === "$stable",
  is = (e) => (L(e) ? e.map(Se) : [Se(e)]),
  Ki = (e, t, n) => {
    if (t._n) return t;
    const s = ai((...r) => is(t(...r)), n);
    return (s._c = !1), s;
  },
  kr = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (Kr(r)) continue;
      const o = e[r];
      if (B(o)) t[r] = Ki(r, o, s);
      else if (o != null) {
        const i = is(o);
        t[r] = () => i;
      }
    }
  },
  Dr = (e, t) => {
    const n = is(t);
    e.slots.default = () => n;
  },
  ki = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = W(t)), en(t, "_", n)) : kr(t, (e.slots = {}));
    } else (e.slots = {}), t && Dr(e, t);
    en(e.slots, gn, 1);
  },
  Di = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = X;
    if (s.shapeFlag & 32) {
      const u = t._;
      u
        ? n && u === 1
          ? (o = !1)
          : (ce(r, t), !n && u === 1 && delete r._)
        : ((o = !t.$stable), kr(t, r)),
        (i = t);
    } else t && (Dr(e, t), (i = { default: 1 }));
    if (o) for (const u in r) !Kr(u) && !(u in i) && delete r[u];
  };
function Wr() {
  return {
    app: null,
    config: {
      isNativeTag: go,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Wi = 0;
function zi(e, t) {
  return function (s, r = null) {
    B(s) || (s = Object.assign({}, s)), r != null && !G(r) && (r = null);
    const o = Wr(),
      i = new Set();
    let u = !1;
    const c = (o.app = {
      _uid: Wi++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: dl,
      get config() {
        return o.config;
      },
      set config(d) {},
      use(d, ...a) {
        return (
          i.has(d) ||
            (d && B(d.install)
              ? (i.add(d), d.install(c, ...a))
              : B(d) && (i.add(d), d(c, ...a))),
          c
        );
      },
      mixin(d) {
        return o.mixins.includes(d) || o.mixins.push(d), c;
      },
      component(d, a) {
        return a ? ((o.components[d] = a), c) : o.components[d];
      },
      directive(d, a) {
        return a ? ((o.directives[d] = a), c) : o.directives[d];
      },
      mount(d, a, h) {
        if (!u) {
          const p = ge(s, r);
          return (
            (p.appContext = o),
            a && t ? t(p, d) : e(p, d, h),
            (u = !0),
            (c._container = d),
            (d.__vue_app__ = c),
            cs(p.component) || p.component.proxy
          );
        }
      },
      unmount() {
        u && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, a) {
        return (o.provides[d] = a), c;
      },
    });
    return c;
  };
}
function $n(e, t, n, s, r = !1) {
  if (L(e)) {
    e.forEach((p, v) => $n(p, t && (L(t) ? t[v] : t), n, s, r));
    return;
  }
  if (Zt(s) && !r) return;
  const o = s.shapeFlag & 4 ? cs(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: u, r: c } = e,
    d = t && t.r,
    a = u.refs === X ? (u.refs = {}) : u.refs,
    h = u.setupState;
  if (
    (d != null &&
      d !== c &&
      (se(d)
        ? ((a[d] = null), D(h, d) && (h[d] = null))
        : ie(d) && (d.value = null)),
    B(c))
  )
    Qe(c, u, 12, [i, a]);
  else {
    const p = se(c),
      v = ie(c);
    if (p || v) {
      const O = () => {
        if (e.f) {
          const I = p ? (D(h, c) ? h[c] : a[c]) : c.value;
          r
            ? L(I) && Qn(I, o)
            : L(I)
            ? I.includes(o) || I.push(o)
            : p
            ? ((a[c] = [o]), D(h, c) && (h[c] = a[c]))
            : ((c.value = [o]), e.k && (a[e.k] = c.value));
        } else
          p
            ? ((a[c] = i), D(h, c) && (h[c] = i))
            : v && ((c.value = i), e.k && (a[e.k] = i));
      };
      i ? ((O.id = -1), fe(O, n)) : O();
    }
  }
}
const fe = _i;
function qi(e) {
  return Qi(e);
}
function Qi(e, t) {
  const n = Ro();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: u,
      createComment: c,
      setText: d,
      setElementText: a,
      parentNode: h,
      nextSibling: p,
      setScopeId: v = xe,
      insertStaticContent: O,
    } = e,
    I = (
      l,
      f,
      g,
      m = null,
      b = null,
      x = null,
      P = !1,
      E = null,
      w = !!f.dynamicChildren
    ) => {
      if (l === f) return;
      l && !Pt(l, f) && ((m = R(l)), ue(l, b, x, !0), (l = null)),
        f.patchFlag === -2 && ((w = !1), (f.dynamicChildren = null));
      const { type: y, ref: S, shapeFlag: A } = f;
      switch (y) {
        case pn:
          $(l, f, g, m);
          break;
        case $t:
          T(l, f, g, m);
          break;
        case xn:
          l == null && H(f, g, m, P);
          break;
        case Be:
          Ae(l, f, g, m, b, x, P, E, w);
          break;
        default:
          A & 1
            ? re(l, f, g, m, b, x, P, E, w)
            : A & 6
            ? ot(l, f, g, m, b, x, P, E, w)
            : (A & 64 || A & 128) && y.process(l, f, g, m, b, x, P, E, w, k);
      }
      S != null && b && $n(S, l && l.ref, x, f || l, !f);
    },
    $ = (l, f, g, m) => {
      if (l == null) s((f.el = u(f.children)), g, m);
      else {
        const b = (f.el = l.el);
        f.children !== l.children && d(b, f.children);
      }
    },
    T = (l, f, g, m) => {
      l == null ? s((f.el = c(f.children || "")), g, m) : (f.el = l.el);
    },
    H = (l, f, g, m) => {
      [l.el, l.anchor] = O(l.children, f, g, m, l.el, l.anchor);
    },
    N = ({ el: l, anchor: f }, g, m) => {
      let b;
      for (; l && l !== f; ) (b = p(l)), s(l, g, m), (l = b);
      s(f, g, m);
    },
    z = ({ el: l, anchor: f }) => {
      let g;
      for (; l && l !== f; ) (g = p(l)), r(l), (l = g);
      r(f);
    },
    re = (l, f, g, m, b, x, P, E, w) => {
      (P = P || f.type === "svg"),
        l == null ? ae(f, g, m, b, x, P, E, w) : rt(l, f, b, x, P, E, w);
    },
    ae = (l, f, g, m, b, x, P, E) => {
      let w, y;
      const { type: S, props: A, shapeFlag: F, transition: j, dirs: K } = l;
      if (
        ((w = l.el = i(l.type, x, A && A.is, A)),
        F & 8
          ? a(w, l.children)
          : F & 16 &&
            je(l.children, w, null, m, b, x && S !== "foreignObject", P, E),
        K && Xe(l, null, m, "created"),
        A)
      ) {
        for (const V in A)
          V !== "value" &&
            !Yt(V) &&
            o(w, V, null, A[V], x, l.children, m, b, C);
        "value" in A && o(w, "value", null, A.value),
          (y = A.onVnodeBeforeMount) && Ie(y, m, l);
      }
      Ce(w, l, l.scopeId, P, m), K && Xe(l, null, m, "beforeMount");
      const J = (!b || (b && !b.pendingBranch)) && j && !j.persisted;
      J && j.beforeEnter(w),
        s(w, f, g),
        ((y = A && A.onVnodeMounted) || J || K) &&
          fe(() => {
            y && Ie(y, m, l), J && j.enter(w), K && Xe(l, null, m, "mounted");
          }, b);
    },
    Ce = (l, f, g, m, b) => {
      if ((g && v(l, g), m)) for (let x = 0; x < m.length; x++) v(l, m[x]);
      if (b) {
        let x = b.subTree;
        if (f === x) {
          const P = b.vnode;
          Ce(l, P, P.scopeId, P.slotScopeIds, b.parent);
        }
      }
    },
    je = (l, f, g, m, b, x, P, E, w = 0) => {
      for (let y = w; y < l.length; y++) {
        const S = (l[y] = E ? We(l[y]) : Se(l[y]));
        I(null, S, f, g, m, b, x, P, E);
      }
    },
    rt = (l, f, g, m, b, x, P) => {
      const E = (f.el = l.el);
      let { patchFlag: w, dynamicChildren: y, dirs: S } = f;
      w |= l.patchFlag & 16;
      const A = l.props || X,
        F = f.props || X;
      let j;
      g && Ze(g, !1),
        (j = F.onVnodeBeforeUpdate) && Ie(j, g, f, l),
        S && Xe(f, l, g, "beforeUpdate"),
        g && Ze(g, !0);
      const K = b && f.type !== "foreignObject";
      if (
        (y
          ? Oe(l.dynamicChildren, y, E, g, m, K, x)
          : P || Q(l, f, E, null, g, m, K, x, !1),
        w > 0)
      ) {
        if (w & 16) Ke(E, f, A, F, g, m, b);
        else if (
          (w & 2 && A.class !== F.class && o(E, "class", null, F.class, b),
          w & 4 && o(E, "style", A.style, F.style, b),
          w & 8)
        ) {
          const J = f.dynamicProps;
          for (let V = 0; V < J.length; V++) {
            const te = J[V],
              be = A[te],
              lt = F[te];
            (lt !== be || te === "value") &&
              o(E, te, be, lt, b, l.children, g, m, C);
          }
        }
        w & 1 && l.children !== f.children && a(E, f.children);
      } else !P && y == null && Ke(E, f, A, F, g, m, b);
      ((j = F.onVnodeUpdated) || S) &&
        fe(() => {
          j && Ie(j, g, f, l), S && Xe(f, l, g, "updated");
        }, m);
    },
    Oe = (l, f, g, m, b, x, P) => {
      for (let E = 0; E < f.length; E++) {
        const w = l[E],
          y = f[E],
          S =
            w.el && (w.type === Be || !Pt(w, y) || w.shapeFlag & 70)
              ? h(w.el)
              : g;
        I(w, y, S, null, m, b, x, P, !0);
      }
    },
    Ke = (l, f, g, m, b, x, P) => {
      if (g !== m) {
        if (g !== X)
          for (const E in g)
            !Yt(E) && !(E in m) && o(l, E, g[E], null, P, f.children, b, x, C);
        for (const E in m) {
          if (Yt(E)) continue;
          const w = m[E],
            y = g[E];
          w !== y && E !== "value" && o(l, E, y, w, P, f.children, b, x, C);
        }
        "value" in m && o(l, "value", g.value, m.value);
      }
    },
    Ae = (l, f, g, m, b, x, P, E, w) => {
      const y = (f.el = l ? l.el : u("")),
        S = (f.anchor = l ? l.anchor : u(""));
      let { patchFlag: A, dynamicChildren: F, slotScopeIds: j } = f;
      j && (E = E ? E.concat(j) : j),
        l == null
          ? (s(y, g, m), s(S, g, m), je(f.children, g, S, b, x, P, E, w))
          : A > 0 && A & 64 && F && l.dynamicChildren
          ? (Oe(l.dynamicChildren, F, g, b, x, P, E),
            (f.key != null || (b && f === b.subTree)) && zr(l, f, !0))
          : Q(l, f, g, S, b, x, P, E, w);
    },
    ot = (l, f, g, m, b, x, P, E, w) => {
      (f.slotScopeIds = E),
        l == null
          ? f.shapeFlag & 512
            ? b.ctx.activate(f, g, m, P, w)
            : Ye(f, g, m, b, x, P, w)
          : wt(l, f, w);
    },
    Ye = (l, f, g, m, b, x, P) => {
      const E = (l.component = sl(l, m, b));
      if ((Nr(l) && (E.ctx.renderer = k), rl(E), E.asyncDep)) {
        if ((b && b.registerDep(E, ee), !l.el)) {
          const w = (E.subTree = ge($t));
          T(null, w, f, g);
        }
        return;
      }
      ee(E, l, f, g, b, x, P);
    },
    wt = (l, f, g) => {
      const m = (f.component = l.component);
      if (pi(l, f, g))
        if (m.asyncDep && !m.asyncResolved) {
          Y(m, f, g);
          return;
        } else (m.next = f), li(m.update), m.update();
      else (f.el = l.el), (m.vnode = f);
    },
    ee = (l, f, g, m, b, x, P) => {
      const E = () => {
          if (l.isMounted) {
            let { next: S, bu: A, u: F, parent: j, vnode: K } = l,
              J = S,
              V;
            Ze(l, !1),
              S ? ((S.el = K.el), Y(l, S, P)) : (S = K),
              A && yn(A),
              (V = S.props && S.props.onVnodeBeforeUpdate) && Ie(V, j, S, K),
              Ze(l, !0);
            const te = vn(l),
              be = l.subTree;
            (l.subTree = te),
              I(be, te, h(be.el), R(be), l, b, x),
              (S.el = te.el),
              J === null && gi(l, te.el),
              F && fe(F, b),
              (V = S.props && S.props.onVnodeUpdated) &&
                fe(() => Ie(V, j, S, K), b);
          } else {
            let S;
            const { el: A, props: F } = f,
              { bm: j, m: K, parent: J } = l,
              V = Zt(f);
            if (
              (Ze(l, !1),
              j && yn(j),
              !V && (S = F && F.onVnodeBeforeMount) && Ie(S, J, f),
              Ze(l, !0),
              A && U)
            ) {
              const te = () => {
                (l.subTree = vn(l)), U(A, l.subTree, l, b, null);
              };
              V
                ? f.type.__asyncLoader().then(() => !l.isUnmounted && te())
                : te();
            } else {
              const te = (l.subTree = vn(l));
              I(null, te, g, m, l, b, x), (f.el = te.el);
            }
            if ((K && fe(K, b), !V && (S = F && F.onVnodeMounted))) {
              const te = f;
              fe(() => Ie(S, J, te), b);
            }
            (f.shapeFlag & 256 ||
              (J && Zt(J.vnode) && J.vnode.shapeFlag & 256)) &&
              l.a &&
              fe(l.a, b),
              (l.isMounted = !0),
              (f = g = m = null);
          }
        },
        w = (l.effect = new Xn(E, () => rs(y), l.scope)),
        y = (l.update = () => w.run());
      (y.id = l.uid), Ze(l, !0), y();
    },
    Y = (l, f, g) => {
      f.component = l;
      const m = l.vnode.props;
      (l.vnode = f),
        (l.next = null),
        Ui(l, f.props, m, g),
        Di(l, f.children, g),
        Et(),
        xs(),
        xt();
    },
    Q = (l, f, g, m, b, x, P, E, w = !1) => {
      const y = l && l.children,
        S = l ? l.shapeFlag : 0,
        A = f.children,
        { patchFlag: F, shapeFlag: j } = f;
      if (F > 0) {
        if (F & 128) {
          Je(y, A, g, m, b, x, P, E, w);
          return;
        } else if (F & 256) {
          me(y, A, g, m, b, x, P, E, w);
          return;
        }
      }
      j & 8
        ? (S & 16 && C(y, b, x), A !== y && a(g, A))
        : S & 16
        ? j & 16
          ? Je(y, A, g, m, b, x, P, E, w)
          : C(y, b, x, !0)
        : (S & 8 && a(g, ""), j & 16 && je(A, g, m, b, x, P, E, w));
    },
    me = (l, f, g, m, b, x, P, E, w) => {
      (l = l || at), (f = f || at);
      const y = l.length,
        S = f.length,
        A = Math.min(y, S);
      let F;
      for (F = 0; F < A; F++) {
        const j = (f[F] = w ? We(f[F]) : Se(f[F]));
        I(l[F], j, g, null, b, x, P, E, w);
      }
      y > S ? C(l, b, x, !0, !1, A) : je(f, g, m, b, x, P, E, w, A);
    },
    Je = (l, f, g, m, b, x, P, E, w) => {
      let y = 0;
      const S = f.length;
      let A = l.length - 1,
        F = S - 1;
      for (; y <= A && y <= F; ) {
        const j = l[y],
          K = (f[y] = w ? We(f[y]) : Se(f[y]));
        if (Pt(j, K)) I(j, K, g, null, b, x, P, E, w);
        else break;
        y++;
      }
      for (; y <= A && y <= F; ) {
        const j = l[A],
          K = (f[F] = w ? We(f[F]) : Se(f[F]));
        if (Pt(j, K)) I(j, K, g, null, b, x, P, E, w);
        else break;
        A--, F--;
      }
      if (y > A) {
        if (y <= F) {
          const j = F + 1,
            K = j < S ? f[j].el : m;
          for (; y <= F; )
            I(null, (f[y] = w ? We(f[y]) : Se(f[y])), g, K, b, x, P, E, w), y++;
        }
      } else if (y > F) for (; y <= A; ) ue(l[y], b, x, !0), y++;
      else {
        const j = y,
          K = y,
          J = new Map();
        for (y = K; y <= F; y++) {
          const de = (f[y] = w ? We(f[y]) : Se(f[y]));
          de.key != null && J.set(de.key, y);
        }
        let V,
          te = 0;
        const be = F - K + 1;
        let lt = !1,
          as = 0;
        const Rt = new Array(be);
        for (y = 0; y < be; y++) Rt[y] = 0;
        for (y = j; y <= A; y++) {
          const de = l[y];
          if (te >= be) {
            ue(de, b, x, !0);
            continue;
          }
          let Te;
          if (de.key != null) Te = J.get(de.key);
          else
            for (V = K; V <= F; V++)
              if (Rt[V - K] === 0 && Pt(de, f[V])) {
                Te = V;
                break;
              }
          Te === void 0
            ? ue(de, b, x, !0)
            : ((Rt[Te - K] = y + 1),
              Te >= as ? (as = Te) : (lt = !0),
              I(de, f[Te], g, null, b, x, P, E, w),
              te++);
        }
        const ds = lt ? Vi(Rt) : at;
        for (V = ds.length - 1, y = be - 1; y >= 0; y--) {
          const de = K + y,
            Te = f[de],
            hs = de + 1 < S ? f[de + 1].el : m;
          Rt[y] === 0
            ? I(null, Te, g, hs, b, x, P, E, w)
            : lt && (V < 0 || y !== ds[V] ? _e(Te, g, hs, 2) : V--);
        }
      }
    },
    _e = (l, f, g, m, b = null) => {
      const { el: x, type: P, transition: E, children: w, shapeFlag: y } = l;
      if (y & 6) {
        _e(l.component.subTree, f, g, m);
        return;
      }
      if (y & 128) {
        l.suspense.move(f, g, m);
        return;
      }
      if (y & 64) {
        P.move(l, f, g, k);
        return;
      }
      if (P === Be) {
        s(x, f, g);
        for (let A = 0; A < w.length; A++) _e(w[A], f, g, m);
        s(l.anchor, f, g);
        return;
      }
      if (P === xn) {
        N(l, f, g);
        return;
      }
      if (m !== 2 && y & 1 && E)
        if (m === 0) E.beforeEnter(x), s(x, f, g), fe(() => E.enter(x), b);
        else {
          const { leave: A, delayLeave: F, afterLeave: j } = E,
            K = () => s(x, f, g),
            J = () => {
              A(x, () => {
                K(), j && j();
              });
            };
          F ? F(x, K, J) : J();
        }
      else s(x, f, g);
    },
    ue = (l, f, g, m = !1, b = !1) => {
      const {
        type: x,
        props: P,
        ref: E,
        children: w,
        dynamicChildren: y,
        shapeFlag: S,
        patchFlag: A,
        dirs: F,
      } = l;
      if ((E != null && $n(E, null, g, l, !0), S & 256)) {
        f.ctx.deactivate(l);
        return;
      }
      const j = S & 1 && F,
        K = !Zt(l);
      let J;
      if ((K && (J = P && P.onVnodeBeforeUnmount) && Ie(J, f, l), S & 6))
        _(l.component, g, m);
      else {
        if (S & 128) {
          l.suspense.unmount(g, m);
          return;
        }
        j && Xe(l, null, f, "beforeUnmount"),
          S & 64
            ? l.type.remove(l, f, g, b, k, m)
            : y && (x !== Be || (A > 0 && A & 64))
            ? C(y, f, g, !1, !0)
            : ((x === Be && A & 384) || (!b && S & 16)) && C(w, f, g),
          m && it(l);
      }
      ((K && (J = P && P.onVnodeUnmounted)) || j) &&
        fe(() => {
          J && Ie(J, f, l), j && Xe(l, null, f, "unmounted");
        }, g);
    },
    it = (l) => {
      const { type: f, el: g, anchor: m, transition: b } = l;
      if (f === Be) {
        kt(g, m);
        return;
      }
      if (f === xn) {
        z(l);
        return;
      }
      const x = () => {
        r(g), b && !b.persisted && b.afterLeave && b.afterLeave();
      };
      if (l.shapeFlag & 1 && b && !b.persisted) {
        const { leave: P, delayLeave: E } = b,
          w = () => P(g, x);
        E ? E(l.el, x, w) : w();
      } else x();
    },
    kt = (l, f) => {
      let g;
      for (; l !== f; ) (g = p(l)), r(l), (l = g);
      r(f);
    },
    _ = (l, f, g) => {
      const { bum: m, scope: b, update: x, subTree: P, um: E } = l;
      m && yn(m),
        b.stop(),
        x && ((x.active = !1), ue(P, l, f, g)),
        E && fe(E, f),
        fe(() => {
          l.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          l.asyncDep &&
          !l.asyncResolved &&
          l.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    C = (l, f, g, m = !1, b = !1, x = 0) => {
      for (let P = x; P < l.length; P++) ue(l[P], f, g, m, b);
    },
    R = (l) =>
      l.shapeFlag & 6
        ? R(l.component.subTree)
        : l.shapeFlag & 128
        ? l.suspense.next()
        : p(l.anchor || l.el),
    M = (l, f, g) => {
      l == null
        ? f._vnode && ue(f._vnode, null, null, !0)
        : I(f._vnode || null, l, f, null, null, null, g),
        xs(),
        Or(),
        (f._vnode = l);
    },
    k = {
      p: I,
      um: ue,
      m: _e,
      r: it,
      mt: Ye,
      mc: je,
      pc: Q,
      pbc: Oe,
      n: R,
      o: e,
    };
  let Z, U;
  return t && ([Z, U] = t(k)), { render: M, hydrate: Z, createApp: zi(M, Z) };
}
function Ze({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function zr(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (L(s) && L(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let u = r[o];
      u.shapeFlag & 1 &&
        !u.dynamicChildren &&
        ((u.patchFlag <= 0 || u.patchFlag === 32) &&
          ((u = r[o] = We(r[o])), (u.el = i.el)),
        n || zr(i, u)),
        u.type === pn && (u.el = i.el);
    }
}
function Vi(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, u;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const d = e[s];
    if (d !== 0) {
      if (((r = n[n.length - 1]), e[r] < d)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (u = (o + i) >> 1), e[n[u]] < d ? (o = u + 1) : (i = u);
      d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const Yi = (e) => e.__isTeleport,
  Be = Symbol(void 0),
  pn = Symbol(void 0),
  $t = Symbol(void 0),
  xn = Symbol(void 0),
  It = [];
let Ee = null;
function Hc(e = !1) {
  It.push((Ee = e ? null : []));
}
function Ji() {
  It.pop(), (Ee = It[It.length - 1] || null);
}
let Bt = 1;
function Ms(e) {
  Bt += e;
}
function qr(e) {
  return (
    (e.dynamicChildren = Bt > 0 ? Ee || at : null),
    Ji(),
    Bt > 0 && Ee && Ee.push(e),
    e
  );
}
function $c(e, t, n, s, r, o) {
  return qr(Vr(e, t, n, s, r, o, !0));
}
function Bc(e, t, n, s, r) {
  return qr(ge(e, t, n, s, r, !0));
}
function Bn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Pt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const gn = "__vInternal",
  Qr = ({ key: e }) => e ?? null,
  Gt = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? se(e) || ie(e) || B(e)
        ? { i: ve, r: e, k: t, f: !!n }
        : e
      : null;
function Vr(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === Be ? 0 : 1,
  i = !1,
  u = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Qr(t),
    ref: t && Gt(t),
    scopeId: Ir,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ve,
  };
  return (
    u
      ? (ls(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= se(n) ? 8 : 16),
    Bt > 0 &&
      !i &&
      Ee &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Ee.push(c),
    c
  );
}
const ge = Xi;
function Xi(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === Mi) && (e = $t), Bn(e))) {
    const u = mt(e, t, !0);
    return (
      n && ls(u, n),
      Bt > 0 &&
        !o &&
        Ee &&
        (u.shapeFlag & 6 ? (Ee[Ee.indexOf(e)] = u) : Ee.push(u)),
      (u.patchFlag |= -2),
      u
    );
  }
  if ((ul(e) && (e = e.__vccOpts), t)) {
    t = Zi(t);
    let { class: u, style: c } = t;
    u && !se(u) && (t.class = zn(u)),
      G(c) && (_r(c) && !L(c) && (c = ce({}, c)), (t.style = Wn(c)));
  }
  const i = se(e) ? 1 : mi(e) ? 128 : Yi(e) ? 64 : G(e) ? 4 : B(e) ? 2 : 0;
  return Vr(e, t, n, s, r, i, o, !0);
}
function Zi(e) {
  return e ? (_r(e) || gn in e ? ce({}, e) : e) : null;
}
function mt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    u = t ? el(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Qr(u),
    ref:
      t && t.ref ? (n && r ? (L(r) ? r.concat(Gt(t)) : [r, Gt(t)]) : Gt(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Be ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
  };
}
function Gi(e = " ", t = 0) {
  return ge(pn, null, e, t);
}
function Se(e) {
  return e == null || typeof e == "boolean"
    ? ge($t)
    : L(e)
    ? ge(Be, null, e.slice())
    : typeof e == "object"
    ? We(e)
    : ge(pn, null, String(e));
}
function We(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : mt(e);
}
function ls(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (L(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ls(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(gn in t)
        ? (t._ctx = ve)
        : r === 3 &&
          ve &&
          (ve.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    B(t)
      ? ((t = { default: t, _ctx: ve }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Gi(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function el(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = zn([t.class, s.class]));
      else if (r === "style") t.style = Wn([t.style, s.style]);
      else if (on(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(L(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Ie(e, t, n, s = null) {
  we(e, t, 7, [n, s]);
}
const tl = Wr();
let nl = 0;
function sl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || tl,
    o = {
      uid: nl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Po(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ur(s, r),
      emitsOptions: Tr(s, r),
      emit: null,
      emitted: null,
      propsDefaults: X,
      inheritAttrs: s.inheritAttrs,
      ctx: X,
      data: X,
      props: X,
      attrs: X,
      slots: X,
      refs: X,
      setupState: X,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = fi.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ne = null;
const _t = (e) => {
    (ne = e), e.scope.on();
  },
  st = () => {
    ne && ne.scope.off(), (ne = null);
  };
function Yr(e) {
  return e.vnode.shapeFlag & 4;
}
let Lt = !1;
function rl(e, t = !1) {
  Lt = t;
  const { props: n, children: s } = e.vnode,
    r = Yr(e);
  Li(e, n, r, t), ki(e, s);
  const o = r ? ol(e, t) : void 0;
  return (Lt = !1), o;
}
function ol(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = br(new Proxy(e.ctx, Fi)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? ll(e) : null);
    _t(e), Et();
    const o = Qe(s, e, 0, [e.props, r]);
    if ((xt(), st(), rr(o))) {
      if ((o.then(st, st), t))
        return o
          .then((i) => {
            Ss(e, i, t);
          })
          .catch((i) => {
            an(i, e, 0);
          });
      e.asyncDep = o;
    } else Ss(e, o, t);
  } else Jr(e, t);
}
function Ss(e, t, n) {
  B(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : G(t) && (e.setupState = xr(t)),
    Jr(e, n);
}
let Fs;
function Jr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Fs && !s.render) {
      const r = s.template || os(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: u, compilerOptions: c } = s,
          d = ce(ce({ isCustomElement: o, delimiters: u }, i), c);
        s.render = Fs(r, d);
      }
    }
    e.render = s.render || xe;
  }
  _t(e), Et(), Ni(e), xt(), st();
}
function il(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return he(e, "get", "$attrs"), t[n];
    },
  });
}
function ll(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = il(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function cs(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(xr(br(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Tt) return Tt[n](e);
        },
        has(t, n) {
          return n in t || n in Tt;
        },
      }))
    );
}
function cl(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function ul(e) {
  return B(e) && "__vccOpts" in e;
}
const pe = (e, t) => ri(e, t, Lt);
function Xr(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? G(t) && !L(t)
      ? Bn(t)
        ? ge(e, null, [t])
        : ge(e, t)
      : ge(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Bn(n) && (n = [n]),
      ge(e, t, n));
}
const fl = Symbol(""),
  al = () => Re(fl),
  dl = "3.2.45",
  hl = "http://www.w3.org/2000/svg",
  tt = typeof document < "u" ? document : null,
  Ns = tt && tt.createElement("template"),
  pl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? tt.createElementNS(hl, e)
        : tt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => tt.createTextNode(e),
    createComment: (e) => tt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => tt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));

        );
      else {
        Ns.innerHTML = s ? `<svg>${e}</svg>` : e;
        const u = Ns.content;
        if (s) {
          const c = u.firstChild;
          for (; c.firstChild; ) u.appendChild(c.firstChild);
          u.removeChild(c);
        }
        t.insertBefore(u, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function gl(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function ml(e, t, n) {
  const s = e.style,
    r = se(n);
  if (n && !r) {
    for (const o in n) Ln(s, o, n[o]);
    if (t && !se(t)) for (const o in t) n[o] == null && Ln(s, o, "");
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = o);
  }
}
const js = /\s*!important$/;
function Ln(e, t, n) {
  if (L(n)) n.forEach((s) => Ln(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = _l(e, t);
    js.test(n)
      ? e.setProperty(vt(s), n.replace(js, ""), "important")
      : (e[s] = n);
  }
}
const Hs = ["Webkit", "Moz", "ms"],
  wn = {};
function _l(e, t) {
  const n = wn[t];
  if (n) return n;
  let s = Ne(t);
  if (s !== "filter" && s in e) return (wn[t] = s);
  s = un(s);
  for (let r = 0; r < Hs.length; r++) {
    const o = Hs[r] + s;
    if (o in e) return (wn[t] = o);
  }
  return t;
}
const $s = "http://www.w3.org/1999/xlink";
function bl(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS($s, t.slice(6, t.length))
      : e.setAttributeNS($s, t, n);
  else {
    const o = po(t);
    n == null || (o && !sr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function yl(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n ?? "");
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const c = n ?? "";
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = sr(n))
      : n == null && c === "string"
      ? ((n = ""), (u = !0))
      : c === "number" && ((n = 0), (u = !0));
  }
  try {
    e[t] = n;
  } catch {}
  u && e.removeAttribute(t);
}
function vl(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function El(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function xl(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [u, c] = wl(t);
    if (s) {
      const d = (o[t] = Cl(s, r));
      vl(e, u, d, c);
    } else i && (El(e, u, i, c), (o[t] = void 0));
  }
}
const Bs = /(?:Once|Passive|Capture)$/;
function wl(e) {
  let t;
  if (Bs.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Bs)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : vt(e.slice(2)), t];
}
let Rn = 0;
const Rl = Promise.resolve(),
  Pl = () => Rn || (Rl.then(() => (Rn = 0)), (Rn = Date.now()));
function Cl(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    we(Ol(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Pl()), n;
}
function Ol(e, t) {
  if (L(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const Ls = /^on[a-z]/,
  Al = (e, t, n, s, r = !1, o, i, u, c) => {
    t === "class"
      ? gl(e, s, r)
      : t === "style"
      ? ml(e, n, s)
      : on(t)
      ? qn(t) || xl(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Tl(e, t, s, r)
        )
      ? yl(e, t, s, o, i, u, c)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        bl(e, t, s, r));
  };
function Tl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Ls.test(t) && B(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Ls.test(t) && se(n))
    ? !1
    : t in e;
}
const Il = ce({ patchProp: Al }, pl);
let Us;
function Ml() {
  return Us || (Us = qi(Il));
}
const Lc = (...e) => {
  const t = Ml().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Sl(s);
      if (!r) return;
      const o = t._component;
      !B(o) && !o.render && !o.template && (o.template = r.innerHTML),
        (r.innerHTML = "");
      const i = n(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function Sl(e) {
  return se(e) ? document.querySelector(e) : e;
}
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const ut = typeof window < "u";
function Fl(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const q = Object.assign;
function Pn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Pe(r) ? r.map(e) : e(r);
  }
  return n;
}
const Mt = () => {},
  Pe = Array.isArray,
  Nl = /\/$/,
  jl = (e) => e.replace(Nl, "");
function Cn(e, t, n = "/") {
  let s,
    r = {},
    o = "",
    i = "";
  const u = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    u < c && u >= 0 && (c = -1),
    c > -1 &&
      ((s = t.slice(0, c)),
      (o = t.slice(c + 1, u > -1 ? u : t.length)),
      (r = e(o))),
    u > -1 && ((s = s || t.slice(0, u)), (i = t.slice(u, t.length))),
    (s = Ll(s ?? t, n)),
    { fullPath: s + (o && "?") + o + i, path: s, query: r, hash: i }
  );
}
function Hl(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ks(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function $l(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    s > -1 &&
    s === r &&
    bt(t.matched[s], n.matched[r]) &&
    Zr(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function bt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Zr(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Bl(e[n], t[n])) return !1;
  return !0;
}
function Bl(e, t) {
  return Pe(e) ? ks(e, t) : Pe(t) ? ks(t, e) : e === t;
}
function ks(e, t) {
  return Pe(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function Ll(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    s = e.split("/");
  let r = n.length - 1,
    o,
    i;
  for (o = 0; o < s.length; o++)
    if (((i = s[o]), i !== "."))
      if (i === "..") r > 1 && r--;
      else break;
  return (
    n.slice(0, r).join("/") +
    "/" +
    s.slice(o - (o === s.length ? 1 : 0)).join("/")
  );
}
var Ut;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Ut || (Ut = {}));
var St;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(St || (St = {}));
function Ul(e) {
  if (!e)
    if (ut) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), jl(e);
}
const Kl = /^[^#]+#/;
function kl(e, t) {
  return e.replace(Kl, "#") + t;
}
function Dl(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const mn = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Wl(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = Dl(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function Ds(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Un = new Map();
function zl(e, t) {
  Un.set(e, t);
}
function ql(e) {
  const t = Un.get(e);
  return Un.delete(e), t;
}
let Ql = () => location.protocol + "//" + location.host;
function Gr(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let u = r.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = r.slice(u);
    return c[0] !== "/" && (c = "/" + c), Ks(c, "");
  }
  return Ks(n, e) + s + r;
}
function Vl(e, t, n, s) {
  let r = [],
    o = [],
    i = null;
  const u = ({ state: p }) => {
    const v = Gr(e, location),
      O = n.value,
      I = t.value;
    let $ = 0;
    if (p) {
      if (((n.value = v), (t.value = p), i && i === O)) {
        i = null;
        return;
      }
      $ = I ? p.position - I.position : 0;
    } else s(v);
    r.forEach((T) => {
      T(n.value, O, {
        delta: $,
        type: Ut.pop,
        direction: $ ? ($ > 0 ? St.forward : St.back) : St.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function d(p) {
    r.push(p);
    const v = () => {
      const O = r.indexOf(p);
      O > -1 && r.splice(O, 1);
    };
    return o.push(v), v;
  }
  function a() {
    const { history: p } = window;
    p.state && p.replaceState(q({}, p.state, { scroll: mn() }), "");
  }
  function h() {
    for (const p of o) p();
    (o = []),
      window.removeEventListener("popstate", u),
      window.removeEventListener("beforeunload", a);
  }
  return (
    window.addEventListener("popstate", u),
    window.addEventListener("beforeunload", a),
    { pauseListeners: c, listen: d, destroy: h }
  );
}
function Ws(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? mn() : null,
  };
}
function Yl(e) {
  const { history: t, location: n } = window,
    s = { value: Gr(e, n) },
    r = { value: t.state };
  r.value ||
    o(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(c, d, a) {
    const h = e.indexOf("#"),
      p =
        h > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(h)) + c
          : Ql() + e + c;
    try {
      t[a ? "replaceState" : "pushState"](d, "", p), (r.value = d);
    } catch (v) {
      console.error(v), n[a ? "replace" : "assign"](p);
    }
  }
  function i(c, d) {
    const a = q({}, t.state, Ws(r.value.back, c, r.value.forward, !0), d, {
      position: r.value.position,
    });
    o(c, a, !0), (s.value = c);
  }
  function u(c, d) {
    const a = q({}, r.value, t.state, { forward: c, scroll: mn() });
    o(a.current, a, !0);
    const h = q({}, Ws(s.value, c, null), { position: a.position + 1 }, d);
    o(c, h, !1), (s.value = c);
  }
  return { location: s, state: r, push: u, replace: i };
}
function Jl(e) {
  e = Ul(e);
  const t = Yl(e),
    n = Vl(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = q(
    { location: "", base: e, go: s, createHref: kl.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function Uc(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    Jl(e)
  );
}
function Xl(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function eo(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const De = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  to = Symbol("");
var zs;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(zs || (zs = {}));
function yt(e, t) {
  return q(new Error(), { type: e, [to]: !0 }, t);
}
function He(e, t) {
  return e instanceof Error && to in e && (t == null || !!(e.type & t));
}
const qs = "[^/]+?",
  Zl = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Gl = /[.+*?^${}()[\]/\\]/g;
function ec(e, t) {
  const n = q({}, Zl, t),
    s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const d of e) {
    const a = d.length ? [] : [90];
    n.strict && !d.length && (r += "/");
    for (let h = 0; h < d.length; h++) {
      const p = d[h];
      let v = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        h || (r += "/"), (r += p.value.replace(Gl, "\\$&")), (v += 40);
      else if (p.type === 1) {
        const { value: O, repeatable: I, optional: $, regexp: T } = p;
        o.push({ name: O, repeatable: I, optional: $ });
        const H = T || qs;
        if (H !== qs) {
          v += 10;
          try {
            new RegExp(`(${H})`);
          } catch (z) {
            throw new Error(
              `Invalid custom RegExp for param "${O}" (${H}): ` + z.message
            );
          }
        }
        let N = I ? `((?:${H})(?:/(?:${H}))*)` : `(${H})`;
        h || (N = $ && d.length < 2 ? `(?:/${N})` : "/" + N),
          $ && (N += "?"),
          (r += N),
          (v += 20),
          $ && (v += -8),
          I && (v += -20),
          H === ".*" && (v += -50);
      }
      a.push(v);
    }
    s.push(a);
  }
  if (n.strict && n.end) {
    const d = s.length - 1;
    s[d][s[d].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function u(d) {
    const a = d.match(i),
      h = {};
    if (!a) return null;
    for (let p = 1; p < a.length; p++) {
      const v = a[p] || "",
        O = o[p - 1];
      h[O.name] = v && O.repeatable ? v.split("/") : v;
    }
    return h;
  }
  function c(d) {
    let a = "",
      h = !1;
    for (const p of e) {
      (!h || !a.endsWith("/")) && (a += "/"), (h = !1);
      for (const v of p)
        if (v.type === 0) a += v.value;
        else if (v.type === 1) {
          const { value: O, repeatable: I, optional: $ } = v,
            T = O in d ? d[O] : "";
          if (Pe(T) && !I)
            throw new Error(
              `Provided param "${O}" is an array but it is not repeatable (* or + modifiers)`
            );
          const H = Pe(T) ? T.join("/") : T;
          if (!H)
            if ($)
              p.length < 2 &&
                (a.endsWith("/") ? (a = a.slice(0, -1)) : (h = !0));
            else throw new Error(`Missing required param "${O}"`);
          a += H;
        }
    }
    return a || "/";
  }
  return { re: i, score: s, keys: o, parse: u, stringify: c };
}
function tc(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function nc(e, t) {
  let n = 0;
  const s = e.score,
    r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = tc(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Qs(s)) return 1;
    if (Qs(r)) return -1;
  }
  return r.length - s.length;
}
function Qs(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const sc = { type: 0, value: "" },
  rc = /[a-zA-Z0-9_]/;
function oc(e) {
  if (!e) return [[]];
  if (e === "/") return [[sc]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(v) {
    throw new Error(`ERR (${n})/"${d}": ${v}`);
  }
  let n = 0,
    s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), (o = []);
  }
  let u = 0,
    c,
    d = "",
    a = "";
  function h() {
    d &&
      (n === 0
        ? o.push({ type: 0, value: d })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (c === "*" || c === "+") &&
            t(
              `A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: d,
            regexp: a,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?",
          }))
        : t("Invalid state to consume buffer"),
      (d = ""));
  }
  function p() {
    d += c;
  }
  for (; u < e.length; ) {
    if (((c = e[u++]), c === "\\" && n !== 2)) {
      (s = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (d && h(), i()) : c === ":" ? (h(), (n = 1)) : p();
        break;
      case 4:
        p(), (n = s);
        break;
      case 1:
        c === "("
          ? (n = 2)
          : rc.test(c)
          ? p()
          : (h(), (n = 0), c !== "*" && c !== "?" && c !== "+" && u--);
        break;
      case 2:
        c === ")"
          ? a[a.length - 1] == "\\"
            ? (a = a.slice(0, -1) + c)
            : (n = 3)
          : (a += c);
        break;
      case 3:
        h(), (n = 0), c !== "*" && c !== "?" && c !== "+" && u--, (a = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${d}"`), h(), i(), r;
}
function ic(e, t, n) {
  const s = ec(oc(e.path), n),
    r = q(s, { record: e, parent: t, children: [], alias: [] });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function lc(e, t) {
  const n = [],
    s = new Map();
  t = Js({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(a) {
    return s.get(a);
  }
  function o(a, h, p) {
    const v = !p,
      O = cc(a);
    O.aliasOf = p && p.record;
    const I = Js(t, a),
      $ = [O];
    if ("alias" in a) {
      const N = typeof a.alias == "string" ? [a.alias] : a.alias;
      for (const z of N)
        $.push(
          q({}, O, {
            components: p ? p.record.components : O.components,
            path: z,
            aliasOf: p ? p.record : O,
          })
        );
    }
    let T, H;
    for (const N of $) {
      const { path: z } = N;
      if (h && z[0] !== "/") {
        const re = h.record.path,
          ae = re[re.length - 1] === "/" ? "" : "/";
        N.path = h.record.path + (z && ae + z);
      }
      if (
        ((T = ic(N, h, I)),
        p
          ? p.alias.push(T)
          : ((H = H || T),
            H !== T && H.alias.push(T),
            v && a.name && !Ys(T) && i(a.name)),
        O.children)
      ) {
        const re = O.children;
        for (let ae = 0; ae < re.length; ae++)
          o(re[ae], T, p && p.children[ae]);
      }
      (p = p || T),
        ((T.record.components && Object.keys(T.record.components).length) ||
          T.record.name ||
          T.record.redirect) &&
          c(T);
    }
    return H
      ? () => {
          i(H);
        }
      : Mt;
  }
  function i(a) {
    if (eo(a)) {
      const h = s.get(a);
      h &&
        (s.delete(a),
        n.splice(n.indexOf(h), 1),
        h.children.forEach(i),
        h.alias.forEach(i));
    } else {
      const h = n.indexOf(a);
      h > -1 &&
        (n.splice(h, 1),
        a.record.name && s.delete(a.record.name),
        a.children.forEach(i),
        a.alias.forEach(i));
    }
  }
  function u() {
    return n;
  }
  function c(a) {
    let h = 0;
    for (
      ;
      h < n.length &&
      nc(a, n[h]) >= 0 &&
      (a.record.path !== n[h].record.path || !no(a, n[h]));

    )
      h++;
    n.splice(h, 0, a), a.record.name && !Ys(a) && s.set(a.record.name, a);
  }
  function d(a, h) {
    let p,
      v = {},
      O,
      I;
    if ("name" in a && a.name) {
      if (((p = s.get(a.name)), !p)) throw yt(1, { location: a });
      (I = p.record.name),
        (v = q(
          Vs(
            h.params,
            p.keys.filter((H) => !H.optional).map((H) => H.name)
          ),
          a.params &&
            Vs(
              a.params,
              p.keys.map((H) => H.name)
            )
        )),
        (O = p.stringify(v));
    } else if ("path" in a)
      (O = a.path),
        (p = n.find((H) => H.re.test(O))),
        p && ((v = p.parse(O)), (I = p.record.name));
    else {
      if (((p = h.name ? s.get(h.name) : n.find((H) => H.re.test(h.path))), !p))
        throw yt(1, { location: a, currentLocation: h });
      (I = p.record.name),
        (v = q({}, h.params, a.params)),
        (O = p.stringify(v));
    }
    const $ = [];
    let T = p;
    for (; T; ) $.unshift(T.record), (T = T.parent);
    return { name: I, path: O, params: v, matched: $, meta: fc($) };
  }
  return (
    e.forEach((a) => o(a)),
    {
      addRoute: o,
      resolve: d,
      removeRoute: i,
      getRoutes: u,
      getRecordMatcher: r,
    }
  );
}
function Vs(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function cc(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: uc(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function uc(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "boolean" ? n : n[s];
  return t;
}
function Ys(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function fc(e) {
  return e.reduce((t, n) => q(t, n.meta), {});
}
function Js(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function no(e, t) {
  return t.children.some((n) => n === e || no(e, n));
}
const so = /#/g,
  ac = /&/g,
  dc = /\//g,
  hc = /=/g,
  pc = /\?/g,
  ro = /\+/g,
  gc = /%5B/g,
  mc = /%5D/g,
  oo = /%5E/g,
  _c = /%60/g,
  io = /%7B/g,
  bc = /%7C/g,
  lo = /%7D/g,
  yc = /%20/g;
function us(e) {
  return encodeURI("" + e)
    .replace(bc, "|")
    .replace(gc, "[")
    .replace(mc, "]");
}
function vc(e) {
  return us(e).replace(io, "{").replace(lo, "}").replace(oo, "^");
}
function Kn(e) {
  return us(e)
    .replace(ro, "%2B")
    .replace(yc, "+")
    .replace(so, "%23")
    .replace(ac, "%26")
    .replace(_c, "`")
    .replace(io, "{")
    .replace(lo, "}")
    .replace(oo, "^");
}
function Ec(e) {
  return Kn(e).replace(hc, "%3D");
}
function xc(e) {
  return us(e).replace(so, "%23").replace(pc, "%3F");
}
function wc(e) {
  return e == null ? "" : xc(e).replace(dc, "%2F");
}
function rn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function Rc(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(ro, " "),
      i = o.indexOf("="),
      u = rn(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : rn(o.slice(i + 1));
    if (u in t) {
      let d = t[u];
      Pe(d) || (d = t[u] = [d]), d.push(c);
    } else t[u] = c;
  }
  return t;
}
function Xs(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = Ec(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Pe(s) ? s.map((o) => o && Kn(o)) : [s && Kn(s)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function Pc(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 &&
      (t[n] = Pe(s)
        ? s.map((r) => (r == null ? null : "" + r))
        : s == null
        ? s
        : "" + s);
  }
  return t;
}
const Cc = Symbol(""),
  Zs = Symbol(""),
  _n = Symbol(""),
  fs = Symbol(""),
  kn = Symbol("");
function Ct() {
  let e = [];
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function ze(e, t, n, s, r) {
  const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () =>
    new Promise((i, u) => {
      const c = (h) => {
          h === !1
            ? u(yt(4, { from: n, to: t }))
            : h instanceof Error
            ? u(h)
            : Xl(h)
            ? u(yt(2, { from: t, to: h }))
            : (o &&
                s.enterCallbacks[r] === o &&
                typeof h == "function" &&
                o.push(h),
              i());
        },
        d = e.call(s && s.instances[r], t, n, c);
      let a = Promise.resolve(d);
      e.length < 3 && (a = a.then(c)), a.catch((h) => u(h));
    });
}
function On(e, t, n, s) {
  const r = [];
  for (const o of e)
    for (const i in o.components) {
      let u = o.components[i];
      if (!(t !== "beforeRouteEnter" && !o.instances[i]))
        if (Oc(u)) {
          const d = (u.__vccOpts || u)[t];
          d && r.push(ze(d, n, s, o, i));
        } else {
          let c = u();
          r.push(() =>
            c.then((d) => {
              if (!d)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                );
              const a = Fl(d) ? d.default : d;
              o.components[i] = a;
              const p = (a.__vccOpts || a)[t];
              return p && ze(p, n, s, o, i)();
            })
          );
        }
    }
  return r;
}
function Oc(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Gs(e) {
  const t = Re(_n),
    n = Re(fs),
    s = pe(() => t.resolve(ht(e.to))),
    r = pe(() => {
      const { matched: c } = s.value,
        { length: d } = c,
        a = c[d - 1],
        h = n.matched;
      if (!a || !h.length) return -1;
      const p = h.findIndex(bt.bind(null, a));
      if (p > -1) return p;
      const v = er(c[d - 2]);
      return d > 1 && er(a) === v && h[h.length - 1].path !== v
        ? h.findIndex(bt.bind(null, c[d - 2]))
        : p;
    }),
    o = pe(() => r.value > -1 && Mc(n.params, s.value.params)),
    i = pe(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        Zr(n.params, s.value.params)
    );
  function u(c = {}) {
    return Ic(c)
      ? t[ht(e.replace) ? "replace" : "push"](ht(e.to)).catch(Mt)
      : Promise.resolve();
  }
  return {
    route: s,
    href: pe(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: u,
  };
}
const Ac = Fr({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Gs,
    setup(e, { slots: t }) {
      const n = Kt(Gs(e)),
        { options: s } = Re(_n),
        r = pe(() => ({
          [tr(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [tr(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : Xr(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              o
            );
      };
    },
  }),
  Tc = Ac;
function Ic(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Mc(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (!Pe(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function er(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const tr = (e, t, n) => e ?? t ?? n,
  Sc = Fr({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = Re(kn),
        r = pe(() => e.route || s.value),
        o = Re(Zs, 0),
        i = pe(() => {
          let d = ht(o);
          const { matched: a } = r.value;
          let h;
          for (; (h = a[d]) && !h.components; ) d++;
          return d;
        }),
        u = pe(() => r.value.matched[i.value]);
      Jt(
        Zs,
        pe(() => i.value + 1)
      ),
        Jt(Cc, u),
        Jt(kn, r);
      const c = Go();
      return (
        Xt(
          () => [c.value, u.value, e.name],
          ([d, a, h], [p, v, O]) => {
            a &&
              ((a.instances[h] = d),
              v &&
                v !== a &&
                d &&
                d === p &&
                (a.leaveGuards.size || (a.leaveGuards = v.leaveGuards),
                a.updateGuards.size || (a.updateGuards = v.updateGuards))),
              d &&
                a &&
                (!v || !bt(a, v) || !p) &&
                (a.enterCallbacks[h] || []).forEach((I) => I(d));
          },
          { flush: "post" }
        ),
        () => {
          const d = r.value,
            a = e.name,
            h = u.value,
            p = h && h.components[a];
          if (!p) return nr(n.default, { Component: p, route: d });
          const v = h.props[a],
            O = v
              ? v === !0
                ? d.params
                : typeof v == "function"
                ? v(d)
                : v
              : null,
            $ = Xr(
              p,
              q({}, O, t, {
                onVnodeUnmounted: (T) => {
                  T.component.isUnmounted && (h.instances[a] = null);
                },
                ref: c,
              })
            );
          return nr(n.default, { Component: $, route: d }) || $;
        }
      );
    },
  });
function nr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Fc = Sc;
function Kc(e) {
  const t = lc(e.routes, e),
    n = e.parseQuery || Rc,
    s = e.stringifyQuery || Xs,
    r = e.history,
    o = Ct(),
    i = Ct(),
    u = Ct(),
    c = ei(De);
  let d = De;
  ut &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const a = Pn.bind(null, (_) => "" + _),
    h = Pn.bind(null, wc),
    p = Pn.bind(null, rn);
  function v(_, C) {
    let R, M;
    return (
      eo(_) ? ((R = t.getRecordMatcher(_)), (M = C)) : (M = _), t.addRoute(M, R)
    );
  }
  function O(_) {
    const C = t.getRecordMatcher(_);
    C && t.removeRoute(C);
  }
  function I() {
    return t.getRoutes().map((_) => _.record);
  }
  function $(_) {
    return !!t.getRecordMatcher(_);
  }
  function T(_, C) {
    if (((C = q({}, C || c.value)), typeof _ == "string")) {
      const l = Cn(n, _, C.path),
        f = t.resolve({ path: l.path }, C),
        g = r.createHref(l.fullPath);
      return q(l, f, {
        params: p(f.params),
        hash: rn(l.hash),
        redirectedFrom: void 0,
        href: g,
      });
    }
    let R;
    if ("path" in _) R = q({}, _, { path: Cn(n, _.path, C.path).path });
    else {
      const l = q({}, _.params);
      for (const f in l) l[f] == null && delete l[f];
      (R = q({}, _, { params: h(_.params) })), (C.params = h(C.params));
    }
    const M = t.resolve(R, C),
      k = _.hash || "";
    M.params = a(p(M.params));
    const Z = Hl(s, q({}, _, { hash: vc(k), path: M.path })),
      U = r.createHref(Z);
    return q(
      { fullPath: Z, hash: k, query: s === Xs ? Pc(_.query) : _.query || {} },
      M,
      { redirectedFrom: void 0, href: U }
    );
  }
  function H(_) {
    return typeof _ == "string" ? Cn(n, _, c.value.path) : q({}, _);
  }
  function N(_, C) {
    if (d !== _) return yt(8, { from: C, to: _ });
  }
  function z(_) {
    return Ce(_);
  }
  function re(_) {
    return z(q(H(_), { replace: !0 }));
  }
  function ae(_) {
    const C = _.matched[_.matched.length - 1];
    if (C && C.redirect) {
      const { redirect: R } = C;
      let M = typeof R == "function" ? R(_) : R;
      return (
        typeof M == "string" &&
          ((M = M.includes("?") || M.includes("#") ? (M = H(M)) : { path: M }),
          (M.params = {})),
        q(
          { query: _.query, hash: _.hash, params: "path" in M ? {} : _.params },
          M
        )
      );
    }
  }
  function Ce(_, C) {
    const R = (d = T(_)),
      M = c.value,
      k = _.state,
      Z = _.force,
      U = _.replace === !0,
      l = ae(R);
    if (l)
      return Ce(
        q(H(l), {
          state: typeof l == "object" ? q({}, k, l.state) : k,
          force: Z,
          replace: U,
        }),
        C || R
      );
    const f = R;
    f.redirectedFrom = C;
    let g;
    return (
      !Z && $l(s, M, R) && ((g = yt(16, { to: f, from: M })), Je(M, M, !0, !1)),
      (g ? Promise.resolve(g) : rt(f, M))
        .catch((m) => (He(m) ? (He(m, 2) ? m : me(m)) : Y(m, f, M)))
        .then((m) => {
          if (m) {
            if (He(m, 2))
              return Ce(
                q({ replace: U }, H(m.to), {
                  state: typeof m.to == "object" ? q({}, k, m.to.state) : k,
                  force: Z,
                }),
                C || f
              );
          } else m = Ke(f, M, !0, U, k);
          return Oe(f, M, m), m;
        })
    );
  }
  function je(_, C) {
    const R = N(_, C);
    return R ? Promise.reject(R) : Promise.resolve();
  }
  function rt(_, C) {
    let R;
    const [M, k, Z] = Nc(_, C);
    R = On(M.reverse(), "beforeRouteLeave", _, C);
    for (const l of M)
      l.leaveGuards.forEach((f) => {
        R.push(ze(f, _, C));
      });
    const U = je.bind(null, _, C);
    return (
      R.push(U),
      ct(R)
        .then(() => {
          R = [];
          for (const l of o.list()) R.push(ze(l, _, C));
          return R.push(U), ct(R);
        })
        .then(() => {
          R = On(k, "beforeRouteUpdate", _, C);
          for (const l of k)
            l.updateGuards.forEach((f) => {
              R.push(ze(f, _, C));
            });
          return R.push(U), ct(R);
        })
        .then(() => {
          R = [];
          for (const l of _.matched)
            if (l.beforeEnter && !C.matched.includes(l))
              if (Pe(l.beforeEnter))
                for (const f of l.beforeEnter) R.push(ze(f, _, C));
              else R.push(ze(l.beforeEnter, _, C));
          return R.push(U), ct(R);
        })
        .then(
          () => (
            _.matched.forEach((l) => (l.enterCallbacks = {})),
            (R = On(Z, "beforeRouteEnter", _, C)),
            R.push(U),
            ct(R)
          )
        )
        .then(() => {
          R = [];
          for (const l of i.list()) R.push(ze(l, _, C));
          return R.push(U), ct(R);
        })
        .catch((l) => (He(l, 8) ? l : Promise.reject(l)))
    );
  }
  function Oe(_, C, R) {
    for (const M of u.list()) M(_, C, R);
  }
  function Ke(_, C, R, M, k) {
    const Z = N(_, C);
    if (Z) return Z;
    const U = C === De,
      l = ut ? history.state : {};
    R &&
      (M || U
        ? r.replace(_.fullPath, q({ scroll: U && l && l.scroll }, k))
        : r.push(_.fullPath, k)),
      (c.value = _),
      Je(_, C, R, U),
      me();
  }
  let Ae;
  function ot() {
    Ae ||
      (Ae = r.listen((_, C, R) => {
        if (!kt.listening) return;
        const M = T(_),
          k = ae(M);
        if (k) {
          Ce(q(k, { replace: !0 }), M).catch(Mt);
          return;
        }
        d = M;
        const Z = c.value;
        ut && zl(Ds(Z.fullPath, R.delta), mn()),
          rt(M, Z)
            .catch((U) =>
              He(U, 12)
                ? U
                : He(U, 2)
                ? (Ce(U.to, M)
                    .then((l) => {
                      He(l, 20) &&
                        !R.delta &&
                        R.type === Ut.pop &&
                        r.go(-1, !1);
                    })
                    .catch(Mt),
                  Promise.reject())
                : (R.delta && r.go(-R.delta, !1), Y(U, M, Z))
            )
            .then((U) => {
              (U = U || Ke(M, Z, !1)),
                U &&
                  (R.delta && !He(U, 8)
                    ? r.go(-R.delta, !1)
                    : R.type === Ut.pop && He(U, 20) && r.go(-1, !1)),
                Oe(M, Z, U);
            })
            .catch(Mt);
      }));
  }
  let Ye = Ct(),
    wt = Ct(),
    ee;
  function Y(_, C, R) {
    me(_);
    const M = wt.list();
    return (
      M.length ? M.forEach((k) => k(_, C, R)) : console.error(_),
      Promise.reject(_)
    );
  }
  function Q() {
    return ee && c.value !== De
      ? Promise.resolve()
      : new Promise((_, C) => {
          Ye.add([_, C]);
        });
  }
  function me(_) {
    return (
      ee ||
        ((ee = !_),
        ot(),
        Ye.list().forEach(([C, R]) => (_ ? R(_) : C())),
        Ye.reset()),
      _
    );
  }
  function Je(_, C, R, M) {
    const { scrollBehavior: k } = e;
    if (!ut || !k) return Promise.resolve();
    const Z =
      (!R && ql(Ds(_.fullPath, 0))) ||
      ((M || !R) && history.state && history.state.scroll) ||
      null;
    return Pr()
      .then(() => k(_, C, Z))
      .then((U) => U && Wl(U))
      .catch((U) => Y(U, _, C));
  }
  const _e = (_) => r.go(_);
  let ue;
  const it = new Set(),
    kt = {
      currentRoute: c,
      listening: !0,
      addRoute: v,
      removeRoute: O,
      hasRoute: $,
      getRoutes: I,
      resolve: T,
      options: e,
      push: z,
      replace: re,
      go: _e,
      back: () => _e(-1),
      forward: () => _e(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: u.add,
      onError: wt.add,
      isReady: Q,
      install(_) {
        const C = this;
        _.component("RouterLink", Tc),
          _.component("RouterView", Fc),
          (_.config.globalProperties.$router = C),
          Object.defineProperty(_.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => ht(c),
          }),
          ut &&
            !ue &&
            c.value === De &&
            ((ue = !0), z(r.location).catch((k) => {}));
        const R = {};
        for (const k in De) R[k] = pe(() => c.value[k]);
        _.provide(_n, C), _.provide(fs, Kt(R)), _.provide(kn, c);
        const M = _.unmount;
        it.add(_),
          (_.unmount = function () {
            it.delete(_),
              it.size < 1 &&
                ((d = De),
                Ae && Ae(),
                (Ae = null),
                (c.value = De),
                (ue = !1),
                (ee = !1)),
              M();
          });
      },
    };
  return kt;
}
function ct(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function Nc(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const u = t.matched[i];
    u && (e.matched.find((d) => bt(d, u)) ? s.push(u) : n.push(u));
    const c = e.matched[i];
    c && (t.matched.find((d) => bt(d, c)) || r.push(c));
  }
  return [n, s, r];
}
function kc() {
  return Re(_n);
}
function Dc() {
  return Re(fs);
}
export {
  Be as F,
  Kc as a,
  Uc as b,
  Bc as c,
  Lc as d,
  $c as e,
  Vr as f,
  kc as g,
  Hc as o,
  jc as r,
  Dc as u,
};
