import emailjs from '@emailjs/browser';
import Toastify from 'toastify-js';
import AOS from 'aos';

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Contact form functionality
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';

  try {
    const result = await emailjs.sendForm(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      contactForm,
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    );

    if (result.text === 'OK') {
      Toastify({
        text: "Message sent successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#22c55e",
        }
      }).showToast();
      
      contactForm.reset();
    }
  } catch (error) {
    console.error('Error:', error);
    Toastify({
      text: "Failed to send message. Please try again.",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "#ef4444",
      }
    }).showToast();
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.textContent = originalBtnText;
  }
});

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});