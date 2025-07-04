waitForPageLoad().then(() => {

    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    let savedTheme = localStorage.getItem('theme') || "dark";
    let toBeHiddenSvg = savedTheme === 'dark' ? '#sun_icon_theme' : '#moon_icon_theme';
    document.querySelector(toBeHiddenSvg).classList.add('hide');
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = savedTheme === 'light' ? 'dark' : 'light';
        savedTheme = newTheme;
        
        
        document.querySelector(toBeHiddenSvg).classList.remove('hide');
 
        toBeHiddenSvg = newTheme === 'dark' ? '#sun_icon_theme' : '#moon_icon_theme';
        
  
        document.querySelector(toBeHiddenSvg).classList.add('hide');
     
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    document.getElementById('year').textContent = new Date().getFullYear();
});
