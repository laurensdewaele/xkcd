const comicNo = parseInt(window.location.search.substring(1));

const load = () => {
  const dateEl = document.getElementById("date");
  const noEl = document.getElementById("no");
  const titleEl = document.getElementById("title");
  const safeTitleEl = document.getElementById("safe-title");
  const altEl = document.getElementById("alt");
  const transcriptEl = document.getElementById("transcript");
  const newsEl = document.getElementById("news");
  const linkEl = document.getElementById("link");

  const body = document.getElementsByTagName("body")[0];
  const img = document.createElement("img");

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
      img.src = originalImg;
      img.alt = alt;
      body.appendChild(img);
      dateEl.innerText = `${day}/${month}/${year}`;
      noEl.innerText = no.toString();
      titleEl.innerText = title === "" ? `null` : title;
      safeTitleEl.innerText = safeTitle === "" ? `null` : safeTitle;
      altEl.innerText = alt === "" ? `null` : alt;
      transcriptEl.innerText = transcript === "" ? `null` : transcript;
      newsEl.innerText = news === "" ? `null` : news;
      linkEl.innerText = link === "" ? `null` : link;
    });
};

window.onload = load;