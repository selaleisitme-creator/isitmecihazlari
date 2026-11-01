// Production sets VITE_API_URL in Vercel; local `npm run dev` falls back to the local backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default API_BASE_URL;
