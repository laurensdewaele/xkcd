const isInViewport = ({ top, bottom }, windowHeight) => {
  return (
      (bottom >= 0 && bottom <= windowHeight) ||
      (top >= 0 && top <= windowHeight) ||
      (top < 0 && bottom > windowHeight)
  );
};

const onload = () => {
  const latestComicNo = parseInt(
    document
      .getElementsByTagName("main")[0]
      .firstElementChild.getAttribute("id")
  );

  const slider = document.getElementById("slider");
  slider.setAttribute("max", latestComicNo.toString());
  slider.setAttribute("value", latestComicNo.toString());
  slider.oninput = (e) => {
    document.getElementById(e.currentTarget.value).scrollIntoView();
  }

  const elements = {};
  for (let i = 1; i <= latestComicNo; i++) {
    if (i !== 404) {
      elements[i] = document.getElementById(i.toString());
    }
  }

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const handler = () => {
    for (let no in elements) {
      const rect = elements[no].getBoundingClientRect();
      if (
        isInViewport(rect, windowHeight) &&
        elements[no].childElementCount === 0
      ) {
        slider.setAttribute("value", no);
        const img = document.createElement("img");
        img.src = `./assets/images/${no}.webp`;
        elements[no].appendChild(img);
      }
    }
  };

  handler();
  addEventListener("scroll", handler, false);
};

window.onload = onload;
