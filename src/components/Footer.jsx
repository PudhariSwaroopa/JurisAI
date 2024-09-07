import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      {/* Top Section with Links */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-5 sm:px-10">
        
        {/* About Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold text-lg mb-4">About DOJ</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://doj.gov.in/about-department/" className="hover:underline">
                About Department
              </a>
            </li>
            <li>
              <a href="https://doj.gov.in/leadership/" className="hover:underline">
                Leadership
              </a>
            </li>
            <li>
              <a href="https://doj.gov.in/media-gallery/" className="hover:underline">
                Media Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold text-lg mb-4">Contact Information</h3>
          <ul className="space-y-2">
            <li>
              <p>Department of Justice, India</p>
            </li>
            <li>
              <p>Address: Ministry of Law and Justice, New Delhi</p>
            </li>
            <li>
              <p>Email: <a href="mailto:info@doj.gov.in" className="hover:underline">info@doj.gov.in</a></p>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section with Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="container mx-auto text-center text-sm px-5">
          © {new Date().getFullYear()} Department of Justice, India. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
