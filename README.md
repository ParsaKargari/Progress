# ![Progress](./publicAssets/ProgressBanner.png)

[![Generic badge](https://img.shields.io/badge/COURSE-SENG_401-blue.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/GROUP-13-blue.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/SECTIONS-L01/L02/L03-blue.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/SEMESTER-WINTER_2024-red.svg)](https://shields.io/)
![Github Workflow](https://github.com/ParsaKargari/Progress/actions/workflows/npm-publish-github-packages.yml/badge.svg)

## 📖 Table of Contents

- [📝 Contributors](#-contributors)
- [👨‍💻 Teck Stack](#-tech-stack)
- [🚀 Backend Documentation](#-backend-documentation)
- [🌟 Frontend Documentation](#-frontend-documentation)
- [🧾 License](#-license)

## 📝 Contributors

- [Parsa](https://github.com/ParsaKargari) - Fullstack Developer & Project Lead
- [Shivam](https://github.com/shivamdesai04) - Fullstack Developer
- [Vishnu](https://github.com/Vishnu-Dhanda) - UI Specialist & Frontend Developer
- [Gurnoor]() - Backend Developer
- [Dannick](https://github.com/dannicklucas) - Backend Developer
- [David]() - Backend Developer
- [Thomas](https://github.com/thomasbhavnani) - Backend Developer

## 👨‍💻 Tech Stack

- Frontend

  ![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

- Backend

  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)

- Testing

  ![Selenium](https://img.shields.io/badge/-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white)![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

- Deployment

  ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

- CI/CD

  ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=GitHub%20Actions&logoColor=white)

## 🚀 Backend Documentation

### 🏃 Quickstart

To run the backend server locally:

1. Make sure you have Node.js installed on your system.
2. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/ParsaKargari/Progress.git
   ```
3. Navigate to the `backend` directory.
   ```bash
   cd backend
   ```
4. Install the necessary packages.
   ```bash
   npm install --force
   ```
5. Ensure you have a `.env` file in the root of the backend directory with the necessary environment variables set:

   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SPOTIFY_REDIRECT_URI=your_spotify_redirect_uri
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   PORT_NUMBER=your_port_number
   SPOTIFY_REDIRECT_URL=your_spotify_redirect_url
   ```

6. Start the backend server.
   ```bash
   npm start
   ```

### 🛠️ Installation

After cloning the repository and navigating to the backend directory, run:

```bash
npm install --force
```

This will install all the dependencies defined in the `package.json` file necessary for the backend server to run.

### 🧪 Testing

Testing is implemented with Jest. Run the following command to execute the tests:

```bash
npm test
```

Make sure to have testing environment variables set or a testing configuration that the tests can utilize without interfering with the production or development databases.

### 🧰 Backend Dependencies

- Express.js as the web application framework.
- Supabase for data storage and retrieval.
- Dotenv to load environment variables from an `.env` file.
- Other utilities for logging, error handling, and HTTP request parsing.

### 🔧 Development Tools

- Nodemon for automatically restarting the server upon changes during development.
- Jest and Supertest for testing backend functionality.

## 🌟 Frontend Documentation

This section covers the necessary steps to get the frontend of the Progress app up and running on your local development machine, including setup, installation, dependencies, testing, building, and deployment.

### 🏃 Quickstart

To get started quickly with the frontend of the Progress app, follow these steps:

1. Clone the repository to your local machine. `git clone https://github.com/ParsaKargari/Progress.git`.
2. Navigate to the project's frontend directory. `cd ./frontend/` from the root directory of the project.
3. Run `npm install --force` to install all the required dependencies.
4. Once the dependencies are installed, you can start the development server by running `npm start`.

### 🛠️ Dependencies & Packages

The Progress frontend is built using React and utilizes several additional libraries and frameworks to enhance its functionality and design. Here's a list of the key dependencies:

- #### UI Frameworks & Design

  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
  - [Material-UI](https://material-ui.com/): A popular React UI framework that provides a set of components and styles for building modern web applications.

- #### Date Handling

  - [day.js](https://day.js.org/): A minimalist JavaScript library that provides a simple and efficient way to handle dates and times.

- #### Other Utilities

  - [react-heat-map](https://www.npmjs.com/package/@uiw/react-heat-map): A React component for rendering heatmaps.

### 🧪 Testing

The frontend of the Progress app is tested using Selenium UI Testing.

### 🚀 Building & Deployment

To build the frontend of the Progress app, use the following command:

```bash
npm run build
```

This will create a production-ready build of the frontend in the `./build` directory. You can then deploy this build to a web server or hosting service of your choice.

### 🌐 Deployment

The frontend of the Progress app is deployed using GitHub Pages. The deployment process is automated using GitHub Actions, which builds and deploys the frontend to GitHub Pages on every push to the `main` branch.

### 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html): The official documentation for React.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs): The official documentation for Tailwind CSS.
- [Material-UI Documentation](https://material-ui.com/getting-started/installation/): The official documentation for Material-UI.
- [Jest Documentation](https://jestjs.io/docs/getting-started): The official documentation for Jest.

## 🧾 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
