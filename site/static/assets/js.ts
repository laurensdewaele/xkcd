const start = () => {
  const elements = {};
  for (let i = 1; i <= 600; i++) {
    if (i !== 404) {
      elements[i] = document.getElementById(i.toString());
    }
  }

  const isInViewport = ({ top, bottom }, windowHeight) => {
    return (
      (bottom >= 0 && bottom <= windowHeight) ||
      (top >= 0 && top <= windowHeight) ||
      (top < 0 && bottom > windowHeight)
    );
  };

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const handler = () => {
    for (let no in elements) {
      const el = elements[no];
      const rect = el.getBoundingClientRect();
      if (isInViewport(rect, windowHeight)) {
        if (el.childElementCount === 0) {
          console.log("fetching no", no);
          const img = document.createElement("img");
          img.src = `./assets/images/${no}.webp`;
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
