Clash Analyzer - Web + Capacitor Project (ready to build)

How to run locally (development):
1. Install Node.js (https://nodejs.org)
2. Open terminal in this folder.
3. Run: npm install
4. Run: npm run dev
5. Open the local url shown by vite (e.g. http://localhost:5173)

How to build production (for Capacitor -> Android APK):
1. Install Capacitor CLI: npm install @capacitor/core @capacitor/cli
2. Initialize Capacitor (once): npx cap init ClashAnalyzer com.clash.analyzer
3. Build web: npm run build
4. Copy to Capacitor: npx cap copy
5. Add Android: npx cap add android
6. Open Android Studio: npx cap open android
7. Build APK inside Android Studio (Build -> Build Bundle(s) / APK(s) -> Build APK(s))

Notes:
- This project uses images from RoyaleAPI public assets CDN. Internet required for images.
- If you prefer offline images, download them into public/cards and update paths.
