let nav;
let caret;
let isNavOpen = true;
const caretContainerWidth = 2 * 16;

const toggleNav = () => {
  const { width } = nav.getBoundingClientRect();
  if (isNavOpen) {
    nav.style.left = `${-width + caretContainerWidth}px`;
    caret.innerHTML = ">";
  } else {
    nav.style.left = `-1px`;
    caret.innerHTML = "<";
  }
  isNavOpen = !isNavOpen;
};

const isInViewport = ({ top, bottom }, windowHeight) => {
  return (
    (bottom >= 0 && bottom <= windowHeight) ||
    (top >= 0 && top <= windowHeight) ||
    (top < 0 && bottom > windowHeight)
  );
};

const onload = () => {
  nav = document.getElementsByTagName("nav")[0];
  caret = document.getElementById("caret");

  const latestComicNo = parseInt(
    document.getElementsByClassName("placeholder")[0].getAttribute("id")
  );

  const elements = {};
  for (let i = 1; i <= latestComicNo; i++) {
    if (!(i == 404 || i == 1608 || i == 1663)) {
      elements[i] = document.getElementById(i.toString());
    }
  }

  const slider = document.getElementById("slider");
  slider.setAttribute("max", latestComicNo.toString());
  slider.setAttribute("value", latestComicNo.toString());
  slider.oninput = (e) => {
    elements[e.currentTarget.value].scrollIntoView();
  };

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const handler = () => {
    for (let no in elements) {
      const rect = elements[no].getBoundingClientRect();
      if (isInViewport(rect, windowHeight)) {
        slider.value = no;
        if (elements[no].childElementCount === 0) {
          const img = document.createElement("img");
          img.src = `./assets/images/${no}.webp`;
          elements[no].appendChild(img);
        }
      }
    }
  };

  handler();
  addEventListener("scroll", handler, false);
};

window.onload = onload;
