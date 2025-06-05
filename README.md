# 🔗 URL Shortener – Full Stack Project

A modern URL shortener application with analytics, custom aliases, and expiration support. Built using **Java Spring Boot** for the backend, **Next.js** for the frontend, and **PostgreSQL** for data storage. Dockerized for easy deployment.

---

## 📁 Project Structure

```
url-shortener/
├── backend/        # Spring Boot backend API
├── frontend/       # Next.js frontend
├── docker-compose.yml
└── README.md       # This file
```

---

## 🧱 Tech Stack

| Layer     | Technology       |
|-----------|------------------|
| Frontend  | Next.js (React)  |
| Backend   | Java Spring Boot |
| Database  | PostgreSQL       |
| DevOps    | Docker Compose   |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tranbadat/url-shortener.git
cd url-shortener
```

### 2. Start with Docker Compose

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:8080](http://localhost:8080)

---

## 🔙 Backend – Spring Boot API

Handles shortening, redirection, and click tracking.

### 🧱 Stack

- Java 17
- Spring Boot 2.7+
- PostgreSQL
- JPA (Hibernate)
- RESTful API

### 🔌 API Endpoints

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | /api/shorten         | Create a short URL        |
| GET    | /{shortCode}         | Redirect to original URL  |
| GET    | /api/stats/{code}    | Get click statistics      |

### ▶️ Run Backend Locally

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs at `http://localhost:8080`

#### Configuration (in `application.yml`)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/url_db
    username: youruser
    password: yourpass
```

### 🧪 Run Backend Tests

```bash
./mvnw test
```

---

## 🖼️ Frontend – Next.js App

User interface to interact with the API for shortening and viewing links.

### 🧱 Stack

- Next.js (React)
- Tailwind CSS
- Axios

### ✨ Features

- Input long URLs to generate short links
- Support for custom aliases
- Show click statistics
- Copy-to-clipboard functionality
- Fully responsive UI

### ▶️ Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at [http://localhost:3000](http://localhost:3000)

### 🌐 API Configuration

Create a `.env.local` file in `frontend/`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

---

## 🐳 Dockerized Setup

Make sure Docker is installed, then from the project root:

```bash
docker-compose up --build
```

This will start:

- Spring Boot app on `http://localhost:8080`
- Next.js frontend on `http://localhost:3000`
- PostgreSQL database on port `5432`

---

## 🤝 Contributing

Contributions are welcome! Fork the repository, create a new branch, and submit a pull request.

---

## 📄 License

MIT License – See [LICENSE](./LICENSE)
