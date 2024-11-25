'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface SizeGuideProps {
  isOpen: boolean
  closeModal: () => void
  category: string
}

const sizeCharts = {
  school: [
    { size: 'XS', chest: '32-34', waist: '26-28', height: '4\'8"-5\'0"' },
    { size: 'S', chest: '34-36', waist: '28-30', height: '5\'0"-5\'4"' },
    { size: 'M', chest: '36-38', waist: '30-32', height: '5\'4"-5\'8"' },
    { size: 'L', chest: '38-40', waist: '32-34', height: '5\'8"-6\'0"' },
    { size: 'XL', chest: '40-42', waist: '34-36', height: '6\'0"-6\'2"' },
    { size: '2XL', chest: '42-44', waist: '36-38', height: '6\'2"-6\'4"' },
  ],
  security: [
    { size: 'XS', chest: '34-36', waist: '28-30', inseam: '29-30' },
    { size: 'S', chest: '36-38', waist: '30-32', inseam: '30-31' },
    { size: 'M', chest: '38-40', waist: '32-34', inseam: '31-32' },
    { size: 'L', chest: '40-42', waist: '34-36', inseam: '32-33' },
    { size: 'XL', chest: '42-44', waist: '36-38', inseam: '33-34' },
    { size: '2XL', chest: '44-46', waist: '38-40', inseam: '34-35' },
  ],
  sports: [
    { size: 'XS', chest: '32-34', waist: '26-28', hips: '34-36' },
    { size: 'S', chest: '34-36', waist: '28-30', hips: '36-38' },
    { size: 'M', chest: '36-38', waist: '30-32', hips: '38-40' },
    { size: 'L', chest: '38-40', waist: '32-34', hips: '40-42' },
    { size: 'XL', chest: '40-42', waist: '34-36', hips: '42-44' },
    { size: '2XL', chest: '42-44', waist: '36-38', hips: '44-46' },
  ],
}

export default function SizeGuide({ isOpen, closeModal, category }: SizeGuideProps) {
  const sizeData = sizeCharts[category as keyof typeof sizeCharts] || []
  const isSchool = category === 'school'
  const isSports = category === 'sports'

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Size Guide - {category.charAt(0).toUpperCase() + category.slice(1)} Uniforms
                </Dialog.Title>

                <div className="mt-2">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Size</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Chest</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Waist</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          {isSchool ? 'Height' : (isSports ? 'Hips' : 'Inseam')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sizeData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.size}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.chest}"</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.waist}"</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {isSchool ? item.height : (isSports ? item.hips + '"' : item.inseam + '"')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    All measurements are in inches except height. For best fit, measure yourself and compare with the size chart.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
