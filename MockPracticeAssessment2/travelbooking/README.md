# Travel Booking Platform - React Practice Assessment


## Project Structure:
- userstory1/: Homepage components (App.js, Header, DestinationCard, Footer, style.css)
- userstory2/: Routing and package management (PackageList.js, routerConfig.js)
- userstory3/: Booking form and state management (BookingForm.js, store/actions.js, store/reducers.js)
- screenshots/: Application screenshots
- db.json: Mock data for JSON server
- travelbooking/: Complete React application with all integrated features

## Purpose of Each Folder:

userstory1/: Contains the homepage components and styling as implemented for User Story 1
userstory2/: Contains routing configuration and package management components for User Story 2
userstory3: Contains booking form and Redux store setup for User Story 3


### Setup Instructions:

1. Ensure Node.js and npm are installed.

2. Navigate to the travelbooking directory: cd travelbooking

3. Install dependencies: npm install

4. Start the JSON server for mock data: npx json-server --watch db.json --port 3001 (run from project root)

5. Start the React app: npm run dev

6. Open http://localhost:5173 in browser.

### Features:
- Homepage with destinations
- Packages list from API
- Booking form with validation
- Dashboard for booking status
- PWA support

### Dependencies: react-router-dom, formik, yup, @reduxjs/toolkit, react-redux, bootstrap, vite-plugin-pwa