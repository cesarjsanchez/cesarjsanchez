function showSection(id) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === id) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}
showSection('education'); // Show the "Education" section by default