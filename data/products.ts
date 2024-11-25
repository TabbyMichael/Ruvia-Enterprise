export interface Product {
  id: string
  name: string
  description: string
  features: string[]
  price: number
  image: string
  category: 'school' | 'security' | 'sports'
}

export const products: Product[] = [
  // Sports Uniforms
  {
    id: 'soccer-kit',
    name: 'Professional Soccer Kit',
    description: 'Complete soccer team uniform set',
    features: [
      'Moisture-wicking technology',
      'Breathable mesh panels',
      'UV protection',
      'Custom team numbering',
    ],
    price: 2800,
    image: '/images/sports/soccer-kit.jpg',
    category: 'sports',
  },
  {
    id: 'basketball-uniform',
    name: 'Basketball Team Uniform',
    description: 'Pro-grade basketball uniform set',
    features: [
      'Quick-dry fabric',
      'Reversible design',
      'Anti-odor treatment',
      'Custom team branding',
    ],
    price: 3200,
    image: '/images/sports/basketball-uniform.jpg',
    category: 'sports',
  },
  {
    id: 'rugby-kit',
    name: 'Rugby Team Kit',
    description: 'Durable rugby uniform package',
    features: [
      'Impact-resistant fabric',
      'Reinforced seams',
      'Grip-enhanced material',
      'Team customization',
    ],
    price: 3500,
    image: '/images/sports/rugby-kit.jpg',
    category: 'sports',
  },
  {
    id: 'track-field-uniform',
    name: 'Track & Field Uniform',
    description: 'Lightweight athletics uniform',
    features: [
      'Aerodynamic design',
      'Ultra-lightweight fabric',
      'Compression fit',
      'Moisture management',
    ],
    price: 2500,
    image: '/images/sports/track-uniform.jpg',
    category: 'sports',
  },
  {
    id: 'volleyball-kit',
    name: 'Volleyball Team Kit',
    description: 'Professional volleyball uniform set',
    features: [
      'Stretch fabric technology',
      'Anti-ride design',
      'Quick-dry material',
      'Custom team graphics',
    ],
    price: 2600,
    image: '/images/sports/volleyball-kit.jpg',
    category: 'sports',
  },
  {
    id: 'cricket-uniform',
    name: 'Cricket Team Uniform',
    description: 'Complete cricket team kit',
    features: [
      'Sun-protective fabric',
      'Moisture management',
      'Ventilation zones',
      'Professional styling',
    ],
    price: 3800,
    image: '/images/sports/cricket-uniform.jpg',
    category: 'sports',
  },

  // School Uniforms
  {
    id: 'primary-uniform',
    name: 'Primary School Uniform Set',
    description: 'Complete primary school uniform package',
    features: [
      'Durable poly-cotton blend',
      'Stain-resistant fabric',
      'Easy-care material',
      'Adjustable sizing',
    ],
    price: 2500,
    image: '/images/school/primary-uniform.jpg',
    category: 'school',
  },
  {
    id: 'secondary-uniform',
    name: 'Secondary School Uniform',
    description: 'Professional secondary school attire',
    features: [
      'Premium fabric quality',
      'Wrinkle-resistant',
      'Color-fast material',
      'Comfortable fit',
    ],
    price: 3000,
    image: '/images/school/secondary-uniform.jpg',
    category: 'school',
  },
  {
    id: 'school-pe-kit',
    name: 'School PE Kit',
    description: 'Physical education uniform set',
    features: [
      'Breathable fabric',
      'Quick-dry material',
      'Flexible design',
      'Durable construction',
    ],
    price: 2200,
    image: '/images/school/pe-kit.jpg',
    category: 'school',
  },

  // Security Uniforms
  {
    id: 'guard-uniform',
    name: 'Professional Guard Uniform',
    description: 'Complete security guard uniform set',
    features: [
      'Heavy-duty fabric',
      'Multiple utility pockets',
      'Weather-resistant',
      'High visibility elements',
    ],
    price: 4500,
    image: '/images/security/guard-uniform.jpg',
    category: 'security',
  },
  {
    id: 'tactical-uniform',
    name: 'Tactical Security Uniform',
    description: 'Professional tactical security attire',
    features: [
      'Reinforced stitching',
      'Ripstop fabric',
      'Combat-ready design',
      'Multiple attachment points',
    ],
    price: 5500,
    image: '/images/security/tactical-uniform.jpg',
    category: 'security',
  },
  {
    id: 'corporate-security',
    name: 'Corporate Security Uniform',
    description: 'Professional corporate security attire',
    features: [
      'Business-professional look',
      'Comfortable fit',
      'Durable fabric',
      'Easy maintenance',
    ],
    price: 4000,
    image: '/images/security/corporate-uniform.jpg',
    category: 'security',
  },
]
