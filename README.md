# Todo Planner App

A beautiful, playful, and modern todo planner app with sticky notes for Notes, Focus, and Remember. Built with vanilla HTML, CSS, and JavaScript—no frameworks required!

## Features
- Add, edit, delete, and mark todos as completed or pending
- Each todo has a title and a date/time
- Todos are displayed in a clean, mobile-friendly card layout
- Persistent Notes, Focus, and Remember sticky notes (saved in your browser)
- Responsive, pastel, planner-inspired UI
- All data is stored in your browser (localStorage)

## Project Structure
```
todo-app/
├── frontend/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── app.js             # Frontend JavaScript
└── backend/ (optional)
    ├── server.js          # Express server (if you want a backend)
    └── package.json       # Backend dependencies
```

## Getting Started (Frontend Only)

1. **Run locally:**
   - Open `frontend/index.html` in your browser.
   - All features work offline and are saved in your browser.

2. **Deploy to Netlify, Vercel, GitHub Pages, etc.:**
   - Deploy the contents of the `frontend` folder as a static site.
   - No build step required—just drag and drop, or connect your repo.

## (Optional) Backend API
If you want to use a Node.js/Express backend:
- See the `backend` folder for a simple Express server.
- You can deploy the backend to Render, Railway, or Heroku.
- Update the API URLs in `frontend/app.js` if you use the backend.

## Customization
- Change colors, fonts, or layout in `styles.css` for your own style.
- Add more features (categories, reminders, etc.) as you wish!
