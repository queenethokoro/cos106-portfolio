# Student Portfolio & Academic Management Platform (COS 106)

A responsive, multi-page personal academic portfolio and student task management web application designed and developed for the **COS 106 (Introduction to Web Technologies)** Lab Assessment at **Miva Open University**.




## Student Information
**Full Name:** Queeneth Nsirimobi Okoro

**Matriculation Number:** 2025/A/DSC/0203

**Department / Programme:** B.Sc. Data Science

**University Email:** q.okoro3921@miva.edu.ng

**Course Code:** COS 106 — Introduction to Web Technologies




## Live Project Links
**🌐 Live Hosted Website (GitHub Pages):** https://queenethokoro.github.io/cos106-portfolio/

**💻 GitHub Repository:** https://github.com/queenethokoro/cos106-portfolio



## Project Overview
This platform serves a dual purpose:
1. **Executive Academic & Professional Portfolio:** Showcases academic credentials, 9+ industry certifications, technical competencies in Data Science and Product Design, an HTML5 video introduction pitch, and interactive project case studies.
   
2. **Interactive Student Task Management System:** Provides a client-side **Academic Planner** backed by browser `localStorage` that allows students to create, categorize, filter, complete, and delete academic tasks in real time.




## Multi-Page Architecture (5 Pages)
**`index.html` (Homepage):** Hero section with custom geometric portrait frame, welcome badge, biography summary, and quick-action navigation buttons.

**`about.html` (About Me):** Career aspirations, playable HTML5 `<video>` introduction (`intro-video.mp4`), structured academic/certification tables, and categorized skill blocks.

**`projects.html` (Projects):** Responsive 2x2 portfolio grid showcasing four EdTech, Product Design, and Brand Leadership projects with live Figma/Canva links and an interactive JavaScript Case-Study Modal.

**`planner.html` (Academic Planner):** Full CRUD task manager with real-time summary counters (*Total*, *Completed*, *Pending*) and multi-criteria filtering (*Status*, *Category*, *Due Date*).

**`contact.html` (Contact):** Direct professional contact channels paired with a client-side Regex-validated message form.




## Technologies & Technical Compliance

### 1. HTML5 Requirements Implemented
a.  Semantic structural tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)

b.  Interactive validated `<form>` controls (`planner.html`, `contact.html`)

c.  Relational data `<table>` structures with `<thead>` and `<tbody>` (`about.html`, `planner.html`)

d.  Custom `<video>` multimedia player with metadata preloading (`about.html`)

e.  Accessible images, unordered lists (`<ul>`), and internal/external hyperlinks (`<a>`)



### 2. CSS3 Requirements Implemented (`style.css`)
a. Centralized external stylesheet using `:root` CSS Custom Properties (**Royal Indigo `#1e2a78`** & **Gold `#fbc02d`** palette)

b. Responsive **CSS Grid** and **Flexbox** layouts

c. Multi-breakpoint `@media` queries (`1024px` tablet/split-screen and `850px` mobile drawer)

d. Smooth keyframe animations, hover micro-interactions, and Dark/Light theme styling



### 3. JavaScript (ES6+) Features Implemented (`script.js`)
a. **Persistent Academic Task Manager:** Uses arrays of objects, `.forEach()`, `.filter()`, DOM manipulation, and `localStorage` (`JSON.stringify` / `JSON.parse`) to add, toggle, filter, and delete tasks.

b. **Client-Side Form Validation:** Intercepts form submission (`event.preventDefault()`) and validates non-empty inputs, valid email format (`/^\S+@\S+\.\S+$/`), and numeric-only phone numbers (`/^\d+$/`).

c. **Interactive Case-Study Modal System:** Dynamically populates project details from a JavaScript object dictionary into a popup modal overlay.

d. **Zero-Flash Dark/Light Theme Engine & Mobile Drawer:** Persists user theme preference in `localStorage` across all 5 pages and controls the floating mobile hamburger navigation card.

e. **Scroll-Reveal Dynamic Animations:** Uses the browser `IntersectionObserver` API to smoothly animate cards into view on scroll.





## How to Run Locally
Clone or download this repository:
   ```bash
https://github.com/queenethokoro/cos106-portfolio.git
