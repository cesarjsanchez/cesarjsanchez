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

showSection('workExperience');

const modeSwitcher = document.querySelector('#modeSwitcher');
const body = document.querySelector('body');

modeSwitcher.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        modeSwitcher.textContent = 'Switch to Dark Mode';
    } else {
        body.classList.add('dark-mode');
        modeSwitcher.textContent = 'Switch to Light Mode';
    }
});


window.onload = function() {
    const WORK_API_URL = "https://api.us-east.tinybird.co/v0/pipes/work_experience_pipe_6072.json?token=p.eyJ1IjogImJlMjI0MjJiLWMxZDMtNDM3OC05OTY3LTBiZmJlZTI4ZDM0ZSIsICJpZCI6ICIzMDUxYTc1OC1kNTk0LTQ3YTUtYjY3Mi1iNmFjYmI5Y2I0ZTgifQ.-8_l7AY-hvEKWkhGpJ29SYd1-SSGiiTWGcMTszsOrRI";
    const SKILLS_API_URL = "https://api.us-east.tinybird.co/v0/pipes/skills_pipe_0872.json?token=p.eyJ1IjogImJlMjI0MjJiLWMxZDMtNDM3OC05OTY3LTBiZmJlZTI4ZDM0ZSIsICJpZCI6ICIwMWM1YjY1ZS1jNmQ4LTQwNjMtOWQ0Yi1lZmJlZmIzNjdkNjIifQ.kEVNkZUnLUuIXC--6cIDJvKYyWQ_ae7CTBoF_3-fVeo";
    const EDUCATION_API_URL = "https://api.us-east.tinybird.co/v0/pipes/education_pipe_4581.json?token=p.eyJ1IjogImJlMjI0MjJiLWMxZDMtNDM3OC05OTY3LTBiZmJlZTI4ZDM0ZSIsICJpZCI6ICIzYmUwYjNhNS1kNTI1LTQzOGUtYTQzNi1hZjUzMTUxMmI2MjgifQ.l0surXIIL41LLo2WeMOCE-Hs9v065DOyGslOxaDk98A";
    const PROJECTS_API_URL = "https://api.us-east.tinybird.co/v0/pipes/projects_pipe_3799.json?token=p.eyJ1IjogImJlMjI0MjJiLWMxZDMtNDM3OC05OTY3LTBiZmJlZTI4ZDM0ZSIsICJpZCI6ICIzYTlkZmYxNS0xMGE1LTRiZDctODcyYy0zY2QwMTYxNDMyMzcifQ.vmj-gmOScNxIv6GKGfCPhKRNgJM4pAXUlXYv-3Q3E0o";
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

        
        // Education
        fetch(EDUCATION_API_URL)
            .then(response => response.json())
            .then(data => {
                const educationList = document.getElementById('educationList');
                data.data.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${item.School}, ${item.College}</strong><br>
                        Graduation Date: ${item.GradDate}<br>
                        Degree Type: ${item.DegreeType}<br>
                        Degree: ${item.Degree}<br>
                        Location: ${item.Location}<br>
                        <br>
                    `;
                    educationList.appendChild(li);
                });
            });

            fetch(PROJECTS_API_URL)
            .then(response => response.json())
            .then(data => {
                const projectList = document.getElementById('projectList');
                data.data.forEach(item => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <h3>${item.Project}</h3>
                        <p>${item.Description}</p>
                        <p><a href="${item.Link}">Project Link</a></p>
                        <p>${item.Details}</p>
                        <p><a href="${item.OtherLink}">Other Link</a></p>
                        <br> 
                    `;
                    projectList.appendChild(div);
                });
            });


};

document.addEventListener('DOMContentLoaded', function() {
    // Track clicks on all buttons
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            Tinybird.trackEvent('button_click', { button_id: this.id, button_class: this.className, button_text: this.textContent });
        });
    }

// Track clicks on all links
const links = document.getElementsByTagName('a');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
        event.preventDefault(); 

        let href = this.href;
        
        Tinybird.trackEvent('link_click', { link_href: this.href, link_text: this.textContent }, (err) => {

            if (err) {
                console.log("Error tracking event:", err);
            }
            // If you're here, this isn't getting called.
            window.location.href = href;
        });

        // If the callback doesn't get called, this will.
        setTimeout(function() {
            window.location.href = href;
        }, 500);
    });
}
    // Track clicks on all list items with onclick handlers
    const listItems = document.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].hasAttribute('onclick')) {
            listItems[i].addEventListener('click', function() {
                Tinybird.trackEvent('list_item_click', { item_data_section: this.getAttribute('data-section'), item_text: this.textContent });
            });
        }
    }
}); 