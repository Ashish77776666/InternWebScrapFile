# Web Scraper Dashboard

A React-based dashboard that lets authenticated users enter a URL, trigger a Puppeteer‐based scraping job on a remote backend (hosted on Render), and view the scraped data in a table. Firebase is used for user authentication, hosting, and storing user‐specific scrap history.

---

## 📝 Table of Contents

1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
3. [Features](#features)  
4. [Prerequisites](#prerequisites)  
5. [Getting Started](#getting-started)  
   1. [Clone the Repository](#clone-the-repository)  
   2. [Install Dependencies](#install-dependencies)  
   3. [Firebase Setup](#firebase-setup)  
   4. [Environment Variables](#environment-variables)  
   5. [Running Locally](#running-locally)  
6. [Deployment](#deployment)  
   1. [Frontend (Firebase Hosting)](#frontend-firebase-hosting)  
   2. [Backend (Render)](#backend-render)  
7. [Usage](#usage)  
   1. [Sign Up / Sign In](#sign-up--sign-in)  
   2. [Enter URL & Scrape](#enter-url--scrape)  
   3. [View Results](#view-results)  
   4. [Logout](#logout)  
8. [Database Structure](#database-structure)  
9. [Folder Structure](#folder-structure)  
10. [Troubleshooting](#troubleshooting)  
11. [Future Improvements](#future-improvements)  
12. [License](#license)  

---

## 📖 Project Overview

The **Web Scraper Dashboard** is a full‐stack application where authenticated users can submit any URL to a remote Puppeteer endpoint. The endpoint (hosted on Render) navigates to the URL, scrapes data (e.g., book listings), and returns structured JSON. The React frontend receives that JSON and displays it in an interactive table. Firebase handles user authentication, hosting, and Firestore to store individual user’s scrap history.

---

## 🛠 Tech Stack

- **Frontend**  
  - React (Create React App)  
  - React Router (for routing between Sign-In, Sign-Up, and Dashboard)  
  - Axios or Fetch API (for HTTP requests to both Firebase Auth and the scraping backend)  
  - Material-UI or plain CSS (for styling forms and tables)

- **Backend (Scraper)**  
  - Node.js + Express  
  - Puppeteer (headless Chrome)  
  - Hosted on Render.com (free tier)

- **Authentication & Hosting**  
  - Firebase Authentication (Email/Password)  
  - Firebase Hosting (serves the React build)  
  - Firestore (stores scrap history per user)

---

## ✅ Features

1. **User Authentication**  
   - Sign Up with email & password  
   - Sign In / Sign Out  
   - Protected routes (Dashboard only accessible when signed in)

2. **Scraping Workflow**  
   - Authenticated users can enter any URL  
   - Clicking “Scrape Now” sends a POST to the remote Puppeteer endpoint (`/scrape`)  
   - Backend returns an array of book data (title, price, stock, rating, etc.)  
   - Frontend renders a sortable/filterable table of scraped results

3. **History & Persistence**  
   - Each scrape request (timestamp + target URL) is saved in Firestore under the user’s document  
   - Users can revisit their history (optional: implement a “View History” page)

4. **Responsive UI**  
   - Simple Sign-Up / Sign-In forms  
   - Dashboard with URL input, “Scrape Now” button, and Logout  
   - Table displays scraped data in a clean, responsive layout

---

## 📝 Prerequisites

1. **Node.js** (version 16 or higher)  
2. **npm** (comes with Node.js)  
3. **Firebase CLI**  
   ```bash
   npm install -g firebase-tools
