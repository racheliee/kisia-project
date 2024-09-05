var executeCmd = function (e) {
    if ("function" == typeof e)
      try {
        e();
      } catch (e) {}
  },
  processCommands = function (e) {
    for (; e.length > 0; ) {
      var n = e.shift();
      executeCmd(n);
    }
  };
(window.ndpsdk = window.ndpsdk || { polyfill: { cmd: [] }, cmd: [] }),
  (window.ndpsdk.polyfill = {
    cmd: window.ndpsdk.polyfill.cmd || [],
    support: function () {
      var e = window.navigator.userAgent.toLowerCase(),
        n = {
          IS_IE: !!e.match(/(?:(MSIE) |(Trident)\/.+rv[ :])([\w.]+)/i),
          searchBrowserVersion: function () {
            if (this.IS_IE)
              return "Microsoft Internet Explorer" == navigator.appName
                ? parseFloat(e.match(/MSIE ([0-9.]+)/i)[1])
                : "Netscape" == navigator.appName &&
                    null !=
                      new RegExp("trident/.*rv[ :]([0-9]{1,}[.0-9]{0,})").exec(
                        e,
                      )
                  ? parseFloat(RegExp.$1)
                  : -1;
          },
        };
      return !(n.IS_IE && n.searchBrowserVersion() <= 10);
    },
    load: function () {
      var e = document.createElement("script");
      (e.async = !0),
        (e.type = "text/javascript"),
        (e.src = this.getCdnDomain() + "ndp-core.js");
      var n = document.getElementsByTagName("head")[0];
      n.insertBefore(e, n.firstChild);
    },
    getCdnDomain: function () {
      return "https://ssl.pstatic.net/tveta/libs/ndpsdk/prod/";
    },
  }),
  (window.ndpsdk.polyfill.cmd.push = function (e) {
    executeCmd(e);
  }),
  ndpsdk.polyfill.support()
    ? ((ndpsdk.polyfill.cmd = []), ndpsdk.polyfill.load())
    : processCommands(ndpsdk.polyfill.cmd);
