// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic project loading
const projects = [
    {
        title: "Project 1",
        description: "Brief description of Project 1.",
        image: "projects/project1.jpg"
    },
    {
        title: "Project 2",
        description: "Brief description of Project 2.",
        image: "projects/project2.jpg"
    },
    // Add more projects as needed
];

function loadProjects() {
    const projectContainer = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectContainer.appendChild(projectElement);
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);

// Form submission handler
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            service_id: 'YOUR_SERVICE_ID',
            template_id: 'YOUR_TEMPLATE_ID',
            user_id: 'YOUR_USER_ID',
            template_params: data
        })
    })
    .then(response => response.json())
    .then(result => {
        alert('Message sent successfully!');
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message.');
    });
});
