# WorkPerfect

A modern, feature-rich workflow management SaaS platform built with Next.js, React Flow, and TypeScript.

## 🌟 Features

- **Authentication & Authorization**

  - Secure user authentication powered by Clerk
  - Role-based access control
  - Protected routes and API endpoints

- **Workflow Management**

  - Interactive workflow builder using React Flow
  - Multiple workflow support per user
  - Real-time workflow validation
  - Custom node types and connections

- **Modern Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Prisma ORM for database management
  - TanStack Query for efficient data fetching
  - Tailwind CSS with shadcn/ui components

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A database (PostgreSQL recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/work_perfect.git
cd work_perfect
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure your environment variables:

```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/work_perfect"
```

5. Initialize the database:

```bash
npx prisma generate
npx prisma db push
```

6. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 🏗️ Project Structure

```
work_perfect/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── workflows/         # Workflow management pages
├── components/            # Reusable components
├── lib/                   # Utility functions and helpers
├── prisma/               # Database schema and migrations
└── types/                # TypeScript type definitions
```

## 🛠️ Built With

- **Framework**: [Next.js](https://nextjs.org/)
- **Authentication**: [@clerk/nextjs](https://clerk.dev/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **UI Components**:
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [@tanstack/react-query](https://tanstack.com/query)
- **Workflow Engine**: [@xyflow/react](https://reactflow.dev/)

## 📝 API Documentation

Our API endpoints follow RESTful conventions:

- `GET /api/workflows` - List all workflows
- `POST /api/workflows` - Create a new workflow
- `GET /api/workflows/:id` - Get workflow details
- `PUT /api/workflows/:id` - Update a workflow
- `DELETE /api/workflows/:id` - Delete a workflow

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@workperfect.com or open an issue in our GitHub repository.
