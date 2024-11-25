'use client';

import { useState } from 'react';

interface SizeGuideProps {
  params: {
    category: string;
    product: string;
  };
}

export default function SizeGuidePage({ params }: SizeGuideProps) {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  const sizeChart = {
    headers: ['Size', 'Chest', 'Waist', 'Hip', 'Length'],
    rows: [
      ['S', '88-92', '76-80', '88-92', '70'],
      ['M', '92-96', '80-84', '92-96', '72'],
      ['L', '96-100', '84-88', '96-100', '74'],
      ['XL', '100-104', '88-92', '100-104', '76'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Size Guide</h1>
        <p className="text-gray-600 mt-2">
          Find your perfect fit with our detailed size guide
        </p>
      </div>

      {/* Unit Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setUnit('cm')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              unit === 'cm'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            CM
          </button>
          <button
            onClick={() => setUnit('inches')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              unit === 'inches'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-l-0 border-gray-300`}
          >
            Inches
          </button>
        </div>
      </div>

      {/* Size Chart */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {sizeChart.headers.map((header) => (
                <th
                  key={header}
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sizeChart.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                  >
                    {cell}
                    {cellIndex > 0 && ` ${unit}`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Measurement Instructions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">How to Measure</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Chest</h3>
            <p className="text-sm text-gray-600">
              Measure around the fullest part of your chest, keeping the tape
              horizontal.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Waist</h3>
            <p className="text-sm text-gray-600">
              Measure around your natural waistline, keeping the tape comfortably
              loose.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Hip</h3>
            <p className="text-sm text-gray-600">
              Measure around the fullest part of your hips, keeping the tape
              horizontal.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Length</h3>
            <p className="text-sm text-gray-600">
              Measure from the highest point of the shoulder to the desired length.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
