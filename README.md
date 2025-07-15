# Bookmark Manager
A single-page application (SPA) for managing bookmarks, built with JavaScript, HTML, CSS, and json-server for mock API persistence.

https://via.placeholder.com/800x500?text=Bookmark+Manager+Demo (Replace with actual screenshot later)

## Features
Add bookmarks (Title, URL, Tags)

Delete bookmarks

Filter by tags (Dynamic dropdown)

No page reloads (SPA architecture)

Mock API (via json-server)

## Technologies Used
Frontend: HTML, CSS, JavaScript 

Backend: json-server (mock REST API)

Package Manager: npm (for json-server)

## Setup & Installation
Clone the repository:

bash
git clone https://github.com/kvn-koech/myPersonalProject.git
cd bookmark-manager
Install json-server (if not installed globally):

bash
npm install -g json-server
Start the mock API server:

bash
json-server --watch db.json
API will run at http://localhost:3000/bookmarks.

Open index.html in a browser (e.g., using VS Code Live Server).

## Project Structure
text
bookmark-manager/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # Core JavaScript logic
├── db.json             # Mock database (stores bookmarks)
└── README.md           # Project documentation
## How It Works
Fetching Data: Uses fetch() to GET/POST/DELETE bookmarks from json-server.

Event Listeners:

submit: Add new bookmarks.

click: Delete bookmarks.

change: Filter by tags.

Dynamic UI: Renders bookmarks and filters without page reloads.

## Stretch Goals (Future Improvements)
Edit existing bookmarks (PATCH).

LocalStorage fallback if API fails.

## Contributing
Pull requests welcome! For major changes, open an issue first.

## License
MIT
