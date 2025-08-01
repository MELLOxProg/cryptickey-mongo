# CrypticKey - Secure Password Manager

![CrypticKey UI](/public/cryptickey-ui.png)

**CrypticKey** is a modern, secure, and easy-to-use password manager built with the MERN stack (MongoDB, Express, React, Node.js) and deployed on Vercel.

---

## ✨ Features

- **Secure Password Storage:** Store your passwords securely in a MongoDB database.
- **Intuitive UI:** A clean and modern user interface built with React and Tailwind CSS.
- **CRUD Functionality:** Easily create, read, update, and delete your passwords.
- **One-Click Copy:** Copy usernames and passwords to your clipboard with a single click.
- **Self-Hostable:** Deploy your own instance of CrypticKey for full control over your data.

## 📚 Documentation

Complete documentation is available in the `/docs` folder. Key documentation includes:

- [Introduction](docs/introduction.mdx) - Overview of CrypticKey and its features
- [Quickstart Guide](docs/quickstart.mdx) - Get up and running in 5 minutes
- [Installation Guide](docs/installation.mdx) - Detailed setup instructions
- [API Reference](docs/api-reference/introduction.mdx) - Complete API documentation
- [User Guides](docs/guides/overview.mdx) - How to use CrypticKey
- [Deployment Guides](docs/deployment/vercel.mdx) - Deploy to production

### 🚀 Deploy Documentation with Mintlify

To create a beautiful documentation site:

1. Sign up at [mintlify.com](https://mintlify.com)
2. Connect this GitHub repository
3. Set the docs directory to `/docs`
4. Deploy your documentation site!

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/downloads)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MELLOxProg/cryptickey-mongo.git
    cd cryptickey-mongo
    ```

2.  **Install dependencies:**
    ```bash
    # Frontend
    npm install

    # Backend
    cd backend
    npm install
    cd ..
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the `backend` directory.
    -   Add `MONGODB_URI=mongodb://localhost:27017` and `PORT=3000`.

4.  **Run the application:**
    ```bash
    # Terminal 1: Start backend
    cd backend
    node server.js

    # Terminal 2: Start frontend
    npm run dev
    ```

## 💻 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Deployment:** Vercel

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guide](docs/development/contributing.mdx) for more details.




