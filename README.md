# Web Scraper Dashboard

A React‐based dashboard that lets authenticated users enter a URL, trigger a Puppeteer-based scraping job on a remote backend (hosted on Render), and view the scraped data in a table. Firebase handles user authentication, hosting, and storing user‐specific scrape history.

## 📖 Project Overview

The **Web Scraper Dashboard** is a full-stack application where authenticated users can submit any URL to a remote Puppeteer endpoint. The endpoint (hosted on Render) navigates to the URL, scrapes data (e.g., book listings), and returns structured JSON. The React frontend renders this JSON into a table. Firebase is used for user authentication, hosting, and Firestore to store each user’s scrape history.

---

## 🛠 Tech Stack

- **Frontend**  
  - React (Create React App)  
  - Firebase Authentication (Email/Password)  
  - Firebase Hosting  
  - Firestore (storing scrape history)  
  - Fetch API (for HTTP requests to the scraping backend)  
  - Plain CSS for layout

- **Backend (Scraper)**  
  - Node.js + Express  
  - Puppeteer (headless Chrome)  
  - Hosted on Render.com (free tier)

---

## ✅ Features

1. **User Authentication**  
   - Sign Up with email & password  
   - Sign In (if already signed up)  
   - Conditional rendering of Sign-Up/Sign-In forms versus Dashboard  
2. **Scraping Workflow**  
   - Authenticated users see a text-input for any URL plus a “Scrape Now” button  
   - Clicking “Scrape Now” sends a POST to the remote Puppeteer endpoint (`/scrape`)  
   - Backend returns an array of scraped items (title, price, stock status, rating, etc.)  
   - Frontend displays results in a table  
3. **Firestore History (Optional Extension)**  
   - After each scrape, you can save `{ userId, url, timestamp, resultsCount }` into Firestore under the user’s document  
   - Build a “History” view later to list past scrapes  
4. **Responsive Layout**  
   - Sign-Up and Sign-In appear side by side when no user is logged in  
   - Once signed in, the main Dashboard shows a left-hand menu, center-pane scrape UI, and right-hand user info + logout

---

## 📝 Prerequisites

1. **Node.js** (version 16 or higher)  
2. **npm** (comes with Node.js)  
3. **Firebase CLI**  
   ```bash
   npm install -g firebase-tools

## 🌐 Live Demo

👉 [https://internwebscraper.web.app](https://internwebscraper.web.app)
   - email: test2@gmail.com
   - password: Punjab@7
   - or you can create your own userid and password
