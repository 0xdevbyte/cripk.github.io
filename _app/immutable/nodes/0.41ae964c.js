import {S as i, i as l, s as r, C as u, D as f, E as c, F as p, g as _, d as m, o as d} from "../chunks/index.ee4fe323.js";
import {i as $} from "../chunks/navigation.85f32432.js";
import {s as g} from "../chunks/supabase.bc106243.js";
function b(n) {
    let e;
    const o = n[1].default
      , s = u(o, n, n[0], null);
    return {
        c() {
            s && s.c()
        },
        l(t) {
            s && s.l(t)
        },
        m(t, a) {
            s && s.m(t, a),
            e = !0
        },
        p(t, [a]) {
            s && s.p && (!e || a & 1) && f(s, o, t, t[0], e ? p(o, t[0], a, null) : c(t[0]), null)
        },
        i(t) {
            e || (_(s, t),
            e = !0)
        },
        o(t) {
            m(s, t),
            e = !1
        },
        d(t) {
            s && s.d(t)
        }
    }
}
function h(n, e, o) {
    let {$$slots: s={}, $$scope: t} = e;
    return d(()=>{
        const {data: {subscription: a}} = g.auth.onAuthStateChange(()=>{
            $()
        }
        );
        return ()=>{
            a.unsubscribe()
        }
    }
    ),
    n.$$set = a=>{
        "$$scope"in a && o(0, t = a.$$scope)
    }
    ,
    [t, s]
}
class A extends i {
    constructor(e) {
        super(),
        l(this, e, h, b, r, {})
    }
}
export {A as component};
