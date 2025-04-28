# README

## About

This is a **Vanilla JS template** for a **Golang Wails (v2.10.1)** application that includes page navigation support.

This is less of a template and more of a demo app, showcasing how you can build a Wails app in Vanilla JS without using any frontend framework. It provides basic navigation between different parts of your app.

Learn more about Wails: [https://wails.io/](https://wails.io/)

## How Navigation Works

Wails (v2.10.1) builds a Single Page Application (SPA), which means you cannot navigate between URLs like you would in a traditional web app. For example:

```javascript
window.location.href = "/IStoleTheMoon";
```

This might initially load the page, but upon refreshing, Wails will not recognize the endpoint and will show an error screen.

To work around this, we get a little creative:

- When you create an `<a>` element as described [below](#notes) and configure the endpoint in **router.js**, clicking the link triggers an event listener that **prevents** navigation.
- Instead, it stores the desired endpoint in `sessionStorage` and refreshes the page.
- On reload, it checks `sessionStorage`:
  - If an endpoint is found, it loads the corresponding HTML, CSS, and JS into:

    ```html
    <main>
      <div id="content">
        <!-- Content from components gets loaded here -->
      </div>
    </main>
    ```

  - If no endpoint is saved, it loads the homepage component.
  - If no matching HTML file exists, it loads **404.html**.

You just need to create the `<a>` elements properly and configure routes in `router.js`. The rest is handled automatically!

## Notes

1. **Configuration**  
   Edit `router.js` to map URLs to their corresponding HTML, JS, and CSS files. Once configured, you can navigate between pages like a traditional website.

2. **Creating Links**  
   To enable navigation, use `<a>` elements with the `data-link` attribute:

   ```html
   <a data-link href="/IStoleTheMoon">Moon</a>
   ```

3. **Programmatic Navigation**  
   For navigation via JavaScript, set the desired path in `sessionStorage` and reload:

   ```javascript
   sessionStorage.setItem('lastPath', "/IStoleTheMoon");
   window.location.reload();
   ```

4. **External Links**  
   Wails (v2.10.1) does not directly support navigating to external URLs.  
   However, you can open external links using:

   ```javascript
   window.runtime.BrowserOpenURL('https://github.com/tesseract-ocr/tessdoc/blob/main/Downloads.md');
   ```

## File Structure

```
frontend/
├── index.html : Base HTML file. Components load inside the '<div id="content">' element.
├── css/
│   ├── alertify.css : Styles for alertify.js notifications.
│   ├── index.css : Base CSS for the entire app.
│   └── pages/
│       ├── 404.css
│       └── home.css
├── js/
│   ├── alertify.js : Custom JS to show temporary bottom-right messages. Loaded on all pages.
│   ├── index.js : Handles dark mode across the app.
│   ├── lib.js : Helper functions. (Don't remove `waitForPageLoad()`, used by `router.js`.)
│   ├── router.js : Core navigation logic. Configure endpoints here.
│   └── pages/
│       └── home.js : JS for home.html. Shows how to connect to Wails backend.
└── pages/
    ├── 404.html
    └── home.html
```

## Live Development

To run in live development mode:

1. Run `wails dev` in the project root.
2. In another terminal, navigate to the `frontend/` directory and run:

   ```
   npm run dev
   ```

The frontend dev server will be available at [http://localhost:34115](http://localhost:34115). Open it in your browser to view the app during development.

## Building

To build a production-ready, redistributable package, simply run:

```
wails build
```
