# xkcd reader

## What

A static site generator to build a lovely kxcd reader

## Why

This project came about as part of an interview assignment for Embark Studios.

## How it works

If you need to edit the HTML, be sure to do it in the generator.ts file.

## Issues

### Comics

Comic no. 404 is an obvious, but quite hilarious prank.
Comics no. 1608 and 1663 have been omitted.
They are interactive comics.

### Styling

#### Slider
Styling the slider is non-trivial in webkit.
This is due to conflicting css properties.
For a vertical slider we need:

```css
-webkit-appearance: slider-vertical;
```

To style it we need:

```css
-webkit-appearance: none;
```

A workaround is to position it horizontally, transform it, and apply the calculations needed in order to reposition it correctly.
See https://css-tricks.com/custom-interactive-range-inputs. 

For now, we've styled it for Firefox and left the default webkit styling for what it is.

#### Detail view image
```css
display: flex
justify-content: center;
align-items: center;
```

Centers the image beautifully on desktop.
On mobile however, it cuts off the left portion of the image for some reason.

Now centering of the image is done with:
```css
body {
    text-align: center;    
}
```
of course 😂

#### Bottom menu on detail view
On mobile we often find ourselves zooming into the image, this causes the viewport to change, and therefore our bottom menu with 
```css
position:fixed;
```
gets totally skewed. A possible workaround is to:
1) calculate the zoom level and adjust our postion, width etc, accordingly.
2) Or we can create a Canvas the size of our viewport, position the image in there and only zoom in the canvas.
Something like https://github.com/openseadragon/openseadragon could also be used.

We opted for the easy solution, to not let the image get bigger than our screen, and if you want to zoom in, you get taken to the bare image itself.
