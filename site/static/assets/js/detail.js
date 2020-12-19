const comicNo = parseInt(window.location.search.substring(1));

let info;
let caret;
let isInfoOpen = true;
const caretContainerHeight = 2 * 16;

const toggleInfo = () => {
  const { height } = info.getBoundingClientRect();
  if (isInfoOpen) {
    info.style.bottom = `${-height + caretContainerHeight}px`;
    caret.style.transform = `rotate(180deg)`;
  } else {
    info.style.bottom = `-1px`;
    caret.style.transform = `rotate(360deg)`;
  }
  isInfoOpen = !isInfoOpen;
};

const load = () => {
  info = document.getElementById("info");
  caret = document.getElementById("caret");

  const dateEl = document.getElementById("date");
  const noEl = document.getElementById("no");
  const titleEl = document.getElementById("title");
  const safeTitleEl = document.getElementById("safe-title");
  const altEl = document.getElementById("alt");
  const transcriptEl = document.getElementById("transcript");
  const newsEl = document.getElementById("news");
  const linkEl = document.getElementById("link");

  const img = document.getElementById("img");
  const imgAnchor = document.getElementById("img-anchor");

  fetch(`./assets/comics.json`)
    .then((response) => response.json())
    .then((comics) => {
      const {
        day,
        month,
        year,
        no,
        title,
        safeTitle,
        originalImg,
        link,
        news,
        transcript,
        alt,
      } = comics[comicNo];
      imgAnchor.href = originalImg;
      img.src = originalImg;
      img.alt = alt;
      dateEl.innerText = `${day}/${month}/${year}`;
      noEl.innerText = no.toString();
      titleEl.innerText = title === "" ? `null` : title;
      safeTitleEl.innerText = safeTitle === "" ? `null` : safeTitle;
      altEl.innerText = alt === "" ? `null` : alt;
      transcriptEl.innerText = transcript === "" ? `null` : transcript;
      newsEl.innerText = news === "" ? `null` : news;
      linkEl.innerText = link === "" ? `null` : link;
      toggleInfo();
      info.style.visibility = "visible";
    });
};

window.onload = load;
