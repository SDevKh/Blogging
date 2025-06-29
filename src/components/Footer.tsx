import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black p-4 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p className="text-blue-400 text-2xl font-bold">BlogPost</p>
          </div>
          <div>
            <h2 className='text-blue-400 text-lg font-semibold mb-4'>Quick Links</h2>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">Facebook</li>
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">Twitter</li>
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">Youtube</li>
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">Instagram</li>
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">LinkedIn</li>
            </ul>
          </div>
          <div>
            <h2 className='text-blue-400 text-lg font-semibold mb-4'>Customer Services</h2>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">About</li>
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">Contact</li>
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">Career</li>
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">Blog</li>
              <li className="text-gray-300 hover:text-blue-400 cursor-pointer text-sm">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h2 className='text-blue-400 text-lg font-semibold mb-4'>Newsletter</h2>
            <p className="text-gray-300 text-sm mb-4">Subscribe to our newsletter for the latest updates</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 text-white text-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
