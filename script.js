// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const profileSelection = document.getElementById('profileSelection');
  const contentScreen = document.getElementById('contentScreen');
  const professionalContent = document.getElementById('professionalContent');
  const projectsContent = document.getElementById('projectsContent');
  const hobbiesContent = document.getElementById('hobbiesContent');
  const contactContent = document.getElementById('contactContent');
  const professionalNav = document.getElementById('professionalNav');
  const projectsNav = document.getElementById('projectsNav');
  const hobbiesNav = document.getElementById('hobbiesNav');
  const contactNav = document.getElementById('contactNav');
  const netflixSound = document.getElementById('netflixSound');
  const contactForm = document.getElementById('contactForm');
  
  // Skills background animation
  createSkillsBackground();
  
  // Loading Screen Animation
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      profileSelection.style.display = 'flex';
      netflixSound.play().catch(e => console.log('Audio autoplay was prevented'));
    }, 1000);
  }, 2500);
  
  // Profile Selection
  window.selectProfile = function(profile) {
    profileSelection.classList.add('fade-out');
    setTimeout(() => {
      profileSelection.style.display = 'none';
      contentScreen.style.display = 'block';
      
      // Reset all content
      professionalContent.classList.add('hidden');
      projectsContent.classList.add('hidden');
      hobbiesContent.classList.add('hidden');
      contactContent.classList.add('hidden');
      
      // Reset nav highlights
      professionalNav.classList.remove('active');
      projectsNav.classList.remove('active');
      hobbiesNav.classList.remove('active');
      contactNav.classList.remove('active');
      
      // Show selected content
      if (profile === 'professional') {
        professionalContent.classList.remove('hidden');
        professionalNav.classList.add('active');
      } else if (profile === 'projects') {
        projectsContent.classList.remove('hidden');
        projectsNav.classList.add('active');
      } else if (profile === 'hobbies') {
        hobbiesContent.classList.remove('hidden');
        hobbiesNav.classList.add('active');
      } else if (profile === 'contact') {
        contactContent.classList.remove('hidden');
        contactNav.classList.add('active');
      }
      
      // Animate cards
      setTimeout(() => {
        const cards = document.querySelectorAll('.skill-card, .highlight-card, .contact-item, .timeline-item');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate-in');
          }, index * 100);
        });
      }, 300);
    }, 500);
  };
  
  // Back to Profiles
  window.backToProfiles = function() {
    contentScreen.classList.add('fade-out');
    setTimeout(() => {
      contentScreen.style.display = 'none';
      contentScreen.classList.remove('fade-out');
      profileSelection.style.display = 'flex';
      profileSelection.classList.remove('fade-out');
    }, 500);
  };
  
  // Handle contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Create email link with pre-filled data
      const mailtoLink = `mailto:dawitymersha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Show success message
      alert('Opening your email client to send the message. If it doesn\'t open automatically, please email me directly at dawitymersha@gmail.com');
      
      // Reset form
      contactForm.reset();
    });
  }
});

// Create animated skills background
function createSkillsBackground() {
  const skillsBackground = document.querySelector('.skills-background');
  if (!skillsBackground) return;
  
  const skills = [
    'HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'React', 
    'Node.js', 'C++', 'C', 'MySQL', 'Git', 'Bootstrap',
    'Problem Solving', 'UI/UX', 'Responsive Design', 'API Integration',
    'Database Design', 'Software Architecture', 'Testing', 'Debugging'
  ];
  
  // Create floating skill elements
  skills.forEach(skill => {
    const skillElement = document.createElement('div');
    skillElement.className = 'floating-skill';
    skillElement.textContent = skill;
    
    // Random positioning
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = 15 + Math.random() * 10;
    
    skillElement.style.left = `${left}%`;
    skillElement.style.animationDelay = `${delay}s`;
    skillElement.style.animationDuration = `${duration}s`;
    
    skillsBackground.appendChild(skillElement);
  });
}

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe elements
  document.querySelectorAll('.timeline-item, .highlight-card, .skill-card, .project-card').forEach(item => {
    observer.observe(item);
  });
});
