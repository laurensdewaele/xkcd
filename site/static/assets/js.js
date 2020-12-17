const onload = () => {
  const latestComicNo = parseInt(
    document
      .getElementsByTagName("body")[0]
      .firstElementChild.getAttribute("id")
  );

  const elements = {};
  for (let i = 1; i <= latestComicNo; i++) {
    if (i !== 404) {
      elements[i] = document.getElementById(i.toString());
    }
  }

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const isInViewport = ({ top, bottom }, windowHeight) => {
    return (
      (bottom >= 0 && bottom <= windowHeight) ||
      (top >= 0 && top <= windowHeight) ||
      (top < 0 && bottom > windowHeight)
    );
  };

  const handler = () => {
    for (let no in elements) {
      const rect = elements[no].getBoundingClientRect();
      if (
        isInViewport(rect, windowHeight) &&
        elements[no].childElementCount === 0
      ) {
        console.log("fetching no", no);
        const img = document.createElement("img");
        img.src = `./assets/images/${no}.webp`;
        elements[no].appendChild(img);
      }
    }
  };

  if (window.addEventListener) {
    addEventListener("DOMContentLoaded", handler, false);
    addEventListener("load", handler, false);
    addEventListener("scroll", handler, false);
  }
};

window.onload = onload;
