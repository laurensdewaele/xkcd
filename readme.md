# xkcd reader

## [https://xkcd-reader.netlify.app/](https://xkcd-reader.netlify.app/)

An [xkcd](https://xkcd.com/) reader, built as an interview assignment for [Embark Studios](https://www.embark-studios.com/).

How it works:

1. The `scraper.ts` scrapes all the comics, with it's additional metadata, off of the xkcd site and saves it into a giant `comics.json`. It also fetches the comic image, resizes it and converts it to the `.webp` format.
2. The static html site generator, `generator.ts`, loops over the `comics.json` and builds placeholder `<div>'s` with the width and height of each resized `.webp` image.
3. We can't load all the images at once, so only the images that are in the viewport are being fetched. This takes place in `main.js`.
4. For the detail page, we pass along the comicNo on the queryparams like so: `/detail.html?21`. `detail.js` parses it, and retrieves the comic in the `comics.json` file and fetches the original, non-resized image.
5. For deployment there's a [Github actions](https://github.com/features/actions) cron job, that runs a Netlify hook and redeploys every 4 hours to accommodate new comics.

Keep in mind that, in order to update the `index.html`, once needs to do it in the `generator.ts` file!

### Issues

#### Comics

Comic no. 404 is an obvious, but quite hilarious prank.

Comics no. [1608](https://xkcd.com/1608/) and [1663](https://xkcd.com/1663/) have been omitted.
They are interactive comics.

#### Styling

##### Slider

Styling the slider is non-trivial in webkit.
This is due to conflicting css properties.
For a vertical slider we need:

```css
-webkit-appearance: slider-vertical;
```

To custom style it we need:

```css
-webkit-appearance: none;
```

A workaround is to position it horizontally, transform it, and apply the calculations needed in order to reposition it correctly.
See https://css-tricks.com/custom-interactive-range-inputs.

For now, we've styled it for Firefox and left the default webkit styling for what it is.
