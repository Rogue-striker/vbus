function Je() {
  let e = /* @__PURE__ */ new Map();
  return {
    all: e,
    on: function(n, s) {
      let r = e.get(n);
      r ? r.push(s) : e.set(n, [s]);
    },
    off: function(n) {
      e.get(n) && e.set(n, []);
    },
    emit: function(n, s) {
      let r = e.get(n);
      r && r.map(function(o) {
        o(s);
      });
    }
  };
}
function zt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function Pe(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = y(s) ? Wt(s) : Pe(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if (y(e))
      return e;
    if (v(e))
      return e;
  }
}
const Kt = /;(?![^(]*\))/g, Ht = /:([^]+)/, Bt = /\/\*.*?\*\//gs;
function Wt(e) {
  const t = {};
  return e.replace(Bt, "").split(Kt).forEach((n) => {
    if (n) {
      const s = n.split(Ht);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ce(e) {
  let t = "";
  if (y(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ce(e[n]);
      s && (t += s + " ");
    }
  else if (v(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const C = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Te = () => {
}, Ut = () => !1, Jt = /^on[^a-z]/, qt = (e) => Jt.test(e), R = Object.assign, Gt = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Lt = Object.prototype.hasOwnProperty, g = (e, t) => Lt.call(e, t), h = Array.isArray, Y = (e) => me(e) === "[object Map]", Yt = (e) => me(e) === "[object Set]", N = (e) => typeof e == "function", y = (e) => typeof e == "string", $e = (e) => typeof e == "symbol", v = (e) => e !== null && typeof e == "object", Qt = (e) => v(e) && N(e.then) && N(e.catch), Xt = Object.prototype.toString, me = (e) => Xt.call(e), it = (e) => me(e).slice(8, -1), Zt = (e) => me(e) === "[object Object]", Me = (e) => y(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, kt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, en = kt((e) => e.charAt(0).toUpperCase() + e.slice(1)), pe = (e, t) => !Object.is(e, t), tn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let qe;
const nn = () => qe || (qe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ge(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ct;
function rn(e, t = ct) {
  t && t.active && t.effects.push(e);
}
function sn() {
  return ct;
}
const be = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, lt = (e) => (e.w & j) > 0, ut = (e) => (e.n & j) > 0, on = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= j;
}, cn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      lt(r) && !ut(r) ? r.delete(e) : t[n++] = r, r.w &= ~j, r.n &= ~j;
    }
    t.length = n;
  }
}, Se = /* @__PURE__ */ new WeakMap();
let Z = 0, j = 1;
const ve = 30;
let b;
const H = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Ve = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class ln {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, rn(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = b, n = B;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = b, b = this, B = !0, j = 1 << ++Z, Z <= ve ? on(this) : Le(this), this.fn();
    } finally {
      Z <= ve && cn(this), j = 1 << --Z, b = this.parent, B = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    b === this ? this.deferStop = !0 : this.active && (Le(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Le(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let B = !0;
const at = [];
function ft() {
  at.push(B), B = !1;
}
function pt() {
  const e = at.pop();
  B = e === void 0 ? !0 : e;
}
function x(e, t, n) {
  if (B && b) {
    let s = Se.get(e);
    s || Se.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = be());
    const o = process.env.NODE_ENV !== "production" ? { effect: b, target: e, type: t, key: n } : void 0;
    un(r, o);
  }
}
function un(e, t) {
  let n = !1;
  Z <= ve ? ut(e) || (e.n |= j, n = !lt(e)) : n = !e.has(b), n && (e.add(b), b.deps.push(e), process.env.NODE_ENV !== "production" && b.onTrack && b.onTrack(Object.assign({ effect: b }, t)));
}
function z(e, t, n, s, r, o) {
  const i = Se.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e)) {
    const f = Number(s);
    i.forEach((d, l) => {
      (l === "length" || l >= f) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? Me(n) && c.push(i.get("length")) : (c.push(i.get(H)), Y(e) && c.push(i.get(Ve)));
        break;
      case "delete":
        h(e) || (c.push(i.get(H)), Y(e) && c.push(i.get(Ve)));
        break;
      case "set":
        Y(e) && c.push(i.get(H));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? re(c[0], u) : re(c[0]));
  else {
    const f = [];
    for (const d of c)
      d && f.push(...d);
    process.env.NODE_ENV !== "production" ? re(be(f), u) : re(be(f));
  }
}
function re(e, t) {
  const n = h(e) ? e : [...e];
  for (const s of n)
    s.computed && Ye(s, t);
  for (const s of n)
    s.computed || Ye(s, t);
}
function Ye(e, t) {
  (e !== b || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(R({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const an = /* @__PURE__ */ zt("__proto__,__v_isRef,__isVue"), dt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter($e)
), fn = /* @__PURE__ */ Fe(), pn = /* @__PURE__ */ Fe(!0), dn = /* @__PURE__ */ Fe(!0, !0), Qe = /* @__PURE__ */ hn();
function hn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        x(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(p)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ft();
      const s = p(this)[t].apply(this, n);
      return pt(), s;
    };
  }), e;
}
function _n(e) {
  const t = p(this);
  return x(t, "has", e), t.hasOwnProperty(e);
}
function Fe(e = !1, t = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && o === (e ? t ? Et : mt : t ? Pn : gt).get(s))
      return s;
    const i = h(s);
    if (!e) {
      if (i && g(Qe, r))
        return Reflect.get(Qe, r, o);
      if (r === "hasOwnProperty")
        return _n;
    }
    const c = Reflect.get(s, r, o);
    return ($e(r) ? dt.has(r) : an(r)) || (e || x(s, "get", r), t) ? c : S(c) ? i && Me(r) ? c : c.value : v(c) ? e ? Nt(c) : wt(c) : c;
  };
}
const gn = /* @__PURE__ */ mn();
function mn(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (q(i) && S(i) && !S(r))
      return !1;
    if (!e && (!xe(r) && !q(r) && (i = p(i), r = p(r)), !h(n) && S(i) && !S(r)))
      return i.value = r, !0;
    const c = h(n) && Me(s) ? Number(s) < n.length : g(n, s), u = Reflect.set(n, s, r, o);
    return n === p(o) && (c ? pe(r, i) && z(n, "set", s, r, i) : z(n, "add", s, r)), u;
  };
}
function En(e, t) {
  const n = g(e, t), s = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && z(e, "delete", t, void 0, s), r;
}
function wn(e, t) {
  const n = Reflect.has(e, t);
  return (!$e(t) || !dt.has(t)) && x(e, "has", t), n;
}
function Nn(e) {
  return x(e, "iterate", h(e) ? "length" : H), Reflect.ownKeys(e);
}
const On = {
  get: fn,
  set: gn,
  deleteProperty: En,
  has: wn,
  ownKeys: Nn
}, ht = {
  get: pn,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Ge(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Ge(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, bn = /* @__PURE__ */ R({}, ht, {
  get: dn
}), Ae = (e) => e, Ee = (e) => Reflect.getPrototypeOf(e);
function se(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = p(e), o = p(t);
  n || (t !== o && x(r, "get", t), x(r, "get", o));
  const { has: i } = Ee(r), c = s ? Ae : n ? He : Ke;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function oe(e, t = !1) {
  const n = this.__v_raw, s = p(n), r = p(e);
  return t || (e !== r && x(s, "has", e), x(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function ie(e, t = !1) {
  return e = e.__v_raw, !t && x(p(e), "iterate", H), Reflect.get(e, "size", e);
}
function Xe(e) {
  e = p(e);
  const t = p(this);
  return Ee(t).has.call(t, e) || (t.add(e), z(t, "add", e, e)), this;
}
function Ze(e, t) {
  t = p(t);
  const n = p(this), { has: s, get: r } = Ee(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && _t(n, s, e) : (e = p(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? pe(t, i) && z(n, "set", e, t, i) : z(n, "add", e, t), this;
}
function ke(e) {
  const t = p(this), { has: n, get: s } = Ee(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && _t(t, n, e) : (e = p(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && z(t, "delete", e, void 0, o), i;
}
function et() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Y(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && z(e, "clear", void 0, void 0, n), s;
}
function ce(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = p(i), u = t ? Ae : e ? He : Ke;
    return !e && x(c, "iterate", H), i.forEach((f, d) => s.call(r, u(f), u(d), o));
  };
}
function le(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = p(r), i = Y(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, f = r[e](...s), d = n ? Ae : t ? He : Ke;
    return !t && x(o, "iterate", u ? Ve : H), {
      // iterator protocol
      next() {
        const { value: l, done: a } = f.next();
        return a ? { value: l, done: a } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: a
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function M(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${en(e)} operation ${n}failed: target is readonly.`, p(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Sn() {
  const e = {
    get(o) {
      return se(this, o);
    },
    get size() {
      return ie(this);
    },
    has: oe,
    add: Xe,
    set: Ze,
    delete: ke,
    clear: et,
    forEach: ce(!1, !1)
  }, t = {
    get(o) {
      return se(this, o, !1, !0);
    },
    get size() {
      return ie(this);
    },
    has: oe,
    add: Xe,
    set: Ze,
    delete: ke,
    clear: et,
    forEach: ce(!1, !0)
  }, n = {
    get(o) {
      return se(this, o, !0);
    },
    get size() {
      return ie(this, !0);
    },
    has(o) {
      return oe.call(this, o, !0);
    },
    add: M(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: M(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: M(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: M(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: ce(!0, !1)
  }, s = {
    get(o) {
      return se(this, o, !0, !0);
    },
    get size() {
      return ie(this, !0);
    },
    has(o) {
      return oe.call(this, o, !0);
    },
    add: M(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: M(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: M(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: M(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: ce(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = le(o, !1, !1), n[o] = le(o, !0, !1), t[o] = le(o, !1, !0), s[o] = le(o, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [vn, Vn, xn, In] = /* @__PURE__ */ Sn();
function je(e, t) {
  const n = t ? e ? In : xn : e ? Vn : vn;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(g(n, r) && r in s ? n : s, r, o);
}
const Dn = {
  get: /* @__PURE__ */ je(!1, !1)
}, Rn = {
  get: /* @__PURE__ */ je(!0, !1)
}, yn = {
  get: /* @__PURE__ */ je(!0, !0)
};
function _t(e, t, n) {
  const s = p(n);
  if (s !== n && t.call(e, s)) {
    const r = it(e);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const gt = /* @__PURE__ */ new WeakMap(), Pn = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap();
function Cn(e) {
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
function Tn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Cn(it(e));
}
function wt(e) {
  return q(e) ? e : ze(e, !1, On, Dn, gt);
}
function Nt(e) {
  return ze(e, !0, ht, Rn, mt);
}
function ue(e) {
  return ze(e, !0, bn, yn, Et);
}
function ze(e, t, n, s, r) {
  if (!v(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Tn(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? s : n);
  return r.set(e, c), c;
}
function W(e) {
  return q(e) ? W(e.__v_raw) : !!(e && e.__v_isReactive);
}
function q(e) {
  return !!(e && e.__v_isReadonly);
}
function xe(e) {
  return !!(e && e.__v_isShallow);
}
function Ie(e) {
  return W(e) || q(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function $n(e) {
  return tn(e, "__v_skip", !0), e;
}
const Ke = (e) => v(e) ? wt(e) : e, He = (e) => v(e) ? Nt(e) : e;
function S(e) {
  return !!(e && e.__v_isRef === !0);
}
function Mn(e) {
  return S(e) ? e.value : e;
}
const Fn = {
  get: (e, t, n) => Mn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return S(r) && !S(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function An(e) {
  return W(e) ? e : new Proxy(e, Fn);
}
const U = [];
function jn(e) {
  U.push(e);
}
function zn() {
  U.pop();
}
function w(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  ft();
  const n = U.length ? U[U.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Kn();
  if (s)
    J(s, n, 11, [
      e + t.join(""),
      n && n.proxy,
      r.map(({ vnode: o }) => `at <${Mt(n, o.type)}>`).join(`
`),
      r
    ]);
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...Hn(r)), console.warn(...o);
  }
  pt();
}
function Kn() {
  let e = U[U.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function Hn(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Bn(n));
  }), t;
}
function Bn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Mt(e.component, e.type, s)}`, o = ">" + n;
  return e.props ? [r, ...Wn(e.props), o] : [r + o];
}
function Wn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Ot(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Ot(e, t, n) {
  return y(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : S(t) ? (t = Ot(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const bt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function J(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    St(o, t, n);
  }
  return r;
}
function De(e, t, n, s) {
  if (N(e)) {
    const o = J(e, t, n, s);
    return o && Qt(o) && o.catch((i) => {
      St(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(De(e[o], t, n, s));
  return r;
}
function St(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? bt[n] : n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let d = 0; d < f.length; d++)
          if (f[d](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      J(u, null, 10, [e, i, c]);
      return;
    }
  }
  Un(e, n, r, s);
}
function Un(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = bt[t];
    if (n && jn(n), w(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && zn(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let de = !1, Re = !1;
const D = [];
let A = 0;
const Q = [];
let P = null, F = 0;
const vt = /* @__PURE__ */ Promise.resolve();
let Be = null;
const Jn = 100;
function qn(e) {
  const t = Be || vt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Gn(e) {
  let t = A + 1, n = D.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    te(D[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function We(e) {
  (!D.length || !D.includes(e, de && e.allowRecurse ? A + 1 : A)) && (e.id == null ? D.push(e) : D.splice(Gn(e.id), 0, e), Vt());
}
function Vt() {
  !de && !Re && (Re = !0, Be = vt.then(It));
}
function xt(e) {
  h(e) ? Q.push(...e) : (!P || !P.includes(e, e.allowRecurse ? F + 1 : F)) && Q.push(e), Vt();
}
function Ln(e) {
  if (Q.length) {
    const t = [...new Set(Q)];
    if (Q.length = 0, P) {
      P.push(...t);
      return;
    }
    for (P = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), P.sort((n, s) => te(n) - te(s)), F = 0; F < P.length; F++)
      process.env.NODE_ENV !== "production" && Dt(e, P[F]) || P[F]();
    P = null, F = 0;
  }
}
const te = (e) => e.id == null ? 1 / 0 : e.id, Yn = (e, t) => {
  const n = te(e) - te(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function It(e) {
  Re = !1, de = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), D.sort(Yn);
  const t = process.env.NODE_ENV !== "production" ? (n) => Dt(e, n) : Te;
  try {
    for (A = 0; A < D.length; A++) {
      const n = D[A];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        J(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    A = 0, D.length = 0, Ln(e), de = !1, Be = null, (D.length || Q.length) && It(e);
  }
}
function Dt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Jn) {
      const s = t.ownerInstance, r = s && $t(s.type);
      return w(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const X = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (nn().__VUE_HMR_RUNTIME__ = {
  createRecord: we(Qn),
  rerender: we(Xn),
  reload: we(Zn)
});
const he = /* @__PURE__ */ new Map();
function Qn(e, t) {
  return he.has(e) ? !1 : (he.set(e, {
    initialDef: k(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function k(e) {
  return Ft(e) ? e.__vccOpts : e;
}
function Xn(e, t) {
  const n = he.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, k(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function Zn(e, t) {
  const n = he.get(e);
  if (!n)
    return;
  t = k(t), tt(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = k(r.type);
    X.has(o) || (o !== n.initialDef && tt(o, t), X.add(o)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (X.add(o), r.ceReload(t.styles), X.delete(o)) : r.parent ? We(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  xt(() => {
    for (const r of s)
      X.delete(k(r.type));
  });
}
function tt(e, t) {
  R(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function we(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let $ = null, kn = null;
const er = (e) => e.__isSuspense;
function tr(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : xt(e);
}
function nr(e, t, n = !1) {
  const s = T || $;
  if (s) {
    const r = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && N(t) ? t.call(s.proxy) : t;
    process.env.NODE_ENV !== "production" && w(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && w("inject() can only be used inside setup() or functional components.");
}
const ae = {};
function rr(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = C) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && w('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), s !== void 0 && w('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (_) => {
    w("Invalid watch source: ", _, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = sn() === (T == null ? void 0 : T.scope) ? T : null;
  let f, d = !1, l = !1;
  if (S(e) ? (f = () => e.value, d = xe(e)) : W(e) ? (f = () => e, s = !0) : h(e) ? (l = !0, d = e.some((_) => W(_) || xe(_)), f = () => e.map((_) => {
    if (S(_))
      return _.value;
    if (W(_))
      return G(_);
    if (N(_))
      return J(
        _,
        u,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && c(_);
  })) : N(e) ? t ? f = () => J(
    e,
    u,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : f = () => {
    if (!(u && u.isUnmounted))
      return a && a(), De(e, u, 3, [m]);
  } : (f = Te, process.env.NODE_ENV !== "production" && c(e)), t && s) {
    const _ = f;
    f = () => G(_());
  }
  let a, m = (_) => {
    a = I.onStop = () => {
      J(
        _,
        u,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, E = l ? new Array(e.length).fill(ae) : ae;
  const V = () => {
    if (I.active)
      if (t) {
        const _ = I.run();
        (s || d || (l ? _.some((At, jt) => pe(At, E[jt])) : pe(_, E))) && (a && a(), De(t, u, 3, [
          _,
          // pass undefined as the old value when it's changed for the first time
          E === ae ? void 0 : l && E[0] === ae ? [] : E,
          m
        ]), E = _);
      } else
        I.run();
  };
  V.allowRecurse = !!t;
  let ne;
  r === "sync" ? ne = V : r === "post" ? ne = () => st(V, u && u.suspense) : (V.pre = !0, u && (V.id = u.uid), ne = () => We(V));
  const I = new ln(f, ne);
  return process.env.NODE_ENV !== "production" && (I.onTrack = o, I.onTrigger = i), t ? n ? V() : E = I.run() : r === "post" ? st(I.run.bind(I), u && u.suspense) : I.run(), () => {
    I.stop(), u && u.scope && Gt(u.scope.effects, I);
  };
}
function sr(e, t, n) {
  const s = this.proxy, r = y(e) ? e.includes(".") ? or(s, e) : () => s[e] : e.bind(s, s);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = T;
  ot(this);
  const c = rr(r, o.bind(s), n);
  return i ? ot(i) : Vr(), c;
}
function or(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function G(e, t) {
  if (!v(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), S(e))
    G(e.value, t);
  else if (h(e))
    for (let n = 0; n < e.length; n++)
      G(e[n], t);
  else if (Yt(e) || Y(e))
    e.forEach((n) => {
      G(n, t);
    });
  else if (Zt(e))
    for (const n in e)
      G(e[n], t);
  return e;
}
const ir = Symbol(), ye = (e) => e ? xr(e) ? Ir(e) || e.proxy : ye(e.parent) : null, ee = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ R(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ue(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ue(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ue(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ue(e.refs) : e.refs,
    $parent: (e) => ye(e.parent),
    $root: (e) => ye(e.root),
    $emit: (e) => e.emit,
    $options: (e) => __VUE_OPTIONS_API__ ? ar(e) : e.type,
    $forceUpdate: (e) => e.f || (e.f = () => We(e.update)),
    $nextTick: (e) => e.n || (e.n = qn.bind(e.proxy)),
    $watch: (e) => __VUE_OPTIONS_API__ ? sr.bind(e) : Te
  })
), cr = (e) => e === "_" || e === "$", Ne = (e, t) => e !== C && !e.__isScriptSetup && g(e, t), lr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
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
        if (Ne(s, t))
          return i[t] = 1, s[t];
        if (r !== C && g(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && g(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== C && g(n, t))
          return i[t] = 4, n[t];
        (!__VUE_OPTIONS_API__ || ur) && (i[t] = 0);
      }
    }
    const d = ee[t];
    let l, a;
    if (d)
      return t === "$attrs" && (x(e, "get", t), process.env.NODE_ENV !== "production" && void 0), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== C && g(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      a = u.config.globalProperties, g(a, t)
    )
      return a[t];
    process.env.NODE_ENV !== "production" && $ && (!y(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== C && cr(t[0]) && g(r, t) ? w(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === $ && w(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Ne(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && g(r, t) ? (w(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== C && g(s, t) ? (s[t] = n, !0) : g(e.props, t) ? (process.env.NODE_ENV !== "production" && w(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && w(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o } }, i) {
    let c;
    return !!n[i] || e !== C && g(e, i) || Ne(t, i) || (c = o[0]) && g(c, i) || g(s, i) || g(ee, i) || g(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : g(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (lr.ownKeys = (e) => (w("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
let ur = !0;
function ar(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: o, config: { optionMergeStrategies: i } } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach((f) => _e(u, f, i, !0)), _e(u, t, i)), v(t) && o.set(t, u), u;
}
function _e(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && _e(e, o, n, !0), r && r.forEach((i) => _e(e, i, n, !0));
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && w('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = fr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const fr = {
  data: nt,
  props: K,
  emits: K,
  // objects
  methods: K,
  computed: K,
  // lifecycle
  beforeCreate: O,
  created: O,
  beforeMount: O,
  mounted: O,
  beforeUpdate: O,
  updated: O,
  beforeDestroy: O,
  beforeUnmount: O,
  destroyed: O,
  unmounted: O,
  activated: O,
  deactivated: O,
  errorCaptured: O,
  serverPrefetch: O,
  // assets
  components: K,
  directives: K,
  // watch
  watch: dr,
  // provide / inject
  provide: nt,
  inject: pr
};
function nt(e, t) {
  return t ? e ? function() {
    return R(N(e) ? e.call(this, this) : e, N(t) ? t.call(this, this) : t);
  } : t : e;
}
function pr(e, t) {
  return K(rt(e), rt(t));
}
function rt(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function O(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function K(e, t) {
  return e ? R(R(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function dr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = R(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = O(e[s], t[s]);
  return n;
}
function hr() {
  return {
    app: null,
    config: {
      isNativeTag: Ut,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const st = tr, _r = (e) => e.__isTeleport, Rt = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), gr = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), mr = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
let L = null;
function Er(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const wr = (...e) => Ct(...e), yt = "__vInternal", Pt = ({ key: e }) => e ?? null, fe = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? y(e) || S(e) || N(e) ? { i: $, r: e, k: t, f: !!n } : e : null;
function Nr(e, t = null, n = null, s = 0, r = null, o = e === Rt ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Pt(t),
    ref: t && fe(t),
    scopeId: kn,
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
    ctx: $
  };
  return c ? (Ue(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= y(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && w("VNode created with invalid key (NaN). VNode type:", u.type), // avoid a block node from tracking itself
  !i && // has current parent block
  L && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && L.push(u), u;
}
const Or = process.env.NODE_ENV !== "production" ? wr : Ct;
function Ct(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === ir) && (process.env.NODE_ENV !== "production" && !e && w(`Invalid vnode type when creating vnode: ${e}.`), e = mr), Er(e)) {
    const c = ge(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ue(c, n), !o && L && (c.shapeFlag & 6 ? L[L.indexOf(e)] = c : L.push(c)), c.patchFlag |= -2, c;
  }
  if (Ft(e) && (e = e.__vccOpts), t) {
    t = br(t);
    let { class: c, style: u } = t;
    c && !y(c) && (t.class = Ce(c)), v(u) && (Ie(u) && !h(u) && (u = R({}, u)), t.style = Pe(u));
  }
  const i = y(e) ? 1 : er(e) ? 128 : _r(e) ? 64 : v(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ie(e) && (e = p(e), w("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), Nr(e, t, n, s, r, i, o, !0);
}
function br(e) {
  return e ? Ie(e) || yt in e ? R({}, e) : e : null;
}
function ge(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? vr(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Pt(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? h(r) ? r.concat(fe(t)) : [r, fe(t)] : fe(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && h(i) ? i.map(Tt) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Rt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ge(e.ssContent),
    ssFallback: e.ssFallback && ge(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Tt(e) {
  const t = ge(e);
  return h(e.children) && (t.children = e.children.map(Tt)), t;
}
function Sr(e = " ", t = 0) {
  return Or(gr, null, e, t);
}
function Ue(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ue(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(yt in t) ? t._ctx = $ : r === 3 && $ && ($.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    N(t) ? (t = { default: t, _ctx: $ }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Sr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function vr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Ce([t.class, s.class]));
      else if (r === "style")
        t.style = Pe([t.style, s.style]);
      else if (qt(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(h(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
hr();
let T = null;
const ot = (e) => {
  T = e, e.scope.on();
}, Vr = () => {
  T && T.scope.off(), T = null;
};
function xr(e) {
  return e.vnode.shapeFlag & 4;
}
function Ir(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(An($n(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ee)
          return ee[n](e);
      },
      has(t, n) {
        return n in t || n in ee;
      }
    }));
}
const Dr = /(?:^|[-_])(\w)/g, Rr = (e) => e.replace(Dr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function $t(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Mt(e, t, n = !1) {
  let s = $t(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(e.components || e.parent.type.components) || r(e.appContext.components);
  }
  return s ? Rr(s) : n ? "App" : "Anonymous";
}
function Ft(e) {
  return N(e) && "__vccOpts" in e;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Oe(e) {
  return !!(e && e.__v_isShallow);
}
function yr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(l) {
      return v(l) ? l.__isVue ? ["div", e, "VueInstance"] : S(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : W(l) ? [
        "div",
        {},
        ["span", e, Oe(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${q(l) ? " (readonly)" : ""}`
      ] : q(l) ? [
        "div",
        {},
        ["span", e, Oe(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const a = [];
    l.type.props && l.props && a.push(i("props", p(l.props))), l.setupState !== C && a.push(i("setup", l.setupState)), l.data !== C && a.push(i("data", p(l.data)));
    const m = u(l, "computed");
    m && a.push(i("computed", m));
    const E = u(l, "inject");
    return E && a.push(i("injected", E)), a.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), a;
  }
  function i(l, a) {
    return a = R({}, a), Object.keys(a).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(a).map((m) => [
          "div",
          {},
          ["span", s, m + ": "],
          c(a[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, a = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : v(l) ? ["object", { object: a ? p(l) : l }] : ["span", n, String(l)];
  }
  function u(l, a) {
    const m = l.type;
    if (N(m))
      return;
    const E = {};
    for (const V in l.ctx)
      f(m, V, a) && (E[V] = l.ctx[V]);
    return E;
  }
  function f(l, a, m) {
    const E = l[m];
    if (h(E) && E.includes(a) || v(E) && a in E || l.extends && f(l.extends, a, m) || l.mixins && l.mixins.some((V) => f(V, a, m)))
      return !0;
  }
  function d(l) {
    return Oe(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Pr() {
  yr();
}
process.env.NODE_ENV !== "production" && Pr();
function Tr() {
  return {
    eventBus: nr("eventBus")
  };
}
function $r(e) {
  return {
    eventBus: e.root.$eventBus
  };
}
const Mr = {
  install(e) {
    e.version < 3 ? e.prototype.$eventBus = Je() : e.provide("eventBus", Je());
  }
};
export {
  Je as eventBus,
  Mr as eventBusPlugin,
  $r as useVue2EventBus,
  Tr as useVue3EventBus
};
