# xkcd reader

## What

A static site generator to build a lovely kxcd reader

## Why

This project came about as part of an interview assignment for Embark Studios.

## How it works

If you need to edit the HTML, be sure to do it in the generator.ts file.

## Issues

Styling the slider is not trivial in webkit.
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
