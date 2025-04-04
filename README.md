# 🌤️ Weather & Crypto Dashboard

A real-time data visualization app built with **Next.js 15 App Router**, **Redux Toolkit**, and **Recharts**, displaying dynamic charts for 24-hour weather forecasts and crypto trends.

---

## 🔧 Tech Stack

- **Next.js 15 (App Router)** – for SSR/SSG and routing  
- **Redux Toolkit** – for global state management  
- **Recharts** – for rendering interactive charts  
- **TailwindCSS** – for styling  
- **Lucide Icons** – for crisp UI icons  
- **Weather API & Crypto API** – for fetching external data  

---

## 📁 Folder Structure

```
app/
│
├── dashboard/
│   ├── crypto/                      # Crypto dashboard page
│   ├── weather/                     # Weather dashboard page
│   ├── news/                        # News dashboard page
│
├── weather/[weatherId]/page.tsx    # Weather detail page (with chart)
├── crypto/[cryptoId]/page.tsx      # Crypto detail page (with chart)
├── layout.tsx / globals.css        # Base layout & styles
│
store/
├── store.ts                        # Redux store setup
├── slices/
│   ├── weatherSlice.ts             # Handles weather API calls
│   ├── cryptoSlice.ts              # Handles crypto API calls
components/
├── ui/                             # Custom chart and UI components
```

---

## ⚙️ Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/loke-js/CryptoNexus.git
   cd CryptoNexus
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
   NEXT_PUBLIC_CRYPTO_API_KEY=your_crypto_api_key
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

---

## 🧐 Design Decisions

### ✅ SSR & Deep Linking Support
- Pages like `/weather/lat%26lon` and `/crypto/bitcoin` are **deep-linkable**.
- Support for **Static Site Generation (SSG)** where possible for performance and SEO.

### ✅ Periodic Data Sync
- Uses `useEffect` with `setInterval` to re-fetch data every 60 seconds.
- Ensures the UI reflects the most recent data without manual refresh.

### ✅ Graceful Error Handling
- Shows fallback messages like "No data available" or "Failed to load" if an API call fails.
- Prevents crashes when external APIs are down or data is incomplete.

### ✅ Efficient State Management with Redux
- Weather and Crypto slices are kept clean with async thunks.
- Centralized data makes it easier to scale and share state across components.

### ✅ Chart-Optimized Data
- Only relevant fields are passed to charts (e.g. `temp_c`, `humidity`, `wind_kph`).
- Clean and minimalist chart UI using `Recharts`.

---

## 🖼️ Features

- 📍 View weather by coordinates using `/weather/[lat]%26[lon]`
- 💰 View crypto details using `/crypto/[cryptoId]`
- 📊 Interactive bar chart for last 24-hour temperature
- ♻️ Periodic data re-fetch every 60 seconds
- ⚠️ Graceful UI fallback on API errors
- 🌐 Supports SSR/SSG and deep linking
- 📅 Dashboard navigation for Weather, Crypto, and News

---

## ✨ Future Improvements

- Auto-detect user’s location for weather
- Add chart toggles for humidity and wind
- Add unit testing with Jest

---

## 📬 Feedback & Contributions

Feel free to fork the repo and submit a PR or open an issue for discussion.  
Happy to connect on improvements!

---


