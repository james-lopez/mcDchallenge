# McDonald's Mobile App Challenge
A React Native Expo application for McDonalds coding challenge

## Features
- Browse menu items
- Add items to cart
- Manage cart quantities
- Dark/Light theme toggle
- Real-time cart total calculation

## Prerequisites
- Node.js (v14 or newer)
- npm or yarn
- Expo Go app on your mobile device

## Installation

1. Clone the repository:
```bash
git clone https://github.com/james-lopez/mcDchallenge.git
cd mcDchallenge
```

2. Install dependencies:
```bash
npm install
# may have to run npm install --legacy-peer-deps if react version mismatches
# or if using yarn
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run the app:
- Scan the QR code with Expo Go (Android)
- Scan the QR code with Camera app (iOS)
- Press 'i' for iOS simulator
- Press 'a' for Android emulator

## Tech Stack
- React Native
- Expo
- TypeScript
- Styled Components
- React Navigation
- Context API for state management

## Project Structure
```bash
src/
  ├── components/
  │   ├── CartIconWithBadge.tsx
  │   └── ThemeToggle.tsx          # Dark/Light mode toggle
  │
  ├── context/
  │   ├── CartContext.tsx          # Shopping cart state & logic
  │   └── ThemeContext.tsx         # Theme state management
  │
  ├── navigation/
  │   └── AppNavigator.tsx         # Main navigation configuration
  │
  ├── screens/
  │   ├── HomeScreen.tsx           # Product listing
  │   ├── DetailScreen.tsx         # Product details
  │   └── CartScreen.tsx           # Shopping cart
  │
  ├── types/
  │   ├── navigation.ts            # Navigation types
  │   └── styled.d.ts              # Styled-components types
  │
  └── utils/
      └── price.ts                 # Price formatting utilities
```
