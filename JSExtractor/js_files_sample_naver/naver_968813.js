function openWindow(a, b, c, d, e) {
  var f = (screen.width - c) / 2,
    g = (screen.height - d) / 2;
  null === e && (e = "no");
  var h = "";
  (h +=
    "toolbar=no, channelmode=no, location=no, directories=no, resizable=no, menubar=no"),
    (h += ", scrollbars="),
    (h += ", left="),
    (h += f),
    (h += ", top="),
    (h += g),
    (h += ", width="),
    (h += c),
    (h += ", height="),
    (h += d);
  var i = window.open(a, b, h);
  return i;
}
function openURL(a) {
  window.open(a, "_blank");
}
function parseNumber(a, b) {
  return isNaN(parseInt(a)) ? b : Number(a);
}
function setLoginLevel(a) {
  null !== parent.document.getElementById("loginframe") &&
    parent.loginframe.checkAd(a);
}
function getAgent() {
  var a = new Agent();
  return !!a.checkAgent(20);
}
function daClickHandler(a) {
  var b = document.getElementById("link");
  (b.target = "_blank"), (b.href = a), b.click();
}
function getFreq(a, b, c) {
  var d = 0;
  return (d = parseNumber(Cookie.get(a), 0)), Cookie.set(a, d + 1, b, c), d;
}
var da_br = "",
  NBP_CORP = NBP_CORP || {},
  naver_corp_da = naver_corp_da || {};
NBP_CORP.$ = function (a) {
  return document.getElementById(a);
};
var da_ua = window.navigator.userAgent.toLowerCase(),
  AgentDetect = {
    IS_WIN: /Windows/i.test(da_ua),
    IS_MAC: /Macintosh/i.test(da_ua),
    IS_OP: "undefined" != typeof window.opera || /Opera/i.test(da_ua),
    IS_IE:
      !this.IS_OP && !!da_ua.match(/(?:(MSIE) |(Trident)\/.+rv[ :])([\w.]+)/i),
    IS_EDGE: /Edg/i.test(da_ua),
    IS_FF: /Firefox/i.test(da_ua),
    IS_CR: /Chrome|CriOS/i.test(da_ua),
    IS_SF: !/Chrome|CriOS/i.test(da_ua) && (da_ua || "").indexOf("safari") > -1,
    IS_IOS: /iPhone|iPad|iPod/i.test(da_ua),
    IS_IPHONE: /iPhone;/i.test(da_ua),
    IS_IPAD: /iPad;/i.test(da_ua),
    IS_IPOD: /iPod;/i.test(da_ua),
    IS_ANDROID: /Android/i.test(da_ua),
    IS_WINDOWS_MOBILE: /Windows Phone|Windows CE/i.test(da_ua),
    IS_BLACKBERRY: /BlackBerry/i.test(da_ua),
    IS_SONYERICSSON: /SonyEricsson/i.test(da_ua),
    IS_SYMBIAN_OS: /SymbianOS/i.test(da_ua),
    IS_WEB_OS: /webOS/i.test(da_ua),
    IS_WEBKIT_MOBILE: /AppleWebKit/i.test(da_ua),
    IS_IE_MOBILE: /IEMobile/i.test(da_ua),
    IS_OPERA_MINI: /Opera Mini/i.test(da_ua),
    IS_DOLFIN: /Dolfin/i.test(da_ua),
    IS_NAVER_APP: /NAVER\((inapp|higgs);\s?search;\s?/i.test(da_ua),
    IS_SAMSUNG: /SamsungBrowser/i.test(da_ua),
    init: function () {
      (this.IE = "IE"),
        (this.EDGE = "Edge"),
        (this.CR = "Chrome"),
        (this.SF = "Safari"),
        (this.OP = "Opera"),
        (this.FF = "Firefox"),
        (this.WEBKIT_MOBILE = "WebKit Mobile"),
        (this.IE_MOBILE = "IE Mobile"),
        (this.OPERA_MINI = "Opera Mini"),
        (this.DOLFIN = "Dolfin"),
        (this.WIN = "Windows"),
        (this.MAC = "Macintosh"),
        (this.IOS = "IOS"),
        (this.ANDROID = "Android"),
        (this.WINDOWS_MOBILE = "Windows Mobile"),
        (this.BLACKBERRY = "BlackBerry"),
        (this.SONYERICSSON = "SonyEricsson"),
        (this.SYMBIAN_OS = "SymbianOS"),
        (this.WEB_OS = "WebOS"),
        (this.UNKNOWN_OR_NOT_SUPPORTED_BROWSER =
          "an unknown or not supported browser"),
        (this.UNKNOWN_BROWSER_VERSION = "an unknown browser version"),
        (this.UNKNOWN_OS_VERSION = "an unknown OS version"),
        (this.UNKNOWN_OR_NOT_SUPPORTED_OS = "an unknown or not supported OS"),
        (this.BROWSER =
          this.searchBrowser() || this.UNKNOWN_OR_NOT_SUPPORTED_BROWSER),
        (this.BROWSER_VERSION =
          this.searchBrowserVersion() || this.UNKNOWN_BROWSER_VERSION),
        (this.OS_VERSION = this.searchOSVersion() || this.UNKNOWN_OS_VERSION),
        (this.OS = this.searchOS() || this.UNKNOWN_OR_NOT_SUPPORTED_OS);
    },
    isMobile: function () {
      return (
        this.IS_IOS ||
        this.IS_ANDROID ||
        this.IS_WINDOWS_MOBILE ||
        this.IS_BLACKBERRY ||
        this.IS_SONYERICSSON ||
        this.IS_SYMBIAN_OS ||
        this.IS_WEB_OS ||
        this.IS_OPERA_MINI ||
        this.IS_DOLFIN
      );
    },
    searchBrowser: function () {
      if (this.isMobile()) {
        if (this.IS_WEBKIT_MOBILE) return this.WEBKIT_MOBILE;
        if (this.IS_IE_MOBILE) return this.IE_MOBILE;
        if (this.IS_OPERA_MINI) return this.OPERA_MINI;
        if (this.IS_DOLFIN) return this.DOLFIN;
      } else {
        if (this.IS_OP) return this.OP;
        if (this.IS_IE) return this.IE;
        if (this.IS_EDGE) return this.EDGE;
        if (this.IS_FF) return this.FF;
        if (this.IS_CR) return this.CR;
        if (this.IS_SF) return this.SF;
      }
    },
    searchBrowserVersion: function () {
      if (this.isMobile()) {
        var a = {
          chrome: this.UNKNOWN_BROWSER_VERSION,
          samsung: this.UNKNOWN_BROWSER_VERSION,
          webview: this.UNKNOWN_BROWSER_VERSION,
          naverapp: this.UNKNOWN_BROWSER_VERSION,
          naverapp_svc_cd: this.UNKNOWN_BROWSER_VERSION,
        };
        if (
          (this.IS_CR &&
            null != da_ua.match(/(Chrome|CriOS)\/([0-9\.]+)/i) &&
            (a.chrome = parseFloat(
              da_ua.match(/(Chrome|CriOS)\/([0-9\.]+)/i)[2],
            )),
          this.IS_SAMSUNG &&
            null != da_ua.match(/SamsungBrowser\/([0-9\.]+)/i) &&
            (a.samsung = parseFloat(
              da_ua.match(/SamsungBrowser\/([0-9\.]+)/i)[1],
            )),
          this.IS_WEBKIT_MOBILE &&
            null != da_ua.match(/Version\/([0-9\.]+)/i) &&
            (a.webview = parseFloat(da_ua.match(/Version\/([0-9\.]+)/i)[1])),
          this.IS_NAVER_APP)
        ) {
          var b =
            /NAVER\((inapp|higgs);\s?search;\s?([0-9\.]+);\s?([0-9\.]+)(;\s?([a-z|0-9\.]+))?\)/i;
          null != da_ua.match(b) &&
            ((a.naverapp = parseFloat(da_ua.match(b)[3])),
            (a.naverapp_svc_cd = parseFloat(da_ua.match(b)[2])));
        }
        return a;
      }
      var c;
      if (this.IS_IE) {
        if ("Microsoft Internet Explorer" == navigator.appName)
          return (
            (c = da_ua.match(/MSIE ([0-9\.]+)/i)),
            c ? parseFloat(c[1]) : this.UNKNOWN_BROWSER_VERSION
          );
        if ("Netscape" == navigator.appName) {
          var d = new RegExp("trident/.*rv[ :]([0-9]{1,}[.0-9]{0,})");
          if (null != d.exec(da_ua)) return parseFloat(RegExp.$1);
        }
        return -1;
      }
      return this.IS_EDGE
        ? ((c = da_ua.match(/Edg\/([0-9\.]+)/i)),
          c ? parseInt(c[1]) : this.UNKNOWN_BROWSER_VERSION)
        : this.IS_CR
          ? ((c = da_ua.match(/Chrome\/([0-9\.]+)/i)),
            c ? parseFloat(c[1]) : this.UNKNOWN_BROWSER_VERSION)
          : this.IS_SF
            ? ((c = da_ua.match(/Version\/([0-9\.]+)/i)),
              c ? parseFloat(c[1]) : this.UNKNOWN_BROWSER_VERSION)
            : this.IS_OP
              ? ((c = da_ua.match(/Version\/([0-9\.]+)/i)),
                c ? parseFloat(c[1]) : this.UNKNOWN_BROWSER_VERSION)
              : this.IS_FF
                ? ((c = da_ua.match(/Firefox\/([0-9\.]+)/i)),
                  c ? parseFloat(c[1]) : this.UNKNOWN_BROWSER_VERSION)
                : void 0;
    },
    searchOSVersion: function () {
      var a;
      if (this.isMobile()) {
        if (this.IS_IOS)
          return (
            (a = da_ua.match(/OS ((\d+_?){2,3})\s/i)),
            a ? parseFloat(a[1].replace(/_/g, ".")) : this.UNKNOWN_OS_VERSION
          );
        if (this.IS_ANDROID)
          return (
            (a = da_ua.match(/Android ([0-9\.]+)/i)),
            a ? parseFloat(a[1]) : this.UNKNOWN_OS_VERSION
          );
        if (/Windows Phone/i.test(da_ua))
          return (
            (a = da_ua
              .match(/Windows Phone ([0-9\.]+)|Windows Phone OS ([0-9\.]+)/i)[0]
              .match(/[0-9\.]+/)),
            a ? parseFloat(a[0]) : this.UNKNOWN_OS_VERSION
          );
        if (this.IS_SYMBIAN_OS)
          return (
            (a = da_ua.match(/SymbianOS\/([0-9\.]+)/i)),
            a ? parseFloat(a[1]) : this.UNKNOWN_OS_VERSION
          );
        if (this.IS_WEB_OS)
          return (
            (a = da_ua.match(/webOS\/([0-9\.]+)/i)),
            a ? parseFloat(a[1]) : this.UNKNOWN_OS_VERSION
          );
      } else if (this.IS_WIN)
        return (
          (a = da_ua.match(/Windows NT ([0-9\.]+)/i)),
          a ? parseFloat(a[1]) : this.UNKNOWN_OS_VERSION
        );
    },
    searchOS: function () {
      if (this.isMobile()) {
        if (this.IS_IOS) return this.IOS;
        if (this.IS_ANDROID) return this.ANDROID;
        if (this.IS_WINDOWS_MOBILE) return this.WINDOWS_MOBILE;
        if (this.IS_BLACKBERRY) return this.BLACKBERRY;
        if (this.IS_SONYERICSSON) return this.SONYERICSSON;
        if (this.IS_SYMBIAN_OS) return this.SYMBIAN_OS;
        if (this.IS_WEB_OS) return this.WEB_OS;
      } else {
        if (this.IS_WIN) return this.WIN;
        if (this.IS_MAC) return this.MAC;
      }
    },
    checkAgent: function (a) {
      return 10 === a
        ? !(!this.IS_WIN || !this.IS_IE || 8 == this.searchBrowserVersion())
        : 20 === a
          ? !(!this.IS_WIN || !this.IS_IE)
          : 30 === a
            ? !(!this.IS_WIN || (!this.IS_IE && !this.IS_CR))
            : 40 === a
              ? !(!this.IS_WIN || !(this.IS_IE || this.IS_CR || this.IS_SF))
              : 45 === a
                ? !(!this.IS_WIN || !(this.IS_IE || this.IS_SF || this.IS_OP))
                : 50 === a
                  ? !(
                      !this.IS_WIN ||
                      !(this.IS_IE || this.IS_CR || this.IS_SF || this.IS_OP)
                    )
                  : 60 === a
                    ? !(
                        !this.IS_WIN ||
                        !(this.IS_IE || this.IS_CR || this.IS_SF || this.IS_FF)
                      )
                    : 80 === a
                      ? !(
                          !this.IS_WIN ||
                          !(
                            this.IS_IE ||
                            this.IS_FF ||
                            this.IS_CR ||
                            this.IS_SF ||
                            this.IS_OP
                          )
                        )
                      : 90 === a &&
                        !!(
                          this.IS_IE ||
                          this.IS_FF ||
                          this.IS_CR ||
                          this.IS_SF ||
                          this.IS_OP
                        );
    },
    hasFP: function () {
      if (navigator.plugins && navigator.mimeTypes.length) {
        var a = navigator.plugins["Shockwave Flash"];
        if (a && a.description) return !0;
      } else
        try {
          var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
          if (null != b) return !0;
        } catch (c) {}
      return !1;
    },
  };
AgentDetect.init(),
  (naver_corp_da.AdBlockDetector = function () {
    var a = "offset",
      b = "client",
      c = { isEmpty: !1 },
      d = { nullProps: [a + "Parent"], zeroProps: [] };
    (d.zeroProps = [a + "Height", a + "Width", b + "Height", b + "Width"]),
      (this.init = function (a) {
        if (a) for (var b in a) c[b] = a[b];
      }),
      (this.validateNode = function (a) {
        if (a) {
          var b,
            e = document.body,
            f = !1,
            g = function (a, b) {
              for (; a && 1 === a.nodeType && !f; ) b(a), (a = a.parentNode);
            },
            h = function (a) {
              if (void 0 !== window.getComputedStyle) {
                var b = window.getComputedStyle(a, null);
                return "fixed" == b.getPropertyValue("position");
              }
              return !0;
            };
          for (
            null !== e.getAttribute("abp") && (f = !0), b = 0;
            b < d.nullProps.length && !c.isEmpty;
            b++
          ) {
            if (null == a[d.nullProps[b]] && !h(a)) {
              f = !0;
              break;
            }
            if (1 == f) break;
          }
          for (b = 0; b < d.zeroProps.length && !c.isEmpty && 1 != f; b++)
            0 == a[d.zeroProps[b]] && (f = !0);
          return (
            g(a, function (a) {
              if (void 0 !== window.getComputedStyle) {
                var b = window.getComputedStyle(a, null);
                ("none" != b.getPropertyValue("display") &&
                  "hidden" != b.getPropertyValue("visibility")) ||
                  (f = !0);
              }
            }),
            f
          );
        }
      });
  });
var Agent = function () {
  function a(a, b) {
    return (a || "").indexOf(b) > -1;
  }
  var b = navigator.userAgent;
  if (
    ((this.isWin = a(b, "Windows")),
    (this.isMac = a(b, "Macintosh")),
    (this.isOP = "undefined" != typeof window.opera || a(b, "Opera")),
    (this.isIE =
      !this.isOP && !!b.match(/(?:(MSIE) |(Trident)\/.+rv[ :])([\w.]+)/i)),
    (this.isEdge = /Edge/.test(b)),
    (this.isFF = a(b, "Firefox")),
    (this.isCR = a(b, "Chrome") && !this.isEdge),
    (this.isSF = !this.isCR && a(b, "Apple")),
    this.isIE)
  )
    if ("Microsoft Internet Explorer" == navigator.appName) {
      var c = parseFloat(b.match(/MSIE ([0-9\.]+)/)[1]);
      if ((isNaN(c) && (this.isIE0 = !0), 6 <= c && c < 7))
        return void (this.isIE6 = !0);
      if (7 <= c && c < 8) return void (this.isIE7 = !0);
      if (5.5 <= c && c < 6) return void (this.isIE55 = !0);
      if (c < 5.5) return (this.isIE5 = !0), void (this.isIE = !1);
      if (8 <= c && c < 9) return void (this.isIE8 = !0);
      if (9 <= c && c < 10) return void (this.isIE9 = !0);
      if (10 <= c && c < 11) return void (this.isIE10 = !0);
    } else if ("Netscape" == navigator.appName) {
      var d = new RegExp("Trident/.*rv[ :]([0-9]{1,}[.0-9]{0,})");
      if (null != d.exec(b)) {
        var e = parseFloat(RegExp.$1);
        if (11 == e) return void (this.isIE11 = !0);
      }
    }
  if (this.isMac && b.match(/Safari/i)) {
    var e = parseFloat(
      b.match(/Mac OS X ((\d+_?){2,3})/i)[1].replace(/_/g, "."),
    );
    if (e >= 10.9) return void (this.isMavericksSafari = !0);
  }
};
Agent.prototype = {
  support: function (a) {
    return (
      !this.isIE9 &&
      (10 === a
        ? !(!this.isWin || !this.isIE || this.isIE8)
        : 20 === a
          ? !(!this.isWin || !this.isIE)
          : 30 === a
            ? !(!this.isWin || (!this.isIE && !this.isCR))
            : 40 === a
              ? !(!this.isWin || !(this.isIE || this.isCR || this.isSF))
              : 45 === a
                ? !(!this.isWin || !(this.isIE || this.isSF || this.isOP))
                : 50 === a
                  ? !(
                      !this.isWin ||
                      !(this.isIE || this.isCR || this.isSF || this.isOP)
                    )
                  : 60 === a
                    ? !(
                        !this.isWin ||
                        !(this.isIE || this.isCR || this.isSF || this.isFF)
                      )
                    : 80 === a
                      ? !(
                          !this.isWin ||
                          !(
                            this.isIE ||
                            this.isFF ||
                            this.isCR ||
                            this.isSF ||
                            this.isOP
                          )
                        )
                      : 90 === a &&
                        !!(
                          this.isIE ||
                          this.isFF ||
                          this.isCR ||
                          this.isSF ||
                          this.isOP
                        ))
    );
  },
  checkAgent: function (a) {
    return 10 === a
      ? !(!this.isWin || !this.isIE || this.isIE8)
      : 20 === a
        ? !(!this.isWin || !this.isIE)
        : 30 === a
          ? !(!this.isWin || (!this.isIE && !this.isCR))
          : 40 === a
            ? !(!this.isWin || !(this.isIE || this.isCR || this.isSF))
            : 45 === a
              ? !(!this.isWin || !(this.isIE || this.isSF || this.isOP))
              : 50 === a
                ? !(
                    !this.isWin ||
                    !(this.isIE || this.isCR || this.isSF || this.isOP)
                  )
                : 60 === a
                  ? !(
                      !this.isWin ||
                      !(this.isIE || this.isCR || this.isSF || this.isFF)
                    )
                  : 80 === a
                    ? !(
                        !this.isWin ||
                        !(
                          this.isIE ||
                          this.isFF ||
                          this.isCR ||
                          this.isSF ||
                          this.isOP
                        )
                      )
                    : 90 === a &&
                      !!(
                        this.isIE ||
                        this.isFF ||
                        this.isCR ||
                        this.isSF ||
                        this.isOP
                      );
  },
  hasFP: function () {
    if (navigator.plugins && navigator.mimeTypes.length) {
      var a = navigator.plugins["Shockwave Flash"];
      if (a && a.description) return !0;
    } else
      try {
        var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        if (null != b) return !0;
      } catch (c) {}
    return !1;
  },
  dump: function () {
    document.write(navigator.userAgent + "<hr>"),
      document.write("Win : " + this.isWin + "<br>"),
      document.write("Mac : " + this.isMac + "<br>"),
      document.write("IE : " + this.isIE + "<br>"),
      document.write("IE0 : " + this.isIE0 + "<br>"),
      document.write("IE5 : " + this.isIE5 + "<br>"),
      document.write("IE55 : " + this.isIE55 + "<br>"),
      document.write("IE6 : " + this.isIE6 + "<br>"),
      document.write("IE7 : " + this.isIE7 + "<br>"),
      document.write("IE8 : " + this.isIE8 + "<br>"),
      document.write("FF : " + this.isFF + "<br>"),
      document.write("CR : " + this.isCR + "<br>"),
      document.write("SF : " + this.isSF + "<br>"),
      document.write("OP : " + this.isOP + "<br>");
  },
};
var Flash = function (a, b, c, d) {
  (this.params = {}),
    (this.vals = {}),
    (this.atts = {}),
    a && (this.setAtt("src", a), this.setParam("movie", a)),
    b && this.setAtt("width", b),
    c && this.setAtt("height", c),
    d && this.setParam("wmode", d);
  var e = a.toUpperCase().indexOf("HTTPS") > -1 ? "s" : "";
  this.setAtt("classid", "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"),
    this.setAtt("type", "application/x-shockwave-flash"),
    this.setAtt(
      "codebase",
      "http" +
        e +
        "://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0",
    ),
    this.setParam("quality", "high"),
    this.setParam("allowScriptAccess", "always"),
    this.setParam("swliveconnect", "true");
};
Flash.prototype = {
  setAtt: function (a, b) {
    this.atts[a] = b;
  },
  getAtt: function (a) {
    return this.atts[a];
  },
  setVal: function (a, b) {
    this.vals[a] = b;
  },
  getVal: function (a) {
    return this.vals[a];
  },
  setValByArray: function (a, b) {
    if (null !== a && null !== b && a.length === b.length)
      for (var c = 0, d = a.length; c < d; c++) this.setVal(a[c], b[c]);
  },
  setParam: function (a, b) {
    this.params[a] = b;
  },
  getParam: function (a) {
    return this.params[a];
  },
  getHTML: function () {
    var a,
      b = [];
    for (a in this.vals)
      this.vals.hasOwnProperty(a) && b.push(a + "=" + this.vals[a]);
    var c = b.join("&");
    null !== c && c.length > 0 && this.setParam("flashvars", c);
    var d,
      e = "",
      f = new Agent();
    if (f.isIE) {
      e = "<object ";
      for (d in this.atts)
        this.atts.hasOwnProperty(d) &&
          ((e += d), (e += '="'), (e += this.atts[d]), (e += '" '));
      e += ">\n";
      for (d in this.params)
        this.params.hasOwnProperty(d) &&
          ((e += '<param name="'),
          (e += d),
          (e += '" value="'),
          (e += this.params[d]),
          (e += '" />'));
      e += "</object>";
    } else {
      e = "<embed ";
      for (d in this.atts)
        this.atts.hasOwnProperty(d) &&
          ((e += d), (e += '="'), (e += this.atts[d]), (e += '" '));
      for (d in this.params)
        this.params.hasOwnProperty(d) &&
          ((e += d), (e += '="'), (e += this.params[d]), (e += '" '));
      e += "/>";
    }
    return e;
  },
};
var Da = {
    $: function (a) {
      return document.getElementById(a);
    },
    $$: function (a) {
      return parent.document.getElementById(a);
    },
    $$$: function (a) {
      return null != Da.$(a) ? Da.$(a) : Da.$$(a);
    },
    SH: function (a, b) {
      a.innerHTML = b;
    },
    CE: function (a, b, c, d, e) {
      var f,
        g = parent.document.createElement(b);
      for (f in c) c.hasOwnProperty(f) && g.setAttribute(f, c[f]);
      null !== d && (g.style.cssText = d),
        a.appendChild(g),
        null !== e && (g.innerHTML = e);
    },
    CS: function (a) {
      var b = parent.document.createElement("script");
      (b.type = "text/javascript"),
        (b.defer = !0),
        (b.text = a),
        (b.charset = "euc-kr"),
        parent.document.getElementsByTagName("head")[0].appendChild(b);
    },
    EF: function (a) {
      return "function" == typeof encodeURIComponent
        ? encodeURIComponent(a)
        : a
            .replace(/\%/g, "%25")
            .replace(/\&/g, "%26")
            .replace(/\?/g, "%3F")
            .replace(/\"/g, "%22")
            .replace(/\+/g, "%2B");
    },
    RE: function (a) {
      for (var b = a.firstChild; b; b = b.nextSibling)
        b.style && (b.style.cssText = "width:0px;height:0px");
      setTimeout(function () {
        (a.innerHTML = ""), a.parentNode.removeChild(a);
      }, 0);
    },
    RM: function (a) {
      for (var b = a.firstChild; b; b = b.nextSibling)
        b.style && (b.style.cssText = "width:0px;height:0px");
      (a.innerHTML = ""), a.parentNode.removeChild(a);
    },
    W: function (a) {
      document.write(a);
    },
    AE: function (a, b, c, d) {
      var e = b.toLowerCase();
      null != a &&
        ("undefined" != typeof a.addEventListener
          ? a.addEventListener(e, c, !1)
          : "undefined" != typeof a.attachEvent && a.attachEvent("on" + e, c));
    },
    FE: function (a, b) {
      var c = b.toLowerCase();
      if ("undefined" != typeof a.dispatchEvent) {
        var d = document.createEvent("HTMLEvents");
        d.initEvent(c, !0, !0), a.dispatchEvent(d);
      } else a.fireEvent("on" + c);
      return !1;
    },
    SE: function (a) {
      "undefined" != typeof a.stopPropagation
        ? a.stopPropagation()
        : (a.cancelBubble = !0);
    },
    DE: function (a, b, c) {
      var d = b.toLowerCase();
      "undefined" != typeof a.removeEventListener
        ? a.removeEventListener(d, c, !1)
        : a.detachEvent("on" + d, c);
    },
    MF: function (a, b, c, d, e, f, g) {
      e = "undefined" == typeof e ? "opaque" : e;
      var h = "";
      if ("string" == typeof f && "string" == typeof g) h = f + "=" + g;
      else if (
        f instanceof Array &&
        g instanceof Array &&
        f.length > 0 &&
        f.length == g.length
      )
        for (var i = 0; i < f.length; i++)
          i > 0 && (h += "&"), (h += f[i] + "=" + g[i]);
      var j = "",
        k = new Agent();
      return (
        k.isIE
          ? ((j =
              '<object type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' +
              c +
              '" height="' +
              d +
              '" id="' +
              b +
              '" tabindex=-1>'),
            (j += '<param name="movie" value="' + a + '" />'),
            (j += '<param name="quality" value="high" />'),
            (j += '<param name="wmode" value="' + e + '" />'),
            (j += '<param name="menu" value="false" />'),
            (j += '<param name="allowScriptAccess" value="always" />'),
            (j += '<param name="swliveconnect" value="true" />'),
            (j += '<param name="FlashVars" value="' + h + '" />'),
            (j += "</object>"))
          : ((j =
              '<embed src="' +
              a +
              '" width="' +
              c +
              '" height="' +
              d +
              '" id="' +
              b +
              '" tabindex="-1" movie="' +
              a +
              '" wmode="' +
              e +
              '" quality="high" allowScriptAccess="always" swliveconnect="true" '),
            (j +=
              'flashvars="' + h + '" type="application/x-shockwave-flash" />')),
        j
      );
    },
  },
  Nimp = function (a) {
    (this.aLists = a), (this.iSize = a.length);
  };
Nimp.prototype = {
  log: function (a) {
    if ((a--, a >= 0 && a < this.iSize)) {
      this.init();
      var b = new Image(1, 1);
      b.src = this.appendDummy(this.aLists[a]);
    }
  },
  appendDummy: function (a) {
    return (
      a.indexOf("?") > 0
        ? ((a += "&dummy="), (a += Math.random()))
        : ((a += "?dummy="), (a += Math.random())),
      a
    );
  },
  init: function () {
    if (null == this.logPlace) {
      var a = document.createElement("div");
      (a.style.display = "none"),
        document.body.appendChild(a),
        (this.logPlace = a);
    }
  },
};
var Cookie = {
    set: function (a, b, c, d) {
      c || (c = 1), d || (d = document.URL.split("/")[2]);
      var e = new Date();
      e.setHours(24 * c),
        e.setMinutes(0),
        e.setSeconds(0),
        e.setMilliseconds(0);
      var f = escape(a);
      (f += "="),
        (f += escape(b)),
        (f += "; path=/; expires="),
        (f += e.toGMTString()),
        (f += "; domain="),
        (f += d),
        (document.cookie = f);
    },
    get: function (a) {
      var b = document.cookie.match(
        new RegExp("(^|;)\\s*" + escape(a) + "=([^;\\s]+)"),
      );
      return b ? unescape(b[2]) : null;
    },
    exist: function (a) {
      var b = Cookie.get(a);
      return !!b && "" !== b.toString();
    },
  },
  Timer = function () {};
Timer.prototype = {
  setStart: function () {
    (this.iBeginTime = new Date().getTime()), (this.bIsRunning = !0);
  },
  setStop: function () {
    (this.iEndTime = new Date().getTime()), (this.bIsRunning = !1);
  },
  getTime: function () {
    return this.iEndTime - this.iBeginTime;
  },
  isRunning: function () {
    return this.bIsRunning;
  },
  toString: function () {
    return this.iBeginTime + "~" + this.iEndTime;
  },
};
var naver_corp_da = naver_corp_da || {};
(naver_corp_da.loadScript = function (a, b) {
  var c = document.createElement("script");
  (c.type = "text/javascript"),
    (c.src = a),
    c.readyState
      ? (c.onreadystatechange = function () {
          ("loaded" != c.readyState && "complete" != c.readyState) ||
            ((c.onreadystatechange = null), b && b());
        })
      : (c.onload = function () {
          b && b();
        }),
    document.getElementsByTagName("head")[0].appendChild(c);
}),
  (naver_corp_da.getClickedCoordinate = function (a) {
    a.adArea &&
      ((this.adArea = a.adArea),
      ("image" === a.adType && void 0 === a.parentArea) ||
        ((this.adType = a.adType),
        (this.parent = a.parentArea),
        (this.onClickAdArea = this.onMoveToChangeLink)));
  }),
  (naver_corp_da.getClickedCoordinate.prototype = {
    activate: function () {
      this.addEventListener();
    },
    deactivate: function () {
      this.removeEventListener();
    },
    onMoveToChangeLink: function (a) {
      a.preventDefault();
      var b = this.closest(a.target, "a"),
        c = b.href;
      if ("noMatch" !== b) {
        var d,
          e,
          f,
          g = { pageX: 0, pageY: 0, clientX: 0, clientY: 0 };
        "image" === this.adType
          ? ((e = this.getOffset(this.parent)),
            (f = this.getCoordinate(a)),
            (g.pageX = e.pageX + f.pageX),
            (g.pageY = e.pageY + f.pageY),
            (g.clientX = e.clientX + f.clientX),
            (g.clientY = e.clientY + f.clientY))
          : (g = this.getCoordinate(a)),
          (d = this.appendData(c, g)),
          parent
            ? parent.open(this.appendDummy(d))
            : window.open(this.appendDummy(d));
      }
    },
    getCoordinate: function (a) {
      var b = 0,
        c = 0;
      if (((a = a || window.event), a.pageX)) (b = a.pageX), (c = a.pageY);
      else {
        var d = 0,
          e = 0;
        this.document.documentElement.scrollLeft
          ? ((d = this.document.documentElement.scrollLeft),
            (e = this.document.documentElement.scrollTop))
          : this.document.body &&
            ((d = this.document.body.scrollLeft),
            (e = this.document.body.scrollTop)),
          (b = a.clientX + d),
          (c = a.clientY + e);
      }
      return { pageX: b, pageY: c, clientX: a.clientX, clientY: a.clientY };
    },
    getOffset: function (a) {
      var b,
        c,
        d = function (a) {
          return a && a === a.window ? a : 9 === a.nodeType && a.defaultView;
        },
        e = { top: 0, left: 0 },
        f = a && a.ownerDocument;
      if (f)
        return (
          (b = f.documentElement),
          "undefined" != typeof a.getBoundingClientRect &&
            (e = a.getBoundingClientRect()),
          (c = d(f)),
          {
            pageY: e.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
            pageX:
              e.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0),
            clientY: e.top,
            clientX: e.left,
          }
        );
    },
    appendData: function (a, b) {
      var c =
        "x_ocx=" +
        b.pageX +
        "&x_ocy=" +
        b.pageY +
        "&x_icx=" +
        b.clientX +
        "&x_icy=" +
        b.clientY;
      return (a += a.indexOf("?") > 0 ? "&" + c : "?" + c);
    },
    appendDummy: function (a) {
      return (
        a.indexOf("?") > 0
          ? ((a += "&dummy="), (a += Math.random()))
          : ((a += "?dummy="), (a += Math.random())),
        a
      );
    },
    removeEventListener: function () {
      this.adArea.removeEventListener
        ? this.adArea.removeEventListener("click", this, !1)
        : this.adArea.detachEvent("click", this, !1);
    },
    addEventListener: function () {
      this.adArea.addEventListener
        ? this.adArea.addEventListener("click", this, !1)
        : this.adArea.attachEvent("click", this, !1);
    },
    handleEvent: function (a) {
      switch (a.type) {
        case "click":
          this.onClickAdArea(a);
      }
    },
    closest: function (a, b) {
      return a.tagName.toLowerCase() === b
        ? a
        : a.id === this.adArea.id
          ? "noMatch"
          : this.closest(a.parentNode, b);
    },
  }),
  (naver_corp_da.getDateString = function () {
    var a = new Date(),
      b = a.getFullYear(),
      c = a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1,
      d = a.getDate() < 10 ? "0" + a.getDate() : a.getDate(),
      e = a.getHours() < 10 ? "0" + a.getHours() : a.getHours(),
      f = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes(),
      g = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    return b + "" + c + d + e + f + g;
  }),
  (naver_corp_da.ActiveView = function (a) {
    a.adDivId &&
      ((this.adDivId = a.adDivId),
      (this.acEndDate = a.acEndDate || "20991231235959"),
      (this.adEndDate = a.adEndDate || "20991231235959"),
      (this.scrollTarget = a.scrollTarget || window),
      (this.activeViewTime = a.activeViewTime || 0),
      (this.activeViewPercentage = a.activeViewPercentage || 1),
      (this.orientationChangeTime = a.orientationChangeTime || 500),
      (this.callback = a.callback || null),
      (this.callbackForInValid = a.callbackForInValid || null),
      (this.viewPortIn = !1),
      (this.timeout = null),
      (this.isValid = !0),
      (this.isCalledCallbackForInValid = !1),
      (this.checkViewPortHandler = function (a) {
        var b = this,
          c = naver_corp_da.getDateString(),
          d = document.getElementById(this.adDivId);
        this.isValid = c <= this.adEndDate;
        var e = this.beIntoViewPortWithRatio(d, this.activeViewPercentage),
          f = !this.beIntoViewPortWithRatio(d, 0.01);
        if (
          !this.isValid &&
          !this.isCalledCallbackForInValid &&
          this.callbackForInValid
        ) {
          var g = this.beIntoViewPortWithRatio(d, -6);
          g &&
            (this.callbackForInValid(), (this.isCalledCallbackForInValid = !0));
        }
        if (e) {
          if (((this.viewPortIn = !0), this.timeout)) return;
          this.timeout = setTimeout(function () {
            b.viewPortIn &&
              (b.callback && b.callback(), b.removeEventListener());
          }, this.activeViewTime);
        }
        if (f) {
          if (((this.viewPortIn = !1), !this.timeout)) return;
          clearTimeout(this.timeout), (this.timeout = null);
        }
      }),
      (this.orientationChangeEventHandler = function (a) {
        var b = this;
        setTimeout(function () {
          b.checkViewPortHandler();
        }, this.orientationChangeTime);
      }),
      (this.checkActiveView = function () {
        var a = this;
        AgentDetect.IS_IOS
          ? setTimeout(function () {
              a.checkViewPortHandler();
            }, 500)
          : this.checkViewPortHandler(),
          this.addEventListener();
      }),
      (this.clearActiveView = function () {
        this.removeEventListener(),
          clearTimeout(this.timeout),
          (this.timeout = null);
      }),
      (this.getIsValid = function () {
        return this.isValid;
      }));
  }),
  (naver_corp_da.ActiveView.prototype = {
    beIntoViewPortWithRatio: function (a, b) {
      if (!a) return !1;
      var b = b ? b : 1,
        c = parseInt(
          a.style.width || a.getBoundingClientRect().width || a.offsetWidth,
          10,
        ),
        d = parseInt(
          a.style.height || a.getBoundingClientRect().height || a.offsetHeight,
          10,
        ),
        e = window.pageYOffset,
        f = window.pageYOffset + window.innerHeight,
        g = window.pageXOffset,
        h = window.pageXOffset + window.innerWidth,
        i = e <= this.offset(a).top + d * (1 - b),
        j = f >= this.offset(a).top + d * b,
        k = g <= this.offset(a).left + c * (1 - b),
        l = h >= this.offset(a).left + c * b;
      return i && j && k && l;
    },
    offset: function (a) {
      var b,
        c,
        d = { top: 0, left: 0 },
        e = a && a.ownerDocument;
      if (e)
        return (
          (b = e.documentElement),
          "undefined" != typeof a.getBoundingClientRect &&
            (d = a.getBoundingClientRect()),
          (c = this.getWindow(e)),
          {
            top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
            left:
              d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0),
          }
        );
    },
    getWindow: function (a) {
      return a && a === a.window ? a : 9 === a.nodeType && a.defaultView;
    },
    removeEventListener: function () {
      this.scrollTarget.removeEventListener
        ? (this.scrollTarget.removeEventListener("scroll", this, !1),
          this.scrollTarget.removeEventListener("resize", this, !1))
        : (this.scrollTarget.detachEvent("scroll", this, !1),
          this.scrollTarget.detachEvent("resize", this, !1)),
        window.removeEventListener("orientationchange", this, !1);
    },
    addEventListener: function () {
      this.scrollTarget.addEventListener
        ? (this.scrollTarget.addEventListener("scroll", this, !1),
          this.scrollTarget.addEventListener("resize", this, !1))
        : (this.scrollTarget.attachEvent("scroll", this, !1),
          this.scrollTarget.attachEvent("resize", this, !1)),
        window.addEventListener("orientationchange", this, !1);
    },
    handleEvent: function (a) {
      switch (a.type) {
        case "scroll":
        case "resize":
          this.checkViewPortHandler(a);
          break;
        case "orientationchange":
          this.orientationChangeEventHandler(a);
      }
    },
  }),
  (naver_corp_da.activeViews = naver_corp_da.activeViews || {}),
  (naver_corp_da.clearActiveViews = function () {
    var a = naver_corp_da.activeViews;
    for (var b in a)
      a.hasOwnProperty(b) && a[b] && (a[b].clearActiveView(), (a[b] = null));
  }),
  (naver_corp_da.ActiveViewIFRAME = function (a) {
    function b() {
      $(parent.window).on("scroll resize", d);
    }
    function c() {
      $(parent.window).off("scroll resize", d);
    }
    function d() {
      e(j);
    }
    function e(a) {
      var b = f(a, 0.5),
        c = !f(a, 0.01);
      if (b === !0) {
        if (((o = !0), null !== n)) return;
        n = setTimeout(function () {
          o !== !1 && "11" === g(i).join("") && m();
        }, k);
      }
      if (c === !0) {
        if (((o = !1), n === !1)) return;
        clearTimeout(n), (n = null);
      }
    }
    function f(a, b) {
      if (AgentDetect.IS_IE && AgentDetect.searchBrowserVersion() < 9)
        return !1;
      if (void 0 === a) return !1;
      if (null === parent) return !1;
      b = void 0 !== b ? l : 1;
      var c = a.width(),
        d = a.height(),
        e = $(parent.window).scrollTop(),
        f =
          $(parent.window).scrollTop() +
          (parent.window.document.doctype
            ? $(parent.window).innerHeight()
            : parent.window.innerHeight),
        g = $(parent.window).scrollLeft(),
        h = $(parent.window).scrollLeft() + $(parent.window).innerWidth(),
        i = e <= a.offset().top + d * (1 - b),
        j = f >= a.offset().top + d * b,
        k = g <= a.offset().left + c * (1 - b),
        m = h >= a.offset().left + c * b;
      return i && j && k && m;
    }
    function g(a) {
      var b;
      try {
        b = [9, 9];
        var c = parent.document.getElementById(a);
        null === c
          ? (b[1] = 0)
          : ("none" === $(c).css("display").toLowerCase() ||
            "hidden" === $(c).css("visibility").toLowerCase()
              ? (b[1] = 0)
              : (b[1] = 1),
            h(c.parentNode, function (a) {
              1 === a.nodeType &&
                ((b[0] =
                  1 === b[0] || 9 === b[0]
                    ? "none" === $(c).css("display").toLowerCase()
                      ? 0
                      : 1
                    : b[0]),
                (b[0] =
                  1 === b[0] || 9 === b[0]
                    ? "hidden" === $(a).css("visibility").toLowerCase()
                      ? 0
                      : 1
                    : b[0]));
            }));
      } catch (d) {
        b = [0, 0];
      }
      return b;
    }
    function h(a, b) {
      for (; a; ) b(a), (a = a.parentNode);
    }
    var i = a.uId,
      j = $("#" + i, parent.document),
      k = !isNaN(a.activeViewTime) == !0 ? a.activeViewTime : 1e3,
      l = a.activeViewPercentage || 1,
      m = a.callbackIn || function () {},
      n = null,
      o = !1;
    void 0 !== j &&
      ($(this).on("removeEvent", function () {
        c();
      }),
      (this.init = function () {
        void 0 === parent.window.getComputedStyle
          ? (parent.window.daGetComputedStyle = function (a) {
              return a.currentStyle;
            })
          : (parent.window.daGetComputedStyle = parent.window.getComputedStyle),
          b(),
          d();
      }),
      (this.checkActiveView = function () {
        b(), d();
      }),
      (this.clearActiveView = function () {
        c(), null !== n && window.clearTimeout(n), (n = null);
      }));
  });
var naver_corp_da = naver_corp_da || {};
(naver_corp_da.SdkBridge = function (a) {
  function b() {
    $(parent.window).on("scroll resize", d);
  }
  function c() {
    $(parent.window).off("scroll resize", d);
  }
  function d() {
    var a = g(j).join("");
    "11" === a && e(k);
  }
  function e(a) {
    var b = f(a, 0.5),
      d = !f(a, 0.01);
    if (b === !0) {
      if (((s = !0), null !== r)) return;
      r = setTimeout(function () {
        s !== !1 && (o(), c());
      }, l);
    }
    if (d === !0) {
      if (((s = !1), r === !1)) return;
      clearTimeout(r), (r = null);
    }
  }
  function f(a, b) {
    if (AgentDetect.IS_IE && AgentDetect.searchBrowserVersion() < 9) return !1;
    if (void 0 === a) return !1;
    if (null === parent) return !1;
    b = void 0 !== b ? m : 1;
    var c = a.width(),
      d = a.height(),
      e = $(parent.window).scrollTop(),
      f =
        $(parent.window).scrollTop() +
        (parent.window.document.doctype
          ? $(parent.window).innerHeight()
          : parent.window.innerHeight),
      g = $(parent.window).scrollLeft(),
      h = $(parent.window).scrollLeft() + $(parent.window).innerWidth(),
      i = e <= a.offset().top + d * (1 - b),
      j = f >= a.offset().top + d * b,
      k = g <= a.offset().left + c * (1 - b),
      l = h >= a.offset().left + c * b;
    return i && j && k && l;
  }
  function g(a) {
    var b;
    try {
      b = [9, 9];
      var c = parent.document.getElementById(a);
      null === c
        ? (b[1] = 0)
        : ("none" === $(c).css("display").toLowerCase() ||
          "hidden" === $(c).css("visibility").toLowerCase()
            ? (b[1] = 0)
            : (b[1] = 1),
          h(c.parentNode, function (a) {
            1 === a.nodeType &&
              ((b[0] =
                1 === b[0] || 9 === b[0]
                  ? "none" === $(c).css("display").toLowerCase()
                    ? 0
                    : 1
                  : b[0]),
              (b[0] =
                1 === b[0] || 9 === b[0]
                  ? "hidden" === $(a).css("visibility").toLowerCase()
                    ? 0
                    : 1
                  : b[0]));
          }));
    } catch (d) {
      b = [0, 0];
    }
    return b;
  }
  function h(a, b) {
    for (; a; ) b(a), (a = a.parentNode);
  }
  function i(a) {
    var b = document.location.hash
      .slice(1)
      .split("&")
      .map(function (a) {
        var b = a.indexOf("=");
        return { key: a.substring(0, b), value: a.substring(b + 1, a.length) };
      })
      .filter(function (b) {
        return b.key === a;
      })[0];
    if (b) return decodeURIComponent(b.value);
  }
  var j,
    k,
    l = !isNaN(a.activeViewTime) == !0 ? a.activeViewTime : 1e3,
    m = a.activeViewPercentage || 0.5,
    n = a.checkBySelf || !1,
    o = a.viewableImpressed || function () {},
    p = a.hostMetaChanged || function () {},
    q = a.iframeHeight,
    r = null,
    s = !1,
    t = !1,
    u = null,
    v = i("runtime"),
    w = i("frameId"),
    x = i("origin"),
    y = i("msgToken"),
    z = "true" === i("isFluid");
  (this.init = function () {
    n
      ? ((v = "IFRAME"), this.handleCallbackBySelf())
      : window.sfAPI
        ? ((v = "GFPSDK"), this.handleCallbackByGladSdk())
        : "NDPSDK" === v
          ? this.handleCallbackByNdpSdk()
          : ((v = "IFRAME"), this.handleCallbackBySelf());
  }),
    (this.getRuntimeEnvType = function () {
      return v;
    }),
    (this.handleCallbackByGladSdk = function () {
      var a = window.sfAPI;
      a.register(function (a, b) {
        switch (a) {
          case "viewable":
            o();
            break;
          case "hostMetaChange":
            p(b);
        }
      });
    }),
    (this.handleCallbackByNdpSdk = function () {
      z && this.notifySafeFrameSize(),
        window.addEventListener("message", this.onMessageHandler.bind(this));
    }),
    (this.notifySafeFrameSize = function () {
      try {
        var a = q || document.body.offsetHeight,
          b = { evtType: "sf-resized", params: { frameHeight: a } };
        this.sendMsg(b);
      } catch (c) {}
    }),
    (this.sendMsg = function (a) {
      (a.iFrameId = w), (a.msgToken = y), parent.postMessage(a, x);
    }),
    (this.onMessageHandler = function (a) {
      if (a.origin === x) {
        var b = a.data,
          c = b.evtType;
        if (b.msgToken === y)
          switch (c) {
            case "intersected":
              var d = b.isIntersecting,
                e = b.intersectionRatio;
              this.checkVisibility(d, e);
              break;
            case "hostMetaChanged":
              var f = b.hostMeta;
              p(f);
          }
      }
    }),
    (this.checkVisibility = function (a, b) {
      a && b >= m
        ? t ||
          null !== u ||
          (u = setTimeout(function () {
            (t = !0), o();
          }, l))
        : u && (clearTimeout(u), (u = null));
    }),
    (this.handleCallbackBySelf = function () {
      try {
        if (
          ((j = a.uId || window.frameElement.id),
          (k = a.tarEl || $("#" + j, parent.document)),
          void 0 === k)
        )
          return;
        var c = {};
        parent.naver_corp_da &&
        parent.naver_corp_da.main &&
        parent.naver_corp_da.main.darkmode
          ? ((c.theme = "dark"), p(c))
          : ((c.theme = "light"), p(c)),
          void 0 === parent.window.getComputedStyle
            ? (parent.window.daGetComputedStyle = function (a) {
                return a.currentStyle;
              })
            : (parent.window.daGetComputedStyle =
                parent.window.getComputedStyle),
          b(),
          d();
      } catch (e) {}
    }),
    (this.checkActiveView = function () {
      "IFRAME" === this.getRuntimeEnvType() && (b(), d());
    }),
    (this.clearActiveView = function () {
      "IFRAME" === this.getRuntimeEnvType() &&
        (c(), null !== r && window.clearTimeout(r), (r = null));
    });
}),
  (naver_corp_da.Util = function () {
    (this.log = function (b) {
      var c = Array.prototype.slice.call(arguments),
        d = new Image(1, 1),
        e = {};
      c.length > 1 &&
        c[1] &&
        "[object Function]" === e.toString.call(c[1]) &&
        d.addEventListener("load", c[1]),
        (d.src = a(b)),
        (d.alt = "");
    }),
      (this.getHttpOrHttpsUrl = function (a, b) {
        return "http:" === document.location.protocol ? a : b;
      }),
      (this.beIntoViewPortWithRatio = function (a, b) {
        if (!a) return !1;
        var b = b ? b : 1,
          c = parseInt(
            a.style.height ||
              a.getBoundingClientRect().height ||
              a.offsetHeight,
            10,
          ),
          d = window.pageYOffset,
          e = window.pageYOffset + window.innerHeight,
          f = d <= naver_corp_da.getOffset(a).top + c * (1 - b),
          g = e >= naver_corp_da.getOffset(a).top + c * b;
        return f && g;
      });
    var a = function (a) {
      return (
        a.indexOf("?") > 0
          ? ((a += "&dummy="), (a += Math.random()))
          : ((a += "?dummy="), (a += Math.random())),
        a
      );
    };
  }),
  (NBP_CORP.CssLoading = function (a, b, c) {
    (this.cssSrc = a),
      (this.callback_this = c),
      this.checkloadcssfile()
        ? b(c)
        : (this.loadcssfile(), this.checkloadcssfileInterval(b));
  }),
  (NBP_CORP.CssLoading.prototype = {
    loadcssfile: function () {
      var a = document.createElement("link");
      a.setAttribute("rel", "stylesheet"),
        a.setAttribute("type", "text/css"),
        a.setAttribute("href", this.cssSrc),
        "undefined" != typeof a &&
          document.getElementsByTagName("head")[0].appendChild(a);
    },
    checkloadcssfile: function () {
      var a = document.getElementsByTagName("link");
      for (var b in a) if (a[b].href === this.cssSrc) return !0;
      return !1;
    },
    checkloadcssfileInterval: function (a) {
      var b = this,
        c = setInterval(function () {
          var d = document.getElementsByTagName("link");
          for (var e in d)
            d[e].href === b.cssSrc && (clearTimeout(c), a(b.callback_this));
        }, 10);
    },
  }),
  (NBP_CORP.Delegate = function () {}),
  (NBP_CORP.Delegate.create = function (a, b) {
    for (var c = new Array(), d = arguments.length, e = 2; e < d; e++)
      c[e - 2] = arguments[e];
    return function () {
      var d = [].concat(arguments, c);
      b.apply(a, d);
    };
  });
