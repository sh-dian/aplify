# Aplify
Mini Job Board Application. This app allows employers to post job listings and applicants to browse and apply.

## Tech Stack

- **Backend**: [Laravel](https://laravel.com/) (PHP framework)
- **Frontend**: [React](https://reactjs.org/) (JavaScript library)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API Testing**: [Postman](https://www.postman.com/)
- **Mailtrap SMTP**: [SMTP]([https://www.postman.com/](https://mailtrap.io/))
---

## Project Setup

This project consists of two main parts: the **backend** (Laravel) and the **frontend** (React). Follow the instructions below to set up and run each part.

### Backend Setup (Laravel)

#### Prerequisites
- PHP 8.1 or higher
- [Composer](https://getcomposer.org/)
- MySQL or any other database supported by Laravel

#### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd your-repo/backend
   ```
3. Install dependencies:
   ```bash
   composer install
   ```
4. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Generate an application key:
   ```bash
   php artisan key:generate
   ```
6. Set up your database connection in the `.env` file.
7. Run database migrations:
   ```bash
   php artisan migrate
   ```

#### Running the Backend
- Start the development server:
  ```bash
  php artisan serve
  ```
- The backend will be accessible at `http://localhost:8000`.

---

### Frontend Setup (React)

#### Prerequisites
- [Node.js](https://nodejs.org/) 14 or higher

#### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

#### Running the Frontend
- Start the development server:
  ```bash
  npm run build
  ```
  or
  ```bash
  npm run dev
  ```
- The frontend will be accessible at `http://localhost:3000`.

---
