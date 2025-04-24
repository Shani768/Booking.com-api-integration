import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Coronavirus (COVID-19) FAQs</a></li>
            <li><a href="#" className="hover:underline">Manage your trips</a></li>
            <li><a href="#" className="hover:underline">Contact Customer Service</a></li>
            <li><a href="#" className="hover:underline">Safety resource centre</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Discover</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Genius loyalty programme</a></li>
            <li><a href="#" className="hover:underline">Seasonal and holiday deals</a></li>
            <li><a href="#" className="hover:underline">Travel articles</a></li>
            <li><a href="#" className="hover:underline">Booking.com for Business</a></li>
            <li><a href="#" className="hover:underline">Traveller Review Awards</a></li>
            <li><a href="#" className="hover:underline">Car hire</a></li>
            <li><a href="#" className="hover:underline">Flight finder</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Terms and settings</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Privacy & cookies</a></li>
            <li><a href="#" className="hover:underline">Terms and conditions</a></li>
            <li><a href="#" className="hover:underline">Partner dispute</a></li>
            <li><a href="#" className="hover:underline">Modern Slavery Statement</a></li>
            <li><a href="#" className="hover:underline">Human Rights Statement</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Partners</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Extranet login</a></li>
            <li><a href="#" className="hover:underline">Partner help</a></li>
            <li><a href="#" className="hover:underline">List your property</a></li>
            <li><a href="#" className="hover:underline">Become an affiliate</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">About</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Booking.com</a></li>
            <li><a href="#" className="hover:underline">How we work</a></li>
            <li><a href="#" className="hover:underline">Sustainability</a></li>
            <li><a href="#" className="hover:underline">Press centre</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investor relations</a></li>
            <li><a href="#" className="hover:underline">Corporate contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
