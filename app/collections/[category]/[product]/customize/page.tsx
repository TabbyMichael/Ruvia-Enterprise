'use client';

import { useState } from 'react';

interface CustomizeProps {
  params: {
    category: string;
    product: string;
  };
}

interface CustomizationOption {
  id: string;
  name: string;
  options: string[];
}

export default function CustomizePage({ params }: CustomizeProps) {
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState('back');

  const customizationOptions: CustomizationOption[] = [
    {
      id: 'primary-color',
      name: 'Primary Color',
      options: ['Navy', 'Black', 'White', 'Gray'],
    },
    {
      id: 'secondary-color',
      name: 'Secondary Color',
      options: ['Red', 'Blue', 'Gold', 'Silver'],
    },
    {
      id: 'collar-style',
      name: 'Collar Style',
      options: ['Standard', 'Mandarin', 'Button-down', 'Spread'],
    },
  ];

  const handleCustomizationChange = (optionId: string, value: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Customize Your Uniform</h1>
        <p className="text-gray-600 mt-2">
          Make it yours with our customization options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Preview</h2>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Product preview will appear here</p>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Color and Style Options */}
          {customizationOptions.map((option) => (
            <div key={option.id} className="space-y-2">
              <h3 className="text-sm font-medium">{option.name}</h3>
              <div className="grid grid-cols-4 gap-2">
                {option.options.map((value) => (
                  <button
                    key={value}
                    className={`border rounded-md py-2 text-sm ${
                      customizations[option.id] === value
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleCustomizationChange(option.id, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Text Customization */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Add Text</h3>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text for uniform"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                className={`border rounded-md py-2 text-sm ${
                  textPosition === 'back'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setTextPosition('back')}
              >
                Back
              </button>
              <button
                className={`border rounded-md py-2 text-sm ${
                  textPosition === 'front'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setTextPosition('front')}
              >
                Front
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 mt-6">
            Add Customized Product to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
