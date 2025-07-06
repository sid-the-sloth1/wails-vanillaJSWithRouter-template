waitForComponent().then(() => {
	// Wait for the component to be mounted
	console.log("Home Page JS loaded");
	alertify("Home Page loaded sucessfully", "success");


	async function fetchData() {
		const systemInfo = await window.go.main.App.GetSystemInfo();
		const currentDateTime = await window.go.main.App.CurrentDateTime();
		document.getElementById('systemInfo').textContent = systemInfo;
		document.getElementById('currentDateTime').textContent = currentDateTime;
	}
	fetchData();
});