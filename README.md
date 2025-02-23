# TradeSage

TradeSage is a platform designed to help small Canadian businesses navigate supply chain challenges caused by tariffs. By offering a comprehensive search tool for local alternatives to tariffed goods, TradeSage helps businesses save costs and supports the Canadian economy.
![image](https://github.com/user-attachments/assets/5b12fb42-a721-458e-bea9-1eb25ba7d649)

DoraHacks submission: https://dorahacks.io/buidl/23017

## Demonstration
https://github.com/user-attachments/assets/05886a47-d1b5-4ccc-a772-1a2a8f9c1388

## Getting Started

To run the TradeSage web application locally, follow the steps below.

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: npm comes with Node.js, but you can check if it's installed by running `npm -v` in your terminal.

### Clone the Repository

First, clone the TradeSage repository to your local machine:

```bash
git clone http://github.com/vanshs64/TradeSage/
```

## Install Dependencies

After cloning the repository, navigate to the project folder and open two terminal windows: one for the backend and one for the frontend.

### 1. Backend Installation

In one terminal window, go to the backend directory and run the following command to install the required dependencies:

```bash
cd TradeSage/backend
npm install
```

### 2. Frontend Installation

In the second terminal window, go to the frontend directory and install the necessary dependencies:

```bash
cd TradeSage/frontend
npm install
```

## Running the Application

### 1. Start the Backend

In the backend terminal, run the following command to start the backend server:

```bash
node index.js
```
### 2. Start the Frontend

In the frontend terminal, run the following command to start the React development server:

```bash
npm run start
```

This will launch the frontend at `http://localhost:3000`.

## Access the Frontend

Open your browser and go to `http://localhost:3000` to access the TradeSage frontend.

## Features

- **Product Search**: Search for imported products or materials affected by tariffs and find local alternatives.
- **Gemini Agent Assistance**: The AI assistant helps users navigate supply chain queries and provides cost comparisons.
- **Pricing and Supplier Information**: Detailed product info including pricing, supplier location, and trade history.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Express.js
- **AI Integration**: Gemini-powered assistance
- **Database**: Google Cloud Platform (GCP)

## Contributing

We welcome contributions! If you'd like to contribute to TradeSage, please fork the repository and submit a pull request.
