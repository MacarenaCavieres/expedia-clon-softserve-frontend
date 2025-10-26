# Expedia Clone Frontend

This project is a **frontend clone of Expedia.com**, built as part of a learning project to practice modern web development with **React**, **TypeScript**, **React Query**, and **Redux Toolkit**.  
It allows users to **search destinations, view hotel details, and manage their bookings (CRUD)** — all without authentication or login.

---

## Features

-   **Home View**

    -   Displays a search bar where users can look for destinations.
    -   Fetches and displays a list of hotels matching the selected destination.

-   **Hotel Detail View**

    -   Accessed via dynamic route `/hotelId`.
    -   Displays hotel information and available rooms.
    -   Selecting a room saves its details in the global store and navigates the user to the booking form.

-   **Create Booking**

    -   Users can create a new reservation through a form.
    -   Data is managed using **React Hook Form** and **Zod** for validation.

-   **My Trips View**

    -   Displays all user bookings.
    -   Users can **edit**, **cancel**, or **delete** reservations.
    -   Booking data is managed via **CRUD operations** using **React Query** and **Axios**.

-   **State Management**
    -   **Redux Toolkit** is used to handle global state across the app.
    -   **React Query** manages data fetching and caching for API requests.

---

## Tech Stack

| Category           | Technology                                                                |
| ------------------ | ------------------------------------------------------------------------- |
| Framework          | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)              |
| Language           | [TypeScript](https://www.typescriptlang.org/)                             |
| State Management   | [Redux Toolkit](https://redux-toolkit.js.org/)                            |
| Data Fetching      | [React Query](https://tanstack.com/query/latest)                          |
| Forms & Validation | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Styling            | [Tailwind CSS](https://tailwindcss.com/)                                  |
| Icons              | [Heroicons](https://heroicons.com/)                                       |
| Notifications      | [React Toastify](https://fkhadra.github.io/react-toastify/introduction)   |
| Routing            | [React Router DOM v7](https://reactrouter.com/)                           |

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/MacarenaCavieres/expedia-clon-softserve-frontend.git
cd expedia-clon-softserve-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

## Future Improvements

-   Add user authentication (login/register flow).
-   Implement booking confirmation emails.
-   Enhance error handling and loading states.
-   Add unit and integration tests.
-   Improve responsive design and accessibility.

## Authors

Developed by the team as part of a SoftServe project.
