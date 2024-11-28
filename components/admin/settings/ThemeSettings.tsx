'use client'

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { SwatchIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const colorThemes = [
  { name: 'Default Blue', value: 'blue', bgColor: 'bg-blue-500', selectedColor: 'ring-blue-500' },
  { name: 'Forest Green', value: 'green', bgColor: 'bg-green-500', selectedColor: 'ring-green-500' },
  { name: 'Royal Purple', value: 'purple', bgColor: 'bg-purple-500', selectedColor: 'ring-purple-500' },
  { name: 'Ruby Red', value: 'red', bgColor: 'bg-red-500', selectedColor: 'ring-red-500' },
  { name: 'Sunset Orange', value: 'orange', bgColor: 'bg-orange-500', selectedColor: 'ring-orange-500' },
  { name: 'Ocean Teal', value: 'teal', bgColor: 'bg-teal-500', selectedColor: 'ring-teal-500' },
];

const displayModes = [
  {
    name: 'Light',
    value: 'light',
    icon: SunIcon,
    description: 'Light mode for daytime use',
  },
  {
    name: 'Dark',
    value: 'dark',
    icon: MoonIcon,
    description: 'Dark mode for nighttime use',
  },
];

export default function ThemeSettings() {
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorThemes[0]);
  const [selectedMode, setSelectedMode] = useState(displayModes[0]);
  const [fontSize, setFontSize] = useState('16');
  const [borderRadius, setBorderRadius] = useState('4');

  return (
    <div className="space-y-6">
      {/* Color Theme */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <div className="flex items-center">
              <SwatchIcon className="h-8 w-8 text-blue-500" />
              <h3 className="ml-2 text-lg font-medium leading-6 text-gray-900">Color Theme</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">Choose a color theme for your admin dashboard.</p>
          </div>

          <div className="mt-6">
            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
              <RadioGroup.Label className="sr-only">Choose a color theme</RadioGroup.Label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {colorThemes.map((theme) => (
                  <RadioGroup.Option
                    key={theme.name}
                    value={theme}
                    className={({ active, checked }) =>
                      classNames(
                        active && checked ? 'ring ring-offset-1' : '',
                        !active && checked ? 'ring-2' : '',
                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-lg p-0.5 focus:outline-none'
                      )
                    }
                  >
                    <RadioGroup.Label as="span" className="sr-only">
                      {theme.name}
                    </RadioGroup.Label>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        theme.bgColor,
                        'h-8 w-8 rounded-lg border border-black border-opacity-10'
                      )}
                    />
                    <span
                      className={classNames(
                        theme.selectedColor,
                        'pointer-events-none absolute -inset-px rounded-lg'
                      )}
                      aria-hidden="true"
                    />
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Display Mode */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Display Mode</h3>
            <p className="mt-1 text-sm text-gray-500">Choose between light and dark mode.</p>
          </div>

          <div className="mt-6">
            <RadioGroup value={selectedMode} onChange={setSelectedMode} className="mt-2">
              <RadioGroup.Label className="sr-only">Choose a display mode</RadioGroup.Label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {displayModes.map((mode) => (
                  <RadioGroup.Option
                    key={mode.name}
                    value={mode}
                    className={({ active, checked }) =>
                      classNames(
                        checked ? 'border-transparent ring-2 ring-blue-500' : 'border-gray-300',
                        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                      )
                    }
                  >
                    {({ checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label as="p" className="font-medium text-gray-900">
                                {mode.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description as="div" className="text-gray-500">
                                <mode.icon className="h-6 w-6" />
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-blue-600">
                              <CheckIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Typography & Layout */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Typography & Layout</h3>
            <p className="mt-1 text-sm text-gray-500">Customize the appearance of text and UI elements.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">
                Base Font Size (px)
              </label>
              <input
                type="number"
                name="font-size"
                id="font-size"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                min="12"
                max="24"
                className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="border-radius" className="block text-sm font-medium text-gray-700">
                Border Radius (px)
              </label>
              <input
                type="number"
                name="border-radius"
                id="border-radius"
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
                min="0"
                max="16"
                className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>
  );
}
