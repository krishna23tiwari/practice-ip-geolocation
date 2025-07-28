// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import baseurl from './BaseUrl';

// const Navbar = () => {
//   const trackVisitor = async () => {
//     try {
//       const response = await axios.post(`${baseurl}visitor/track`);
//       console.log('Visitor tracked:', response.data); 
//     } catch (err) {
//       console.error("Error tracking visitor:", err);
//     }
//   };

//   useEffect(() => {
//     trackVisitor();
//   }, []);

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         <div className="text-xl font-bold">
//           KK Tiwari | Full-Stack Developer
//         </div>

//         <div className="hidden md:flex space-x-6 items-center">
//           <Link to="/" className="hover:text-yellow-400">
//             Home
//           </Link>
//           <Link to="/contact" className="hover:text-yellow-400">
//             Contact
//           </Link>
//         </div>

//         {/* Hamburger for mobile */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseurl from './BaseUrl';

const Navbar = () => {
  const [counts, setCounts] = useState({ todayCount: 0, totalCount: 0 });

  const trackVisitor = async () => {
    try {
      await axios.post(`${baseurl}visitor/track`);
    } catch (err) {
      console.error("Error tracking visitor:", err);
    }
  };

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${baseurl}visitor/counts`);
      setCounts(response.data);
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  useEffect(() => {
    trackVisitor();
    fetchCounts();
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          KK Tiwari | Full-Stack Developer
        </div>

        {/* Show counts */}
        <div className="text-sm mr-4 md:flex space-x-4 hidden">
          <span>Today's Count: {counts.todayCount}</span>
          <span>Total Count: {counts.totalCount}</span>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
