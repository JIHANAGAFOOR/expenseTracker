# React Native Expense Tracker

A mobile application built with React Native (Expo) that helps users track their expenses with authentication and local data persistence.

## Features

### Authentication
- User registration with name, email, and password
- Secure login system
- Session persistence
- Automatic login on app restart
- Logout functionality

### Expense Management
- Add new transactions with title, amount, and date
- View list of all transactions
- Delete existing transactions
- User-specific transaction data

### Data Persistence
- Local storage for user data and transactions
- Secure data management
- User-specific data isolation

## Tech Stack

- React Native (Expo)
- Redux for state management
- Expo router for screen management
- AsyncStorage for local data persistence
- Form validation

## Project Structure

```
src/
├── components/        # Reusable UI components
├── app/          # Screen components and navigation
├── store/           # Redux store, actions, and reducers
├── constants/           # constants such as colors
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JIHANAGAFOOR/expenseTracker
```

2. Install dependencies:
```bash
cd expense-tracker
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

### Running the App

- Press `i` to run on iOS Simulator
- Press `a` to run on Android Emulator
- Scan QR code with Expo Go app on your physical device


Project Link: https://github.com/JIHANAGAFOOR/expenseTracker