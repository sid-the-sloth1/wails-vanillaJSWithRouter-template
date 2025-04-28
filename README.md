# README

## 🚀 About

This is a **Vanilla JS template** for a **Golang Wails (v2.10.1)** application that includes simple page navigation support.

Rather than a traditional template, this is a demo showcasing how to build a Wails app using only Vanilla JS — no frameworks required.  
It provides a lightweight, easy-to-understand system for navigating between different parts of your app.

Learn more about Wails here: [https://wails.io/](https://wails.io/)

---

## 📑 Table of Contents

- [About](#-about)
- [How Navigation Works](#-how-navigation-works)
- [Notes](#-notes)
- [File Structure](#-file-structure)
- [How to Use This Template](#-how-to-use-this-template)
- [Live Development](#-live-development)
- [Building](#-building)

---

## 🔍 How Navigation Works

Wails (v2.10.1) creates a Single Page Application (SPA).  
This means you **cannot** directly navigate between URLs like in a traditional web app.

For example:

```javascript
window.location.href = "/IStoleTheMoon";
```

This will load initially, but refreshing will cause Wails to throw an error, because it won't recognize the custom endpoint.

### Solution:
- When a user clicks a custom `<a>` element (see [Notes](#-notes)), an event listener intercepts the click.
- It stores the intended endpoint inside `sessionStorage`, then refreshes the page.
- Upon reload:
  - If an endpoint exists in storage, the associated HTML, CSS, and JS files are dynamically loaded into:

    ```html
    <main>
      <div id="content">
        <!-- Content from components gets loaded here -->
      </div>
    </main>
    ```

  - If no endpoint is stored, it loads the homepage by default.
  - If the route doesn't exist, it loads **404.html**.

You only need to properly create your `<a>` elements and configure routes in `router.js`. The system handles the rest!

---

## 🛠️ Notes

1. **Configuration**  
   Edit `router.js` to map endpoints to their corresponding HTML, JS, and CSS files.

2. **Creating Links**  
   To enable navigation, use `<a>` elements with the `data-link` attribute:

   ```html
   <a data-link href="/IStoleTheMoon">Moon</a>
   ```

3. **Programmatic Navigation**  
   Navigate programmatically by setting `sessionStorage` and refreshing:

   ```javascript
   sessionStorage.setItem('lastPath', "/IStoleTheMoon");
   window.location.reload();
   ```

4. **External Links**  
   Wails (v2.10.1) does **not** natively support external URLs.  
   However, you can open links externally using:

   ```javascript
   window.runtime.BrowserOpenURL('https://github.com/tesseract-ocr/tessdoc/blob/main/Downloads.md');
   ```

---

## 📂 File Structure

```
frontend/
├── index.html : Base HTML file. Components load inside the <div id="content"> element.
├── css/
│   ├── alertify.css : Styles for alertify.js notifications.
│   ├── index.css : Base styling for the app.
│   └── pages/
│       ├── 404.css
│       └── home.css
├── js/
│   ├── alertify.js : Custom notifications, loaded on all pages.
│   ├── index.js : Dark mode handling.
│   ├── lib.js : Utility functions (keep `waitForPageLoad()` for router.js).
│   ├── router.js : Core SPA navigation logic (configure routes here).
│   └── pages/
│       └── home.js : Logic for home.html, demonstrates Wails backend connection.
└── pages/
    ├── 404.html
    └── home.html
```

---

## 🧩 How to Use This Template

1. Install [Wails](https://wails.io/)
2. Open a terminal and navigate to the directory where you want to create the project.
3. Run the following command (replace `your-app-name` as desired):

   ```bash
   wails init -n your-app-name -t https://github.com/sid-the-sloth1/wails-vanillaJSWithRouter-template
   ```

4. Navigate into your new project:

   ```bash
   cd your-app-name
   ```

5. Start development mode:

   ```bash
   wails dev
   ```

---

## 🧪 Live Development

To run in live development mode:

1. Start the Wails backend:

   ```bash
   wails dev
   ```

2. In another terminal, navigate to the `frontend/` folder and start the frontend dev server:

   ```bash
   npm run dev
   ```

The frontend will be available at [http://localhost:34115](http://localhost:34115).

Open it in your browser to test your app with hot-reloading!

---

## 📦 Building

To create a production-ready build:

```bash
wails build
```

This will bundle the backend and frontend into a distributable application.
