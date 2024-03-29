# fwoh
A javascript library for adjusting elements to their parent's width or height, ensuring that they completely fill the parent while maintaining their aspect ratio

## What It Does

This tool essentially resizes elements in the same manner as `object-fit: contain`, but without cropping the element once fit to its container. I wanted to be able to fit images inside of a div such that you could see as much of the image as possible, without letterbox-esque borders, while still being able to scroll to see the rest of the image (see [this project](https://shitchell.github.io/sm-viewer/) for an example).

## Compatibility

Tested on Chrome for Android, Chrome, Firefox, Safari, and a crappy SmartTV browser. The original intent was to be able to use it for a custom web-based screensaver on a TV using the somewhat feature-lacking web browsers found on SmartTV's/Xboxes/Wiis, etc... so it should be compatible with most every browser that runs Javascript. Feel free to let me know or send a pull request if you find a browser it doesn't work on!

## Getting Started

#### Include the javascript file in your page

```html
<script type="application/javascript" src="js/fwoh.js"></script>
```

#### Edit your HTML elements

1. Add the "fwoh" class to an element
2. ???
3. Profit

#### Exempli Gratia

```html
<div class="img-wrapper" style="width: 400px; height: 200px;">
  <img class="fwoh" src="img/profile.jpg" />
</div>
```

The `<img>` will be resized such that it expands to fill the wrapper while maintaining its aspect ratio.

**If the image is _1920x768_**

This will adjust the `<img>` to *500x200*, matching the parent's height and resizing the image's width to maintain its original ratio

**If the image is _1280x720_**

This will adjust the `<img>` to *400x225*, matching the parent's width and resizing the image's height to maintain its original ratio
