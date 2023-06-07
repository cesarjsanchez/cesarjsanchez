function showSection(id) {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li');

    sections.forEach(section => {
        if (section.id === id) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    navItems.forEach(navItem => {
        if (navItem.innerText.toLowerCase() === id) {
            navItem.classList.add('active');
        } else {
            navItem.classList.remove('active');
        }
    });
}

showSection('education'); // Show the "Education" section by default
