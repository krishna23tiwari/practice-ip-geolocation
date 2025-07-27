
// import React from 'react';
// import { motion } from 'framer-motion';

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
//       <motion.div
//         className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-10 rounded-3xl shadow-2xl max-w-3xl w-full"
//         initial={{ opacity: 0, y: 50, rotateX: -30, rotateY: 30 }}
//         animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
//         transition={{ duration: 1.2, ease: 'easeOut' }}
//         whileHover={{ rotateX: 15, rotateY: -15, scale: 1.05 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
//           Welcome to <span className="text-yellow-400">KK Tiwari's</span> Portfolio
//         </h1>
//         <p className="text-center text-lg text-gray-300 mb-4">
//           Full-Stack Developer | React, Node.js, MongoDB, Tailwind CSS
//         </p>

//         <div className="mt-8 space-y-4 text-center">
//           <motion.p
//             className="text-base text-gray-400"
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 1, duration: 1 }}
//           >
//             🚀 Passionate about building fast, responsive, and scalable applications.
//           </motion.p>
//           <motion.p
//             className="text-base text-gray-400"
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 1.3, duration: 1 }}
//           >
//             🎯 Focused on clean code, performance, and great user experience.
//           </motion.p>
//           <motion.p
//             className="text-base text-gray-400"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 1.6, duration: 1 }}
//           >
//             💼 Let’s build something amazing together!
//           </motion.p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Home;

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const LaptopModel = () => {
  const { scene } = useGLTF("/models/laptop.glb");
  return <primitive object={scene} scale={2.5} position={[-3, -2.2, 0]} />
};

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-600 to-black w-full py-10 text-center z-10 relative">
        <h1 className="text-5xl font-bold text-white">KK Tiwari Portfolio</h1>
        <p className="text-gray-300 mt-2 text-lg">Drag the laptop to view in 360°</p>
      </div>

      {/* 3D Canvas Section */}
      <div className="w-full h-[75vh] relative z-0">
        <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls enableZoom={false} enablePan enableRotate />
          <Suspense fallback={null}>
            <LaptopModel />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Home;
