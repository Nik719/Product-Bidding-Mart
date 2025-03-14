# Product-Bidding-Mart

A modern e-commerce platform for product bidding, buying, and donating, built with Angular and Firebase.

## Project Idea

Product-Bidding-Mart is an innovative e-commerce platform that allows users to bid on, buy, and donate products. The platform is designed to provide a seamless and secure experience for both buyers and sellers, with real-time updates and robust user management features.

## Features

### 🔐 Secure Authentication

- User registration and login
- Social login integration (Google, Facebook)
- Role-based access control (Buyer/Seller)

### 🛍️ Product Management

- Create and list products
- Detailed product views
- Real-time bidding system
- Product categories and search

### 💰 Bidding System

- Real-time bid updates
- Bid history tracking
- Automatic bid validation
- Minimum bid increments

### 🛒 Buying and Donating

- Direct purchase options
- Product donation feature
- Donation tracking and history

### 👥 User Dashboard

- Personal profile management
- Active bids tracking
- Product listings management
- Transaction history
- Donation history

## Tech Stack

- **Frontend Framework:** Angular 17
- **UI Components:** Angular Material
- **State Management:** NgRx
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **Styling:** SCSS with BEM methodology

## Prerequisites

1. Node.js (v18 or higher)
2. npm (v9 or higher)
3. Angular CLI (v17 or higher)
4. Firebase account and project

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Nik719/Product-Bidding-Mart.git
cd Product-Bidding-Mart
```

2. Install dependencies:

```bash
npm install
```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Copy your Firebase configuration
   - Create a `.env` file in the root directory with your Firebase config

4. Start the development server:

```bash
ng serve
```

The application will be available at `http://localhost:5200`

## Project Structure

```
src/
├── app/
│   ├── core/           # Core services, guards, interceptors
│   ├── features/       # Feature modules
│   │   ├── auth/      # Authentication
│   │   ├── products/  # Product management
│   │   ├── dashboard/ # User dashboard
│   │   ├── favorites/ # Favorites management
│   │   └── search/    # Advanced search
│   ├── shared/        # Shared components, pipes, directives
│   └── store/         # NgRx store configuration
├── assets/            # Static assets
└── environments/      # Environment configurations
```

## Development

- Run unit tests:

```bash
ng test
```

- Run end-to-end tests:

```bash
ng e2e
```

- Build for production:

```bash
ng build --configuration production
```

## Deployment

The application is deployed using GitHub Pages:

1. Install the `angular-cli-ghpages` package if you haven't already:

```bash
npm install -g angular-cli-ghpages
```

2. Build the application:

```bash
ng build --configuration production --base-href /Product-Bidding-Mart/
```

3. Deploy to GitHub Pages:

```bash
npx angular-cli-ghpages --dir=dist/product-bidding-mart
```

The application will be available at: [https://Nik719.github.io/Product-Bidding-Mart/](https://Nik719.github.io/Product-Bidding-Mart/)

## Pushing to GitHub

1. Initialize a new Git repository:

```bash
git init
```

2. Add all files to the repository:

```bash
git add .
```

3. Commit the changes:

```bash
git commit -m "Initial commit"
```

4. Add the remote repository:

```bash
git remote add origin https://github.com/Nik719/Product-Bidding-Mart.git
```

5. Push the changes to GitHub:

```bash
git push -u origin main
```

If you encounter a non-fast-forward error, use the following command to force push:

```bash
git push -u origin main --force
```

## Contributing

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Angular team for the amazing framework
- Firebase team for the backend services
- Material Design team for the UI components
