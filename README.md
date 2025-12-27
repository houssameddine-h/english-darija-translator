# English To Darija Translator

This project provides a solution for translating English text to Darija, featuring a web-based application, a browser extension, and a backend API.

## Features

*   **Web Application:** A user-friendly interface for text translation, user authentication (login/signup), and user settings.
*   **Browser Extension:** Translate content while browsing the web directly from the browser.
*   **Backend API:** A Node.js-based API handling all translation requests, user management, and database interactions.
*   **Authentication & Authorization:** Secure user login and registration with session management.
*   **Database Integration:** Stores user information, translation history, and other application data.
*   **External Translation Service Integration:** Utilizes a third-party translation API for Darija translations.

## Architecture

The application is composed of three main parts:

1.  **Frontend:** A client-side web application built with HTML, CSS, and JavaScript, providing the main user interface. It communicates with the backend API for all dynamic content and functionalities.
2.  **Backend:** A Node.js/Express.js API server that acts as the central hub. It processes requests from the frontend and browser extension, interacts with the database, and orchestrates calls to the external translation service.
3.  **Browser Extension:** A lightweight browser extension (HTML, CSS, JavaScript) that allows users to interact with the translation service directly from their browser, leveraging the same backend API.

The backend further integrates with a dedicated `Translator` module that communicates with an `External Translation API` and stores data in a MongoDB NoSQL database.

## Technologies Used

*   **Frontend:** HTML, CSS, JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** NoSQL (MongoDB)
*   **Browser Extension:** HTML, CSS, JavaScript

## Setup and Installation

Follow these steps to get the Darija Translator application up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/houssameddine-h/english-darija-translator.git
cd english-darija-translator
```

### 2. Backend Setup

Navigate to the `backend` directory and install the necessary Node.js dependencies.

```bash
cd backend
npm install
```

#### Environment Variables

Create a `.env` file in the `backend` directory and add your environment variables.

```

GEMINI_API_KEY=api_key_here

PORT=3000

MODEL=gemini-2.5-flash
```

#### Run the Backend Server

```bash
npm start
```

The backend server should now be running, typically on `http://localhost:3000`.

### 3. Frontend Setup

The frontend is a static web application. You can simply open the `index.html` file in your browser, or serve it using a local web server.

### 4. Browser Extension Setup

To install the browser extension:

1.  Open your browser's extension management page (e.g., `chrome://extensions` for Chrome, `about:addons` for Firefox).
2.  Enable "Developer mode" (if applicable).
3.  Click "Load unpacked" or "Load temporary add-on" and select the `extension` directory from your cloned repository.

The extension icon should now appear in your browser toolbar.

## Usage

### Web Application

1.  Open `frontend/index.html` in your web browser.
2.  Navigate to the login or signup pages to create an account or log in.
3.  Use the translation interface to translate text to and from Darija.

### Browser Extension

1.  Click the Darija Translator extension icon in your browser toolbar.
2.  Use the side panel to enter text for translation or interact with other extension features.
