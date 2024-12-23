# Drug Interaction Checker

## Overview
The Drug Interaction Checker is a web application that allows users to check for potential interactions between two drugs. It provides information about the nature of the interaction, its severity, and recommendations for safe usage.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB (for production use)
- **Other Libraries**: Axios for API calls, Mongoose for MongoDB object modeling, and CORS for cross-origin resource sharing.

## Features
- Check for drug interactions by entering the names of two drugs.
- Display detailed information about the interaction, including:
  - Interaction description
  - Severity level (Low, Moderate, High)
  - Mechanism of interaction
  - Recommendations for safe use
- Add new drug interactions to the database (admin feature).
- View all drug interactions stored in the database.

## Installation
Navigate to the backend directory and Install dependencies::
*cd backend*
*npm install*
Start the backend server:
*node index.js*

Navigate to the frontend directory:
*cd ../my-app*
Install dependencies:
*npm install*
Start the frontend application:
*npm start*

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed and running (for production use).

## Usage
Open your web browser and go to http://localhost:3000 to access the Drug Interaction Checker.
Enter the names of the two drugs you want to check for interactions.
Click the "Check Interaction" button to see the results.

##API Endpoints
POST /check-interaction
Description: Check for interactions between two drugs.
Request Body:
json
*{
  "drug_1": "DrugName1",
  "drug_2": "DrugName2"
}*
Response:
Success: Returns interaction details.
Error: Returns an error message if no interaction is found.

POST /api/interactions
Description: Add a new drug interaction to the database.
Request Body:
json
*{
  "drugName": "DrugName",
  "interactionDetails": "Description of the interaction",
  "severity": "High/Moderate/Low"
}*
Response: Confirmation of the added interaction.

GET /interactions
Description: Retrieve all drug interactions from the database.
Response: Returns a list of all interactions.

### Clone the Repository
```bash
git clone https://github.com/annie-81/drug-interaction-checker.git
cd drug-interaction-checker
