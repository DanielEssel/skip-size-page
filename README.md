# Skip Size Selector (Front-End React Challenge)

This project is a modern, responsive, and accessible redesign of the "Choose Your Skip Size" page for a skip hire web application. The goal was to demonstrate strong front-end skills, including clean React code, UI/UX improvements, and mobile-first responsiveness, based on a real-world technical challenge.

---

## ✨ Features

- **Completely Redesigned UI:** Visually distinct from the original, with a modern, friendly, and accessible interface.
- **Responsive Design:** Optimized for both desktop and mobile experiences.
- **Dynamic Data:** Skip options are loaded live from the provided API endpoint.
- **Accessible:** High-contrast colors, keyboard navigable, semantic markup.
- **Selection Flow:** Users select one skip size; upon selection, a floating card pops up displaying skip details and a clear "Continue to Next Step" button.
- **Filtering:** Skips can be filtered by road allowance, price, and size.

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/skip-size-selector.git
   cd skip-size-selector
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **View in browser:**
   Open [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Technical Approach

- **React Functional Components:** All UI built using functional components and hooks for state and effects.
- **Component Structure:**
  - `SkipSelectionPage`: Main container, handles data fetching, filtering, and selection logic.
  - `SkipCard`: Displays an individual skip, highlighting the selected one.
  - `FilterBar`: UI for filtering skip options by criteria.
  - `ProgressStepper`: Shows the booking progress.
- **Styling:** Built with Tailwind CSS (or CSS Modules), ensuring maintainable, scalable, and responsive styles.
- **Popup Selection Card:** When a skip is selected, a floating popup at the bottom displays skip details and an actionable "Continue" button. This ensures users never have to scroll to proceed.

---

## 🌐 Data Source

Skip options are fetched from:  
[https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft](https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft)

---

## 📋 Challenge Instructions Reference

- Redesign the "Choose Your Skip Size" page to look completely different (not just restyled).
- Maintain full functionality and user flow.
- Use API data for skip options.
- Ensure mobile and desktop responsiveness.
- Clean, maintainable React code.
- Include a README (this file) and a live/testable public link.

---

## 💡 Design Decisions

- **Fresh, Modern Look:** Light backgrounds, accent colors, clear typography.
- **Focused User Flow:** Selection is prominent, and continuing is always easy and accessible.
- **Accessibility First:** High contrast, visible focus states, semantic roles.
- **No Pagination:** All skips are visible; users filter to narrow choices.
- **Popup Card UX:** Selection summary and action persistently visible—no more scrolling to continue.

---

## 👤 Author

Daniel Essel

---

## 📄 License

MIT