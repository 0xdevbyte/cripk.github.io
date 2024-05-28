import {S as G, i as M, s as N, k as f, q as E, a as A, l as g, m as $, r as k, h as d, c as I, n as q, b as P, G as l, u as S, H as C, I as V, o as w} from "../chunks/index.ee4fe323.js";
import {d as x} from "../chunks/singletons.f630c90e.js";
const z = ()=>{
    const s = x;
    return {
        page: {
            subscribe: s.page.subscribe
        },
        navigating: {
            subscribe: s.navigating.subscribe
        },
        updated: s.updated
    }
}
  , D = {
    subscribe(s) {
        return z().page.subscribe(s)
    }
};
function B(s) {
    var F, H;
    let e, o, n = ((F = s[0]) == null ? void 0 : F.status) + "", i, r, c, p = (s[0].error ? s[1][s[0].status] : "") + "", v, y, u, _ = ((H = s[0].error) == null ? void 0 : H.message) + "", b;
    return {
        c() {
            e = f("div"),
            o = f("h1"),
            i = E(n),
            r = A(),
            c = f("span"),
            v = E(p),
            y = A(),
            u = f("h2"),
            b = E(_),
            this.h()
        },
        l(a) {
            e = g(a, "DIV", {
                class: !0
            });
            var t = $(e);
            o = g(t, "H1", {
                class: !0
            });
            var h = $(o);
            i = k(h, n),
            h.forEach(d),
            r = I(t),
            c = g(t, "SPAN", {
                class: !0
            });
            var m = $(c);
            v = k(m, p),
            m.forEach(d),
            y = I(t),
            u = g(t, "H2", {
                class: !0
            });
            var j = $(u);
            b = k(j, _),
            j.forEach(d),
            t.forEach(d),
            this.h()
        },
        h() {
            q(o, "class", "svelte-ikycqx"),
            q(c, "class", "emoji svelte-ikycqx"),
            q(u, "class", "svelte-ikycqx"),
            q(e, "class", "error svelte-ikycqx")
        },
        m(a, t) {
            P(a, e, t),
            l(e, o),
            l(o, i),
            l(e, r),
            l(e, c),
            l(c, v),
            l(e, y),
            l(e, u),
            l(u, b)
        },
        p(a, [t]) {
            var h, m;
            t & 1 && n !== (n = ((h = a[0]) == null ? void 0 : h.status) + "") && S(i, n),
            t & 1 && p !== (p = (a[0].error ? a[1][a[0].status] : "") + "") && S(v, p),
            t & 1 && _ !== (_ = ((m = a[0].error) == null ? void 0 : m.message) + "") && S(b, _)
        },
        i: C,
        o: C,
        d(a) {
            a && d(e)
        }
    }
}
function J(s, e, o) {
    let n;
    V(s, D, r=>o(0, n = r));
    let i = {
        404: "🤔",
        500: "😱",
        503: "🚧"
    };
    return w(()=>{
        D.subscribe(r=>{
            r.error && (document.title = `${r.status} - ${r.error.message}`)
        }
        )
    }
    ),
    [n, i]
}
let O = class extends G {
    constructor(e) {
        super(),
        M(this, e, J, B, N, {})
    }
}
;
export {O as component};
