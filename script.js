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
        if (navItem.getAttribute('data-section') === id) {
            navItem.classList.add('active');
        } else {
            navItem.classList.remove('active');
        }
    });
}

showSection('education'); // Show the "Education" section by default

window.onload = function() {
    const API_URL = "https://api.us-east.tinybird.co/v0/pipes/work_experience_pipe_6072.json?token=p.eyJ1IjogImJlMjI0MjJiLWMxZDMtNDM3OC05OTY3LTBiZmJlZTI4ZDM0ZSIsICJpZCI6ICIzMDUxYTc1OC1kNTk0LTQ3YTUtYjY3Mi1iNmFjYmI5Y2I0ZTgifQ.-8_l7AY-hvEKWkhGpJ29SYd1-SSGiiTWGcMTszsOrRI";
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const workExperienceList = document.getElementById('workExperienceList');
            
            // Sort the data array by the startDate field in descending order
            data.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

            data.data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${item.Company}: ${item.Position}</strong><br>
                    <strong>${item.Start_Date} – ${item.End_Date}</strong><br>
                    <i>${item.Location}</i><br>
                    ${item.Responsibilities.replace(/\n/g, '<br>')}
                    <br>
                `;
                workExperienceList.appendChild(li);
            });
        });
};
