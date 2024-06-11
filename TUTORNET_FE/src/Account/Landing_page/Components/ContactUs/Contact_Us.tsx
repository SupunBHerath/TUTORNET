import React, { useState } from 'react';

type ContactFormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [formFields, setFormFields] = useState<ContactFormFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formFields);
  };

  return (
    <div className="contact-us-container">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap');
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

          :root {
            --primary-color: #004aad;
            --secondary-color: #f6921e;
            --font-family: 'Oswald', sans-serif;
          }

          .contact-us-container {
            position: relative;
            padding: 20px;
            max-width: 1200px;
            margin: auto;
            overflow: hidden;
          }

          .contact-us {
            font-family: var(--font-family);
            padding: 20px;
            max-width: 800px;
            margin: auto;
            z-index: 2;
            position: relative;
          }

          h1 {
            color: var(--primary-color);
            text-align: center;
            margin-bottom: 20px;
            font-size: 2.5rem;
          }

          .contact-form {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            color: white;
            transition: transform 0.3s ease;
          }

          .contact-form:hover {
            transform: scale(1.02);
          }

          .contact-form label {
            display: block;
            margin: 10px 0 5px;
          }

          .contact-form input, .contact-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: none;
            border-radius: 4px;
            font-family: var(--font-family);
          }

          .contact-form input::placeholder, .contact-form textarea::placeholder {
            color: #ccc;
          }

          .contact-form button {
            padding: 10px 15px;
            background-color: white;
            color: var(--primary-color);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-family);
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .contact-form button:hover {
            background-color: var(--primary-color);
            color: white;
          }

          .contact-info, .map, .social-media, .faq, .privacy {
            margin-bottom: 20px;
            color: var(--primary-color);
          }

          .contact-info h2, .map h2, .social-media h2, .faq h2 {
            margin-bottom: 10px;
            font-size: 1.5rem;
          }

          .contact-info p, .privacy p {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .contact-info p i, .privacy p i {
            color: var(--secondary-color);
          }

          .map iframe {
            width: 100%;
            height: 300px;
            border: 0;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .social-media a {
            display: block;
            margin: 5px 0;
            color: var(--secondary-color);
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .social-media a:hover {
            color: var(--primary-color);
            text-decoration: underline;
          }

          .faq p {
            margin: 5px 0;
          }

          .faq p i {
            color: var(--secondary-color);
            margin-right: 10px;
          }

          .privacy p a {
            color: var(--secondary-color);
            text-decoration: underline;
            transition: color 0.3s ease;
          }

          .privacy p a:hover {
            color: var(--primary-color);
          }

          .animation-left, .animation-right {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50px;
            background: var(--primary-color);
            animation: slide 5s linear infinite;
            z-index: 1;
          }

          .animation-left {
            left: 0;
            animation: slide-left 5s linear infinite;
          }

          .animation-right {
            right: 0;
            animation: slide-right 5s linear infinite;
          }

          @keyframes slide-left {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes slide-right {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
        `}
      </style>

      <div className="animation-left"></div>
      <div className="animation-right"></div>

      <div className="contact-us">
        <h1>Contact Us</h1>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" value={formFields.name} onChange={handleChange} required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" value={formFields.email} onChange={handleChange} required />

            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Subject" value={formFields.subject} onChange={handleChange} required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Your Message" value={formFields.message} onChange={handleChange} required />

            <button type="submit">Send Message</button>
          </form>
        </div>
        
        <div className="contact-info">
          <h2>Our Contact Information</h2>
          <p><i className="fas fa-envelope"></i>Email: contact@yourwebsite.com</p>
          <p><i className="fas fa-phone-alt"></i>Phone: (123) 456-7890</p>
          <p><i className="fas fa-map-marker-alt"></i>Address: 1234 Street Name, City, Country</p>
          <p><i className="fas fa-clock"></i>Business Hours: Mon-Fri, 9am-5pm</p>
        </div>
        
        <div className="map">
          <h2>Our Location</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18..."></iframe>
        </div>
        
        <div className="social-media">
          <h2>Follow Us</h2>
          <a href="https://www.facebook.com/yourpage"><i className="fab fa-facebook-f"></i> Facebook</a>
          <a href="https://www.twitter.com/yourpage"><i className="fab fa-twitter"></i> Twitter</a>
          <a href="https://www.linkedin.com/yourpage"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
        </div>
        
        <div className="faq">
          <h2>Frequently Asked Questions</h2>
          <p><i className="fas fa-question-circle"></i>Question 1: ...</p>
          <p>Answer: ...</p>
          <p><i className="fas fa-question-circle"></i>Question 2: ...</p>
          <p>Answer: ...</p>
        </div>
        
        <div className="privacy">
          <p><i className="fas fa-shield-alt"></i>We value your privacy. Please read our <a href="/privacy-policy">Privacy Policy</a> for more information.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
