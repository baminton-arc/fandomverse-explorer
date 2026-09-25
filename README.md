# FandomVerse Explorer

1. Landing Page: The 3D Interactive Fandom Universe

The 3D Hero Concept: Inspired by the interactive WebGL globe on the GitHub homepage, the FandomVerse landing page features a 3D interactive "solar system" built with React Three Fiber.

Implementation: The central sun represents the "FandomVerse" portal logo, surrounded by 7 orbiting 3D planets representing the required categories: Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga. Users can click and drag to rotate the universe. Clicking a planet seamlessly zooms the camera in, triggering a Framer Motion page transition into that specific Category Hub.

Animated Utilities: The mandatory real-time clock and simulated visitor counter are displayed as a futuristic, neon-glowing HUD (Heads Up Display) overlay on the 3D canvas, featuring rolling flip-clock number animations.

Floating AI Mascot: A low-poly 3D robot hovers in the bottom corner of the screen. Clicking it opens the AI chatbot, which runs on a pre-scripted JSON dataset to answer FAQs without needing a backend.

2. Category Hubs: Cinematic Scroll & Layout

Inspiration: Apple’s product landing pages and the Valorant official website.

Scroll-Triggered Reveals: As the user scrolls down a category hub (e.g., Gaming or Anime), GSAP (GreenSock) ScrollTrigger fades and slides content cards upward into view.

Data Binding: All content cards (title, thumbnail, description, content type, tags) are dynamically mapped from the pre-populated JSON files.

Interactive Filters: A sticky, glassmorphism filter bar stays at the top. When users filter by sub-tags or sort (alphabetically/newest/popularity), the grid uses Framer Motion's layout prop to make the cards fluidly shuffle into their new positions rather than instantly snapping.

3. Media & Content Modules: Micro-Interactions

3D Character Cards: Inspired by digital trading card sites (like Pokémon TCG viewers), the 5 required character profiles per category are presented as holographic trading cards. Using react-tilt or Framer Motion, the cards tilt based on cursor movement, revealing a glossy, reflective glare over the character's Name, Image, Series, Bio, and Traits.

Lightbox Galleries & Media: The image galleries, embedded trailers, and audio clips use a layout-expanding animation. Clicking a thumbnail smoothly expands it into a full-screen blurred glass modal (using CSS backdrop-filter: blur), ensuring visitors can view trailers and images without leaving the page.

Event Highlights Timeline: The 3 required events per category are displayed on a vertical, neon-lit timeline. As the user scrolls, the active event (showing Title, date, location, description) pulses with a CSS3 keyframe glow effect.

4. Merchandise Showcase & Cart: Physics & Motion

Inspiration: High-end e-commerce sites like Nike By You.

Product Interaction: Merchandise items (t-shirts, figures) hover slightly on the page. If the user clicks "Add to Cart", a miniature clone of the item's image scales down and flies in an arc across the screen into the shopping cart icon at the top right.

Cart Logic: The shopping cart slides out from the right (off-canvas menu), calculating the total billing amount instantly using JavaScript. Since the SRS forbids backend checkout, the "Checkout" button can trigger a playful 3D "Payment Success" or "Under Construction" modal to respect the constraint.

5. Global Features: Bookmarks & Navigation

Action Feedback: When a user clicks the bookmark icon on any article, character, or event, a micro-interaction triggers (e.g., a burst of yellow SVG stars). The data is saved instantly to the browser's Local Storage.

Session Notes: A sleek, sliding drawer appears when attaching a personal note to a bookmark, utilizing Session Storage so the notes clear upon closing the browser.

Global Search: The search bar in the navbar expands smoothly upon clicking. As the user types, a dropdown panel populates instantly with cross-category JSON results, with each result sliding in with a slight delay for a cascading effect.

Static Pages: The "Contact Us" page integrates the required Google Map on a 3D tilted plane, while the "About Us" page features a parallax scrolling background detailing the team's information.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d7ba753f-ff85-4ef7-9ae3-b300547053f8).

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
