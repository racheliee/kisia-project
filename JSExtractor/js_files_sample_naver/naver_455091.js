!(function () {
  function t(t) {
    var e = document.getElementById("search_area"),
      n = document.getElementById("search-btn");
    if (!t)
      return (
        e && e.removeAttribute("style"),
        void (n && n.setAttribute("style", "fill: #03c75a"))
      );
    e && e.setAttribute("style", "border-color: " + t),
      n && n.setAttribute("class", "ico_btn_search type_color"),
      n && n.setAttribute("style", "fill: " + t);
  }
  var e = window["EAGER-DATA"]["CAS-MINICONTENT-PC-SPECIAL-LOGO"];
  if (!e || !e.items || e.items.length > 0 == !1) return void t();
  var n = Math.floor(Math.random() * e.items.length),
    i = e.items[n];
  (e.items = [i]),
    t(i && i.content && i.content.input && i.content.input.color);
  const l = document.getElementById("search");
  l && l.classList.add("type_special_logo_full"),
    window.addEventListener("header-sticky-state-change", function () {
      var t;
      (t = document.getElementById("header")) &&
      t.classList.contains("ani_fixed")
        ? l && l.classList.remove("type_special_logo_full")
        : l && l.classList.add("type_special_logo_full");
    });
  var o = i && i.content && i.content.input && i.content.input.placeholder;
  if (o) {
    var s = document.getElementById("query");
    s && o && s.setAttribute("title", o),
      s && o && s.setAttribute("placeholder", o);
  }
})();
