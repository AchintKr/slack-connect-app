<h1 align="center">🤝 Slack Connect App</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Slack-OAuth%202.0-blue?logo=slack" alt="Slack OAuth 2.0" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Database-SQLite-orange?logo=sqlite" alt="SQLite" />
</p>

<p align="center">
  A full-stack application to connect your Slack workspace via OAuth 2.0, send messages, and manage tokens seamlessly.
</p>

---

## ✨ Features
- 🔐 **Slack OAuth 2.0 Authentication**
- 💬 **Send Messages** to channels via Slack API
- ⏰ **Schedule Messages** (extendable with cron jobs)
- 🗄 **Token Management** in SQLite
- 🎨 **Beautiful UI** with TailwindCSS
- 🛠 Full **Frontend + Backend** integration

---

## 📂 Tech Stack
| Layer      | Technology |
|------------|------------|
| Frontend   | React, TailwindCSS |
| Backend    | Node.js, Express |
| Database   | better-sqlite3 (SQLite) |
| API        | Slack Web API |
| Deployment | Netlify(frontend), Render(backend) |

---

## 🏗 Architecture

```mermaid
graph TD;
    A[User] -->|Clicks Connect| B[Frontend]
    B -->|Redirect| C[Slack OAuth 2.0]
    C -->|Callback with Code| D[Backend /auth/callback]
    D -->|Exchange Code| E[Slack API]
    E -->|Access Token| D
    D -->|Store Token in DB| F[SQLite]
    B -->|Send Message| G[Backend /message/send]
    G -->|Use Token| E[Slack API]
    E -->|Post to Channel| A
