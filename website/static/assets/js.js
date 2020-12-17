const start = () => {

    const elements = {};
    for (let i = 1; i <= 600; i++) {
        if (i !== 404) {
            elements[i] = document.getElementById(i.toString());
        }
    }

    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            (rect.bottom >= 0 && rect.bottom <= window.innerHeight) || (rect.top >= 0 && rect.top <= window.innerHeight)
        );
    }

    const handler = () => {
        for (let no in elements) {
            const el = elements[no];
            if (isInViewport(el)) {

                if (el.childElementCount === 0) {
                    console.log('fetching no', no);
                    const img = document.createElement("img");
                    img.src = `./assets/images/${no}.webp`;
                    el.appendChild(img);
                }
            }
        }
    }


    if (window.addEventListener) {
        addEventListener('DOMContentLoaded', handler, false);
        addEventListener('load', handler, false);
        addEventListener('scroll', handler, false);
    }
}

window.onload = start;
