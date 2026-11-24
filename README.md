# Odyssey website

A static site: plain HTML, CSS and a small JavaScript file. It needs no build step and can be hosted anywhere (Netlify, Vercel, GitHub Pages, Wix custom code, or any web server).

## Pages
- `index.html`: Home
- `journey.html`: The Journey (four chapters, comparison, FAQ)
- `great-room.html`: The Great Room, Gaysorn Tower
- `mentors.html`: Mentors
- `admissions.html`: Admissions and the enquiry form

## Brand
- Navy `#29354F` (sampled from the logo), ivory `#F6F2EA`, antique gold `#B8955E`
- Headings in Cormorant Garamond, body text in Jost (both from Google Fonts)
- Logo files are in `assets/`: the original, a white version for dark backgrounds, and a navy version for light backgrounds.

## Replacing a placeholder image
Each grey-blue placeholder is a `<div class="media" data-ph="...">`. To replace one, put an image inside it:

```html
<div class="media" data-ph="The Great Room, Gaysorn"><img src="assets/great-room.jpg" alt="The Great Room lounge at Gaysorn Tower"></div>
```

The image fills the frame, and the placeholder label disappears on its own.

## Enquiry form
There is no server yet, so the form opens the visitor's email app with the enquiry already filled in, addressed to `team@tradewind-tech.com`. To collect enquiries directly, connect a form service such as Formspree, Tally or HubSpot in `js/main.js`.
