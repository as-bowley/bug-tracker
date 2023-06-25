# Bug Tracker

Bug Tracker is a responsive web application for tracking software bugs.

## Overview

The application allows users to create an account, login, add bugs, modify their details, delete them and update their status and priority. It's also possible to search for specific bugs within the application.

If you'd like to use this frontend application with another database, it should be possible to do so by following the type definitions set out in the `redux/types` folder.

## Features

- **User Account Creation:** Sign up to create a new account.
- **Login:** Registered users can login to access their accounts.
- **Bug Tracking:** Add new bugs, update their status and priority, modify their title and description, and delete them when no longer needed.
- **Search:** Find specific bugs quickly using the search functionality.

## Installation

To run the frontend locally, follow the steps below:

1. Clone this repository to your local machine.
2. Navigate into the cloned repository.
3. Install the dependencies with `npm install`.
4. Start the development server with `npm run dev`.

Ensure that you also have the backend server running. 

## Usage

To use Bug Tracker:

1. Create an account and log in.
2. From the dashboard, you can create a new bug by providing the required information.
3. Once a bug is created, it will be listed in your dashboard where you can update its status, priority, or delete it. You can also modify the title and description of the bugs.

## Technologies

The Bug Tracker frontend is made with:

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

The backend is built using:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
