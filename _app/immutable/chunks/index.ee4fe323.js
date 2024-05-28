function p() {}
function R(t, n) {
    for (const e in n)
        t[e] = n[e];
    return t
}
function q(t) {
    return t()
}
function D() {
    return Object.create(null)
}
function g(t) {
    t.forEach(q)
}
function A(t) {
    return typeof t == "function"
}
function lt(t, n) {
    return t != t ? n == n : t !== n || t && typeof t == "object" || typeof t == "function"
}
let b;
function ft(t, n) {
    return b || (b = document.createElement("a")),
    b.href = n,
    t === b.href
}
function G(t) {
    return Object.keys(t).length === 0
}
function I(t, ...n) {
    if (t == null)
        return p;
    const e = t.subscribe(...n);
    return e.unsubscribe ? ()=>e.unsubscribe() : e
}
function at(t, n, e) {
    t.$$.on_destroy.push(I(n, e))
}
function _t(t, n, e, i) {
    if (t) {
        const r = B(t, n, e, i);
        return t[0](r)
    }
}
function B(t, n, e, i) {
    return t[1] && i ? R(e.ctx.slice(), t[1](i(n))) : e.ctx
}
function dt(t, n, e, i) {
    if (t[2] && i) {
        const r = t[2](i(e));
        if (n.dirty === void 0)
            return r;
        if (typeof r == "object") {
            const s = []
              , c = Math.max(n.dirty.length, r.length);
            for (let u = 0; u < c; u += 1)
                s[u] = n.dirty[u] | r[u];
            return s
        }
        return n.dirty | r
    }
    return n.dirty
}
function ht(t, n, e, i, r, s) {
    if (r) {
        const c = B(n, e, i, s);
        t.p(c, r)
    }
}
function mt(t) {
    if (t.ctx.length > 32) {
        const n = []
          , e = t.ctx.length / 32;
        for (let i = 0; i < e; i++)
            n[i] = -1;
        return n
    }
    return -1
}
function pt(t) {
    const n = {};
    for (const e in t)
        e[0] !== "$" && (n[e] = t[e]);
    return n
}
function yt(t) {
    return t && A(t.destroy) ? t.destroy : p
}
let E = !1;
function J() {
    E = !0
}
function K() {
    E = !1
}
function Q(t, n, e, i) {
    for (; t < n; ) {
        const r = t + (n - t >> 1);
        e(r) <= i ? t = r + 1 : n = r
    }
    return t
}
function U(t) {
    if (t.hydrate_init)
        return;
    t.hydrate_init = !0;
    let n = t.childNodes;
    if (t.nodeName === "HEAD") {
        const o = [];
        for (let l = 0; l < n.length; l++) {
            const a = n[l];
            a.claim_order !== void 0 && o.push(a)
        }
        n = o
    }
    const e = new Int32Array(n.length + 1)
      , i = new Int32Array(n.length);
    e[0] = -1;
    let r = 0;
    for (let o = 0; o < n.length; o++) {
        const l = n[o].claim_order
          , a = (r > 0 && n[e[r]].claim_order <= l ? r + 1 : Q(1, r, x=>n[e[x]].claim_order, l)) - 1;
        i[o] = e[a] + 1;
        const f = a + 1;
        e[f] = o,
        r = Math.max(f, r)
    }
    const s = []
      , c = [];
    let u = n.length - 1;
    for (let o = e[r] + 1; o != 0; o = i[o - 1]) {
        for (s.push(n[o - 1]); u >= o; u--)
            c.push(n[u]);
        u--
    }
    for (; u >= 0; u--)
        c.push(n[u]);
    s.reverse(),
    c.sort((o,l)=>o.claim_order - l.claim_order);
    for (let o = 0, l = 0; o < c.length; o++) {
        for (; l < s.length && c[o].claim_order >= s[l].claim_order; )
            l++;
        const a = l < s.length ? s[l] : null;
        t.insertBefore(c[o], a)
    }
}
function V(t, n) {
    if (E) {
        for (U(t),
        (t.actual_end_child === void 0 || t.actual_end_child !== null && t.actual_end_child.parentNode !== t) && (t.actual_end_child = t.firstChild); t.actual_end_child !== null && t.actual_end_child.claim_order === void 0; )
            t.actual_end_child = t.actual_end_child.nextSibling;
        n !== t.actual_end_child ? (n.claim_order !== void 0 || n.parentNode !== t) && t.insertBefore(n, t.actual_end_child) : t.actual_end_child = n.nextSibling
    } else
        (n.parentNode !== t || n.nextSibling !== null) && t.appendChild(n)
}
function gt(t, n, e) {
    E && !e ? V(t, n) : (n.parentNode !== t || n.nextSibling != e) && t.insertBefore(n, e || null)
}
function W(t) {
    t.parentNode && t.parentNode.removeChild(t)
}
function xt(t, n) {
    for (let e = 0; e < t.length; e += 1)
        t[e] && t[e].d(n)
}
function X(t) {
    return document.createElement(t)
}
function Y(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t)
}
function S(t) {
    return document.createTextNode(t)
}
function bt() {
    return S(" ")
}
function $t() {
    return S("")
}
function vt(t, n, e, i) {
    return t.addEventListener(n, e, i),
    ()=>t.removeEventListener(n, e, i)
}
function Z(t, n, e) {
    e == null ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e)
}
function Et(t, n) {
    for (const e in n)
        Z(t, e, n[e])
}
function tt(t) {
    return Array.from(t.childNodes)
}
function nt(t) {
    t.claim_info === void 0 && (t.claim_info = {
        last_index: 0,
        total_claimed: 0
    })
}
function H(t, n, e, i, r=!1) {
    nt(t);
    const s = (()=>{
        for (let c = t.claim_info.last_index; c < t.length; c++) {
            const u = t[c];
            if (n(u)) {
                const o = e(u);
                return o === void 0 ? t.splice(c, 1) : t[c] = o,
                r || (t.claim_info.last_index = c),
                u
            }
        }
        for (let c = t.claim_info.last_index - 1; c >= 0; c--) {
            const u = t[c];
            if (n(u)) {
                const o = e(u);
                return o === void 0 ? t.splice(c, 1) : t[c] = o,
                r ? o === void 0 && t.claim_info.last_index-- : t.claim_info.last_index = c,
                u
            }
        }
        return i()
    }
    )();
    return s.claim_order = t.claim_info.total_claimed,
    t.claim_info.total_claimed += 1,
    s
}
function L(t, n, e, i) {
    return H(t, r=>r.nodeName === n, r=>{
        const s = [];
        for (let c = 0; c < r.attributes.length; c++) {
            const u = r.attributes[c];
            e[u.name] || s.push(u.name)
        }
        s.forEach(c=>r.removeAttribute(c))
    }
    , ()=>i(n))
}
function wt(t, n, e) {
    return L(t, n, e, X)
}
function Nt(t, n, e) {
    return L(t, n, e, Y)
}
function et(t, n) {
    return H(t, e=>e.nodeType === 3, e=>{
        const i = "" + n;
        if (e.data.startsWith(i)) {
            if (e.data.length !== i.length)
                return e.splitText(i.length)
        } else
            e.data = i
    }
    , ()=>S(n), !0)
}
function kt(t) {
    return et(t, " ")
}
function At(t, n) {
    n = "" + n,
    t.wholeText !== n && (t.data = n)
}
function St(t, n, e, i) {
    e === null ? t.style.removeProperty(n) : t.style.setProperty(n, e, i ? "important" : "")
}
function it(t, n, {bubbles: e=!1, cancelable: i=!1}={}) {
    const r = document.createEvent("CustomEvent");
    return r.initCustomEvent(t, e, i, n),
    r
}
function Ct(t, n) {
    const e = [];
    let i = 0;
    for (const r of n.childNodes)
        if (r.nodeType === 8) {
            const s = r.textContent.trim();
            s === `HEAD_${t}_END` ? (i -= 1,
            e.push(r)) : s === `HEAD_${t}_START` && (i += 1,
            e.push(r))
        } else
            i > 0 && e.push(r);
    return e
}
function jt(t, n) {
    return new t(n)
}
let y;
function m(t) {
    y = t
}
function C() {
    if (!y)
        throw new Error("Function called outside component initialization");
    return y
}
function Tt(t) {
    C().$$.on_mount.push(t)
}
function Dt(t) {
    C().$$.after_update.push(t)
}
function Mt() {
    const t = C();
    return (n,e,{cancelable: i=!1}={})=>{
        const r = t.$$.callbacks[n];
        if (r) {
            const s = it(n, e, {
                cancelable: i
            });
            return r.slice().forEach(c=>{
                c.call(t, s)
            }
            ),
            !s.defaultPrevented
        }
        return !0
    }
}
const h = []
  , M = []
  , $ = []
  , P = []
  , O = Promise.resolve();
let N = !1;
function z() {
    N || (N = !0,
    O.then(F))
}
function Pt() {
    return z(),
    O
}
function k(t) {
    $.push(t)
}
const w = new Set;
let d = 0;
function F() {
    if (d !== 0)
        return;
    const t = y;
    do {
        try {
            for (; d < h.length; ) {
                const n = h[d];
                d++,
                m(n),
                rt(n.$$)
            }
        } catch (n) {
            throw h.length = 0,
            d = 0,
            n
        }
        for (m(null),
        h.length = 0,
        d = 0; M.length; )
            M.pop()();
        for (let n = 0; n < $.length; n += 1) {
            const e = $[n];
            w.has(e) || (w.add(e),
            e())
        }
        $.length = 0
    } while (h.length);
    for (; P.length; )
        P.pop()();
    N = !1,
    w.clear(),
    m(t)
}
function rt(t) {
    if (t.fragment !== null) {
        t.update(),
        g(t.before_update);
        const n = t.dirty;
        t.dirty = [-1],
        t.fragment && t.fragment.p(t.ctx, n),
        t.after_update.forEach(k)
    }
}
const v = new Set;
let _;
function qt() {
    _ = {
        r: 0,
        c: [],
        p: _
    }
}
function Bt() {
    _.r || g(_.c),
    _ = _.p
}
function ct(t, n) {
    t && t.i && (v.delete(t),
    t.i(n))
}
function Ht(t, n, e, i) {
    if (t && t.o) {
        if (v.has(t))
            return;
        v.add(t),
        _.c.push(()=>{
            v.delete(t),
            i && (e && t.d(1),
            i())
        }
        ),
        t.o(n)
    } else
        i && i()
}
function Lt(t, n) {
    const e = {}
      , i = {}
      , r = {
        $$scope: 1
    };
    let s = t.length;
    for (; s--; ) {
        const c = t[s]
          , u = n[s];
        if (u) {
            for (const o in c)
                o in u || (i[o] = 1);
            for (const o in u)
                r[o] || (e[o] = u[o],
                r[o] = 1);
            t[s] = u
        } else
            for (const o in c)
                r[o] = 1
    }
    for (const c in i)
        c in e || (e[c] = void 0);
    return e
}
function Ot(t) {
    t && t.c()
}
function zt(t, n) {
    t && t.l(n)
}
function ot(t, n, e, i) {
    const {fragment: r, after_update: s} = t.$$;
    r && r.m(n, e),
    i || k(()=>{
        const c = t.$$.on_mount.map(q).filter(A);
        t.$$.on_destroy ? t.$$.on_destroy.push(...c) : g(c),
        t.$$.on_mount = []
    }
    ),
    s.forEach(k)
}
function st(t, n) {
    const e = t.$$;
    e.fragment !== null && (g(e.on_destroy),
    e.fragment && e.fragment.d(n),
    e.on_destroy = e.fragment = null,
    e.ctx = [])
}
function ut(t, n) {
    t.$$.dirty[0] === -1 && (h.push(t),
    z(),
    t.$$.dirty.fill(0)),
    t.$$.dirty[n / 31 | 0] |= 1 << n % 31
}
function Ft(t, n, e, i, r, s, c, u=[-1]) {
    const o = y;
    m(t);
    const l = t.$$ = {
        fragment: null,
        ctx: [],
        props: s,
        update: p,
        not_equal: r,
        bound: D(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(n.context || (o ? o.$$.context : [])),
        callbacks: D(),
        dirty: u,
        skip_bound: !1,
        root: n.target || o.$$.root
    };
    c && c(l.root);
    let a = !1;
    if (l.ctx = e ? e(t, n.props || {}, (f,x,...j)=>{
        const T = j.length ? j[0] : x;
        return l.ctx && r(l.ctx[f], l.ctx[f] = T) && (!l.skip_bound && l.bound[f] && l.bound[f](T),
        a && ut(t, f)),
        x
    }
    ) : [],
    l.update(),
    a = !0,
    g(l.before_update),
    l.fragment = i ? i(l.ctx) : !1,
    n.target) {
        if (n.hydrate) {
            J();
            const f = tt(n.target);
            l.fragment && l.fragment.l(f),
            f.forEach(W)
        } else
            l.fragment && l.fragment.c();
        n.intro && ct(t.$$.fragment),
        ot(t, n.target, n.anchor, n.customElement),
        K(),
        F()
    }
    m(o)
}
class Rt {
    $destroy() {
        st(this, 1),
        this.$destroy = p
    }
    $on(n, e) {
        if (!A(e))
            return p;
        const i = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
        return i.push(e),
        ()=>{
            const r = i.indexOf(e);
            r !== -1 && i.splice(r, 1)
        }
    }
    $set(n) {
        this.$$set && !G(n) && (this.$$.skip_bound = !0,
        this.$$set(n),
        this.$$.skip_bound = !1)
    }
}
export {ot as A, st as B, _t as C, ht as D, mt as E, dt as F, V as G, p as H, at as I, ft as J, xt as K, yt as L, R as M, Y as N, Nt as O, Et as P, Lt as Q, pt as R, Rt as S, Ct as T, Mt as U, vt as V, bt as a, gt as b, kt as c, Ht as d, $t as e, Bt as f, ct as g, W as h, Ft as i, Dt as j, X as k, wt as l, tt as m, Z as n, Tt as o, St as p, S as q, et as r, lt as s, Pt as t, At as u, qt as v, M as w, jt as x, Ot as y, zt as z};
