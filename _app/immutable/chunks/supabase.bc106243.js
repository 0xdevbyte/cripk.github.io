function ct(i, e) {
    for (var t = 0; t < e.length; t++) {
        const r = e[t];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const s in r)
                if (s !== "default" && !(s in i)) {
                    const n = Object.getOwnPropertyDescriptor(r, s);
                    n && Object.defineProperty(i, s, n.get ? n : {
                        enumerable: !0,
                        get: ()=>r[s]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(i, Symbol.toStringTag, {
        value: "Module"
    }))
}
const lt = "modulepreload"
  , ht = function(i, e) {
    return new URL(i,e).href
}
  , xe = {}
  , ae = function(e, t, r) {
    if (!t || t.length === 0)
        return e();
    const s = document.getElementsByTagName("link");
    return Promise.all(t.map(n=>{
        if (n = ht(n, r),
        n in xe)
            return;
        xe[n] = !0;
        const o = n.endsWith(".css")
          , a = o ? '[rel="stylesheet"]' : "";
        if (!!r)
            for (let l = s.length - 1; l >= 0; l--) {
                const u = s[l];
                if (u.href === n && (!o || u.rel === "stylesheet"))
                    return
            }
        else if (document.querySelector(`link[href="${n}"]${a}`))
            return;
        const c = document.createElement("link");
        if (c.rel = o ? "stylesheet" : lt,
        o || (c.as = "script",
        c.crossOrigin = ""),
        c.href = n,
        document.head.appendChild(c),
        o)
            return new Promise((l,u)=>{
                c.addEventListener("load", l),
                c.addEventListener("error", ()=>u(new Error(`Unable to preload CSS for ${n}`)))
            }
            )
    }
    )).then(()=>e())
};
var ut = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
const dt = i=>{
    let e;
    return i ? e = i : typeof fetch > "u" ? e = (...t)=>ut(void 0, void 0, void 0, function*() {
        return yield(yield ae(()=>Promise.resolve().then(()=>ce), void 0, import.meta.url)).fetch(...t)
    }) : e = fetch,
    (...t)=>e(...t)
}
;
class ke extends Error {
    constructor(e, t="FunctionsError", r) {
        super(e),
        super.name = t,
        this.context = r
    }
}
class ft extends ke {
    constructor(e) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", e)
    }
}
class pt extends ke {
    constructor(e) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", e)
    }
}
class vt extends ke {
    constructor(e) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e)
    }
}
var _t = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
class yt {
    constructor(e, {headers: t={}, customFetch: r}={}) {
        this.url = e,
        this.headers = t,
        this.fetch = dt(r)
    }
    setAuth(e) {
        this.headers.Authorization = `Bearer ${e}`
    }
    invoke(e, t={}) {
        var r;
        return _t(this, void 0, void 0, function*() {
            try {
                const {headers: s, method: n, body: o} = t;
                let a = {}, h;
                o && (s && !Object.prototype.hasOwnProperty.call(s, "Content-Type") || !s) && (typeof Blob < "u" && o instanceof Blob || o instanceof ArrayBuffer ? (a["Content-Type"] = "application/octet-stream",
                h = o) : typeof o == "string" ? (a["Content-Type"] = "text/plain",
                h = o) : typeof FormData < "u" && o instanceof FormData ? h = o : (a["Content-Type"] = "application/json",
                h = JSON.stringify(o)));
                const c = yield this.fetch(`${this.url}/${e}`, {
                    method: n || "POST",
                    headers: Object.assign(Object.assign(Object.assign({}, a), this.headers), s),
                    body: h
                }).catch(m=>{
                    throw new ft(m)
                }
                )
                  , l = c.headers.get("x-relay-error");
                if (l && l === "true")
                    throw new pt(c);
                if (!c.ok)
                    throw new vt(c);
                let u = ((r = c.headers.get("Content-Type")) !== null && r !== void 0 ? r : "text/plain").split(";")[0].trim(), p;
                return u === "application/json" ? p = yield c.json() : u === "application/octet-stream" ? p = yield c.blob() : u === "multipart/form-data" ? p = yield c.formData() : p = yield c.text(),
                {
                    data: p,
                    error: null
                }
            } catch (s) {
                return {
                    data: null,
                    error: s
                }
            }
        })
    }
}
var mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gt(i) {
    return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i
}
var Q = {}
  , bt = {
    get exports() {
        return Q
    },
    set exports(i) {
        Q = i
    }
};
(function(i, e) {
    var t = typeof self < "u" ? self : mt
      , r = function() {
        function n() {
            this.fetch = !1,
            this.DOMException = t.DOMException
        }
        return n.prototype = t,
        new n
    }();
    (function(n) {
        (function(o) {
            var a = {
                searchParams: "URLSearchParams"in n,
                iterable: "Symbol"in n && "iterator"in Symbol,
                blob: "FileReader"in n && "Blob"in n && function() {
                    try {
                        return new Blob,
                        !0
                    } catch {
                        return !1
                    }
                }(),
                formData: "FormData"in n,
                arrayBuffer: "ArrayBuffer"in n
            };
            function h(d) {
                return d && DataView.prototype.isPrototypeOf(d)
            }
            if (a.arrayBuffer)
                var c = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"]
                  , l = ArrayBuffer.isView || function(d) {
                    return d && c.indexOf(Object.prototype.toString.call(d)) > -1
                }
                ;
            function u(d) {
                if (typeof d != "string" && (d = String(d)),
                /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(d))
                    throw new TypeError("Invalid character in header field name");
                return d.toLowerCase()
            }
            function p(d) {
                return typeof d != "string" && (d = String(d)),
                d
            }
            function m(d) {
                var f = {
                    next: function() {
                        var g = d.shift();
                        return {
                            done: g === void 0,
                            value: g
                        }
                    }
                };
                return a.iterable && (f[Symbol.iterator] = function() {
                    return f
                }
                ),
                f
            }
            function v(d) {
                this.map = {},
                d instanceof v ? d.forEach(function(f, g) {
                    this.append(g, f)
                }, this) : Array.isArray(d) ? d.forEach(function(f) {
                    this.append(f[0], f[1])
                }, this) : d && Object.getOwnPropertyNames(d).forEach(function(f) {
                    this.append(f, d[f])
                }, this)
            }
            v.prototype.append = function(d, f) {
                d = u(d),
                f = p(f);
                var g = this.map[d];
                this.map[d] = g ? g + ", " + f : f
            }
            ,
            v.prototype.delete = function(d) {
                delete this.map[u(d)]
            }
            ,
            v.prototype.get = function(d) {
                return d = u(d),
                this.has(d) ? this.map[d] : null
            }
            ,
            v.prototype.has = function(d) {
                return this.map.hasOwnProperty(u(d))
            }
            ,
            v.prototype.set = function(d, f) {
                this.map[u(d)] = p(f)
            }
            ,
            v.prototype.forEach = function(d, f) {
                for (var g in this.map)
                    this.map.hasOwnProperty(g) && d.call(f, this.map[g], g, this)
            }
            ,
            v.prototype.keys = function() {
                var d = [];
                return this.forEach(function(f, g) {
                    d.push(g)
                }),
                m(d)
            }
            ,
            v.prototype.values = function() {
                var d = [];
                return this.forEach(function(f) {
                    d.push(f)
                }),
                m(d)
            }
            ,
            v.prototype.entries = function() {
                var d = [];
                return this.forEach(function(f, g) {
                    d.push([g, f])
                }),
                m(d)
            }
            ,
            a.iterable && (v.prototype[Symbol.iterator] = v.prototype.entries);
            function _(d) {
                if (d.bodyUsed)
                    return Promise.reject(new TypeError("Already read"));
                d.bodyUsed = !0
            }
            function y(d) {
                return new Promise(function(f, g) {
                    d.onload = function() {
                        f(d.result)
                    }
                    ,
                    d.onerror = function() {
                        g(d.error)
                    }
                }
                )
            }
            function S(d) {
                var f = new FileReader
                  , g = y(f);
                return f.readAsArrayBuffer(d),
                g
            }
            function j(d) {
                var f = new FileReader
                  , g = y(f);
                return f.readAsText(d),
                g
            }
            function C(d) {
                for (var f = new Uint8Array(d), g = new Array(f.length), R = 0; R < f.length; R++)
                    g[R] = String.fromCharCode(f[R]);
                return g.join("")
            }
            function $(d) {
                if (d.slice)
                    return d.slice(0);
                var f = new Uint8Array(d.byteLength);
                return f.set(new Uint8Array(d)),
                f.buffer
            }
            function F() {
                return this.bodyUsed = !1,
                this._initBody = function(d) {
                    this._bodyInit = d,
                    d ? typeof d == "string" ? this._bodyText = d : a.blob && Blob.prototype.isPrototypeOf(d) ? this._bodyBlob = d : a.formData && FormData.prototype.isPrototypeOf(d) ? this._bodyFormData = d : a.searchParams && URLSearchParams.prototype.isPrototypeOf(d) ? this._bodyText = d.toString() : a.arrayBuffer && a.blob && h(d) ? (this._bodyArrayBuffer = $(d.buffer),
                    this._bodyInit = new Blob([this._bodyArrayBuffer])) : a.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(d) || l(d)) ? this._bodyArrayBuffer = $(d) : this._bodyText = d = Object.prototype.toString.call(d) : this._bodyText = "",
                    this.headers.get("content-type") || (typeof d == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : a.searchParams && URLSearchParams.prototype.isPrototypeOf(d) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                }
                ,
                a.blob && (this.blob = function() {
                    var d = _(this);
                    if (d)
                        return d;
                    if (this._bodyBlob)
                        return Promise.resolve(this._bodyBlob);
                    if (this._bodyArrayBuffer)
                        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                    if (this._bodyFormData)
                        throw new Error("could not read FormData body as blob");
                    return Promise.resolve(new Blob([this._bodyText]))
                }
                ,
                this.arrayBuffer = function() {
                    return this._bodyArrayBuffer ? _(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(S)
                }
                ),
                this.text = function() {
                    var d = _(this);
                    if (d)
                        return d;
                    if (this._bodyBlob)
                        return j(this._bodyBlob);
                    if (this._bodyArrayBuffer)
                        return Promise.resolve(C(this._bodyArrayBuffer));
                    if (this._bodyFormData)
                        throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText)
                }
                ,
                a.formData && (this.formData = function() {
                    return this.text().then(nt)
                }
                ),
                this.json = function() {
                    return this.text().then(JSON.parse)
                }
                ,
                this
            }
            var it = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            function st(d) {
                var f = d.toUpperCase();
                return it.indexOf(f) > -1 ? f : d
            }
            function M(d, f) {
                f = f || {};
                var g = f.body;
                if (d instanceof M) {
                    if (d.bodyUsed)
                        throw new TypeError("Already read");
                    this.url = d.url,
                    this.credentials = d.credentials,
                    f.headers || (this.headers = new v(d.headers)),
                    this.method = d.method,
                    this.mode = d.mode,
                    this.signal = d.signal,
                    !g && d._bodyInit != null && (g = d._bodyInit,
                    d.bodyUsed = !0)
                } else
                    this.url = String(d);
                if (this.credentials = f.credentials || this.credentials || "same-origin",
                (f.headers || !this.headers) && (this.headers = new v(f.headers)),
                this.method = st(f.method || this.method || "GET"),
                this.mode = f.mode || this.mode || null,
                this.signal = f.signal || this.signal,
                this.referrer = null,
                (this.method === "GET" || this.method === "HEAD") && g)
                    throw new TypeError("Body not allowed for GET or HEAD requests");
                this._initBody(g)
            }
            M.prototype.clone = function() {
                return new M(this,{
                    body: this._bodyInit
                })
            }
            ;
            function nt(d) {
                var f = new FormData;
                return d.trim().split("&").forEach(function(g) {
                    if (g) {
                        var R = g.split("=")
                          , k = R.shift().replace(/\+/g, " ")
                          , O = R.join("=").replace(/\+/g, " ");
                        f.append(decodeURIComponent(k), decodeURIComponent(O))
                    }
                }),
                f
            }
            function ot(d) {
                var f = new v
                  , g = d.replace(/\r?\n[\t ]+/g, " ");
                return g.split(/\r?\n/).forEach(function(R) {
                    var k = R.split(":")
                      , O = k.shift().trim();
                    if (O) {
                        var ne = k.join(":").trim();
                        f.append(O, ne)
                    }
                }),
                f
            }
            F.call(M.prototype);
            function D(d, f) {
                f || (f = {}),
                this.type = "default",
                this.status = f.status === void 0 ? 200 : f.status,
                this.ok = this.status >= 200 && this.status < 300,
                this.statusText = "statusText"in f ? f.statusText : "OK",
                this.headers = new v(f.headers),
                this.url = f.url || "",
                this._initBody(d)
            }
            F.call(D.prototype),
            D.prototype.clone = function() {
                return new D(this._bodyInit,{
                    status: this.status,
                    statusText: this.statusText,
                    headers: new v(this.headers),
                    url: this.url
                })
            }
            ,
            D.error = function() {
                var d = new D(null,{
                    status: 0,
                    statusText: ""
                });
                return d.type = "error",
                d
            }
            ;
            var at = [301, 302, 303, 307, 308];
            D.redirect = function(d, f) {
                if (at.indexOf(f) === -1)
                    throw new RangeError("Invalid status code");
                return new D(null,{
                    status: f,
                    headers: {
                        location: d
                    }
                })
            }
            ,
            o.DOMException = n.DOMException;
            try {
                new o.DOMException
            } catch {
                o.DOMException = function(f, g) {
                    this.message = f,
                    this.name = g;
                    var R = Error(f);
                    this.stack = R.stack
                }
                ,
                o.DOMException.prototype = Object.create(Error.prototype),
                o.DOMException.prototype.constructor = o.DOMException
            }
            function de(d, f) {
                return new Promise(function(g, R) {
                    var k = new M(d,f);
                    if (k.signal && k.signal.aborted)
                        return R(new o.DOMException("Aborted","AbortError"));
                    var O = new XMLHttpRequest;
                    function ne() {
                        O.abort()
                    }
                    O.onload = function() {
                        var Z = {
                            status: O.status,
                            statusText: O.statusText,
                            headers: ot(O.getAllResponseHeaders() || "")
                        };
                        Z.url = "responseURL"in O ? O.responseURL : Z.headers.get("X-Request-URL");
                        var fe = "response"in O ? O.response : O.responseText;
                        g(new D(fe,Z))
                    }
                    ,
                    O.onerror = function() {
                        R(new TypeError("Network request failed"))
                    }
                    ,
                    O.ontimeout = function() {
                        R(new TypeError("Network request failed"))
                    }
                    ,
                    O.onabort = function() {
                        R(new o.DOMException("Aborted","AbortError"))
                    }
                    ,
                    O.open(k.method, k.url, !0),
                    k.credentials === "include" ? O.withCredentials = !0 : k.credentials === "omit" && (O.withCredentials = !1),
                    "responseType"in O && a.blob && (O.responseType = "blob"),
                    k.headers.forEach(function(Z, fe) {
                        O.setRequestHeader(fe, Z)
                    }),
                    k.signal && (k.signal.addEventListener("abort", ne),
                    O.onreadystatechange = function() {
                        O.readyState === 4 && k.signal.removeEventListener("abort", ne)
                    }
                    ),
                    O.send(typeof k._bodyInit > "u" ? null : k._bodyInit)
                }
                )
            }
            return de.polyfill = !0,
            n.fetch || (n.fetch = de,
            n.Headers = v,
            n.Request = M,
            n.Response = D),
            o.Headers = v,
            o.Request = M,
            o.Response = D,
            o.fetch = de,
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o
        }
        )({})
    }
    )(r),
    r.fetch.ponyfill = !0,
    delete r.fetch.polyfill;
    var s = r;
    e = s.fetch,
    e.default = s.fetch,
    e.fetch = s.fetch,
    e.Headers = s.Headers,
    e.Request = s.Request,
    e.Response = s.Response,
    i.exports = e
}
)(bt, Q);
const je = gt(Q)
  , ce = ct({
    __proto__: null,
    default: je
}, [Q]);
class wt {
    constructor(e) {
        this.shouldThrowOnError = !1,
        this.method = e.method,
        this.url = e.url,
        this.headers = e.headers,
        this.schema = e.schema,
        this.body = e.body,
        this.shouldThrowOnError = e.shouldThrowOnError,
        this.signal = e.signal,
        this.allowEmpty = e.allowEmpty,
        e.fetch ? this.fetch = e.fetch : typeof fetch > "u" ? this.fetch = je : this.fetch = fetch
    }
    throwOnError() {
        return this.shouldThrowOnError = !0,
        this
    }
    then(e, t) {
        this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers["Accept-Profile"] = this.schema : this.headers["Content-Profile"] = this.schema),
        this.method !== "GET" && this.method !== "HEAD" && (this.headers["Content-Type"] = "application/json");
        const r = this.fetch;
        let s = r(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal
        }).then(async n=>{
            var o, a, h;
            let c = null
              , l = null
              , u = null
              , p = n.status
              , m = n.statusText;
            if (n.ok) {
                if (this.method !== "HEAD") {
                    const S = await n.text();
                    S === "" || (this.headers.Accept === "text/csv" || this.headers.Accept && this.headers.Accept.includes("application/vnd.pgrst.plan+text") ? l = S : l = JSON.parse(S))
                }
                const _ = (o = this.headers.Prefer) === null || o === void 0 ? void 0 : o.match(/count=(exact|planned|estimated)/)
                  , y = (a = n.headers.get("content-range")) === null || a === void 0 ? void 0 : a.split("/");
                _ && y && y.length > 1 && (u = parseInt(y[1]))
            } else {
                const _ = await n.text();
                try {
                    c = JSON.parse(_),
                    Array.isArray(c) && n.status === 404 && (l = [],
                    c = null,
                    p = 200,
                    m = "OK")
                } catch {
                    n.status === 404 && _ === "" ? (p = 204,
                    m = "No Content") : c = {
                        message: _
                    }
                }
                if (c && this.allowEmpty && (!((h = c == null ? void 0 : c.details) === null || h === void 0) && h.includes("Results contain 0 rows")) && (c = null,
                p = 200,
                m = "OK"),
                c && this.shouldThrowOnError)
                    throw c
            }
            return {
                error: c,
                data: l,
                count: u,
                status: p,
                statusText: m
            }
        }
        );
        return this.shouldThrowOnError || (s = s.catch(n=>({
            error: {
                message: `FetchError: ${n.message}`,
                details: "",
                hint: "",
                code: n.code || ""
            },
            data: null,
            count: null,
            status: 0,
            statusText: ""
        }))),
        s.then(e, t)
    }
}
class Ot extends wt {
    select(e) {
        let t = !1;
        const r = (e ?? "*").split("").map(s=>/\s/.test(s) && !t ? "" : (s === '"' && (t = !t),
        s)).join("");
        return this.url.searchParams.set("select", r),
        this.headers.Prefer && (this.headers.Prefer += ","),
        this.headers.Prefer += "return=representation",
        this
    }
    order(e, {ascending: t=!0, nullsFirst: r, foreignTable: s}={}) {
        const n = s ? `${s}.order` : "order"
          , o = this.url.searchParams.get(n);
        return this.url.searchParams.set(n, `${o ? `${o},` : ""}${e}.${t ? "asc" : "desc"}${r === void 0 ? "" : r ? ".nullsfirst" : ".nullslast"}`),
        this
    }
    limit(e, {foreignTable: t}={}) {
        const r = typeof t > "u" ? "limit" : `${t}.limit`;
        return this.url.searchParams.set(r, `${e}`),
        this
    }
    range(e, t, {foreignTable: r}={}) {
        const s = typeof r > "u" ? "offset" : `${r}.offset`
          , n = typeof r > "u" ? "limit" : `${r}.limit`;
        return this.url.searchParams.set(s, `${e}`),
        this.url.searchParams.set(n, `${t - e + 1}`),
        this
    }
    abortSignal(e) {
        return this.signal = e,
        this
    }
    single() {
        return this.headers.Accept = "application/vnd.pgrst.object+json",
        this
    }
    maybeSingle() {
        return this.headers.Accept = "application/vnd.pgrst.object+json",
        this.allowEmpty = !0,
        this
    }
    csv() {
        return this.headers.Accept = "text/csv",
        this
    }
    geojson() {
        return this.headers.Accept = "application/geo+json",
        this
    }
    explain({analyze: e=!1, verbose: t=!1, settings: r=!1, buffers: s=!1, wal: n=!1, format: o="text"}={}) {
        const a = [e ? "analyze" : null, t ? "verbose" : null, r ? "settings" : null, s ? "buffers" : null, n ? "wal" : null].filter(Boolean).join("|")
          , h = this.headers.Accept;
        return this.headers.Accept = `application/vnd.pgrst.plan+${o}; for="${h}"; options=${a};`,
        o === "json" ? this : this
    }
    rollback() {
        var e;
        return ((e = this.headers.Prefer) !== null && e !== void 0 ? e : "").trim().length > 0 ? this.headers.Prefer += ",tx=rollback" : this.headers.Prefer = "tx=rollback",
        this
    }
    returns() {
        return this
    }
}
class X extends Ot {
    eq(e, t) {
        return this.url.searchParams.append(e, `eq.${t}`),
        this
    }
    neq(e, t) {
        return this.url.searchParams.append(e, `neq.${t}`),
        this
    }
    gt(e, t) {
        return this.url.searchParams.append(e, `gt.${t}`),
        this
    }
    gte(e, t) {
        return this.url.searchParams.append(e, `gte.${t}`),
        this
    }
    lt(e, t) {
        return this.url.searchParams.append(e, `lt.${t}`),
        this
    }
    lte(e, t) {
        return this.url.searchParams.append(e, `lte.${t}`),
        this
    }
    like(e, t) {
        return this.url.searchParams.append(e, `like.${t}`),
        this
    }
    ilike(e, t) {
        return this.url.searchParams.append(e, `ilike.${t}`),
        this
    }
    is(e, t) {
        return this.url.searchParams.append(e, `is.${t}`),
        this
    }
    in(e, t) {
        const r = t.map(s=>typeof s == "string" && new RegExp("[,()]").test(s) ? `"${s}"` : `${s}`).join(",");
        return this.url.searchParams.append(e, `in.(${r})`),
        this
    }
    contains(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `cs.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`) : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`),
        this
    }
    containedBy(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `cd.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`) : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`),
        this
    }
    rangeGt(e, t) {
        return this.url.searchParams.append(e, `sr.${t}`),
        this
    }
    rangeGte(e, t) {
        return this.url.searchParams.append(e, `nxl.${t}`),
        this
    }
    rangeLt(e, t) {
        return this.url.searchParams.append(e, `sl.${t}`),
        this
    }
    rangeLte(e, t) {
        return this.url.searchParams.append(e, `nxr.${t}`),
        this
    }
    rangeAdjacent(e, t) {
        return this.url.searchParams.append(e, `adj.${t}`),
        this
    }
    overlaps(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `ov.${t}`) : this.url.searchParams.append(e, `ov.{${t.join(",")}}`),
        this
    }
    textSearch(e, t, {config: r, type: s}={}) {
        let n = "";
        s === "plain" ? n = "pl" : s === "phrase" ? n = "ph" : s === "websearch" && (n = "w");
        const o = r === void 0 ? "" : `(${r})`;
        return this.url.searchParams.append(e, `${n}fts${o}.${t}`),
        this
    }
    match(e) {
        return Object.entries(e).forEach(([t,r])=>{
            this.url.searchParams.append(t, `eq.${r}`)
        }
        ),
        this
    }
    not(e, t, r) {
        return this.url.searchParams.append(e, `not.${t}.${r}`),
        this
    }
    or(e, {foreignTable: t}={}) {
        const r = t ? `${t}.or` : "or";
        return this.url.searchParams.append(r, `(${e})`),
        this
    }
    filter(e, t, r) {
        return this.url.searchParams.append(e, `${t}.${r}`),
        this
    }
}
class Et {
    constructor(e, {headers: t={}, schema: r, fetch: s}) {
        this.url = e,
        this.headers = t,
        this.schema = r,
        this.fetch = s
    }
    select(e, {head: t=!1, count: r}={}) {
        const s = t ? "HEAD" : "GET";
        let n = !1;
        const o = (e ?? "*").split("").map(a=>/\s/.test(a) && !n ? "" : (a === '"' && (n = !n),
        a)).join("");
        return this.url.searchParams.set("select", o),
        r && (this.headers.Prefer = `count=${r}`),
        new X({
            method: s,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: !1
        })
    }
    insert(e, {count: t}={}) {
        const r = "POST"
          , s = []
          , n = e;
        if (t && s.push(`count=${t}`),
        this.headers.Prefer && s.unshift(this.headers.Prefer),
        this.headers.Prefer = s.join(","),
        Array.isArray(e)) {
            const o = e.reduce((a,h)=>a.concat(Object.keys(h)), []);
            if (o.length > 0) {
                const a = [...new Set(o)].map(h=>`"${h}"`);
                this.url.searchParams.set("columns", a.join(","))
            }
        }
        return new X({
            method: r,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: n,
            fetch: this.fetch,
            allowEmpty: !1
        })
    }
    upsert(e, {onConflict: t, ignoreDuplicates: r=!1, count: s}={}) {
        const n = "POST"
          , o = [`resolution=${r ? "ignore" : "merge"}-duplicates`];
        t !== void 0 && this.url.searchParams.set("on_conflict", t);
        const a = e;
        return s && o.push(`count=${s}`),
        this.headers.Prefer && o.unshift(this.headers.Prefer),
        this.headers.Prefer = o.join(","),
        new X({
            method: n,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: a,
            fetch: this.fetch,
            allowEmpty: !1
        })
    }
    update(e, {count: t}={}) {
        const r = "PATCH"
          , s = []
          , n = e;
        return t && s.push(`count=${t}`),
        this.headers.Prefer && s.unshift(this.headers.Prefer),
        this.headers.Prefer = s.join(","),
        new X({
            method: r,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: n,
            fetch: this.fetch,
            allowEmpty: !1
        })
    }
    delete({count: e}={}) {
        const t = "DELETE"
          , r = [];
        return e && r.push(`count=${e}`),
        this.headers.Prefer && r.unshift(this.headers.Prefer),
        this.headers.Prefer = r.join(","),
        new X({
            method: t,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: !1
        })
    }
}
const Tt = "1.4.1"
  , St = {
    "X-Client-Info": `postgrest-js/${Tt}`
};
class kt {
    constructor(e, {headers: t={}, schema: r, fetch: s}={}) {
        this.url = e,
        this.headers = Object.assign(Object.assign({}, St), t),
        this.schema = r,
        this.fetch = s
    }
    from(e) {
        const t = new URL(`${this.url}/${e}`);
        return new Et(t,{
            headers: Object.assign({}, this.headers),
            schema: this.schema,
            fetch: this.fetch
        })
    }
    rpc(e, t={}, {head: r=!1, count: s}={}) {
        let n;
        const o = new URL(`${this.url}/rpc/${e}`);
        let a;
        r ? (n = "HEAD",
        Object.entries(t).forEach(([c,l])=>{
            o.searchParams.append(c, `${l}`)
        }
        )) : (n = "POST",
        a = t);
        const h = Object.assign({}, this.headers);
        return s && (h.Prefer = `count=${s}`),
        new X({
            method: n,
            url: o,
            headers: h,
            schema: this.schema,
            body: a,
            fetch: this.fetch,
            allowEmpty: !1
        })
    }
}
var pe, Ce;
function jt() {
    if (Ce)
        return pe;
    Ce = 1;
    var i = function() {
        if (typeof self == "object" && self)
            return self;
        if (typeof window == "object" && window)
            return window;
        throw new Error("Unable to resolve global `this`")
    };
    return pe = function() {
        if (this)
            return this;
        if (typeof globalThis == "object" && globalThis)
            return globalThis;
        try {
            Object.defineProperty(Object.prototype, "__global__", {
                get: function() {
                    return this
                },
                configurable: !0
            })
        } catch {
            return i()
        }
        try {
            return __global__ || i()
        } finally {
            delete Object.prototype.__global__
        }
    }(),
    pe
}
const $t = "websocket"
  , Rt = "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455."
  , At = ["websocket", "websockets", "socket", "networking", "comet", "push", "RFC-6455", "realtime", "server", "client"]
  , Pt = "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)"
  , xt = ["Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"]
  , Ct = "1.0.34"
  , It = {
    type: "git",
    url: "https://github.com/theturtle32/WebSocket-Node.git"
}
  , Dt = "https://github.com/theturtle32/WebSocket-Node"
  , Ut = {
    node: ">=4.0.0"
}
  , Lt = {
    bufferutil: "^4.0.1",
    debug: "^2.2.0",
    "es5-ext": "^0.10.50",
    "typedarray-to-buffer": "^3.1.5",
    "utf-8-validate": "^5.0.2",
    yaeti: "^0.0.6"
}
  , Bt = {
    "buffer-equal": "^1.0.0",
    gulp: "^4.0.2",
    "gulp-jshint": "^2.0.4",
    "jshint-stylish": "^2.2.1",
    jshint: "^2.0.0",
    tape: "^4.9.1"
}
  , Nt = {
    verbose: !1
}
  , Ft = {
    test: "tape test/unit/*.js",
    gulp: "gulp"
}
  , Mt = "index"
  , Jt = {
    lib: "./lib"
}
  , Ht = "lib/browser.js"
  , zt = "Apache-2.0"
  , qt = {
    name: $t,
    description: Rt,
    keywords: At,
    author: Pt,
    contributors: xt,
    version: Ct,
    repository: It,
    homepage: Dt,
    engines: Ut,
    dependencies: Lt,
    devDependencies: Bt,
    config: Nt,
    scripts: Ft,
    main: Mt,
    directories: Jt,
    browser: Ht,
    license: zt
};
var Gt = qt.version, q;
if (typeof globalThis == "object")
    q = globalThis;
else
    try {
        q = jt()
    } catch {} finally {
        if (!q && typeof window < "u" && (q = window),
        !q)
            throw new Error("Could not determine global this")
    }
var ie = q.WebSocket || q.MozWebSocket
  , Kt = Gt;
function He(i, e) {
    var t;
    return e ? t = new ie(i,e) : t = new ie(i),
    t
}
ie && ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(i) {
    Object.defineProperty(He, i, {
        get: function() {
            return ie[i]
        }
    })
});
var Vt = {
    w3cwebsocket: ie ? He : null,
    version: Kt
};
const Wt = "2.6.0"
  , Xt = {
    "X-Client-Info": `realtime-js/${Wt}`
}
  , Qt = "1.0.0"
  , ze = 1e4
  , Yt = 1e3;
var te;
(function(i) {
    i[i.connecting = 0] = "connecting",
    i[i.open = 1] = "open",
    i[i.closing = 2] = "closing",
    i[i.closed = 3] = "closed"
}
)(te || (te = {}));
var P;
(function(i) {
    i.closed = "closed",
    i.errored = "errored",
    i.joined = "joined",
    i.joining = "joining",
    i.leaving = "leaving"
}
)(P || (P = {}));
var I;
(function(i) {
    i.close = "phx_close",
    i.error = "phx_error",
    i.join = "phx_join",
    i.reply = "phx_reply",
    i.leave = "phx_leave",
    i.access_token = "access_token"
}
)(I || (I = {}));
var Oe;
(function(i) {
    i.websocket = "websocket"
}
)(Oe || (Oe = {}));
var G;
(function(i) {
    i.Connecting = "connecting",
    i.Open = "open",
    i.Closing = "closing",
    i.Closed = "closed"
}
)(G || (G = {}));
class qe {
    constructor(e, t) {
        this.callback = e,
        this.timerCalc = t,
        this.timer = void 0,
        this.tries = 0,
        this.callback = e,
        this.timerCalc = t
    }
    reset() {
        this.tries = 0,
        clearTimeout(this.timer)
    }
    scheduleTimeout() {
        clearTimeout(this.timer),
        this.timer = setTimeout(()=>{
            this.tries = this.tries + 1,
            this.callback()
        }
        , this.timerCalc(this.tries + 1))
    }
}
class Zt {
    constructor() {
        this.HEADER_LENGTH = 1
    }
    decode(e, t) {
        return e.constructor === ArrayBuffer ? t(this._binaryDecode(e)) : t(typeof e == "string" ? JSON.parse(e) : {})
    }
    _binaryDecode(e) {
        const t = new DataView(e)
          , r = new TextDecoder;
        return this._decodeBroadcast(e, t, r)
    }
    _decodeBroadcast(e, t, r) {
        const s = t.getUint8(1)
          , n = t.getUint8(2);
        let o = this.HEADER_LENGTH + 2;
        const a = r.decode(e.slice(o, o + s));
        o = o + s;
        const h = r.decode(e.slice(o, o + n));
        o = o + n;
        const c = JSON.parse(r.decode(e.slice(o, e.byteLength)));
        return {
            ref: null,
            topic: a,
            event: h,
            payload: c
        }
    }
}
class ve {
    constructor(e, t, r={}, s=ze) {
        this.channel = e,
        this.event = t,
        this.payload = r,
        this.timeout = s,
        this.sent = !1,
        this.timeoutTimer = void 0,
        this.ref = "",
        this.receivedResp = null,
        this.recHooks = [],
        this.refEvent = null,
        this.rateLimited = !1
    }
    resend(e) {
        this.timeout = e,
        this._cancelRefEvent(),
        this.ref = "",
        this.refEvent = null,
        this.receivedResp = null,
        this.sent = !1,
        this.send()
    }
    send() {
        if (this._hasReceived("timeout"))
            return;
        this.startTimeout(),
        this.sent = !0,
        this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef()
        }) === "rate limited" && (this.rateLimited = !0)
    }
    updatePayload(e) {
        this.payload = Object.assign(Object.assign({}, this.payload), e)
    }
    receive(e, t) {
        var r;
        return this._hasReceived(e) && t((r = this.receivedResp) === null || r === void 0 ? void 0 : r.response),
        this.recHooks.push({
            status: e,
            callback: t
        }),
        this
    }
    startTimeout() {
        if (this.timeoutTimer)
            return;
        this.ref = this.channel.socket._makeRef(),
        this.refEvent = this.channel._replyEventName(this.ref);
        const e = t=>{
            this._cancelRefEvent(),
            this._cancelTimeout(),
            this.receivedResp = t,
            this._matchReceive(t)
        }
        ;
        this.channel._on(this.refEvent, {}, e),
        this.timeoutTimer = setTimeout(()=>{
            this.trigger("timeout", {})
        }
        , this.timeout)
    }
    trigger(e, t) {
        this.refEvent && this.channel._trigger(this.refEvent, {
            status: e,
            response: t
        })
    }
    destroy() {
        this._cancelRefEvent(),
        this._cancelTimeout()
    }
    _cancelRefEvent() {
        this.refEvent && this.channel._off(this.refEvent, {})
    }
    _cancelTimeout() {
        clearTimeout(this.timeoutTimer),
        this.timeoutTimer = void 0
    }
    _matchReceive({status: e, response: t}) {
        this.recHooks.filter(r=>r.status === e).forEach(r=>r.callback(t))
    }
    _hasReceived(e) {
        return this.receivedResp && this.receivedResp.status === e
    }
}
var Ie;
(function(i) {
    i.SYNC = "sync",
    i.JOIN = "join",
    i.LEAVE = "leave"
}
)(Ie || (Ie = {}));
class re {
    constructor(e, t) {
        this.channel = e,
        this.state = {},
        this.pendingDiffs = [],
        this.joinRef = null,
        this.caller = {
            onJoin: ()=>{}
            ,
            onLeave: ()=>{}
            ,
            onSync: ()=>{}
        };
        const r = (t == null ? void 0 : t.events) || {
            state: "presence_state",
            diff: "presence_diff"
        };
        this.channel._on(r.state, {}, s=>{
            const {onJoin: n, onLeave: o, onSync: a} = this.caller;
            this.joinRef = this.channel._joinRef(),
            this.state = re.syncState(this.state, s, n, o),
            this.pendingDiffs.forEach(h=>{
                this.state = re.syncDiff(this.state, h, n, o)
            }
            ),
            this.pendingDiffs = [],
            a()
        }
        ),
        this.channel._on(r.diff, {}, s=>{
            const {onJoin: n, onLeave: o, onSync: a} = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(s) : (this.state = re.syncDiff(this.state, s, n, o),
            a())
        }
        ),
        this.onJoin((s,n,o)=>{
            this.channel._trigger("presence", {
                event: "join",
                key: s,
                currentPresences: n,
                newPresences: o
            })
        }
        ),
        this.onLeave((s,n,o)=>{
            this.channel._trigger("presence", {
                event: "leave",
                key: s,
                currentPresences: n,
                leftPresences: o
            })
        }
        ),
        this.onSync(()=>{
            this.channel._trigger("presence", {
                event: "sync"
            })
        }
        )
    }
    static syncState(e, t, r, s) {
        const n = this.cloneDeep(e)
          , o = this.transformState(t)
          , a = {}
          , h = {};
        return this.map(n, (c,l)=>{
            o[c] || (h[c] = l)
        }
        ),
        this.map(o, (c,l)=>{
            const u = n[c];
            if (u) {
                const p = l.map(y=>y.presence_ref)
                  , m = u.map(y=>y.presence_ref)
                  , v = l.filter(y=>m.indexOf(y.presence_ref) < 0)
                  , _ = u.filter(y=>p.indexOf(y.presence_ref) < 0);
                v.length > 0 && (a[c] = v),
                _.length > 0 && (h[c] = _)
            } else
                a[c] = l
        }
        ),
        this.syncDiff(n, {
            joins: a,
            leaves: h
        }, r, s)
    }
    static syncDiff(e, t, r, s) {
        const {joins: n, leaves: o} = {
            joins: this.transformState(t.joins),
            leaves: this.transformState(t.leaves)
        };
        return r || (r = ()=>{}
        ),
        s || (s = ()=>{}
        ),
        this.map(n, (a,h)=>{
            var c;
            const l = (c = e[a]) !== null && c !== void 0 ? c : [];
            if (e[a] = this.cloneDeep(h),
            l.length > 0) {
                const u = e[a].map(m=>m.presence_ref)
                  , p = l.filter(m=>u.indexOf(m.presence_ref) < 0);
                e[a].unshift(...p)
            }
            r(a, l, h)
        }
        ),
        this.map(o, (a,h)=>{
            let c = e[a];
            if (!c)
                return;
            const l = h.map(u=>u.presence_ref);
            c = c.filter(u=>l.indexOf(u.presence_ref) < 0),
            e[a] = c,
            s(a, c, h),
            c.length === 0 && delete e[a]
        }
        ),
        e
    }
    static map(e, t) {
        return Object.getOwnPropertyNames(e).map(r=>t(r, e[r]))
    }
    static transformState(e) {
        return e = this.cloneDeep(e),
        Object.getOwnPropertyNames(e).reduce((t,r)=>{
            const s = e[r];
            return "metas"in s ? t[r] = s.metas.map(n=>(n.presence_ref = n.phx_ref,
            delete n.phx_ref,
            delete n.phx_ref_prev,
            n)) : t[r] = s,
            t
        }
        , {})
    }
    static cloneDeep(e) {
        return JSON.parse(JSON.stringify(e))
    }
    onJoin(e) {
        this.caller.onJoin = e
    }
    onLeave(e) {
        this.caller.onLeave = e
    }
    onSync(e) {
        this.caller.onSync = e
    }
    inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef()
    }
}
var T;
(function(i) {
    i.abstime = "abstime",
    i.bool = "bool",
    i.date = "date",
    i.daterange = "daterange",
    i.float4 = "float4",
    i.float8 = "float8",
    i.int2 = "int2",
    i.int4 = "int4",
    i.int4range = "int4range",
    i.int8 = "int8",
    i.int8range = "int8range",
    i.json = "json",
    i.jsonb = "jsonb",
    i.money = "money",
    i.numeric = "numeric",
    i.oid = "oid",
    i.reltime = "reltime",
    i.text = "text",
    i.time = "time",
    i.timestamp = "timestamp",
    i.timestamptz = "timestamptz",
    i.timetz = "timetz",
    i.tsrange = "tsrange",
    i.tstzrange = "tstzrange"
}
)(T || (T = {}));
const De = (i,e,t={})=>{
    var r;
    const s = (r = t.skipTypes) !== null && r !== void 0 ? r : [];
    return Object.keys(e).reduce((n,o)=>(n[o] = er(o, i, e, s),
    n), {})
}
  , er = (i,e,t,r)=>{
    const s = e.find(a=>a.name === i)
      , n = s == null ? void 0 : s.type
      , o = t[i];
    return n && !r.includes(n) ? Ge(n, o) : Ee(o)
}
  , Ge = (i,e)=>{
    if (i.charAt(0) === "_") {
        const t = i.slice(1, i.length);
        return sr(e, t)
    }
    switch (i) {
    case T.bool:
        return tr(e);
    case T.float4:
    case T.float8:
    case T.int2:
    case T.int4:
    case T.int8:
    case T.numeric:
    case T.oid:
        return rr(e);
    case T.json:
    case T.jsonb:
        return ir(e);
    case T.timestamp:
        return nr(e);
    case T.abstime:
    case T.date:
    case T.daterange:
    case T.int4range:
    case T.int8range:
    case T.money:
    case T.reltime:
    case T.text:
    case T.time:
    case T.timestamptz:
    case T.timetz:
    case T.tsrange:
    case T.tstzrange:
        return Ee(e);
    default:
        return Ee(e)
    }
}
  , Ee = i=>i
  , tr = i=>{
    switch (i) {
    case "t":
        return !0;
    case "f":
        return !1;
    default:
        return i
    }
}
  , rr = i=>{
    if (typeof i == "string") {
        const e = parseFloat(i);
        if (!Number.isNaN(e))
            return e
    }
    return i
}
  , ir = i=>{
    if (typeof i == "string")
        try {
            return JSON.parse(i)
        } catch (e) {
            return console.log(`JSON parse error: ${e}`),
            i
        }
    return i
}
  , sr = (i,e)=>{
    if (typeof i != "string")
        return i;
    const t = i.length - 1
      , r = i[t];
    if (i[0] === "{" && r === "}") {
        let n;
        const o = i.slice(1, t);
        try {
            n = JSON.parse("[" + o + "]")
        } catch {
            n = o ? o.split(",") : []
        }
        return n.map(a=>Ge(e, a))
    }
    return i
}
  , nr = i=>typeof i == "string" ? i.replace(" ", "T") : i;
var Ue = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
, Le;
(function(i) {
    i.ALL = "*",
    i.INSERT = "INSERT",
    i.UPDATE = "UPDATE",
    i.DELETE = "DELETE"
}
)(Le || (Le = {}));
var Be;
(function(i) {
    i.BROADCAST = "broadcast",
    i.PRESENCE = "presence",
    i.POSTGRES_CHANGES = "postgres_changes"
}
)(Be || (Be = {}));
var Ne;
(function(i) {
    i.SUBSCRIBED = "SUBSCRIBED",
    i.TIMED_OUT = "TIMED_OUT",
    i.CLOSED = "CLOSED",
    i.CHANNEL_ERROR = "CHANNEL_ERROR"
}
)(Ne || (Ne = {}));
class $e {
    constructor(e, t={
        config: {}
    }, r) {
        this.topic = e,
        this.params = t,
        this.socket = r,
        this.bindings = {},
        this.state = P.closed,
        this.joinedOnce = !1,
        this.pushBuffer = [],
        this.params.config = Object.assign({
            broadcast: {
                ack: !1,
                self: !1
            },
            presence: {
                key: ""
            }
        }, t.config),
        this.timeout = this.socket.timeout,
        this.joinPush = new ve(this,I.join,this.params,this.timeout),
        this.rejoinTimer = new qe(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),
        this.joinPush.receive("ok", ()=>{
            this.state = P.joined,
            this.rejoinTimer.reset(),
            this.pushBuffer.forEach(s=>s.send()),
            this.pushBuffer = []
        }
        ),
        this._onClose(()=>{
            this.rejoinTimer.reset(),
            this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`),
            this.state = P.closed,
            this.socket._remove(this)
        }
        ),
        this._onError(s=>{
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, s),
            this.state = P.errored,
            this.rejoinTimer.scheduleTimeout())
        }
        ),
        this.joinPush.receive("timeout", ()=>{
            this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout),
            this.state = P.errored,
            this.rejoinTimer.scheduleTimeout())
        }
        ),
        this._on(I.reply, {}, (s,n)=>{
            this._trigger(this._replyEventName(n), s)
        }
        ),
        this.presence = new re(this)
    }
    subscribe(e, t=this.timeout) {
        var r, s;
        if (this.joinedOnce)
            throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
        {
            const {config: {broadcast: n, presence: o}} = this.params;
            this._onError(c=>e && e("CHANNEL_ERROR", c)),
            this._onClose(()=>e && e("CLOSED"));
            const a = {}
              , h = {
                broadcast: n,
                presence: o,
                postgres_changes: (s = (r = this.bindings.postgres_changes) === null || r === void 0 ? void 0 : r.map(c=>c.filter)) !== null && s !== void 0 ? s : []
            };
            this.socket.accessToken && (a.access_token = this.socket.accessToken),
            this.updateJoinPayload(Object.assign({
                config: h
            }, a)),
            this.joinedOnce = !0,
            this._rejoin(t),
            this.joinPush.receive("ok", ({postgres_changes: c})=>{
                var l;
                if (this.socket.accessToken && this.socket.setAuth(this.socket.accessToken),
                c === void 0) {
                    e && e("SUBSCRIBED");
                    return
                } else {
                    const u = this.bindings.postgres_changes
                      , p = (l = u == null ? void 0 : u.length) !== null && l !== void 0 ? l : 0
                      , m = [];
                    for (let v = 0; v < p; v++) {
                        const _ = u[v]
                          , {filter: {event: y, schema: S, table: j, filter: C}} = _
                          , $ = c && c[v];
                        if ($ && $.event === y && $.schema === S && $.table === j && $.filter === C)
                            m.push(Object.assign(Object.assign({}, _), {
                                id: $.id
                            }));
                        else {
                            this.unsubscribe(),
                            e && e("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                            return
                        }
                    }
                    this.bindings.postgres_changes = m,
                    e && e("SUBSCRIBED");
                    return
                }
            }
            ).receive("error", c=>{
                e && e("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(c).join(", ") || "error")))
            }
            ).receive("timeout", ()=>{
                e && e("TIMED_OUT")
            }
            )
        }
        return this
    }
    presenceState() {
        return this.presence.state
    }
    track(e, t={}) {
        return Ue(this, void 0, void 0, function*() {
            return yield this.send({
                type: "presence",
                event: "track",
                payload: e
            }, t.timeout || this.timeout)
        })
    }
    untrack(e={}) {
        return Ue(this, void 0, void 0, function*() {
            return yield this.send({
                type: "presence",
                event: "untrack"
            }, e)
        })
    }
    on(e, t, r) {
        return this._on(e, t, r)
    }
    send(e, t={}) {
        return new Promise(r=>{
            var s, n, o;
            const a = this._push(e.type, e, t.timeout || this.timeout);
            a.rateLimited && r("rate limited"),
            e.type === "broadcast" && !(!((o = (n = (s = this.params) === null || s === void 0 ? void 0 : s.config) === null || n === void 0 ? void 0 : n.broadcast) === null || o === void 0) && o.ack) && r("ok"),
            a.receive("ok", ()=>r("ok")),
            a.receive("timeout", ()=>r("timed out"))
        }
        )
    }
    updateJoinPayload(e) {
        this.joinPush.updatePayload(e)
    }
    unsubscribe(e=this.timeout) {
        this.state = P.leaving;
        const t = ()=>{
            this.socket.log("channel", `leave ${this.topic}`),
            this._trigger(I.close, "leave", this._joinRef())
        }
        ;
        return this.rejoinTimer.reset(),
        this.joinPush.destroy(),
        new Promise(r=>{
            const s = new ve(this,I.leave,{},e);
            s.receive("ok", ()=>{
                t(),
                r("ok")
            }
            ).receive("timeout", ()=>{
                t(),
                r("timed out")
            }
            ).receive("error", ()=>{
                r("error")
            }
            ),
            s.send(),
            this._canPush() || s.trigger("ok", {})
        }
        )
    }
    _push(e, t, r=this.timeout) {
        if (!this.joinedOnce)
            throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        let s = new ve(this,e,t,r);
        return this._canPush() ? s.send() : (s.startTimeout(),
        this.pushBuffer.push(s)),
        s
    }
    _onMessage(e, t, r) {
        return t
    }
    _isMember(e) {
        return this.topic === e
    }
    _joinRef() {
        return this.joinPush.ref
    }
    _trigger(e, t, r) {
        var s, n;
        const o = e.toLocaleLowerCase()
          , {close: a, error: h, leave: c, join: l} = I;
        if (r && [a, h, c, l].indexOf(o) >= 0 && r !== this._joinRef())
            return;
        let p = this._onMessage(o, t, r);
        if (t && !p)
            throw "channel onMessage callbacks must return the payload, modified or unmodified";
        ["insert", "update", "delete"].includes(o) ? (s = this.bindings.postgres_changes) === null || s === void 0 || s.filter(m=>{
            var v, _, y;
            return ((v = m.filter) === null || v === void 0 ? void 0 : v.event) === "*" || ((y = (_ = m.filter) === null || _ === void 0 ? void 0 : _.event) === null || y === void 0 ? void 0 : y.toLocaleLowerCase()) === o
        }
        ).map(m=>m.callback(p, r)) : (n = this.bindings[o]) === null || n === void 0 || n.filter(m=>{
            var v, _, y, S, j, C;
            if (["broadcast", "presence", "postgres_changes"].includes(o))
                if ("id"in m) {
                    const $ = m.id
                      , F = (v = m.filter) === null || v === void 0 ? void 0 : v.event;
                    return $ && ((_ = t.ids) === null || _ === void 0 ? void 0 : _.includes($)) && (F === "*" || (F == null ? void 0 : F.toLocaleLowerCase()) === ((y = t.data) === null || y === void 0 ? void 0 : y.type.toLocaleLowerCase()))
                } else {
                    const $ = (j = (S = m == null ? void 0 : m.filter) === null || S === void 0 ? void 0 : S.event) === null || j === void 0 ? void 0 : j.toLocaleLowerCase();
                    return $ === "*" || $ === ((C = t == null ? void 0 : t.event) === null || C === void 0 ? void 0 : C.toLocaleLowerCase())
                }
            else
                return m.type.toLocaleLowerCase() === o
        }
        ).map(m=>{
            if (typeof p == "object" && "ids"in p) {
                const v = p.data
                  , {schema: _, table: y, commit_timestamp: S, type: j, errors: C} = v;
                p = Object.assign(Object.assign({}, {
                    schema: _,
                    table: y,
                    commit_timestamp: S,
                    eventType: j,
                    new: {},
                    old: {},
                    errors: C
                }), this._getPayloadRecords(v))
            }
            m.callback(p, r)
        }
        )
    }
    _isClosed() {
        return this.state === P.closed
    }
    _isJoined() {
        return this.state === P.joined
    }
    _isJoining() {
        return this.state === P.joining
    }
    _isLeaving() {
        return this.state === P.leaving
    }
    _replyEventName(e) {
        return `chan_reply_${e}`
    }
    _on(e, t, r) {
        const s = e.toLocaleLowerCase()
          , n = {
            type: s,
            filter: t,
            callback: r
        };
        return this.bindings[s] ? this.bindings[s].push(n) : this.bindings[s] = [n],
        this
    }
    _off(e, t) {
        const r = e.toLocaleLowerCase();
        return this.bindings[r] = this.bindings[r].filter(s=>{
            var n;
            return !(((n = s.type) === null || n === void 0 ? void 0 : n.toLocaleLowerCase()) === r && $e.isEqual(s.filter, t))
        }
        ),
        this
    }
    static isEqual(e, t) {
        if (Object.keys(e).length !== Object.keys(t).length)
            return !1;
        for (const r in e)
            if (e[r] !== t[r])
                return !1;
        return !0
    }
    _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout(),
        this.socket.isConnected() && this._rejoin()
    }
    _onClose(e) {
        this._on(I.close, {}, e)
    }
    _onError(e) {
        this._on(I.error, {}, t=>e(t))
    }
    _canPush() {
        return this.socket.isConnected() && this._isJoined()
    }
    _rejoin(e=this.timeout) {
        this._isLeaving() || (this.socket._leaveOpenTopic(this.topic),
        this.state = P.joining,
        this.joinPush.resend(e))
    }
    _getPayloadRecords(e) {
        const t = {
            new: {},
            old: {}
        };
        return (e.type === "INSERT" || e.type === "UPDATE") && (t.new = De(e.columns, e.record)),
        (e.type === "UPDATE" || e.type === "DELETE") && (t.old = De(e.columns, e.old_record)),
        t
    }
}
var or = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
const ar = ()=>{}
;
class cr {
    constructor(e, t) {
        var r;
        this.accessToken = null,
        this.channels = [],
        this.endPoint = "",
        this.headers = Xt,
        this.params = {},
        this.timeout = ze,
        this.transport = Vt.w3cwebsocket,
        this.heartbeatIntervalMs = 3e4,
        this.heartbeatTimer = void 0,
        this.pendingHeartbeatRef = null,
        this.ref = 0,
        this.logger = ar,
        this.conn = null,
        this.sendBuffer = [],
        this.serializer = new Zt,
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
        },
        this.eventsPerSecondLimitMs = 100,
        this.inThrottle = !1,
        this.endPoint = `${e}/${Oe.websocket}`,
        t != null && t.params && (this.params = t.params),
        t != null && t.headers && (this.headers = Object.assign(Object.assign({}, this.headers), t.headers)),
        t != null && t.timeout && (this.timeout = t.timeout),
        t != null && t.logger && (this.logger = t.logger),
        t != null && t.transport && (this.transport = t.transport),
        t != null && t.heartbeatIntervalMs && (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
        const s = (r = t == null ? void 0 : t.params) === null || r === void 0 ? void 0 : r.eventsPerSecond;
        s && (this.eventsPerSecondLimitMs = Math.floor(1e3 / s)),
        this.reconnectAfterMs = t != null && t.reconnectAfterMs ? t.reconnectAfterMs : n=>[1e3, 2e3, 5e3, 1e4][n - 1] || 1e4,
        this.encode = t != null && t.encode ? t.encode : (n,o)=>o(JSON.stringify(n)),
        this.decode = t != null && t.decode ? t.decode : this.serializer.decode.bind(this.serializer),
        this.reconnectTimer = new qe(()=>or(this, void 0, void 0, function*() {
            this.disconnect(),
            this.connect()
        }),this.reconnectAfterMs)
    }
    connect() {
        this.conn || (this.conn = new this.transport(this._endPointURL(),[],null,this.headers),
        this.conn && (this.conn.binaryType = "arraybuffer",
        this.conn.onopen = ()=>this._onConnOpen(),
        this.conn.onerror = e=>this._onConnError(e),
        this.conn.onmessage = e=>this._onConnMessage(e),
        this.conn.onclose = e=>this._onConnClose(e)))
    }
    disconnect(e, t) {
        this.conn && (this.conn.onclose = function() {}
        ,
        e ? this.conn.close(e, t ?? "") : this.conn.close(),
        this.conn = null,
        this.heartbeatTimer && clearInterval(this.heartbeatTimer),
        this.reconnectTimer.reset())
    }
    getChannels() {
        return this.channels
    }
    removeChannel(e) {
        return e.unsubscribe().then(t=>(this.channels.length === 0 && this.disconnect(),
        t))
    }
    removeAllChannels() {
        return Promise.all(this.channels.map(e=>e.unsubscribe())).then(e=>(this.disconnect(),
        e))
    }
    log(e, t, r) {
        this.logger(e, t, r)
    }
    connectionState() {
        switch (this.conn && this.conn.readyState) {
        case te.connecting:
            return G.Connecting;
        case te.open:
            return G.Open;
        case te.closing:
            return G.Closing;
        default:
            return G.Closed
        }
    }
    isConnected() {
        return this.connectionState() === G.Open
    }
    channel(e, t={
        config: {}
    }) {
        this.isConnected() || this.connect();
        const r = new $e(`realtime:${e}`,t,this);
        return this.channels.push(r),
        r
    }
    push(e) {
        const {topic: t, event: r, payload: s, ref: n} = e;
        let o = ()=>{
            this.encode(e, a=>{
                var h;
                (h = this.conn) === null || h === void 0 || h.send(a)
            }
            )
        }
        ;
        if (this.log("push", `${t} ${r} (${n})`, s),
        this.isConnected())
            if (["broadcast", "presence", "postgres_changes"].includes(r)) {
                if (this._throttle(o)())
                    return "rate limited"
            } else
                o();
        else
            this.sendBuffer.push(o)
    }
    setAuth(e) {
        this.accessToken = e,
        this.channels.forEach(t=>{
            e && t.updateJoinPayload({
                access_token: e
            }),
            t.joinedOnce && t._isJoined() && t._push(I.access_token, {
                access_token: e
            })
        }
        )
    }
    _makeRef() {
        let e = this.ref + 1;
        return e === this.ref ? this.ref = 0 : this.ref = e,
        this.ref.toString()
    }
    _leaveOpenTopic(e) {
        let t = this.channels.find(r=>r.topic === e && (r._isJoined() || r._isJoining()));
        t && (this.log("transport", `leaving duplicate topic "${e}"`),
        t.unsubscribe())
    }
    _remove(e) {
        this.channels = this.channels.filter(t=>t._joinRef() !== e._joinRef())
    }
    _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, {
            vsn: Qt
        }))
    }
    _onConnMessage(e) {
        this.decode(e.data, t=>{
            let {topic: r, event: s, payload: n, ref: o} = t;
            (o && o === this.pendingHeartbeatRef || s === (n == null ? void 0 : n.type)) && (this.pendingHeartbeatRef = null),
            this.log("receive", `${n.status || ""} ${r} ${s} ${o && "(" + o + ")" || ""}`, n),
            this.channels.filter(a=>a._isMember(r)).forEach(a=>a._trigger(s, n, o)),
            this.stateChangeCallbacks.message.forEach(a=>a(t))
        }
        )
    }
    _onConnOpen() {
        this.log("transport", `connected to ${this._endPointURL()}`),
        this._flushSendBuffer(),
        this.reconnectTimer.reset(),
        this.heartbeatTimer && clearInterval(this.heartbeatTimer),
        this.heartbeatTimer = setInterval(()=>this._sendHeartbeat(), this.heartbeatIntervalMs),
        this.stateChangeCallbacks.open.forEach(e=>e())
    }
    _onConnClose(e) {
        this.log("transport", "close", e),
        this._triggerChanError(),
        this.heartbeatTimer && clearInterval(this.heartbeatTimer),
        this.reconnectTimer.scheduleTimeout(),
        this.stateChangeCallbacks.close.forEach(t=>t(e))
    }
    _onConnError(e) {
        this.log("transport", e.message),
        this._triggerChanError(),
        this.stateChangeCallbacks.error.forEach(t=>t(e))
    }
    _triggerChanError() {
        this.channels.forEach(e=>e._trigger(I.error))
    }
    _appendParams(e, t) {
        if (Object.keys(t).length === 0)
            return e;
        const r = e.match(/\?/) ? "&" : "?"
          , s = new URLSearchParams(t);
        return `${e}${r}${s}`
    }
    _flushSendBuffer() {
        this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach(e=>e()),
        this.sendBuffer = [])
    }
    _sendHeartbeat() {
        var e;
        if (this.isConnected()) {
            if (this.pendingHeartbeatRef) {
                this.pendingHeartbeatRef = null,
                this.log("transport", "heartbeat timeout. Attempting to re-establish connection"),
                (e = this.conn) === null || e === void 0 || e.close(Yt, "hearbeat timeout");
                return
            }
            this.pendingHeartbeatRef = this._makeRef(),
            this.push({
                topic: "phoenix",
                event: "heartbeat",
                payload: {},
                ref: this.pendingHeartbeatRef
            }),
            this.setAuth(this.accessToken)
        }
    }
    _throttle(e, t=this.eventsPerSecondLimitMs) {
        return ()=>this.inThrottle ? !0 : (e(),
        t > 0 && (this.inThrottle = !0,
        setTimeout(()=>{
            this.inThrottle = !1
        }
        , t)),
        !1)
    }
}
class Ke extends Error {
    constructor(e) {
        super(e),
        this.__isStorageError = !0,
        this.name = "StorageError"
    }
}
function A(i) {
    return typeof i == "object" && i !== null && "__isStorageError"in i
}
class lr extends Ke {
    constructor(e, t) {
        super(e),
        this.name = "StorageApiError",
        this.status = t
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        }
    }
}
class Fe extends Ke {
    constructor(e, t) {
        super(e),
        this.name = "StorageUnknownError",
        this.originalError = t
    }
}
var Ve = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
const We = i=>{
    let e;
    return i ? e = i : typeof fetch > "u" ? e = (...t)=>Ve(void 0, void 0, void 0, function*() {
        return yield(yield ae(()=>Promise.resolve().then(()=>ce), void 0, import.meta.url)).fetch(...t)
    }) : e = fetch,
    (...t)=>e(...t)
}
  , hr = ()=>Ve(void 0, void 0, void 0, function*() {
    return typeof Response > "u" ? (yield ae(()=>Promise.resolve().then(()=>ce), void 0, import.meta.url)).Response : Response
});
var Y = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
const _e = i=>i.msg || i.message || i.error_description || i.error || JSON.stringify(i)
  , ur = (i,e)=>Y(void 0, void 0, void 0, function*() {
    const t = yield hr();
    i instanceof t ? i.json().then(r=>{
        e(new lr(_e(r),i.status || 500))
    }
    ).catch(r=>{
        e(new Fe(_e(r),r))
    }
    ) : e(new Fe(_e(i),i))
})
  , dr = (i,e,t,r)=>{
    const s = {
        method: i,
        headers: (e == null ? void 0 : e.headers) || {}
    };
    return i === "GET" ? s : (s.headers = Object.assign({
        "Content-Type": "application/json"
    }, e == null ? void 0 : e.headers),
    s.body = JSON.stringify(r),
    Object.assign(Object.assign({}, s), t))
}
;
function le(i, e, t, r, s, n) {
    return Y(this, void 0, void 0, function*() {
        return new Promise((o,a)=>{
            i(t, dr(e, r, s, n)).then(h=>{
                if (!h.ok)
                    throw h;
                return r != null && r.noResolveJson ? h : h.json()
            }
            ).then(h=>o(h)).catch(h=>ur(h, a))
        }
        )
    })
}
function Te(i, e, t, r) {
    return Y(this, void 0, void 0, function*() {
        return le(i, "GET", e, t, r)
    })
}
function K(i, e, t, r, s) {
    return Y(this, void 0, void 0, function*() {
        return le(i, "POST", e, r, s, t)
    })
}
function fr(i, e, t, r, s) {
    return Y(this, void 0, void 0, function*() {
        return le(i, "PUT", e, r, s, t)
    })
}
function Xe(i, e, t, r, s) {
    return Y(this, void 0, void 0, function*() {
        return le(i, "DELETE", e, r, s, t)
    })
}
var U = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
const pr = {
    limit: 100,
    offset: 0,
    sortBy: {
        column: "name",
        order: "asc"
    }
}
  , vr = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: !1
};
class _r {
    constructor(e, t={}, r, s) {
        this.url = e,
        this.headers = t,
        this.bucketId = r,
        this.fetch = We(s)
    }
    uploadOrUpdate(e, t, r, s) {
        return U(this, void 0, void 0, function*() {
            try {
                let n;
                const o = Object.assign(Object.assign({}, vr), s)
                  , a = Object.assign(Object.assign({}, this.headers), e === "POST" && {
                    "x-upsert": String(o.upsert)
                });
                typeof Blob < "u" && r instanceof Blob ? (n = new FormData,
                n.append("cacheControl", o.cacheControl),
                n.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (n = r,
                n.append("cacheControl", o.cacheControl)) : (n = r,
                a["cache-control"] = `max-age=${o.cacheControl}`,
                a["content-type"] = o.contentType);
                const h = this._removeEmptyFolders(t)
                  , c = this._getFinalPath(h)
                  , l = yield this.fetch(`${this.url}/object/${c}`, {
                    method: e,
                    body: n,
                    headers: a
                });
                return l.ok ? {
                    data: {
                        path: h
                    },
                    error: null
                } : {
                    data: null,
                    error: yield l.json()
                }
            } catch (n) {
                if (A(n))
                    return {
                        data: null,
                        error: n
                    };
                throw n
            }
        })
    }
    upload(e, t, r) {
        return U(this, void 0, void 0, function*() {
            return this.uploadOrUpdate("POST", e, t, r)
        })
    }
    update(e, t, r) {
        return U(this, void 0, void 0, function*() {
            return this.uploadOrUpdate("PUT", e, t, r)
        })
    }
    move(e, t) {
        return U(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield K(this.fetch, `${this.url}/object/move`, {
                        bucketId: this.bucketId,
                        sourceKey: e,
                        destinationKey: t
                    }, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (r) {
                if (A(r))
                    return {
                        data: null,
                        error: r
                    };
                throw r
            }
        })
    }
    copy(e, t) {
        return U(this, void 0, void 0, function*() {
            try {
                return {
                    data: {
                        path: (yield K(this.fetch, `${this.url}/object/copy`, {
                            bucketId: this.bucketId,
                            sourceKey: e,
                            destinationKey: t
                        }, {
                            headers: this.headers
                        })).Key
                    },
                    error: null
                }
            } catch (r) {
                if (A(r))
                    return {
                        data: null,
                        error: r
                    };
                throw r
            }
        })
    }
    createSignedUrl(e, t, r) {
        return U(this, void 0, void 0, function*() {
            try {
                let s = this._getFinalPath(e)
                  , n = yield K(this.fetch, `${this.url}/object/sign/${s}`, Object.assign({
                    expiresIn: t
                }, r != null && r.transform ? {
                    transform: r.transform
                } : {}), {
                    headers: this.headers
                });
                const o = r != null && r.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
                return n = {
                    signedUrl: encodeURI(`${this.url}${n.signedURL}${o}`)
                },
                {
                    data: n,
                    error: null
                }
            } catch (s) {
                if (A(s))
                    return {
                        data: null,
                        error: s
                    };
                throw s
            }
        })
    }
    createSignedUrls(e, t, r) {
        return U(this, void 0, void 0, function*() {
            try {
                const s = yield K(this.fetch, `${this.url}/object/sign/${this.bucketId}`, {
                    expiresIn: t,
                    paths: e
                }, {
                    headers: this.headers
                })
                  , n = r != null && r.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
                return {
                    data: s.map(o=>Object.assign(Object.assign({}, o), {
                        signedUrl: o.signedURL ? encodeURI(`${this.url}${o.signedURL}${n}`) : null
                    })),
                    error: null
                }
            } catch (s) {
                if (A(s))
                    return {
                        data: null,
                        error: s
                    };
                throw s
            }
        })
    }
    download(e, t) {
        return U(this, void 0, void 0, function*() {
            const s = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object"
              , n = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {})
              , o = n ? `?${n}` : "";
            try {
                const a = this._getFinalPath(e);
                return {
                    data: yield(yield Te(this.fetch, `${this.url}/${s}/${a}${o}`, {
                        headers: this.headers,
                        noResolveJson: !0
                    })).blob(),
                    error: null
                }
            } catch (a) {
                if (A(a))
                    return {
                        data: null,
                        error: a
                    };
                throw a
            }
        })
    }
    getPublicUrl(e, t) {
        const r = this._getFinalPath(e)
          , s = []
          , n = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
        n !== "" && s.push(n);
        const a = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object"
          , h = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
        h !== "" && s.push(h);
        let c = s.join("&");
        return c !== "" && (c = `?${c}`),
        {
            data: {
                publicUrl: encodeURI(`${this.url}/${a}/public/${r}${c}`)
            }
        }
    }
    remove(e) {
        return U(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield Xe(this.fetch, `${this.url}/object/${this.bucketId}`, {
                        prefixes: e
                    }, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (t) {
                if (A(t))
                    return {
                        data: null,
                        error: t
                    };
                throw t
            }
        })
    }
    list(e, t, r) {
        return U(this, void 0, void 0, function*() {
            try {
                const s = Object.assign(Object.assign(Object.assign({}, pr), t), {
                    prefix: e || ""
                });
                return {
                    data: yield K(this.fetch, `${this.url}/object/list/${this.bucketId}`, s, {
                        headers: this.headers
                    }, r),
                    error: null
                }
            } catch (s) {
                if (A(s))
                    return {
                        data: null,
                        error: s
                    };
                throw s
            }
        })
    }
    _getFinalPath(e) {
        return `${this.bucketId}/${e}`
    }
    _removeEmptyFolders(e) {
        return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/")
    }
    transformOptsToQueryString(e) {
        const t = [];
        return e.width && t.push(`width=${e.width}`),
        e.height && t.push(`height=${e.height}`),
        e.resize && t.push(`resize=${e.resize}`),
        e.format && t.push(`format=${e.format}`),
        e.quality && t.push(`quality=${e.quality}`),
        t.join("&")
    }
}
const yr = "2.3.1"
  , mr = {
    "X-Client-Info": `storage-js/${yr}`
};
var W = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
class gr {
    constructor(e, t={}, r) {
        this.url = e,
        this.headers = Object.assign(Object.assign({}, mr), t),
        this.fetch = We(r)
    }
    listBuckets() {
        return W(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield Te(this.fetch, `${this.url}/bucket`, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (e) {
                if (A(e))
                    return {
                        data: null,
                        error: e
                    };
                throw e
            }
        })
    }
    getBucket(e) {
        return W(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield Te(this.fetch, `${this.url}/bucket/${e}`, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (t) {
                if (A(t))
                    return {
                        data: null,
                        error: t
                    };
                throw t
            }
        })
    }
    createBucket(e, t={
        public: !1
    }) {
        return W(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield K(this.fetch, `${this.url}/bucket`, {
                        id: e,
                        name: e,
                        public: t.public
                    }, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (r) {
                if (A(r))
                    return {
                        data: null,
                        error: r
                    };
                throw r
            }
        })
    }
    updateBucket(e, t) {
        return W(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield fr(this.fetch, `${this.url}/bucket/${e}`, {
                        id: e,
                        name: e,
                        public: t.public
                    }, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (r) {
                if (A(r))
                    return {
                        data: null,
                        error: r
                    };
                throw r
            }
        })
    }
    emptyBucket(e) {
        return W(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield K(this.fetch, `${this.url}/bucket/${e}/empty`, {}, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (t) {
                if (A(t))
                    return {
                        data: null,
                        error: t
                    };
                throw t
            }
        })
    }
    deleteBucket(e) {
        return W(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield Xe(this.fetch, `${this.url}/bucket/${e}`, {}, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (t) {
                if (A(t))
                    return {
                        data: null,
                        error: t
                    };
                throw t
            }
        })
    }
}
class br extends gr {
    constructor(e, t={}, r) {
        super(e, t, r)
    }
    from(e) {
        return new _r(this.url,this.headers,e,this.fetch)
    }
}
const wr = "2.10.0"
  , Or = {
    "X-Client-Info": `supabase-js/${wr}`
};
var Er = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
const Tr = i=>{
    let e;
    return i ? e = i : typeof fetch > "u" ? e = je : e = fetch,
    (...t)=>e(...t)
}
  , Sr = ()=>typeof Headers > "u" ? Q.Headers : Headers
  , kr = (i,e,t)=>{
    const r = Tr(t)
      , s = Sr();
    return (n,o)=>Er(void 0, void 0, void 0, function*() {
        var a;
        const h = (a = yield e()) !== null && a !== void 0 ? a : i;
        let c = new s(o == null ? void 0 : o.headers);
        return c.has("apikey") || c.set("apikey", i),
        c.has("Authorization") || c.set("Authorization", `Bearer ${h}`),
        r(n, Object.assign(Object.assign({}, o), {
            headers: c
        }))
    })
}
;
function jr(i) {
    return i.replace(/\/$/, "")
}
function $r(i, e) {
    const {db: t, auth: r, realtime: s, global: n} = i
      , {db: o, auth: a, realtime: h, global: c} = e;
    return {
        db: Object.assign(Object.assign({}, o), t),
        auth: Object.assign(Object.assign({}, a), r),
        realtime: Object.assign(Object.assign({}, h), s),
        global: Object.assign(Object.assign({}, c), n)
    }
}
var se = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
function Rr(i) {
    return Math.round(Date.now() / 1e3) + i
}
function Ar() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(i) {
        const e = Math.random() * 16 | 0;
        return (i == "x" ? e : e & 3 | 8).toString(16)
    })
}
const z = ()=>typeof document < "u"
  , J = {
    tested: !1,
    writable: !1
}
  , ye = ()=>{
    if (!z())
        return !1;
    try {
        if (typeof globalThis.localStorage != "object")
            return !1
    } catch {
        return !1
    }
    if (J.tested)
        return J.writable;
    const i = `lswt-${Math.random()}${Math.random()}`;
    try {
        globalThis.localStorage.setItem(i, i),
        globalThis.localStorage.removeItem(i),
        J.tested = !0,
        J.writable = !0
    } catch {
        J.tested = !0,
        J.writable = !1
    }
    return J.writable
}
;
function x(i, e) {
    var t;
    e || (e = ((t = window == null ? void 0 : window.location) === null || t === void 0 ? void 0 : t.href) || ""),
    i = i.replace(/[\[\]]/g, "\\$&");
    const r = new RegExp("[?&#]" + i + "(=([^&#]*)|&|#|$)")
      , s = r.exec(e);
    return s ? s[2] ? decodeURIComponent(s[2].replace(/\+/g, " ")) : "" : null
}
const Qe = i=>{
    let e;
    return i ? e = i : typeof fetch > "u" ? e = (...t)=>se(void 0, void 0, void 0, function*() {
        return yield(yield ae(()=>Promise.resolve().then(()=>ce), void 0, import.meta.url)).fetch(...t)
    }) : e = fetch,
    (...t)=>e(...t)
}
  , Pr = i=>typeof i == "object" && i !== null && "status"in i && "ok"in i && "json"in i && typeof i.json == "function"
  , xr = (i,e,t)=>se(void 0, void 0, void 0, function*() {
    yield i.setItem(e, JSON.stringify(t))
})
  , Me = (i,e)=>se(void 0, void 0, void 0, function*() {
    const t = yield i.getItem(e);
    if (!t)
        return null;
    try {
        return JSON.parse(t)
    } catch {
        return t
    }
})
  , Cr = (i,e)=>se(void 0, void 0, void 0, function*() {
    yield i.removeItem(e)
});
function Ir(i) {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let t = "", r, s, n, o, a, h, c, l = 0;
    for (i = i.replace("-", "+").replace("_", "/"); l < i.length; )
        o = e.indexOf(i.charAt(l++)),
        a = e.indexOf(i.charAt(l++)),
        h = e.indexOf(i.charAt(l++)),
        c = e.indexOf(i.charAt(l++)),
        r = o << 2 | a >> 4,
        s = (a & 15) << 4 | h >> 2,
        n = (h & 3) << 6 | c,
        t = t + String.fromCharCode(r),
        h != 64 && s != 0 && (t = t + String.fromCharCode(s)),
        c != 64 && n != 0 && (t = t + String.fromCharCode(n));
    return t
}
class he {
    constructor() {
        this.promise = new he.promiseConstructor((e,t)=>{
            this.resolve = e,
            this.reject = t
        }
        )
    }
}
he.promiseConstructor = Promise;
function Je(i) {
    const e = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i
      , t = i.split(".");
    if (t.length !== 3)
        throw new Error("JWT is not valid: not a JWT structure");
    if (!e.test(t[1]))
        throw new Error("JWT is not valid: payload is not in base64url format");
    const r = t[1];
    return JSON.parse(Ir(r))
}
function Dr(i) {
    return new Promise(e=>{
        setTimeout(()=>e(null), i)
    }
    )
}
function Ur(i, e) {
    return new Promise((r,s)=>{
        se(this, void 0, void 0, function*() {
            for (let n = 0; n < 1 / 0; n++)
                try {
                    const o = yield i(n);
                    if (!e(n, null, o)) {
                        r(o);
                        return
                    }
                } catch (o) {
                    if (!e(n, o)) {
                        s(o);
                        return
                    }
                }
        })
    }
    )
}
class Re extends Error {
    constructor(e, t) {
        super(e),
        this.__isAuthError = !0,
        this.name = "AuthError",
        this.status = t
    }
}
function w(i) {
    return typeof i == "object" && i !== null && "__isAuthError"in i
}
class Lr extends Re {
    constructor(e, t) {
        super(e, t),
        this.name = "AuthApiError",
        this.status = t
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        }
    }
}
function Br(i) {
    return w(i) && i.name === "AuthApiError"
}
class Ye extends Re {
    constructor(e, t) {
        super(e),
        this.name = "AuthUnknownError",
        this.originalError = t
    }
}
class ue extends Re {
    constructor(e, t, r) {
        super(e),
        this.name = t,
        this.status = r
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        }
    }
}
class ee extends ue {
    constructor() {
        super("Auth session missing!", "AuthSessionMissingError", 400)
    }
}
class me extends ue {
    constructor(e) {
        super(e, "AuthInvalidCredentialsError", 400)
    }
}
class B extends ue {
    constructor(e, t=null) {
        super(e, "AuthImplicitGrantRedirectError", 500),
        this.details = null,
        this.details = t
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details
        }
    }
}
class Se extends ue {
    constructor(e, t) {
        super(e, "AuthRetryableFetchError", t)
    }
}
var Ae = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
  , Nr = globalThis && globalThis.__rest || function(i, e) {
    var t = {};
    for (var r in i)
        Object.prototype.hasOwnProperty.call(i, r) && e.indexOf(r) < 0 && (t[r] = i[r]);
    if (i != null && typeof Object.getOwnPropertySymbols == "function")
        for (var s = 0, r = Object.getOwnPropertySymbols(i); s < r.length; s++)
            e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(i, r[s]) && (t[r[s]] = i[r[s]]);
    return t
}
;
const oe = i=>i.msg || i.message || i.error_description || i.error || JSON.stringify(i)
  , Fr = (i,e)=>Ae(void 0, void 0, void 0, function*() {
    const t = [502, 503, 504];
    Pr(i) ? t.includes(i.status) ? e(new Se(oe(i),i.status)) : i.json().then(r=>{
        e(new Lr(oe(r),i.status || 500))
    }
    ).catch(r=>{
        e(new Ye(oe(r),r))
    }
    ) : e(new Se(oe(i),0))
})
  , Mr = (i,e,t,r)=>{
    const s = {
        method: i,
        headers: (e == null ? void 0 : e.headers) || {}
    };
    return i === "GET" ? s : (s.headers = Object.assign({
        "Content-Type": "application/json;charset=UTF-8"
    }, e == null ? void 0 : e.headers),
    s.body = JSON.stringify(r),
    Object.assign(Object.assign({}, s), t))
}
;
function E(i, e, t, r) {
    var s;
    return Ae(this, void 0, void 0, function*() {
        const n = Object.assign({}, r == null ? void 0 : r.headers);
        r != null && r.jwt && (n.Authorization = `Bearer ${r.jwt}`);
        const o = (s = r == null ? void 0 : r.query) !== null && s !== void 0 ? s : {};
        r != null && r.redirectTo && (o.redirect_to = r.redirectTo);
        const a = Object.keys(o).length ? "?" + new URLSearchParams(o).toString() : ""
          , h = yield Jr(i, e, t + a, {
            headers: n,
            noResolveJson: r == null ? void 0 : r.noResolveJson
        }, {}, r == null ? void 0 : r.body);
        return r != null && r.xform ? r == null ? void 0 : r.xform(h) : {
            data: Object.assign({}, h),
            error: null
        }
    })
}
function Jr(i, e, t, r, s, n) {
    return Ae(this, void 0, void 0, function*() {
        return new Promise((o,a)=>{
            i(t, Mr(e, r, s, n)).then(h=>{
                if (!h.ok)
                    throw h;
                return r != null && r.noResolveJson ? h : h.json()
            }
            ).then(h=>o(h)).catch(h=>Fr(h, a))
        }
        )
    })
}
function H(i) {
    var e;
    let t = null;
    Gr(i) && (t = Object.assign({}, i),
    t.expires_at = Rr(i.expires_in));
    const r = (e = i.user) !== null && e !== void 0 ? e : i;
    return {
        data: {
            session: t,
            user: r
        },
        error: null
    }
}
function V(i) {
    var e;
    return {
        data: {
            user: (e = i.user) !== null && e !== void 0 ? e : i
        },
        error: null
    }
}
function Hr(i) {
    return {
        data: i,
        error: null
    }
}
function zr(i) {
    const {action_link: e, email_otp: t, hashed_token: r, redirect_to: s, verification_type: n} = i
      , o = Nr(i, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"])
      , a = {
        action_link: e,
        email_otp: t,
        hashed_token: r,
        redirect_to: s,
        verification_type: n
    }
      , h = Object.assign({}, o);
    return {
        data: {
            properties: a,
            user: h
        },
        error: null
    }
}
function qr(i) {
    return i
}
function Gr(i) {
    return i.access_token && i.refresh_token && i.expires_in
}
var L = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
  , Kr = globalThis && globalThis.__rest || function(i, e) {
    var t = {};
    for (var r in i)
        Object.prototype.hasOwnProperty.call(i, r) && e.indexOf(r) < 0 && (t[r] = i[r]);
    if (i != null && typeof Object.getOwnPropertySymbols == "function")
        for (var s = 0, r = Object.getOwnPropertySymbols(i); s < r.length; s++)
            e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(i, r[s]) && (t[r[s]] = i[r[s]]);
    return t
}
;
class Vr {
    constructor({url: e="", headers: t={}, fetch: r}) {
        this.url = e,
        this.headers = t,
        this.fetch = Qe(r),
        this.mfa = {
            listFactors: this._listFactors.bind(this),
            deleteFactor: this._deleteFactor.bind(this)
        }
    }
    signOut(e) {
        return L(this, void 0, void 0, function*() {
            try {
                return yield E(this.fetch, "POST", `${this.url}/logout`, {
                    headers: this.headers,
                    jwt: e,
                    noResolveJson: !0
                }),
                {
                    data: null,
                    error: null
                }
            } catch (t) {
                if (w(t))
                    return {
                        data: null,
                        error: t
                    };
                throw t
            }
        })
    }
    inviteUserByEmail(e, t={}) {
        return L(this, void 0, void 0, function*() {
            try {
                return yield E(this.fetch, "POST", `${this.url}/invite`, {
                    body: {
                        email: e,
                        data: t.data
                    },
                    headers: this.headers,
                    redirectTo: t.redirectTo,
                    xform: V
                })
            } catch (r) {
                if (w(r))
                    return {
                        data: {
                            user: null
                        },
                        error: r
                    };
                throw r
            }
        })
    }
    generateLink(e) {
        return L(this, void 0, void 0, function*() {
            try {
                const {options: t} = e
                  , r = Kr(e, ["options"])
                  , s = Object.assign(Object.assign({}, r), t);
                return "newEmail"in r && (s.new_email = r == null ? void 0 : r.newEmail,
                delete s.newEmail),
                yield E(this.fetch, "POST", `${this.url}/admin/generate_link`, {
                    body: s,
                    headers: this.headers,
                    xform: zr,
                    redirectTo: t == null ? void 0 : t.redirectTo
                })
            } catch (t) {
                if (w(t))
                    return {
                        data: {
                            properties: null,
                            user: null
                        },
                        error: t
                    };
                throw t
            }
        })
    }
    createUser(e) {
        return L(this, void 0, void 0, function*() {
            try {
                return yield E(this.fetch, "POST", `${this.url}/admin/users`, {
                    body: e,
                    headers: this.headers,
                    xform: V
                })
            } catch (t) {
                if (w(t))
                    return {
                        data: {
                            user: null
                        },
                        error: t
                    };
                throw t
            }
        })
    }
    listUsers(e) {
        var t, r, s, n, o, a, h;
        return L(this, void 0, void 0, function*() {
            try {
                const c = {
                    nextPage: null,
                    lastPage: 0,
                    total: 0
                }
                  , l = yield E(this.fetch, "GET", `${this.url}/admin/users`, {
                    headers: this.headers,
                    noResolveJson: !0,
                    query: {
                        page: (r = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && r !== void 0 ? r : "",
                        per_page: (n = (s = e == null ? void 0 : e.perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && n !== void 0 ? n : ""
                    },
                    xform: qr
                });
                if (l.error)
                    throw l.error;
                const u = yield l.json()
                  , p = (o = l.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0
                  , m = (h = (a = l.headers.get("link")) === null || a === void 0 ? void 0 : a.split(",")) !== null && h !== void 0 ? h : [];
                return m.length > 0 && (m.forEach(v=>{
                    const _ = parseInt(v.split(";")[0].split("=")[1].substring(0, 1))
                      , y = JSON.parse(v.split(";")[1].split("=")[1]);
                    c[`${y}Page`] = _
                }
                ),
                c.total = parseInt(p)),
                {
                    data: Object.assign(Object.assign({}, u), c),
                    error: null
                }
            } catch (c) {
                if (w(c))
                    return {
                        data: {
                            users: []
                        },
                        error: c
                    };
                throw c
            }
        })
    }
    getUserById(e) {
        return L(this, void 0, void 0, function*() {
            try {
                return yield E(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
                    headers: this.headers,
                    xform: V
                })
            } catch (t) {
                if (w(t))
                    return {
                        data: {
                            user: null
                        },
                        error: t
                    };
                throw t
            }
        })
    }
    updateUserById(e, t) {
        return L(this, void 0, void 0, function*() {
            try {
                return yield E(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
                    body: t,
                    headers: this.headers,
                    xform: V
                })
            } catch (r) {
                if (w(r))
                    return {
                        data: {
                            user: null
                        },
                        error: r
                    };
                throw r
            }
        })
    }
    deleteUser(e, t=!1) {
        return L(this, void 0, void 0, function*() {
            try {
                return yield E(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
                    headers: this.headers,
                    body: {
                        should_soft_delete: t
                    },
                    xform: V
                })
            } catch (r) {
                if (w(r))
                    return {
                        data: {
                            user: null
                        },
                        error: r
                    };
                throw r
            }
        })
    }
    _listFactors(e) {
        return L(this, void 0, void 0, function*() {
            try {
                const {data: t, error: r} = yield E(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
                    headers: this.headers,
                    xform: s=>({
                        data: {
                            factors: s
                        },
                        error: null
                    })
                });
                return {
                    data: t,
                    error: r
                }
            } catch (t) {
                if (w(t))
                    return {
                        data: null,
                        error: t
                    };
                throw t
            }
        })
    }
    _deleteFactor(e) {
        return L(this, void 0, void 0, function*() {
            try {
                return {
                    data: yield E(this.fetch, "DELETE", `${this.url}/admin/users/${e.userId}/factors/${e.id}`, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (t) {
                if (w(t))
                    return {
                        data: null,
                        error: t
                    };
                throw t
            }
        })
    }
}
const Wr = "2.13.0"
  , Xr = "http://localhost:9999"
  , Qr = "supabase.auth.token"
  , Yr = {
    "X-Client-Info": `gotrue-js/${Wr}`
}
  , Zr = 10
  , ei = {
    getItem: i=>ye() ? globalThis.localStorage.getItem(i) : null,
    setItem: (i,e)=>{
        ye() && globalThis.localStorage.setItem(i, e)
    }
    ,
    removeItem: i=>{
        ye() && globalThis.localStorage.removeItem(i)
    }
};
function ti() {
    if (typeof globalThis != "object")
        try {
            Object.defineProperty(Object.prototype, "__magic__", {
                get: function() {
                    return this
                },
                configurable: !0
            }),
            __magic__.globalThis = __magic__,
            delete Object.prototype.__magic__
        } catch {
            typeof self < "u" && (self.globalThis = self)
        }
}
var b = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
ti();
const ri = {
    url: Xr,
    storageKey: Qr,
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    headers: Yr
}
  , ge = 10 * 1e3
  , ii = 3;
class si {
    constructor(e) {
        this.stateChangeEmitters = new Map,
        this.autoRefreshTicker = null,
        this.visibilityChangedCallback = null,
        this.refreshingDeferred = null,
        this.initializePromise = null,
        this.detectSessionInUrl = !0,
        this.broadcastChannel = null;
        const t = Object.assign(Object.assign({}, ri), e);
        this.inMemorySession = null,
        this.storageKey = t.storageKey,
        this.autoRefreshToken = t.autoRefreshToken,
        this.persistSession = t.persistSession,
        this.storage = t.storage || ei,
        this.admin = new Vr({
            url: t.url,
            headers: t.headers,
            fetch: t.fetch
        }),
        this.url = t.url,
        this.headers = t.headers,
        this.fetch = Qe(t.fetch),
        this.detectSessionInUrl = t.detectSessionInUrl,
        this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
        },
        z() && globalThis.BroadcastChannel && this.persistSession && this.storageKey && (this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey),
        this.broadcastChannel.addEventListener("message", r=>{
            this._notifyAllSubscribers(r.data.event, r.data.session, !1)
        }
        )),
        this.initialize()
    }
    initialize() {
        return this.initializePromise || (this.initializePromise = this._initialize()),
        this.initializePromise
    }
    _initialize() {
        return b(this, void 0, void 0, function*() {
            if (this.initializePromise)
                return this.initializePromise;
            try {
                if (this.detectSessionInUrl && this._isImplicitGrantFlow()) {
                    const {data: e, error: t} = yield this._getSessionFromUrl();
                    if (t)
                        return yield this._removeSession(),
                        {
                            error: t
                        };
                    const {session: r, redirectType: s} = e;
                    return yield this._saveSession(r),
                    setTimeout(()=>{
                        this._notifyAllSubscribers("SIGNED_IN", r),
                        s === "recovery" && this._notifyAllSubscribers("PASSWORD_RECOVERY", r)
                    }
                    , 0),
                    {
                        error: null
                    }
                }
                return yield this._recoverAndRefresh(),
                {
                    error: null
                }
            } catch (e) {
                return w(e) ? {
                    error: e
                } : {
                    error: new Ye("Unexpected error during initialization",e)
                }
            } finally {
                yield this._handleVisibilityChange()
            }
        })
    }
    signUp(e) {
        var t, r;
        return b(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                let s;
                if ("email"in e) {
                    const {email: c, password: l, options: u} = e;
                    s = yield E(this.fetch, "POST", `${this.url}/signup`, {
                        headers: this.headers,
                        redirectTo: u == null ? void 0 : u.emailRedirectTo,
                        body: {
                            email: c,
                            password: l,
                            data: (t = u == null ? void 0 : u.data) !== null && t !== void 0 ? t : {},
                            gotrue_meta_security: {
                                captcha_token: u == null ? void 0 : u.captchaToken
                            }
                        },
                        xform: H
                    })
                } else if ("phone"in e) {
                    const {phone: c, password: l, options: u} = e;
                    s = yield E(this.fetch, "POST", `${this.url}/signup`, {
                        headers: this.headers,
                        body: {
                            phone: c,
                            password: l,
                            data: (r = u == null ? void 0 : u.data) !== null && r !== void 0 ? r : {},
                            gotrue_meta_security: {
                                captcha_token: u == null ? void 0 : u.captchaToken
                            }
                        },
                        xform: H
                    })
                } else
                    throw new me("You must provide either an email or phone number and a password");
                const {data: n, error: o} = s;
                if (o || !n)
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: o
                    };
                const a = n.session
                  , h = n.user;
                return n.session && (yield this._saveSession(n.session),
                this._notifyAllSubscribers("SIGNED_IN", a)),
                {
                    data: {
                        user: h,
                        session: a
                    },
                    error: null
                }
            } catch (s) {
                if (w(s))
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: s
                    };
                throw s
            }
        })
    }
    signInWithPassword(e) {
        var t;
        return b(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                let r;
                if ("email"in e) {
                    const {email: o, password: a, options: h} = e;
                    r = yield E(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            email: o,
                            password: a,
                            gotrue_meta_security: {
                                captcha_token: h == null ? void 0 : h.captchaToken
                            }
                        },
                        xform: H
                    })
                } else if ("phone"in e) {
                    const {phone: o, password: a, options: h} = e;
                    r = yield E(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            phone: o,
                            password: a,
                            gotrue_meta_security: {
                                captcha_token: h == null ? void 0 : h.captchaToken
                            },
                            channel: (t = h == null ? void 0 : h.channel) !== null && t !== void 0 ? t : "sms"
                        },
                        xform: H
                    })
                } else
                    throw new me("You must provide either an email or phone number and a password");
                const {data: s, error: n} = r;
                return n || !s ? {
                    data: {
                        user: null,
                        session: null
                    },
                    error: n
                } : (s.session && (yield this._saveSession(s.session),
                this._notifyAllSubscribers("SIGNED_IN", s.session)),
                {
                    data: s,
                    error: n
                })
            } catch (r) {
                if (w(r))
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: r
                    };
                throw r
            }
        })
    }
    signInWithOAuth(e) {
        var t, r, s, n;
        return b(this, void 0, void 0, function*() {
            return yield this._removeSession(),
            this._handleProviderSignIn(e.provider, {
                redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
                scopes: (r = e.options) === null || r === void 0 ? void 0 : r.scopes,
                queryParams: (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
                skipBrowserRedirect: (n = e.options) === null || n === void 0 ? void 0 : n.skipBrowserRedirect
            })
        })
    }
    signInWithIdToken(e) {
        return b(this, void 0, void 0, function*() {
            yield this._removeSession();
            try {
                const {options: t, provider: r, token: s, nonce: n} = e
                  , o = yield E(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
                    headers: this.headers,
                    body: {
                        provider: r,
                        id_token: s,
                        nonce: n,
                        gotrue_meta_security: {
                            captcha_token: t == null ? void 0 : t.captchaToken
                        }
                    },
                    xform: H
                })
                  , {data: a, error: h} = o;
                return h || !a ? {
                    data: {
                        user: null,
                        session: null
                    },
                    error: h
                } : (a.session && (yield this._saveSession(a.session),
                this._notifyAllSubscribers("SIGNED_IN", a.session)),
                {
                    data: a,
                    error: h
                })
            } catch (t) {
                if (w(t))
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: t
                    };
                throw t
            }
        })
    }
    signInWithOtp(e) {
        var t, r, s, n, o;
        return b(this, void 0, void 0, function*() {
            try {
                if (yield this._removeSession(),
                "email"in e) {
                    const {email: a, options: h} = e
                      , {error: c} = yield E(this.fetch, "POST", `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            email: a,
                            data: (t = h == null ? void 0 : h.data) !== null && t !== void 0 ? t : {},
                            create_user: (r = h == null ? void 0 : h.shouldCreateUser) !== null && r !== void 0 ? r : !0,
                            gotrue_meta_security: {
                                captcha_token: h == null ? void 0 : h.captchaToken
                            }
                        },
                        redirectTo: h == null ? void 0 : h.emailRedirectTo
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: c
                    }
                }
                if ("phone"in e) {
                    const {phone: a, options: h} = e
                      , {error: c} = yield E(this.fetch, "POST", `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            phone: a,
                            data: (s = h == null ? void 0 : h.data) !== null && s !== void 0 ? s : {},
                            create_user: (n = h == null ? void 0 : h.shouldCreateUser) !== null && n !== void 0 ? n : !0,
                            gotrue_meta_security: {
                                captcha_token: h == null ? void 0 : h.captchaToken
                            },
                            channel: (o = h == null ? void 0 : h.channel) !== null && o !== void 0 ? o : "sms"
                        }
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: c
                    }
                }
                throw new me("You must provide either an email or phone number.")
            } catch (a) {
                if (w(a))
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: a
                    };
                throw a
            }
        })
    }
    verifyOtp(e) {
        var t, r;
        return b(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                const {data: s, error: n} = yield E(this.fetch, "POST", `${this.url}/verify`, {
                    headers: this.headers,
                    body: Object.assign(Object.assign({}, e), {
                        gotrue_meta_security: {
                            captcha_token: (t = e.options) === null || t === void 0 ? void 0 : t.captchaToken
                        }
                    }),
                    redirectTo: (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo,
                    xform: H
                });
                if (n)
                    throw n;
                if (!s)
                    throw "An error occurred on token verification.";
                const o = s.session
                  , a = s.user;
                return o != null && o.access_token && (yield this._saveSession(o),
                this._notifyAllSubscribers("SIGNED_IN", o)),
                {
                    data: {
                        user: a,
                        session: o
                    },
                    error: null
                }
            } catch (s) {
                if (w(s))
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: s
                    };
                throw s
            }
        })
    }
    signInWithSSO(e) {
        var t, r, s;
        return b(this, void 0, void 0, function*() {
            try {
                return yield this._removeSession(),
                yield E(this.fetch, "POST", `${this.url}/sso`, {
                    body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId"in e ? {
                        provider_id: e.providerId
                    } : null), "domain"in e ? {
                        domain: e.domain
                    } : null), {
                        redirect_to: (r = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !== null && r !== void 0 ? r : void 0
                    }), !((s = e == null ? void 0 : e.options) === null || s === void 0) && s.captchaToken ? {
                        gotrue_meta_security: {
                            captcha_token: e.options.captchaToken
                        }
                    } : null), {
                        skip_http_redirect: !0
                    }),
                    headers: this.headers,
                    xform: Hr
                })
            } catch (n) {
                if (w(n))
                    return {
                        data: null,
                        error: n
                    };
                throw n
            }
        })
    }
    getSession() {
        return b(this, void 0, void 0, function*() {
            yield this.initializePromise;
            let e = null;
            if (this.persistSession) {
                const n = yield Me(this.storage, this.storageKey);
                n !== null && (this._isValidSession(n) ? e = n : yield this._removeSession())
            } else
                e = this.inMemorySession;
            if (!e)
                return {
                    data: {
                        session: null
                    },
                    error: null
                };
            if (!(e.expires_at ? e.expires_at <= Date.now() / 1e3 : !1))
                return {
                    data: {
                        session: e
                    },
                    error: null
                };
            const {session: r, error: s} = yield this._callRefreshToken(e.refresh_token);
            return s ? {
                data: {
                    session: null
                },
                error: s
            } : {
                data: {
                    session: r
                },
                error: null
            }
        })
    }
    getUser(e) {
        var t, r;
        return b(this, void 0, void 0, function*() {
            try {
                if (!e) {
                    const {data: s, error: n} = yield this.getSession();
                    if (n)
                        throw n;
                    e = (r = (t = s.session) === null || t === void 0 ? void 0 : t.access_token) !== null && r !== void 0 ? r : void 0
                }
                return yield E(this.fetch, "GET", `${this.url}/user`, {
                    headers: this.headers,
                    jwt: e,
                    xform: V
                })
            } catch (s) {
                if (w(s))
                    return {
                        data: {
                            user: null
                        },
                        error: s
                    };
                throw s
            }
        })
    }
    updateUser(e, t={}) {
        return b(this, void 0, void 0, function*() {
            try {
                const {data: r, error: s} = yield this.getSession();
                if (s)
                    throw s;
                if (!r.session)
                    throw new ee;
                const n = r.session
                  , {data: o, error: a} = yield E(this.fetch, "PUT", `${this.url}/user`, {
                    headers: this.headers,
                    redirectTo: t == null ? void 0 : t.emailRedirectTo,
                    body: e,
                    jwt: n.access_token,
                    xform: V
                });
                if (a)
                    throw a;
                return n.user = o.user,
                yield this._saveSession(n),
                this._notifyAllSubscribers("USER_UPDATED", n),
                {
                    data: {
                        user: n.user
                    },
                    error: null
                }
            } catch (r) {
                if (w(r))
                    return {
                        data: {
                            user: null
                        },
                        error: r
                    };
                throw r
            }
        })
    }
    _decodeJWT(e) {
        return Je(e)
    }
    setSession(e) {
        return b(this, void 0, void 0, function*() {
            try {
                if (!e.access_token || !e.refresh_token)
                    throw new ee;
                const t = Date.now() / 1e3;
                let r = t
                  , s = !0
                  , n = null;
                const o = Je(e.access_token);
                if (o.exp && (r = o.exp,
                s = r <= t),
                s) {
                    const {session: a, error: h} = yield this._callRefreshToken(e.refresh_token);
                    if (h)
                        return {
                            data: {
                                user: null,
                                session: null
                            },
                            error: h
                        };
                    if (!a)
                        return {
                            data: {
                                user: null,
                                session: null
                            },
                            error: null
                        };
                    n = a
                } else {
                    const {data: a, error: h} = yield this.getUser(e.access_token);
                    if (h)
                        throw h;
                    n = {
                        access_token: e.access_token,
                        refresh_token: e.refresh_token,
                        user: a.user,
                        token_type: "bearer",
                        expires_in: r - t,
                        expires_at: r
                    },
                    yield this._saveSession(n),
                    this._notifyAllSubscribers("SIGNED_IN", n)
                }
                return {
                    data: {
                        user: n.user,
                        session: n
                    },
                    error: null
                }
            } catch (t) {
                if (w(t))
                    return {
                        data: {
                            session: null,
                            user: null
                        },
                        error: t
                    };
                throw t
            }
        })
    }
    refreshSession(e) {
        var t;
        return b(this, void 0, void 0, function*() {
            try {
                if (!e) {
                    const {data: n, error: o} = yield this.getSession();
                    if (o)
                        throw o;
                    e = (t = n.session) !== null && t !== void 0 ? t : void 0
                }
                if (!(e != null && e.refresh_token))
                    throw new ee;
                const {session: r, error: s} = yield this._callRefreshToken(e.refresh_token);
                return s ? {
                    data: {
                        user: null,
                        session: null
                    },
                    error: s
                } : r ? {
                    data: {
                        user: r.user,
                        session: r
                    },
                    error: null
                } : {
                    data: {
                        user: null,
                        session: null
                    },
                    error: null
                }
            } catch (r) {
                if (w(r))
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: r
                    };
                throw r
            }
        })
    }
    _getSessionFromUrl() {
        return b(this, void 0, void 0, function*() {
            try {
                if (!z())
                    throw new B("No browser detected.");
                if (!this._isImplicitGrantFlow())
                    throw new B("Not a valid implicit grant flow url.");
                const e = x("error_description");
                if (e) {
                    const _ = x("error_code");
                    if (!_)
                        throw new B("No error_code detected.");
                    const y = x("error");
                    throw y ? new B(e,{
                        error: y,
                        code: _
                    }) : new B("No error detected.")
                }
                const t = x("provider_token")
                  , r = x("provider_refresh_token")
                  , s = x("access_token");
                if (!s)
                    throw new B("No access_token detected.");
                const n = x("expires_in");
                if (!n)
                    throw new B("No expires_in detected.");
                const o = x("refresh_token");
                if (!o)
                    throw new B("No refresh_token detected.");
                const a = x("token_type");
                if (!a)
                    throw new B("No token_type detected.");
                const c = Math.round(Date.now() / 1e3) + parseInt(n)
                  , {data: l, error: u} = yield this.getUser(s);
                if (u)
                    throw u;
                const p = l.user
                  , m = {
                    provider_token: t,
                    provider_refresh_token: r,
                    access_token: s,
                    expires_in: parseInt(n),
                    expires_at: c,
                    refresh_token: o,
                    token_type: a,
                    user: p
                }
                  , v = x("type");
                return window.location.hash = "",
                {
                    data: {
                        session: m,
                        redirectType: v
                    },
                    error: null
                }
            } catch (e) {
                if (w(e))
                    return {
                        data: {
                            session: null,
                            redirectType: null
                        },
                        error: e
                    };
                throw e
            }
        })
    }
    _isImplicitGrantFlow() {
        return z() && (Boolean(x("access_token")) || Boolean(x("error_description")))
    }
    signOut() {
        var e;
        return b(this, void 0, void 0, function*() {
            const {data: t, error: r} = yield this.getSession();
            if (r)
                return {
                    error: r
                };
            const s = (e = t.session) === null || e === void 0 ? void 0 : e.access_token;
            if (s) {
                const {error: n} = yield this.admin.signOut(s);
                if (n && !(Br(n) && (n.status === 404 || n.status === 401)))
                    return {
                        error: n
                    }
            }
            return yield this._removeSession(),
            this._notifyAllSubscribers("SIGNED_OUT", null),
            {
                error: null
            }
        })
    }
    onAuthStateChange(e) {
        const t = Ar()
          , r = {
            id: t,
            callback: e,
            unsubscribe: ()=>{
                this.stateChangeEmitters.delete(t)
            }
        };
        return this.stateChangeEmitters.set(t, r),
        {
            data: {
                subscription: r
            }
        }
    }
    resetPasswordForEmail(e, t={}) {
        return b(this, void 0, void 0, function*() {
            try {
                return yield E(this.fetch, "POST", `${this.url}/recover`, {
                    body: {
                        email: e,
                        gotrue_meta_security: {
                            captcha_token: t.captchaToken
                        }
                    },
                    headers: this.headers,
                    redirectTo: t.redirectTo
                })
            } catch (r) {
                if (w(r))
                    return {
                        data: null,
                        error: r
                    };
                throw r
            }
        })
    }
    _refreshAccessToken(e) {
        return b(this, void 0, void 0, function*() {
            try {
                const t = Date.now();
                return yield Ur(r=>b(this, void 0, void 0, function*() {
                    return yield Dr(r * 200),
                    yield E(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
                        body: {
                            refresh_token: e
                        },
                        headers: this.headers,
                        xform: H
                    })
                }), (r,s,n)=>n && n.error && n.error instanceof Se && Date.now() + (r + 1) * 200 - t < ge)
            } catch (t) {
                if (w(t))
                    return {
                        data: {
                            session: null,
                            user: null
                        },
                        error: t
                    };
                throw t
            }
        })
    }
    _isValidSession(e) {
        return typeof e == "object" && e !== null && "access_token"in e && "refresh_token"in e && "expires_at"in e
    }
    _handleProviderSignIn(e, t={}) {
        const r = this._getUrlForProvider(e, {
            redirectTo: t.redirectTo,
            scopes: t.scopes,
            queryParams: t.queryParams
        });
        return z() && !t.skipBrowserRedirect && window.location.assign(r),
        {
            data: {
                provider: e,
                url: r
            },
            error: null
        }
    }
    _recoverAndRefresh() {
        var e;
        return b(this, void 0, void 0, function*() {
            try {
                const t = yield Me(this.storage, this.storageKey);
                if (!this._isValidSession(t)) {
                    t !== null && (yield this._removeSession());
                    return
                }
                const r = Math.round(Date.now() / 1e3);
                if (((e = t.expires_at) !== null && e !== void 0 ? e : 1 / 0) < r + Zr)
                    if (this.autoRefreshToken && t.refresh_token) {
                        const {error: s} = yield this._callRefreshToken(t.refresh_token);
                        s && (console.log(s.message),
                        yield this._removeSession())
                    } else
                        yield this._removeSession();
                else
                    this.persistSession && (yield this._saveSession(t)),
                    this._notifyAllSubscribers("SIGNED_IN", t)
            } catch (t) {
                console.error(t);
                return
            }
        })
    }
    _callRefreshToken(e) {
        var t, r;
        return b(this, void 0, void 0, function*() {
            if (this.refreshingDeferred)
                return this.refreshingDeferred.promise;
            try {
                if (this.refreshingDeferred = new he,
                !e)
                    throw new ee;
                const {data: s, error: n} = yield this._refreshAccessToken(e);
                if (n)
                    throw n;
                if (!s.session)
                    throw new ee;
                yield this._saveSession(s.session),
                this._notifyAllSubscribers("TOKEN_REFRESHED", s.session);
                const o = {
                    session: s.session,
                    error: null
                };
                return this.refreshingDeferred.resolve(o),
                o
            } catch (s) {
                if (w(s)) {
                    const n = {
                        session: null,
                        error: s
                    };
                    return (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(n),
                    n
                }
                throw (r = this.refreshingDeferred) === null || r === void 0 || r.reject(s),
                s
            } finally {
                this.refreshingDeferred = null
            }
        })
    }
    _notifyAllSubscribers(e, t, r=!0) {
        this.broadcastChannel && r && this.broadcastChannel.postMessage({
            event: e,
            session: t
        }),
        this.stateChangeEmitters.forEach(s=>s.callback(e, t))
    }
    _saveSession(e) {
        return b(this, void 0, void 0, function*() {
            this.persistSession || (this.inMemorySession = e),
            this.persistSession && e.expires_at && (yield this._persistSession(e))
        })
    }
    _persistSession(e) {
        return xr(this.storage, this.storageKey, e)
    }
    _removeSession() {
        return b(this, void 0, void 0, function*() {
            this.persistSession ? yield Cr(this.storage, this.storageKey) : this.inMemorySession = null
        })
    }
    _removeVisibilityChangedCallback() {
        const e = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
            e && z() && (window != null && window.removeEventListener) && window.removeEventListener("visibilitychange", e)
        } catch (t) {
            console.error("removing visibilitychange callback failed", t)
        }
    }
    _startAutoRefresh() {
        return b(this, void 0, void 0, function*() {
            yield this._stopAutoRefresh();
            const e = setInterval(()=>this._autoRefreshTokenTick(), ge);
            this.autoRefreshTicker = e,
            e && typeof e == "object" && typeof e.unref == "function" && e.unref(),
            yield this._autoRefreshTokenTick()
        })
    }
    _stopAutoRefresh() {
        return b(this, void 0, void 0, function*() {
            const e = this.autoRefreshTicker;
            this.autoRefreshTicker = null,
            e && clearInterval(e)
        })
    }
    startAutoRefresh() {
        return b(this, void 0, void 0, function*() {
            this._removeVisibilityChangedCallback(),
            yield this._startAutoRefresh()
        })
    }
    stopAutoRefresh() {
        return b(this, void 0, void 0, function*() {
            this._removeVisibilityChangedCallback(),
            yield this._stopAutoRefresh()
        })
    }
    _autoRefreshTokenTick() {
        return b(this, void 0, void 0, function*() {
            const e = Date.now();
            try {
                const {data: {session: t}} = yield this.getSession();
                if (!t || !t.refresh_token || !t.expires_at)
                    return;
                Math.floor((t.expires_at * 1e3 - e) / ge) < ii && (yield this._callRefreshToken(t.refresh_token))
            } catch (t) {
                console.error("Auto refresh tick failed with error. This is likely a transient error.", t)
            }
        })
    }
    _handleVisibilityChange() {
        return b(this, void 0, void 0, function*() {
            if (!z() || !(window != null && window.addEventListener))
                return this.autoRefreshToken && this.startAutoRefresh(),
                !1;
            try {
                this.visibilityChangedCallback = ()=>b(this, void 0, void 0, function*() {
                    return yield this._onVisibilityChanged(!1)
                }),
                window == null || window.addEventListener("visibilitychange", this.visibilityChangedCallback),
                yield this._onVisibilityChanged(!0)
            } catch (e) {
                console.error("_handleVisibilityChange", e)
            }
        })
    }
    _onVisibilityChanged(e) {
        return b(this, void 0, void 0, function*() {
            document.visibilityState === "visible" ? (e || (yield this.initializePromise,
            yield this._recoverAndRefresh()),
            this.autoRefreshToken && this._startAutoRefresh()) : document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh()
        })
    }
    _getUrlForProvider(e, t) {
        const r = [`provider=${encodeURIComponent(e)}`];
        if (t != null && t.redirectTo && r.push(`redirect_to=${encodeURIComponent(t.redirectTo)}`),
        t != null && t.scopes && r.push(`scopes=${encodeURIComponent(t.scopes)}`),
        t != null && t.queryParams) {
            const s = new URLSearchParams(t.queryParams);
            r.push(s.toString())
        }
        return `${this.url}/authorize?${r.join("&")}`
    }
    _unenroll(e) {
        var t;
        return b(this, void 0, void 0, function*() {
            try {
                const {data: r, error: s} = yield this.getSession();
                return s ? {
                    data: null,
                    error: s
                } : yield E(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
                    headers: this.headers,
                    jwt: (t = r == null ? void 0 : r.session) === null || t === void 0 ? void 0 : t.access_token
                })
            } catch (r) {
                if (w(r))
                    return {
                        data: null,
                        error: r
                    };
                throw r
            }
        })
    }
    _enroll(e) {
        var t, r;
        return b(this, void 0, void 0, function*() {
            try {
                const {data: s, error: n} = yield this.getSession();
                if (n)
                    return {
                        data: null,
                        error: n
                    };
                const {data: o, error: a} = yield E(this.fetch, "POST", `${this.url}/factors`, {
                    body: {
                        friendly_name: e.friendlyName,
                        factor_type: e.factorType,
                        issuer: e.issuer
                    },
                    headers: this.headers,
                    jwt: (t = s == null ? void 0 : s.session) === null || t === void 0 ? void 0 : t.access_token
                });
                return a ? {
                    data: null,
                    error: a
                } : (!((r = o == null ? void 0 : o.totp) === null || r === void 0) && r.qr_code && (o.totp.qr_code = `data:image/svg+xml;utf-8,${o.totp.qr_code}`),
                {
                    data: o,
                    error: null
                })
            } catch (s) {
                if (w(s))
                    return {
                        data: null,
                        error: s
                    };
                throw s
            }
        })
    }
    _verify(e) {
        var t;
        return b(this, void 0, void 0, function*() {
            try {
                const {data: r, error: s} = yield this.getSession();
                if (s)
                    return {
                        data: null,
                        error: s
                    };
                const {data: n, error: o} = yield E(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
                    body: {
                        code: e.code,
                        challenge_id: e.challengeId
                    },
                    headers: this.headers,
                    jwt: (t = r == null ? void 0 : r.session) === null || t === void 0 ? void 0 : t.access_token
                });
                return o ? {
                    data: null,
                    error: o
                } : (yield this._saveSession(Object.assign({
                    expires_at: Math.round(Date.now() / 1e3) + n.expires_in
                }, n)),
                this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", n),
                {
                    data: n,
                    error: o
                })
            } catch (r) {
                if (w(r))
                    return {
                        data: null,
                        error: r
                    };
                throw r
            }
        })
    }
    _challenge(e) {
        var t;
        return b(this, void 0, void 0, function*() {
            try {
                const {data: r, error: s} = yield this.getSession();
                return s ? {
                    data: null,
                    error: s
                } : yield E(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
                    headers: this.headers,
                    jwt: (t = r == null ? void 0 : r.session) === null || t === void 0 ? void 0 : t.access_token
                })
            } catch (r) {
                if (w(r))
                    return {
                        data: null,
                        error: r
                    };
                throw r
            }
        })
    }
    _challengeAndVerify(e) {
        return b(this, void 0, void 0, function*() {
            const {data: t, error: r} = yield this._challenge({
                factorId: e.factorId
            });
            return r ? {
                data: null,
                error: r
            } : yield this._verify({
                factorId: e.factorId,
                challengeId: t.id,
                code: e.code
            })
        })
    }
    _listFactors() {
        return b(this, void 0, void 0, function*() {
            const {data: {user: e}, error: t} = yield this.getUser();
            if (t)
                return {
                    data: null,
                    error: t
                };
            const r = (e == null ? void 0 : e.factors) || []
              , s = r.filter(n=>n.factor_type === "totp" && n.status === "verified");
            return {
                data: {
                    all: r,
                    totp: s
                },
                error: null
            }
        })
    }
    _getAuthenticatorAssuranceLevel() {
        var e, t;
        return b(this, void 0, void 0, function*() {
            const {data: {session: r}, error: s} = yield this.getSession();
            if (s)
                return {
                    data: null,
                    error: s
                };
            if (!r)
                return {
                    data: {
                        currentLevel: null,
                        nextLevel: null,
                        currentAuthenticationMethods: []
                    },
                    error: null
                };
            const n = this._decodeJWT(r.access_token);
            let o = null;
            n.aal && (o = n.aal);
            let a = o;
            ((t = (e = r.user.factors) === null || e === void 0 ? void 0 : e.filter(l=>l.status === "verified")) !== null && t !== void 0 ? t : []).length > 0 && (a = "aal2");
            const c = n.amr || [];
            return {
                data: {
                    currentLevel: o,
                    nextLevel: a,
                    currentAuthenticationMethods: c
                },
                error: null
            }
        })
    }
}
class ni extends si {
    constructor(e) {
        super(e)
    }
}
var oi = globalThis && globalThis.__awaiter || function(i, e, t, r) {
    function s(n) {
        return n instanceof t ? n : new t(function(o) {
            o(n)
        }
        )
    }
    return new (t || (t = Promise))(function(n, o) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (u) {
                o(u)
            }
        }
        function h(l) {
            try {
                c(r.throw(l))
            } catch (u) {
                o(u)
            }
        }
        function c(l) {
            l.done ? n(l.value) : s(l.value).then(a, h)
        }
        c((r = r.apply(i, e || [])).next())
    }
    )
}
;
const ai = {
    headers: Or
}
  , ci = {
    schema: "public"
}
  , li = {
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0
}
  , hi = {};
class ui {
    constructor(e, t, r) {
        var s, n, o, a, h, c, l, u;
        if (this.supabaseUrl = e,
        this.supabaseKey = t,
        !e)
            throw new Error("supabaseUrl is required.");
        if (!t)
            throw new Error("supabaseKey is required.");
        const p = jr(e);
        if (this.realtimeUrl = `${p}/realtime/v1`.replace(/^http/i, "ws"),
        this.authUrl = `${p}/auth/v1`,
        this.storageUrl = `${p}/storage/v1`,
        p.match(/(supabase\.co)|(supabase\.in)/)) {
            const S = p.split(".");
            this.functionsUrl = `${S[0]}.functions.${S[1]}.${S[2]}`
        } else
            this.functionsUrl = `${p}/functions/v1`;
        const v = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`
          , _ = {
            db: ci,
            realtime: hi,
            auth: Object.assign(Object.assign({}, li), {
                storageKey: v
            }),
            global: ai
        }
          , y = $r(r ?? {}, _);
        this.storageKey = (n = (s = y.auth) === null || s === void 0 ? void 0 : s.storageKey) !== null && n !== void 0 ? n : "",
        this.headers = (a = (o = y.global) === null || o === void 0 ? void 0 : o.headers) !== null && a !== void 0 ? a : {},
        this.auth = this._initSupabaseAuthClient((h = y.auth) !== null && h !== void 0 ? h : {}, this.headers, (c = y.global) === null || c === void 0 ? void 0 : c.fetch),
        this.fetch = kr(t, this._getAccessToken.bind(this), (l = y.global) === null || l === void 0 ? void 0 : l.fetch),
        this.realtime = this._initRealtimeClient(Object.assign({
            headers: this.headers
        }, y.realtime)),
        this.rest = new kt(`${p}/rest/v1`,{
            headers: this.headers,
            schema: (u = y.db) === null || u === void 0 ? void 0 : u.schema,
            fetch: this.fetch
        }),
        this._listenForAuthEvents()
    }
    get functions() {
        return new yt(this.functionsUrl,{
            headers: this.headers,
            customFetch: this.fetch
        })
    }
    get storage() {
        return new br(this.storageUrl,this.headers,this.fetch)
    }
    from(e) {
        return this.rest.from(e)
    }
    rpc(e, t={}, r) {
        return this.rest.rpc(e, t, r)
    }
    channel(e, t={
        config: {}
    }) {
        return this.realtime.channel(e, t)
    }
    getChannels() {
        return this.realtime.getChannels()
    }
    removeChannel(e) {
        return this.realtime.removeChannel(e)
    }
    removeAllChannels() {
        return this.realtime.removeAllChannels()
    }
    _getAccessToken() {
        var e, t;
        return oi(this, void 0, void 0, function*() {
            const {data: r} = yield this.auth.getSession();
            return (t = (e = r.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : null
        })
    }
    _initSupabaseAuthClient({autoRefreshToken: e, persistSession: t, detectSessionInUrl: r, storage: s, storageKey: n}, o, a) {
        const h = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`
        };
        return new ni({
            url: this.authUrl,
            headers: Object.assign(Object.assign({}, h), o),
            storageKey: n,
            autoRefreshToken: e,
            persistSession: t,
            detectSessionInUrl: r,
            storage: s,
            fetch: a
        })
    }
    _initRealtimeClient(e) {
        return new cr(this.realtimeUrl,Object.assign(Object.assign({}, e), {
            params: Object.assign({
                apikey: this.supabaseKey
            }, e == null ? void 0 : e.params)
        }))
    }
    _listenForAuthEvents() {
        return this.auth.onAuthStateChange((t,r)=>{
            this._handleTokenChanged(t, r == null ? void 0 : r.access_token, "CLIENT")
        }
        )
    }
    _handleTokenChanged(e, t, r) {
        (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== t ? (this.realtime.setAuth(t ?? null),
        this.changedAccessToken = t) : (e === "SIGNED_OUT" || e === "USER_DELETED") && (this.realtime.setAuth(this.supabaseKey),
        r == "STORAGE" && this.auth.signOut(),
        this.changedAccessToken = void 0)
    }
}
const di = (i,e,t)=>new ui(i,e,t);
var fi = Object.create
  , Ze = Object.defineProperty
  , pi = Object.getOwnPropertyDescriptor
  , Pe = Object.getOwnPropertyNames
  , vi = Object.getPrototypeOf
  , _i = Object.prototype.hasOwnProperty
  , yi = (i,e)=>function() {
    return i && (e = (0,
    i[Pe(i)[0]])(i = 0)),
    e
}
  , mi = (i,e)=>function() {
    return e || (0,
    i[Pe(i)[0]])((e = {
        exports: {}
    }).exports, e),
    e.exports
}
  , gi = (i,e,t,r)=>{
    if (e && typeof e == "object" || typeof e == "function")
        for (let s of Pe(e))
            !_i.call(i, s) && s !== t && Ze(i, s, {
                get: ()=>e[s],
                enumerable: !(r = pi(e, s)) || r.enumerable
            });
    return i
}
  , et = (i,e,t)=>(t = i != null ? fi(vi(i)) : {},
gi(e || !i || !i.__esModule ? Ze(t, "default", {
    value: i,
    enumerable: !0
}) : t, i))
  , N = yi({
    "../../node_modules/.pnpm/tsup@5.12.9/node_modules/tsup/assets/esm_shims.js"() {}
})
  , tt = mi({
    "../../node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js"(i) {
        N(),
        i.parse = r,
        i.serialize = s;
        var e = Object.prototype.toString
          , t = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function r(c, l) {
            if (typeof c != "string")
                throw new TypeError("argument str must be a string");
            for (var u = {}, p = l || {}, m = p.decode || n, v = 0; v < c.length; ) {
                var _ = c.indexOf("=", v);
                if (_ === -1)
                    break;
                var y = c.indexOf(";", v);
                if (y === -1)
                    y = c.length;
                else if (y < _) {
                    v = c.lastIndexOf(";", _ - 1) + 1;
                    continue
                }
                var S = c.slice(v, _).trim();
                if (u[S] === void 0) {
                    var j = c.slice(_ + 1, y).trim();
                    j.charCodeAt(0) === 34 && (j = j.slice(1, -1)),
                    u[S] = h(j, m)
                }
                v = y + 1
            }
            return u
        }
        function s(c, l, u) {
            var p = u || {}
              , m = p.encode || o;
            if (typeof m != "function")
                throw new TypeError("option encode is invalid");
            if (!t.test(c))
                throw new TypeError("argument name is invalid");
            var v = m(l);
            if (v && !t.test(v))
                throw new TypeError("argument val is invalid");
            var _ = c + "=" + v;
            if (p.maxAge != null) {
                var y = p.maxAge - 0;
                if (isNaN(y) || !isFinite(y))
                    throw new TypeError("option maxAge is invalid");
                _ += "; Max-Age=" + Math.floor(y)
            }
            if (p.domain) {
                if (!t.test(p.domain))
                    throw new TypeError("option domain is invalid");
                _ += "; Domain=" + p.domain
            }
            if (p.path) {
                if (!t.test(p.path))
                    throw new TypeError("option path is invalid");
                _ += "; Path=" + p.path
            }
            if (p.expires) {
                var S = p.expires;
                if (!a(S) || isNaN(S.valueOf()))
                    throw new TypeError("option expires is invalid");
                _ += "; Expires=" + S.toUTCString()
            }
            if (p.httpOnly && (_ += "; HttpOnly"),
            p.secure && (_ += "; Secure"),
            p.priority) {
                var j = typeof p.priority == "string" ? p.priority.toLowerCase() : p.priority;
                switch (j) {
                case "low":
                    _ += "; Priority=Low";
                    break;
                case "medium":
                    _ += "; Priority=Medium";
                    break;
                case "high":
                    _ += "; Priority=High";
                    break;
                default:
                    throw new TypeError("option priority is invalid")
                }
            }
            if (p.sameSite) {
                var C = typeof p.sameSite == "string" ? p.sameSite.toLowerCase() : p.sameSite;
                switch (C) {
                case !0:
                    _ += "; SameSite=Strict";
                    break;
                case "lax":
                    _ += "; SameSite=Lax";
                    break;
                case "strict":
                    _ += "; SameSite=Strict";
                    break;
                case "none":
                    _ += "; SameSite=None";
                    break;
                default:
                    throw new TypeError("option sameSite is invalid")
                }
            }
            return _
        }
        function n(c) {
            return c.indexOf("%") !== -1 ? decodeURIComponent(c) : c
        }
        function o(c) {
            return encodeURIComponent(c)
        }
        function a(c) {
            return e.call(c) === "[object Date]" || c instanceof Date
        }
        function h(c, l) {
            try {
                return l(c)
            } catch {
                return c
            }
        }
    }
});
N();
N();
var be = et(tt());
N();
var rt = et(tt())
  , bi = i=>{
    try {
        return decodeURIComponent(atob(i.replace(/[-]/g, "+").replace(/[_]/g, "/")).split("").map(e=>"%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)).join(""))
    } catch (e) {
        if (e instanceof ReferenceError)
            return Buffer.from(i, "base64").toString("utf-8");
        throw e
    }
}
;
function wi(i) {
    if (!i)
        return null;
    try {
        const e = JSON.parse(i);
        if (!e)
            return null;
        if (e.constructor.name === "Object")
            return e;
        if (e.constructor.name !== "Array")
            throw new Error(`Unexpected format: ${e.constructor.name}`);
        const [t,r,s] = e[0].split(".")
          , n = bi(r)
          , {exp: o, sub: a, ...h} = JSON.parse(n);
        return {
            expires_at: o,
            expires_in: o - Math.round(Date.now() / 1e3),
            token_type: "bearer",
            access_token: e[0],
            refresh_token: e[1],
            provider_token: e[2],
            provider_refresh_token: e[3],
            user: {
                id: a,
                ...h
            }
        }
    } catch (e) {
        return console.warn("Failed to parse cookie string:", e),
        null
    }
}
function Oi(i) {
    return JSON.stringify([i.access_token, i.refresh_token, i.provider_token, i.provider_refresh_token])
}
N();
function we() {
    return typeof window < "u"
}
function Ei({supabaseUrl: i, supabaseKey: e, options: t, cookieOptions: {name: r="supabase-auth-token", domain: s, path: n="/", sameSite: o="lax", secure: a, maxAge: h=1e3 * 60 * 60 * 24 * 365}={}}) {
    return di(i, e, {
        ...t,
        auth: {
            storageKey: r,
            storage: {
                getItem(c) {
                    if (!we())
                        return null;
                    const l = (0,
                    be.parse)(document.cookie)
                      , u = wi(l[c]);
                    return u ? JSON.stringify(u) : null
                },
                setItem(c, l) {
                    var u;
                    if (!we())
                        return;
                    let p = JSON.parse(l);
                    const m = Oi(p);
                    document.cookie = (0,
                    be.serialize)(c, m, {
                        domain: s,
                        path: n,
                        maxAge: h,
                        httpOnly: !1,
                        sameSite: o,
                        secure: a ?? ((u = document.location) == null ? void 0 : u.protocol) === "https:"
                    })
                },
                removeItem(c) {
                    we() && (document.cookie = (0,
                    be.serialize)(c, "", {
                        domain: s,
                        path: n,
                        expires: new Date(0),
                        httpOnly: !1,
                        sameSite: o,
                        secure: a
                    }))
                }
            }
        }
    })
}
N();
N();
N();
N();
rt.parse;
rt.serialize;
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
const Ti = "@supabase/auth-helpers-sveltekit"
  , Si = "0.8.7";
function ki(i, e, t, r) {
    var o;
    const s = {
        ...t,
        global: {
            ...t == null ? void 0 : t.global,
            headers: {
                ...(o = t == null ? void 0 : t.global) == null ? void 0 : o.headers,
                "X-Client-Info": `${Ti}@${Si}`
            }
        }
    }
      , n = Ei({
        supabaseUrl: i,
        supabaseKey: e,
        options: s,
        cookieOptions: r
    });
    return {
        maxAge: 1e3 * 60 * 60 * 24 * 365,
        ...r
    },
    n
}
const ji = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNteHBoZWRhcnl5Z2h6ZWZwemFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MDQyMzQsImV4cCI6MjAyNDk4MDIzNH0.PGrRhOxDTIvd6ml7Y1SxHs87CrjVbJ2vSdc33RJ14R8"
  , $i = "https://smxphedaryyghzefpzad.supabase.co"
  , Ri = ki($i, ji);
export {ae as _, Ri as s};
