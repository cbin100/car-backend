# Car Explorer API (Backend)

REST API for car data built with Node.js, Express, and Firebase Firestore.

---

## Live API

https://car-backend-fjjq.onrender.com

---

## Endpoints

### Get Cars

GET /api/cars

### Query Parameters

| Param | Description |
|------|------------|
| search | Search by make/model |
| make | Filter by make |
| fuel | Region (usa, japan, europe) |
| minYear | Minimum year |
| sortBy | Field to sort |
| order | asc / desc |
| page | Page number |
| limit | Items per page |

---


### Export CSV

GET /api/cars/export


## Dataset Import

The dataset was imported into Firestore using a custom Node.js script.

### File location

src/scripts/importData.js

### Dataset

Source:  
https://www.kaggle.com/datasets/tawfikelmetwally/automobile-dataset

The dataset should be saved as:
src/scripts/cars.csv

---

### Run import script

```bash
node src/scripts/importData.js

## Note
Ensure Firebase credentials are correctly set in .env before running the script.


## Tech Stack

- Node.js
- Express.js
- Firebase Admin SDK
- Firestore

---

## Environment Variables

Create `.env`:

```env
PORT=5050
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"

# Run Locally

npm install
npm run dev

# Deployment

	•	Hosted on Render
	•	Uses environment variables for Firebase credentials

## Known Issue

Firestore free-tier quota (50K reads/day) may be exceeded during testing. This can temporarily prevent data from loading.

## Author
Watchiba