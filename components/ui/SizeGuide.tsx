import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './animations/FadeIn';

interface SizeData {
  size: string;
  chest: string;
  waist: string;
  hips: string;
  inseam: string;
}

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  productName?: string;
}

const sizeData: SizeData[] = [
  { size: 'XS', chest: '32-34', waist: '26-28', hips: '35-37', inseam: '30' },
  { size: 'S', chest: '35-37', waist: '29-31', hips: '38-40', inseam: '30.5' },
  { size: 'M', chest: '38-40', waist: '32-34', hips: '41-43', inseam: '31' },
  { size: 'L', chest: '41-43', waist: '35-37', hips: '44-46', inseam: '31.5' },
  { size: 'XL', chest: '44-46', waist: '38-40', hips: '47-49', inseam: '32' },
  { size: '2XL', chest: '47-49', waist: '41-43', hips: '50-52', inseam: '32.5' },
];

export const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose, category, productName }) => {
  const [activeTab, setActiveTab] = useState<'table' | 'measure'>('table');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
        >
          <FadeIn>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Size Guide</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('table')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'table'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Size Table
                </button>
                <button
                  onClick={() => setActiveTab('measure')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'measure'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  How to Measure
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'table' ? (
                  <motion.div
                    key="table"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Size
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Chest
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Waist
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Hips
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Inseam
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sizeData.map((row) => (
                            <tr key={row.size}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {row.size}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {row.chest}"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {row.waist}"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {row.hips}"
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {row.inseam}"
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="measure"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">How to Measure</h3>
                      <p className="text-gray-600 mb-4">
                        For the most accurate measurements, have someone else measure you while you stand straight with your arms relaxed at your sides.
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <span className="font-medium text-gray-900 mr-2">Chest:</span>
                          <span className="text-gray-600">Measure around the fullest part of your chest, keeping the tape horizontal.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium text-gray-900 mr-2">Waist:</span>
                          <span className="text-gray-600">Measure around your natural waistline, keeping the tape comfortably loose.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium text-gray-900 mr-2">Hips:</span>
                          <span className="text-gray-600">Measure around the fullest part of your hips, keeping the tape horizontal.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium text-gray-900 mr-2">Inseam:</span>
                          <span className="text-gray-600">Measure from the crotch seam to the bottom of your ankle.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
