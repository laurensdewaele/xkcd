var start = function () {
  var elements = {};
  for (var i = 1; i <= 600; i++) {
    if (i !== 404) {
      elements[i] = document.getElementById(i.toString());
    }
  }
  var isInViewport = function (_a, windowHeight) {
    var top = _a.top,
      bottom = _a.bottom;
    return (
      (bottom >= 0 && bottom <= windowHeight) ||
      (top >= 0 && top <= windowHeight) ||
      (top < 0 && bottom > windowHeight)
    );
  };
  var windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  var handler = function () {
    for (var no in elements) {
      var el = elements[no];
      var rect = el.getBoundingClientRect();
      if (isInViewport(rect, windowHeight)) {
        if (el.childElementCount === 0) {
          console.log("fetching no", no);
          var img = document.createElement("img");
          img.src = "./assets/images/" + no + ".webp";
          el.appendChild(img);
        }
      }
    }
  };
  if (window.addEventListener) {
    addEventListener("DOMContentLoaded", handler, false);
    addEventListener("load", handler, false);
    addEventListener("scroll", handler, false);
  }
};
window.onload = start;
