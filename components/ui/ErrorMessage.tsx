'use client';

import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export default function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-lg bg-red-50 p-4 border border-red-100"
    >
      <div className="flex items-center">
        <FiAlertCircle className="h-5 w-5 text-red-500" />
        <p className="ml-3 text-sm text-red-700">{message}</p>
      </div>
      {retry && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={retry}
          className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
}
