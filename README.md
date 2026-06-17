# Memory-Game-Application

# 🐾 Animal Memory Match Game

A full-stack interactive memory card matching game where users match animal cards, track their score, and compete globally on a live database leaderboard. Built with vanilla frontend assets and a Node.js Express backend deployed to Vercel.

Live Demo: https://memory-game-application-new.vercel.app/

---

## ✨ Features

- **Interactive Gameplay:** Sleek flipping cards containing animal pairings.
- **Performance Metrics:** Tracks user scores, step moves, and real-time game duration.
- **Global Leaderboard:** Live top-10 leaderboard ranking players dynamically by score and time.
- **Relational Storage:** PostgreSQL cloud database hosting persistent data profiles.

---

## 🛠️ Built With

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6)
- **Backend Server:** Node.js, Express.js
- **Database:** PostgreSQL (Hosted via Supabase)
- **Deployment Platform:** Vercel

---

## 📂 Project Structure

```text
├── public/                 # Static asset subdirectory (optional)
├── db.js                   # Database connectivity wrapper
├── index.html              # Main gameplay template markup
├── package.json            # Node environment manifest dependency array
├── README.md               # Documentation layout
├── script.js               # Frontend gameplay rules & API fetch requests
├── server.js               # Express API infrastructure routing endpoints
├── style.css               # User interface layout and card flipping animation styling
└── vercel.json             # Vercel infrastructure routing matrix
```

---

## 🌐 Production Deployment (Vercel)

This application is fully optimized for Vercel using serverless cloud execution paths via `vercel.json`:

---

### 🏆 Fetch Top Ranks
* **Endpoint:** `GET /leaderboard`
* **Response Status:** `200 OK`
* **Return Format:** JSON array containing top 10 player dictionary definitions sorted by descending score and ascending time metrics.
