'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 'w-6 h-6',
  medium: 'w-12 h-12',
  large: 'w-16 h-16'
};

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        className={`${sizeMap[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[15%] h-[15%] rounded-full bg-gray-400"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateY(-150%)`,
              transformOrigin: '50% 50%',
              opacity: 1 - (i * 0.1)
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
