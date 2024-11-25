# Ruvia Enterprise - Premium Uniform E-commerce Platform

A modern, responsive e-commerce platform for high-quality uniforms, built with Next.js 14 and Tailwind CSS.

## Features

- Modern, responsive design
- Server-side rendering for optimal performance
- Interactive product viewer
- Custom uniform designer
- Bulk ordering system
- Size guide and measurement tools
- Account management for organizations
- Order tracking system

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma (Database ORM)
- Stripe (Payments)
- NextAuth.js (Authentication)
- Cloudinary (Image Management)
- Framer Motion (Animations)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your environment variables:
   ```
   DATABASE_URL="your-database-url"
   STRIPE_PUBLIC_KEY="your-stripe-public-key"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   CLOUDINARY_URL="your-cloudinary-url"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js 14 app directory
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/public` - Static assets
- `/prisma` - Database schema and migrations
- `/styles` - Global styles and Tailwind configurations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
