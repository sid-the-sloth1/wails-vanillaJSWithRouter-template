async function waitForPageLoad() {
	// https://sid-the-sloth1.github.io/docs/waitForElements.html
	return new Promise((resolve) => {
		if (document.readyState === "complete" || document.readyState === "interactive") {
			resolve();
		} else {
			document.addEventListener("DOMContentLoaded", resolve, { once: true });
		}
	});
}


async function waitForComponent() {
	// waits for router.js to load the component
	return new Promise((resolve) => {
		if (window.loadedPage) {
			resolve();
		} else {
			let tries = 0;
			const timer = setInterval(() => {
				tries += 1;
				if (window.loadedPage) {
					clearInterval(timer);
					resolve();
				}
				if (tries > 20) {
					clearInterval(timer);
					reject();
				}
			}, 800);
		}
	});
}


function createElement(tag, attrs = {}) {
	const element = document.createElement(tag);
	Object.keys(attrs).forEach(key => {
		element.setAttribute(key, attrs[key]);
	});
	return element;
}


function setActiveNavLink(path) {
	document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
	try {
		switch (path) {
			case '/':
				document.querySelector('.nav-link.home')?.classList.add('active');
				break;
			default:
				console.log("No Nav Link associated with this path");
		}
	} catch (error) {
		console.error(error);
	}
}

