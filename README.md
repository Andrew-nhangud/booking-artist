# RÉSERVE - Artist Booking Platform

RÉSERVE is a modern, responsive single-page application (SPA) built with React 19, Vite, and React Router v7. It connects clients with international musical artists for weddings, corporate events, and private parties. The platform features asynchronous data fetching, input debouncing for efficient search filtration, robust form validation, and a concurrent local mock database architecture.

---

## 🛠️ Tech Stack & Dependencies

### Frontend Core

- **React 19.2.5**: Core UI library using modern functional components, hooks (`useEffect`, `useState`, `useRef`), and `StrictMode`.
- **Vite 8.0.10**: Next-generation frontend toolchain for fast development builds.
- **React Router DOM 7.14.2**: Managed route architecture with layout nesting via `<Outlet />`.
- **React Hook Form 7.75.0**: Performant, flexible, and extensible forms with built-in validation rules.

### Mock Backend & Utilities

- **json-server 1.0.0-beta.15**: Full mock REST API reading and writing directly to a local JSON file.
- **concurrently 9.2.1**: Utility tool to execute multiple CLI commands simultaneously.

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install all required project dependencies:

```bash
npm install
```

### 2. Running the Application

The project includes a unified script to launch both the frontend application and the backend API server concurrently with one command.

Run the following command in your terminal:

```bash
npm run both
```

### Available Scripts

The configuration inside `package.json` maps these operations:

- `npm run dev`: Launches the Vite local frontend development server.
- `npm run server`: Launches `json-server` to watch `./data/dataBase.json` on port `5000`.
- `npm run both`: Uses `concurrently` to execute both `dev` and `server` scripts instantly.
- `npm run build`: Compiles production-ready assets into the `dist/` directory.
- `npm run lint`: Analyzes code quality using ESLint rules.

---

## 📂 Project Structure & Architecture

```text
booking-artist/
├── data/
│   └── dataBase.json          # Mock REST database (Artists & Bookings)
├── src/
│   ├── components/
│   │   ├── form/
│   │   │   ├── FormController.css
│   │   │   └── FormController.jsx  # Handles booking requests & POST validation
│   │   ├── navbar/
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.jsx          # App header with live badge indicator
│   │   └── searchBar/
│   │       ├── searchBar.css
│   │       └── SearchBar.jsx       # Reusable modular search input field
│   ├── hooks/
│   │   ├── useDebounce.jsx         # Custom hook delaying value changes
│   │   └── useFetchData.js         # Custom hook for AbortController API requests
│   ├── pages/
│   │   ├── artistPage/
│   │   │   ├── ArtistPage.css
│   │   │   └── ArtistPage.jsx      # Individual artist details & booking page
│   │   ├── bookings/
│   │   │   ├── bookings.css
│   │   │   └── Bookings.jsx        # Admin view showcasing all pending bookings
│   │   └── landing/
│   │       ├── Landing.css
│   │       └── Landing.jsx         # Discovery page featuring multi-tier search
│   ├── styles/
│   │   └── global.css              # Global tokens, typography, spinner keyframes
│   ├── App.jsx                     # Core application layout wrapper with <Outlet />
│   └── main.jsx                    # Application entry point & router configuration
├── package.json
└── README.md
```

_Note: Every `.jsx` view/component is coupled with its own standalone `.css` asset file for component-level modular styling, while typography and core application skeletons sit inside `global.css`._

---

## ⚙️ Application Features

### 1. Global Navigation Layout (`App.jsx` & `Navbar.jsx`)

- Implements a shell layout structure wrapping children components using React Router's `<Outlet />`.
- The `Navbar` relies on the custom `useFetch` hook to tap into `http://localhost:5000/bookings`.
- Features a responsive visual indicator notification badge (`.notify`) that instantly displays the total count of submitted active bookings.

### 2. Artist Discovery Engine (`Landing.jsx` & `SearchBar.jsx`)

- Pulls artist rosters dynamically from the backend endpoint `/Artist`.
- Utilizes a custom `useDebounce` hook set at a default window of `300ms` to batch and slow down keyboard filtering. This safeguards app performance by avoiding reactive re-renders on every single keystroke.
- Provides complex case-insensitive multi-field filtering. Users can filter the list synchronously across three distinct item attributes: **Artist Name**, **Genre**, or **Country/Location**.
- Gracefully manages dynamic load states, network errors, and renders conditional clean fallback text ("No artists found matching your search") if search results filter down to zero elements.

### 3. Detailed Profile Overviews (`ArtistPage.jsx`)

- Resolves specific URL structural parameters using React Router's `useParams()` hook to fetch single artist datasets targetting `/Artist/:id`.
- Hosts responsive links branching out to external portfolios via structured `target="_blank"` windows.
- Directly encapsulates the interactive `FormController` sub-component, passing down essential contextual information via `artistId` and `artistName` component props.

### 4. Rigid Form Submission Framework (`FormController.jsx`)

Managed entirely by `react-hook-form`, the request layout implements structural validation conditions:

- **Event Date & Start Time**: Required fields.
- **Event Type**: Required field with a 2-character minimum string limit.
- **Duration**: Numerical scale enforcing a strict length boundary between 1 hour minimum and 12 hours maximum.
- **Venue/Location**: Required field with a 2-character minimum string limit.
- **Full Name**: Required field with a 2-character minimum string limit.
- **Phone Number**: Regulated by a phone structure Regular Expression pattern (`/^\+?[1-9]\d{1,14}$/`) enforcing international formats alongside field constraints.
- **Email Address**: Validated against an email pattern checking syntax configurations (`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`).

**State & Response Lifecycle Handling:**

- **POST Management**: Submits data directly into the mock DB cluster under `/bookings`.
- **Automated Cleanup**: Triggers a `setTimeout` hook through a component `useRef` tracker instance to display status indicators (e.g. success or server error message alerts) which cleanly auto-expire after 4000ms.
- **Memory Management**: Integrates component unmounting operations via `useEffect` cleanup return hooks to explicitly target and terminate outstanding active timers (`clearTimeout`), completely preventing memory leak bugs.

### 5. Management Dashboard (`Bookings.jsx`)

- Aggregates and formats all upcoming submitted requests through the `/bookings` collection endpoint.
- Displays explicit card listings providing date, timeslots, requested duration, locations, client identifiers, and event type contexts.
- Integrates an asynchronous API destruction event (`method: "DELETE"`) targeting the matching index ID on the backend instance database whenever user interaction flags the "Delete" UI button.

---

## 🎨 Custom React Hooks

### `useFetchData.js` (`useFetch`)

An asynchronous networking engine equipped with safety mechanisms:

- Isolates variable updates using standard state declarations (`data`, `isLoading`, `error`).
- Instantiates native browser `AbortController` controllers preserved inside a component `useRef` layer (`abortControllerRef.current`). This handles cancellation signals, immediately aborting overlapping active fetch requests if components unmount or URLs shift rapidly mid-flight.

### `useDebounce.jsx` (`useDebounce`)

A standard input utility built to throttle incoming UI value updates:

- Captures user inputs and buffers adjustments by processing them through an internal delay timer wrapper (`setTimeout`).
- Implements a clean micro-task cycle by liquidating pending timeouts if the source dependency updates within the timeline threshold boundary.

---

## 🗄️ Database Schema Layout (`dataBase.json`)

The backend schema supports key relational structures tracking target entities:

### Artists Entity Array (`Artist`)

```json
{
  "id": "1",
  "name": "Ayumi Tanaka",
  "genre": "Classical",
  "location": "Japan",
  "image": "https://pexels.com...",
  "socialLink": "https://instagram.com"
}
```

### Bookings Entity Array (`bookings`)

```json
{
  "id": "autogenerated-id",
  "artistId": "1",
  "artistName": "Ayumi Tanaka",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "event": "Wedding",
  "duration": "4",
  "location": "Grand Ballroom",
  "name": "John Doe",
  "phoneNumber": "+27660398225",
  "email": "john@example.com",
  "message": "Please play standard classical music."
}
```
