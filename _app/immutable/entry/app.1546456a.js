import {_ as p} from "../chunks/supabase.bc106243.js";
import {S, i as j, s as z, a as B, e as d, c as C, b, d as h, f as I, g, h as w, j as M, o as U, k as F, l as G, m as H, n as R, p as m, q as J, r as K, u as Q, v as P, t as W, w as V, x as E, y as v, z as L, A, B as D} from "../chunks/index.ee4fe323.js";
const ie = {};
function X(o) {
    let e, i, n;
    var s = o[1][0];
    function c(t) {
        return {
            props: {
                data: t[3],
                form: t[2]
            }
        }
    }
    return s && (e = E(s, c(o)),
    o[12](e)),
    {
        c() {
            e && v(e.$$.fragment),
            i = d()
        },
        l(t) {
            e && L(e.$$.fragment, t),
            i = d()
        },
        m(t, r) {
            e && A(e, t, r),
            b(t, i, r),
            n = !0
        },
        p(t, r) {
            const l = {};
            if (r & 8 && (l.data = t[3]),
            r & 4 && (l.form = t[2]),
            s !== (s = t[1][0])) {
                if (e) {
                    P();
                    const f = e;
                    h(f.$$.fragment, 1, 0, ()=>{
                        D(f, 1)
                    }
                    ),
                    I()
                }
                s ? (e = E(s, c(t)),
                t[12](e),
                v(e.$$.fragment),
                g(e.$$.fragment, 1),
                A(e, i.parentNode, i)) : e = null
            } else
                s && e.$set(l)
        },
        i(t) {
            n || (e && g(e.$$.fragment, t),
            n = !0)
        },
        o(t) {
            e && h(e.$$.fragment, t),
            n = !1
        },
        d(t) {
            o[12](null),
            t && w(i),
            e && D(e, t)
        }
    }
}
function Y(o) {
    let e, i, n;
    var s = o[1][0];
    function c(t) {
        return {
            props: {
                data: t[3],
                $$slots: {
                    default: [Z]
                },
                $$scope: {
                    ctx: t
                }
            }
        }
    }
    return s && (e = E(s, c(o)),
    o[11](e)),
    {
        c() {
            e && v(e.$$.fragment),
            i = d()
        },
        l(t) {
            e && L(e.$$.fragment, t),
            i = d()
        },
        m(t, r) {
            e && A(e, t, r),
            b(t, i, r),
            n = !0
        },
        p(t, r) {
            const l = {};
            if (r & 8 && (l.data = t[3]),
            r & 8215 && (l.$$scope = {
                dirty: r,
                ctx: t
            }),
            s !== (s = t[1][0])) {
                if (e) {
                    P();
                    const f = e;
                    h(f.$$.fragment, 1, 0, ()=>{
                        D(f, 1)
                    }
                    ),
                    I()
                }
                s ? (e = E(s, c(t)),
                t[11](e),
                v(e.$$.fragment),
                g(e.$$.fragment, 1),
                A(e, i.parentNode, i)) : e = null
            } else
                s && e.$set(l)
        },
        i(t) {
            n || (e && g(e.$$.fragment, t),
            n = !0)
        },
        o(t) {
            e && h(e.$$.fragment, t),
            n = !1
        },
        d(t) {
            o[11](null),
            t && w(i),
            e && D(e, t)
        }
    }
}
function Z(o) {
    let e, i, n;
    var s = o[1][1];
    function c(t) {
        return {
            props: {
                data: t[4],
                form: t[2]
            }
        }
    }
    return s && (e = E(s, c(o)),
    o[10](e)),
    {
        c() {
            e && v(e.$$.fragment),
            i = d()
        },
        l(t) {
            e && L(e.$$.fragment, t),
            i = d()
        },
        m(t, r) {
            e && A(e, t, r),
            b(t, i, r),
            n = !0
        },
        p(t, r) {
            const l = {};
            if (r & 16 && (l.data = t[4]),
            r & 4 && (l.form = t[2]),
            s !== (s = t[1][1])) {
                if (e) {
                    P();
                    const f = e;
                    h(f.$$.fragment, 1, 0, ()=>{
                        D(f, 1)
                    }
                    ),
                    I()
                }
                s ? (e = E(s, c(t)),
                t[10](e),
                v(e.$$.fragment),
                g(e.$$.fragment, 1),
                A(e, i.parentNode, i)) : e = null
            } else
                s && e.$set(l)
        },
        i(t) {
            n || (e && g(e.$$.fragment, t),
            n = !0)
        },
        o(t) {
            e && h(e.$$.fragment, t),
            n = !1
        },
        d(t) {
            o[10](null),
            t && w(i),
            e && D(e, t)
        }
    }
}
function O(o) {
    let e, i = o[6] && T(o);
    return {
        c() {
            e = F("div"),
            i && i.c(),
            this.h()
        },
        l(n) {
            e = G(n, "DIV", {
                id: !0,
                "aria-live": !0,
                "aria-atomic": !0,
                style: !0
            });
            var s = H(e);
            i && i.l(s),
            s.forEach(w),
            this.h()
        },
        h() {
            R(e, "id", "svelte-announcer"),
            R(e, "aria-live", "assertive"),
            R(e, "aria-atomic", "true"),
            m(e, "position", "absolute"),
            m(e, "left", "0"),
            m(e, "top", "0"),
            m(e, "clip", "rect(0 0 0 0)"),
            m(e, "clip-path", "inset(50%)"),
            m(e, "overflow", "hidden"),
            m(e, "white-space", "nowrap"),
            m(e, "width", "1px"),
            m(e, "height", "1px")
        },
        m(n, s) {
            b(n, e, s),
            i && i.m(e, null)
        },
        p(n, s) {
            n[6] ? i ? i.p(n, s) : (i = T(n),
            i.c(),
            i.m(e, null)) : i && (i.d(1),
            i = null)
        },
        d(n) {
            n && w(e),
            i && i.d()
        }
    }
}
function T(o) {
    let e;
    return {
        c() {
            e = J(o[7])
        },
        l(i) {
            e = K(i, o[7])
        },
        m(i, n) {
            b(i, e, n)
        },
        p(i, n) {
            n & 128 && Q(e, i[7])
        },
        d(i) {
            i && w(e)
        }
    }
}
function $(o) {
    let e, i, n, s, c;
    const t = [Y, X]
      , r = [];
    function l(a, u) {
        return a[1][1] ? 0 : 1
    }
    e = l(o),
    i = r[e] = t[e](o);
    let f = o[5] && O(o);
    return {
        c() {
            i.c(),
            n = B(),
            f && f.c(),
            s = d()
        },
        l(a) {
            i.l(a),
            n = C(a),
            f && f.l(a),
            s = d()
        },
        m(a, u) {
            r[e].m(a, u),
            b(a, n, u),
            f && f.m(a, u),
            b(a, s, u),
            c = !0
        },
        p(a, [u]) {
            let k = e;
            e = l(a),
            e === k ? r[e].p(a, u) : (P(),
            h(r[k], 1, 1, ()=>{
                r[k] = null
            }
            ),
            I(),
            i = r[e],
            i ? i.p(a, u) : (i = r[e] = t[e](a),
            i.c()),
            g(i, 1),
            i.m(n.parentNode, n)),
            a[5] ? f ? f.p(a, u) : (f = O(a),
            f.c(),
            f.m(s.parentNode, s)) : f && (f.d(1),
            f = null)
        },
        i(a) {
            c || (g(i),
            c = !0)
        },
        o(a) {
            h(i),
            c = !1
        },
        d(a) {
            r[e].d(a),
            a && w(n),
            f && f.d(a),
            a && w(s)
        }
    }
}
function x(o, e, i) {
    let {stores: n} = e
      , {page: s} = e
      , {constructors: c} = e
      , {components: t=[]} = e
      , {form: r} = e
      , {data_0: l=null} = e
      , {data_1: f=null} = e;
    M(n.page.notify);
    let a = !1
      , u = !1
      , k = null;
    U(()=>{
        const _ = n.page.subscribe(()=>{
            a && (i(6, u = !0),
            W().then(()=>{
                i(7, k = document.title || "untitled page")
            }
            ))
        }
        );
        return i(5, a = !0),
        _
    }
    );
    function y(_) {
        V[_ ? "unshift" : "push"](()=>{
            t[1] = _,
            i(0, t)
        }
        )
    }
    function N(_) {
        V[_ ? "unshift" : "push"](()=>{
            t[0] = _,
            i(0, t)
        }
        )
    }
    function q(_) {
        V[_ ? "unshift" : "push"](()=>{
            t[0] = _,
            i(0, t)
        }
        )
    }
    return o.$$set = _=>{
        "stores"in _ && i(8, n = _.stores),
        "page"in _ && i(9, s = _.page),
        "constructors"in _ && i(1, c = _.constructors),
        "components"in _ && i(0, t = _.components),
        "form"in _ && i(2, r = _.form),
        "data_0"in _ && i(3, l = _.data_0),
        "data_1"in _ && i(4, f = _.data_1)
    }
    ,
    o.$$.update = ()=>{
        o.$$.dirty & 768 && n.page.set(s)
    }
    ,
    [t, c, r, l, f, a, u, k, n, s, y, N, q]
}
class ne extends S {
    constructor(e) {
        super(),
        j(this, e, x, $, z, {
            stores: 8,
            page: 9,
            constructors: 1,
            components: 0,
            form: 2,
            data_0: 3,
            data_1: 4
        })
    }
}
const se = [()=>p(()=>import("../nodes/0.41ae964c.js"), ["../nodes/0.41ae964c.js", "../chunks/index.ee4fe323.js", "../chunks/navigation.85f32432.js", "../chunks/singletons.f630c90e.js", "../chunks/supabase.bc106243.js", "../assets/0.94ebf1cd.css"], import.meta.url), ()=>p(()=>import("../nodes/1.41afc5d1.js"), ["../nodes/1.41afc5d1.js", "../chunks/index.ee4fe323.js", "../chunks/singletons.f630c90e.js", "../assets/1.d1ace4e8.css"], import.meta.url), ()=>p(()=>import("../nodes/2.65bf4670.js"), ["../nodes/2.65bf4670.js", "../chunks/index.ee4fe323.js", "../assets/2.e47351ea.css"], import.meta.url), ()=>p(()=>import("../nodes/3.d0b94fa0.js"), ["../nodes/3.d0b94fa0.js", "../chunks/index.ee4fe323.js", "../chunks/iconmap.5753d95f.js", "../assets/3.1d7ccf5f.css"], import.meta.url), ()=>p(()=>import("../nodes/4.f2a1a206.js"), ["../nodes/4.f2a1a206.js", "../chunks/index.ee4fe323.js", "../chunks/navigation.85f32432.js", "../chunks/singletons.f630c90e.js", "../chunks/parse.bee59afc.js", "../chunks/supabase.bc106243.js", "../chunks/iconmap.5753d95f.js", "../assets/4.a43b69f1.css"], import.meta.url), ()=>p(()=>import("../nodes/5.e1f0a87e.js"), ["../nodes/5.e1f0a87e.js", "../chunks/index.ee4fe323.js", "../chunks/Turnstile.5dc1d45b.js", "../assets/5.2442f0ba.css"], import.meta.url), ()=>p(()=>import("../nodes/6.775ccde4.js"), ["../nodes/6.775ccde4.js", "../chunks/index.ee4fe323.js", "../chunks/Turnstile.5dc1d45b.js", "../chunks/navigation.85f32432.js", "../chunks/singletons.f630c90e.js", "../chunks/supabase.bc106243.js", "../assets/6.1f0b4d86.css"], import.meta.url), ()=>p(()=>import("../nodes/7.1456d51b.js"), ["../nodes/7.1456d51b.js", "../chunks/index.ee4fe323.js", "../chunks/Turnstile.5dc1d45b.js", "../assets/7.ba4c9abc.css"], import.meta.url)]
  , re = [0]
  , oe = {
    "/": [2],
    "/dashboard": [-5],
    "/login": [5],
    "/recover": [6],
    "/register": [7],
    "/[slug]": [-4]
}
  , ae = {
    handleError: ({error: o})=>{
        console.error(o)
    }
};
export {oe as dictionary, ae as hooks, ie as matchers, se as nodes, ne as root, re as server_loads};
