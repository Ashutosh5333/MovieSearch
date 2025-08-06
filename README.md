## Overview

`MovieCard` is a React functional component built with Next.js and Framer Motion. It showcases a movie poster with interactive hover effects. 
The card displays movie information (title, year, type) upon hover and handles external image loading with a placeholder fallback if the poster is unavailable.

## Features

- Displays movie poster images from external URLs or a fallback image if unavailable.
- Smooth scale animation on hover using Framer Motion.
- Overlay with movie title, year, and type appears on hover.
- Uses Next.js `` component for optimized image loading.
- Responsive and visually appealing design with TailwindCSS.
- Clickable card, allowing any passed click handler.

## Prerequisites

- [Node.js](https://nodejs.org/) (recommended v14+)
- [Next.js](https://nextjs.org/) (tested with v13+)
- npm or yarn as the package manager

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone (https://github.com/Ashutosh5333/MovieSearch.git)
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure `next.config.js` for external images**

   Next.js requires a list of allowed external image domains. For movie posters served from, for example, `m.media-amazon.com`:

   ```js
   // next.config.js
   module.exports = {
     images: {
       domains: ['m.media-amazon.com'],
     },
   };
   ```

4. **Add a placeholder image**

   Place a fallback image `placeholder.jpg` inside the `/public` folder for movies without a poster:

   ```
   /public
     └─ placeholder.jpeg
   ```

## How It Works

1. **Image Selection:**  
   The `MovieCard` component checks if the movie's poster URL is `"N/A"`. If so, it uses the local placeholder image (`/placeholder.jpg`).
   Otherwise, it loads the external poster URL.

3. **Image Loading:**  
   Next.js `` optimizes and handles image loading. Domains must be whitelisted in `next.config.js` to avoid errors.

4. **Hover Effect:**  
   Using Framer Motion, the card scales up slightly (`scale: 1.08`) on hover to highlight the card.

5. **Overlay:**  
   The overlay with movie title, year, and type is hidden by default (`opacity: 0`). It smoothly fades in on hover (`opacity: 1`).

6. **Click Handling:**  
   Clicking the card triggers the passed `onClick` function for further behavior (such as showing details).

## Screenshots

Here is the screenshots below to illustrate the UI and workflow.

### Movievault

<img width="1694" height="865" alt="Screenshot 2025-08-06 at 9 30 04 PM" src="https://github.com/user-attachments/assets/207a349d-76e1-4dba-81fe-e336e2e3ebe5" />

## Search

<img width="1699" height="894" alt="Screenshot 2025-08-06 at 9 30 24 PM" src="https://github.com/user-attachments/assets/8054d8fb-3ac5-4b10-a21f-37225af1bc59" />

## Pagination

<img width="1699" height="903" alt="Screenshot 2025-08-06 at 9 30 34 PM" src="https://github.com/user-attachments/assets/1a9eb9b7-1e54-421f-87c4-008ecb07fae8" />

## Filters

<img width="1683" height="882" alt="Screenshot 2025-08-06 at 9 30 59 PM" src="https://github.com/user-attachments/assets/76063950-f636-4721-a070-3f4a4e0e4179" />

## Details

<img width="1675" height="850" alt="Screenshot 2025-08-06 at 9 31 15 PM" src="https://github.com/user-attachments/assets/610f6f77-7f4f-4afd-8965-8be6ca1ff862" />

## Not found

<img width="1643" height="841" alt="Screenshot 2025-08-06 at 9 31 39 PM" src="https://github.com/user-attachments/assets/4d929eaf-f362-46c8-aa17-2f4cd9dbbd9a" />

## Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [TailwindCSS](https://tailwindcss.com/) (for styling)

## Contact

For questions or help, contact: `lakshakarAshutosh@gmail.com`.
