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
    const WORK_API_URL = "https://api.us-east.tinybird.co/v0/pipes/work_experience_pipe_6072.json?token=p.eyJ1IjogImJlMjI0MjJiLWMxZDMtNDM3OC05OTY3LTBiZmJlZTI4ZDM0ZSIsICJpZCI6ICIzMDUxYTc1OC1kNTk0LTQ3YTUtYjY3Mi1iNmFjYmI5Y2I0ZTgifQ.-8_l7AY-hvEKWkhGpJ29SYd1-SSGiiTWGcMTszsOrRI";
    const SKILLS_API_URL = "https://api.us-east.tinybird.co/v0/pipes/skills_pipe_0872.json?token=p.eyJ1IjogImJlMjI0MjJiLWMxZDMtNDM3OC05OTY3LTBiZmJlZTI4ZDM0ZSIsICJpZCI6ICIwMWM1YjY1ZS1jNmQ4LTQwNjMtOWQ0Yi1lZmJlZmIzNjdkNjIifQ.kEVNkZUnLUuIXC--6cIDJvKYyWQ_ae7CTBoF_3-fVeo";

    // Work Experience
    fetch(WORK_API_URL)
        .then(response => response.json())
        .then(data => {
            const workExperienceList = document.getElementById('workExperienceList');
            data.data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${item.Company}: ${item.Position}</strong><br>
                    <strong> ${item.Start_Date} – ${item.End_Date} </strong> <br>
                     <i> ${item.Location} </i> <br>
                    ${item.Responsibilities.replace(/\n/g, '<br>')}
                    <br>
                `;
                workExperienceList.appendChild(li);
            });
        });

    // Skills
    fetch(SKILLS_API_URL)
        .then(response => response.json())
        .then(data => {
            const skillsList = document.getElementById('skills').getElementsByTagName('ul')[0];
            skillsList.innerHTML = ''; // clear out the existing list items
            let categories = {};
            data.data.forEach(item => {
                if(!categories[item.Category]) {
                    categories[item.Category] = [];
                }
                categories[item.Category].push(item.Skill);
            });
            for(const category in categories) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${category}:</strong> ${categories[category].join(', ')}`;
                skillsList.appendChild(li);
            }
        });
};