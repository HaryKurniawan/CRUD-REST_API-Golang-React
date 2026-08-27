# CRUD REST API Golang & React

Proyek ini adalah aplikasi web CRUD (Create, Read, Update, Delete) sederhana yang menggunakan **Golang** sebagai backend dan **React (Vite + TypeScript)** sebagai frontend. Database yang digunakan adalah **PostgreSQL** dengan library **GORM** sebagai ORM.

## Struktur Proyek

```text
go-project/
├── backend-go/          # Source code Backend (Golang)
│   ├── config/          # Konfigurasi Database & GORM
│   ├── handlers/        # HTTP Handlers (Controller logic)
│   ├── models/          # GORM Models / Struct
│   ├── repositories/    # Database queries / Repository layer
│   ├── routes/          # Definisikan API Endpoints & CORS Middleware
│   ├── .env             # Environment variables (DB, Port)
│   ├── go.mod           # Go Module Dependencies
│   └── main.go          # Entry point aplikasi Go
│
└── frontend/            # Source code Frontend (React + TS + Vite)
    ├── src/             # Source React (components, pages, api, dll)
    └── package.json     # Node Dependencies & Scripts
```

---

## Teknologi yang Digunakan

### Backend (Go)

- **Go** (Golang)
- **Gorilla Mux** (HTTP Router)
- **GORM** (Go ORM) & **PostgreSQL Driver**
- **Godotenv** (Load Environment Variables)

### Frontend (React)

- **React** (TypeScript)
- **Vite** (Build Tool)

---

## Persyaratan & Instalasi

Pastikan Anda sudah menginstal:

- [Go](https://go.dev/dl/) (versi 1.18 ke atas)
- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/) yang sudah berjalan secara lokal

### 1. Setup Database

Buat database baru di PostgreSQL Anda dengan nama `go_crud_db` (atau sesuai konfigurasi `.env`).

### 2. Konfigurasi Backend

Pindah ke direktori `backend-go` dan salin/sesuaikan file `.env`:

```bash
cd backend-go
```

Buat/sesuaikan isi `.env`:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=8081
```

Instal dependensi Go:

```bash
go mod tidy
```

### 3. Konfigurasi & Instalasi Frontend

Pindah ke direktori `frontend` lalu instal dependensi Node.js:

```bash
cd ../frontend
npm install
```

---

## Cara Menjalankan Aplikasi

### Menjalankan Backend (Golang)

Jalankan perintah ini di dalam direktori `backend-go`:

```bash
go run main.go
```

_GORM akan secara otomatis membuat tabel `posts` saat backend pertama kali dijalankan (AutoMigrate)._

> **Tips Pengembangan**: Agar tidak perlu restart server manual setiap kali mengubah kode Go, gunakan library pihak ketiga seperti [Air](https://github.com/cosmtrek/air) untuk _hot reload_.

### Menjalankan Frontend (React)

Jalankan perintah ini di dalam direktori `frontend`:

```bash
npm run dev
```

Aplikasi React Anda akan berjalan di `http://localhost:5173` (port default Vite), dan akan berkomunikasi dengan Backend API di `http://localhost:8081`.

---

## API Endpoints

Semua endpoint backend diawali dengan prefix `/api`.

| Method     | Endpoint          | Deskripsi                            |
| :--------- | :---------------- | :----------------------------------- |
| **GET**    | `/api/posts`      | Mengambil semua post                 |
| **GET**    | `/api/posts/{id}` | Mengambil detail post berdasarkan ID |
| **POST**   | `/api/posts`      | Membuat post baru                    |
| **PUT**    | `/api/posts/{id}` | Memperbarui post berdasarkan ID      |
| **DELETE** | `/api/posts/{id}` | Mempermarès post berdasarkan ID      |
