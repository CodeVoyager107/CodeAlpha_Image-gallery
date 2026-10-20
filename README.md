# Picture Garden Gallery

Build a responsive, modern image gallery web app.

Layout and design:

- A clean header with the title "Image Gallery" and a short subtitle.

- A responsive grid of 12 to 16 images (CSS grid, masonry-style or uniform cards) using free Unsplash image URLs across categories like Nature, Cities, Animals and Food.

- 4 columns on desktop, 2 on tablet, 1 on mobile.

- Rounded corners, soft shadows and a neutral modern color scheme.

Features:

1. Lightbox view: clicking an image opens a full-screen overlay with the enlarged image, a dark backdrop and a close button (X). Clicking the backdrop or pressing Esc also closes it.

2. Navigation: Next and Previous buttons inside the lightbox, plus left and right arrow key support. Show an image counter like "3 / 12" and wrap around at the ends.

3. Hover effects: on hover, the image slightly zooms in, a dark overlay fades in, and the image title and category appear.

4. Smooth transitions: fade and scale animation when opening and closing the lightbox, and fade when switching images.

5. Responsive design: works well on mobile, tablet and desktop, with touch-friendly buttons.

6. Bonus, category filters: filter buttons at the top (All, Nature, Cities, Animals, Food). The active filter is highlighted, and the grid animates smoothly when filtering. The lightbox navigation only cycles through the currently filtered images.

Technical notes:

- Keep the code clean and well commented.

- Use semantic HTML, alt text for every image and lazy loading.

- Make the lightbox keyboard accessible.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://picture-garden-gallery.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b8d9710f-bc59-484f-91d0-4933d7c3eeca).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
