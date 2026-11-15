# CodeVault – Personal Developer Knowledge Management System

CodeVault is a full-stack MERN application designed to help developers organize, store, and manage their programming knowledge in one place.

It allows users to save technical notes, code snippets, and useful development resources, making it easier to access previously learned concepts and reuse code whenever needed.

## 🚀 Features

- **User Authentication:** Secure user registration and login using JWT authentication.
- **Knowledge Management:** Create, view, update, and delete knowledge entries.
- **Multiple Entry Types:** Organize information as:
  - Notes
  - Code Snippets
  - Resources
- **Search Functionality:** Quickly find saved knowledge using keywords.
- **Filtering and Sorting:** Filter entries by type, programming language, and category.
- **Tags and Categories:** Organize knowledge for easier navigation.
- **Code Preview:** Syntax-highlighted code snippets with a copy-to-clipboard feature.
- **Dashboard:** View and manage your saved developer knowledge from one place.
- **Responsive UI:** Clean interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Tailwind CSS | Styling and responsive UI |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | Authentication |
| Axios | API requests |
| React Router | Frontend navigation |
| Lucide React | Icons |
| React Syntax Highlighter | Code highlighting |

## 📁 Project Structure

```text
CodeVault/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

*Note: Adjust the folder names above if your actual project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CodeVault.git
cd CodeVault
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

If your backend uses a different development script, use the corresponding command from its `package.json`.

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder if your API service uses an environment variable:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access CodeVault.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key used for JWT authentication |
| VITE_API_URL | Backend API base URL used by the frontend, if applicable |

Never upload your actual `.env` files or expose your database credentials and JWT secret on GitHub.

## 📌 Future Improvements

- Advanced code editor integration.
- Improved knowledge analytics and visualizations.
- More advanced filtering and search.
- Export and import saved knowledge.
- Deployment with a production-ready configuration.

## 🎯 Project Objective

The main objective of CodeVault is to provide developers with a centralized platform to preserve their technical knowledge, organize programming resources, and build a personal library of reusable code and concepts.

## 👨‍💻 Author

**Kripa Rawat**

GitHub: https://github.com/rawatkripa290-lab

---

*Built with the MERN Stack ❤️*
