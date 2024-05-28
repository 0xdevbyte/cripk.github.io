import {S as Se, i as ze, s as Fe, k as s, a as u, q as p, l as r, m as o, c as h, h as l, r as _, n as t, p as xe, J as Ge, b as J, G as e, H as Le} from "../chunks/index.ee4fe323.js";
const Ne = "" + new URL("../assets/dashboard_image.726cb79a.png",import.meta.url).href
  , Pe = "" + new URL("../assets/slug_image.75a2b569.png",import.meta.url).href;
function Te(w) {
    let a, d;
    return {
        c() {
            a = s("a"),
            d = p("Login"),
            this.h()
        },
        l(i) {
            a = r(i, "A", {
                href: !0,
                class: !0
            });
            var c = o(a);
            d = _(c, "Login"),
            c.forEach(l),
            this.h()
        },
        h() {
            t(a, "href", "/login"),
            t(a, "class", "btn-secondary svelte-1q8lxdm")
        },
        m(i, c) {
            J(i, a, c),
            e(a, d)
        },
        d(i) {
            i && l(a)
        }
    }
}
function Re(w) {
    let a, d;
    return {
        c() {
            a = s("a"),
            d = p("Dashboard"),
            this.h()
        },
        l(i) {
            a = r(i, "A", {
                href: !0,
                class: !0
            });
            var c = o(a);
            d = _(c, "Dashboard"),
            c.forEach(l),
            this.h()
        },
        h() {
            t(a, "href", "/dashboard"),
            t(a, "class", "btn-secondary svelte-1q8lxdm")
        },
        m(i, c) {
            J(i, a, c),
            e(a, d)
        },
        d(i) {
            i && l(a)
        }
    }
}
function Ue(w) {
    let a, d, i, c, $, R, j, m, y, U, ee, g, A, te, ae, se, f, V, re, le, H, oe, ie, q, ce, ne, E, b, k, G, de, ue, L, he, ve, S, M, ye, me, D, z, C, qe, fe, I, F, pe, _e, N, ge;
    function Ee(n, v) {
        return n[0].session ? Re : Te
    }
    let B = Ee(w)
      , x = B(w);
    return {
        c() {
            a = s("head"),
            d = s("meta"),
            i = u(),
            c = s("meta"),
            $ = u(),
            R = s("meta"),
            j = u(),
            m = s("main"),
            y = s("div"),
            U = s("div"),
            ee = u(),
            g = s("div"),
            A = s("a"),
            te = p("Discord"),
            ae = u(),
            x.c(),
            se = u(),
            f = s("div"),
            V = s("h1"),
            re = p("loki.lol"),
            le = u(),
            H = s("h2"),
            oe = p("A streamlined biolink experience"),
            ie = u(),
            q = s("a"),
            ce = p("Get Started"),
            ne = u(),
            E = s("div"),
            b = s("div"),
            k = s("div"),
            G = s("h3"),
            de = p("Customizable 🎨"),
            ue = u(),
            L = s("p"),
            he = p(`Customize your biolink to your liking with effects and images to create a\r
					beautiful and sleek design.`),
            ve = u(),
            S = s("div"),
            M = s("img"),
            me = u(),
            D = s("div"),
            z = s("div"),
            C = s("img"),
            fe = u(),
            I = s("div"),
            F = s("h3"),
            pe = p("Free 💰"),
            _e = u(),
            N = s("p"),
            ge = p(`Features that competing services charge extra for are free here. No extra charge\r
					to make your page stand out from the crowd.`),
            this.h()
        },
        l(n) {
            a = r(n, "HEAD", {});
            var v = o(a);
            d = r(v, "META", {
                property: !0,
                content: !0
            }),
            i = h(v),
            c = r(v, "META", {
                property: !0,
                content: !0
            }),
            $ = h(v),
            R = r(v, "META", {
                property: !0,
                content: !0
            }),
            v.forEach(l),
            j = h(n),
            m = r(n, "MAIN", {
                class: !0
            });
            var P = o(m);
            y = r(P, "DIV", {
                class: !0
            });
            var K = o(y);
            U = r(K, "DIV", {
                class: !0
            }),
            o(U).forEach(l),
            ee = h(K),
            g = r(K, "DIV", {
                class: !0
            });
            var O = o(g);
            A = r(O, "A", {
                href: !0,
                class: !0
            });
            var be = o(A);
            te = _(be, "Discord"),
            be.forEach(l),
            ae = h(O),
            x.l(O),
            O.forEach(l),
            K.forEach(l),
            se = h(P),
            f = r(P, "DIV", {
                class: !0
            });
            var T = o(f);
            V = r(T, "H1", {
                class: !0,
                style: !0
            });
            var ke = o(V);
            re = _(ke, "loki.lol"),
            ke.forEach(l),
            le = h(T),
            H = r(T, "H2", {
                class: !0,
                style: !0
            });
            var De = o(H);
            oe = _(De, "A streamlined biolink experience"),
            De.forEach(l),
            ie = h(T),
            q = r(T, "A", {
                href: !0,
                class: !0,
                style: !0
            });
            var Ie = o(q);
            ce = _(Ie, "Get Started"),
            Ie.forEach(l),
            T.forEach(l),
            ne = h(P),
            E = r(P, "DIV", {
                class: !0
            });
            var Q = o(E);
            b = r(Q, "DIV", {
                class: !0
            });
            var W = o(b);
            k = r(W, "DIV", {
                class: !0
            });
            var X = o(k);
            G = r(X, "H3", {
                class: !0
            });
            var we = o(G);
            de = _(we, "Customizable 🎨"),
            we.forEach(l),
            ue = h(X),
            L = r(X, "P", {
                class: !0
            });
            var Ae = o(L);
            he = _(Ae, `Customize your biolink to your liking with effects and images to create a\r
					beautiful and sleek design.`),
            Ae.forEach(l),
            X.forEach(l),
            ve = h(W),
            S = r(W, "DIV", {
                class: !0
            });
            var Ve = o(S);
            M = r(Ve, "IMG", {
                src: !0,
                alt: !0,
                class: !0
            }),
            Ve.forEach(l),
            W.forEach(l),
            me = h(Q),
            D = r(Q, "DIV", {
                class: !0
            });
            var Y = o(D);
            z = r(Y, "DIV", {
                class: !0
            });
            var He = o(z);
            C = r(He, "IMG", {
                src: !0,
                alt: !0,
                class: !0
            }),
            He.forEach(l),
            fe = h(Y),
            I = r(Y, "DIV", {
                class: !0
            });
            var Z = o(I);
            F = r(Z, "H3", {
                class: !0
            });
            var Me = o(F);
            pe = _(Me, "Free 💰"),
            Me.forEach(l),
            _e = h(Z),
            N = r(Z, "P", {
                class: !0
            });
            var Ce = o(N);
            ge = _(Ce, `Features that competing services charge extra for are free here. No extra charge\r
					to make your page stand out from the crowd.`),
            Ce.forEach(l),
            Z.forEach(l),
            Y.forEach(l),
            Q.forEach(l),
            P.forEach(l),
            this.h()
        },
        h() {
            t(d, "property", "og:title"),
            t(d, "content", "Loki.lol"),
            t(c, "property", "og:description"),
            t(c, "content", "Stay connected with @(whatever there @ is) online presents and surroundings in one place."),
            t(R, "property", "og:url"),
            t(R, "content", "https://loki.lol"),
            t(U, "class", "left-column svelte-1q8lxdm"),
            t(A, "href", "https://discord.gg/lokilol"),
            t(A, "class", "btn-discord svelte-1q8lxdm"),
            t(g, "class", "right-column svelte-1q8lxdm"),
            t(y, "class", "header-wrapper svelte-1q8lxdm"),
            t(V, "class", "hero-title animate-enter svelte-1q8lxdm"),
            xe(V, "--stagger", "1"),
            t(H, "class", "hero-subtitle animate-enter svelte-1q8lxdm"),
            xe(H, "--stagger", "4"),
            t(q, "href", "/register"),
            t(q, "class", "btn-primary animate-enter svelte-1q8lxdm"),
            xe(q, "--stagger", "5"),
            t(f, "class", "hero-wrapper svelte-1q8lxdm"),
            t(G, "class", "feature-title svelte-1q8lxdm"),
            t(L, "class", "feature-description svelte-1q8lxdm"),
            t(k, "class", "feature-textarea svelte-1q8lxdm"),
            Ge(M.src, ye = Pe) || t(M, "src", ye),
            t(M, "alt", ""),
            t(M, "class", "svelte-1q8lxdm"),
            t(S, "class", "feature-image svelte-1q8lxdm"),
            t(b, "class", "feature-wrapper svelte-1q8lxdm"),
            Ge(C.src, qe = Ne) || t(C, "src", qe),
            t(C, "alt", ""),
            t(C, "class", "svelte-1q8lxdm"),
            t(z, "class", "feature-image svelte-1q8lxdm"),
            t(F, "class", "feature-title svelte-1q8lxdm"),
            t(N, "class", "feature-description svelte-1q8lxdm"),
            t(I, "class", "feature-textarea svelte-1q8lxdm"),
            t(D, "class", "feature-wrapper svelte-1q8lxdm"),
            t(E, "class", "features-wrapper svelte-1q8lxdm"),
            t(m, "class", "svelte-1q8lxdm")
        },
        m(n, v) {
            J(n, a, v),
            e(a, d),
            e(a, i),
            e(a, c),
            e(a, $),
            e(a, R),
            J(n, j, v),
            J(n, m, v),
            e(m, y),
            e(y, U),
            e(y, ee),
            e(y, g),
            e(g, A),
            e(A, te),
            e(g, ae),
            x.m(g, null),
            e(m, se),
            e(m, f),
            e(f, V),
            e(V, re),
            e(f, le),
            e(f, H),
            e(H, oe),
            e(f, ie),
            e(f, q),
            e(q, ce),
            e(m, ne),
            e(m, E),
            e(E, b),
            e(b, k),
            e(k, G),
            e(G, de),
            e(k, ue),
            e(k, L),
            e(L, he),
            e(b, ve),
            e(b, S),
            e(S, M),
            e(E, me),
            e(E, D),
            e(D, z),
            e(z, C),
            e(D, fe),
            e(D, I),
            e(I, F),
            e(F, pe),
            e(I, _e),
            e(I, N),
            e(N, ge)
        },
        p(n, [v]) {
            B !== (B = Ee(n)) && (x.d(1),
            x = B(n),
            x && (x.c(),
            x.m(g, null)))
        },
        i: Le,
        o: Le,
        d(n) {
            n && l(a),
            n && l(j),
            n && l(m),
            x.d()
        }
    }
}
function Je(w, a, d) {
    let {data: i} = a;
    return w.$$set = c=>{
        "data"in c && d(0, i = c.data)
    }
    ,
    [i]
}
class Be extends Se {
    constructor(a) {
        super(),
        ze(this, a, Je, Ue, Fe, {
            data: 0
        })
    }
}
export {Be as component};
