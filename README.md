# Pitchtrack (Backend)

A feature-rich clone of [StageTimer.io](https://stagetimer.io), built as a senior project. This application replicates the core functionalities of StageTimer.io, including premium features, using Nest.js, MongoDB, and deployed on Microsoft Azure.

## Features

- **Customizable Timers:** Create and manage multiple timers with adjustable settings.
- **Countdowns:** Set up and monitor countdowns for events, deadlines, or other activities.
- **Visual and Audio Alerts:** Receive notifications through visual and audio alerts when timers expire or reach specific intervals.
- **User Authentication:** Secure user accounts with registration and login functionality.
- **Premium Features:** Includes exclusive features available in StageTimer.io’s premium version.
- **Responsive Design:** Optimized for use on various devices including desktops, tablets, and smartphones.

## Technologies Used

- **Backend:** Nest.js
- **Database:** MongoDB
- **Deployment:** Microsoft Azure

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (Local or Atlas instance)
- Azure CLI (For deployment)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/saipepu/pitchtrack-server.git
   cd pitchtrack-server
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Setup Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
    MONGO_USER=
    MONGO_PWD=
    MONGO_URI=
   ```

4. **Run the Application Locally:**

   ```bash
   npm run start
   ```

   The application will start on `http://localhost:8080` by default.

### Running Tests

To run the test suite:

```bash
npm run test
```

### Building for Production

To build the application for production:

```bash
npm run build
```

### Deployment

1. **Setup Azure App Service:**

   Follow the [Azure documentation](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs) to create and configure an Azure App Service.

2. **Deploy to Azure:**

   Use the Azure CLI to deploy the built application:

   ```bash
   az webapp up --name your-app-name --resource-group your-resource-group
   ```

   Replace `your-app-name` and `your-resource-group` with your Azure configuration.

## Usage

Once deployed, you can access the application at `https://your-app-name.azurewebsites.net`. Users can sign up, log in, and start using the timer functionalities.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions and feedback are welcome!

## Acknowledgements

- [StageTimer.io](https://stagetimer.io) for inspiration
- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Microsoft Azure Documentation](https://docs.microsoft.com/en-us/azure/)