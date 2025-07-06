// This file is responsible for routing and loading html, js and css files

const mainContentElement = document.getElementById('content');
const loader = document.getElementById('loader');


// key is the url route
// value is the html file to load
const routes = {
	'/': 'pages/home.html',
}

// assets and page title associated with each html file
const assets = new Map([
	['pages/home.html', {
		js: ["js/pages/home.js"],
		css: ["css/pages/home.css"],
		title: "Home Page"
	}],
	['pages/404.html', {
		js: [],
		css: ["css/pages/404.css"],
		title: "404"
	}],

]);


/*--------------------------------------------------------------------------
DO NOT MESS WITH CODE BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING
---------------------------------------------------------------------------*/



// to allow routing to urls, when you create <a> elements, add a data-link attribute in it.
// <a data-link href="/IStoleTheMoon" >Home Page</a>
// when clicked, it prevents navigation. Saves the url in session storage and reloads the page.
// Every time page loads, it checks the url in session storage and loads the corresponding html file.
// If no saved url is found, it loads the home page.
document.addEventListener('click', (e) => {
	const target = e.target.closest('[data-link]');
	if (target) {
		e.preventDefault();
		const href = target.getAttribute('href');
		sessionStorage.setItem('lastPath', href);
		location.reload();
	}
});


waitForPageLoad().then(async () => {
	const storedPath = sessionStorage.getItem('lastPath') || '/';
	setActiveNavLink(storedPath);

	const view = routes[storedPath] || 'pages/404.html';
	const asset = assets.get(view);
	loader.classList.remove('hide');


	try {
		const res = await fetch(view);
		if (!res.ok) throw new Error(`Failed to load ${view}`);
		const html = await res.text();
		mainContentElement.innerHTML = html;

		document.title = asset?.title || "Wails";

		if (asset?.css?.length) {
			asset.css.forEach(href => {
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = href;
				document.head.appendChild(link);
			});
		}

		if (asset?.js?.length) {
			for (const script of asset.js) {
				const s = document.createElement('script');
				s.src = script;
				s.type = 'module';
				document.body.appendChild(s);
			}
		}
		// needed for waitForComponent() function to work
		window.loadedPage = true;
	} catch (err) {
		console.error(err);
		mainEl.innerHTML = `<p>Error: ${err.message}</p>`;
	} finally {
		loader.classList.add('hide');
	}
});