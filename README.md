# Capstone NASA APOD API

A Node.js + Express capstone project that integrates with NASA's **Astronomy Picture of the Day (APOD)** API.

The application retrieves NASA's Astronomy Picture of the Day and displays its information in a clean web interface using **Express** and **EJS**.

## Features

* Fetch NASA's Astronomy Picture of the Day
* Retrieve the APOD for a specific date
* Display random APOD entries (using the `count` parameter)
* Display images when the response contains an image
* Embed videos when the response contains a video
* Show the title, explanation, and date
* Keep API keys secure using environment variables

## Tech Stack

* Node.js
* Express.js
* EJS
* Axios
* dotenv

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Copy the contents of `.env.example` into a new `.env` file.

Example:

```env
NASA_API_KEY=YOUR_API_KEY_HERE
```

### 4. Get a NASA API key

Create a free API key from NASA and replace `YOUR_API_KEY_HERE` in your `.env` file.

### 5. Start the application

```bash
npm start
```

or

```bash
node index.js
```

The application should now be running locally.

---

## Environment Variables

| Variable       | Description       |
| -------------- | ----------------- |
| `NASA_API_KEY` | Your NASA API key |

## Project Structure

```text
.
├── public/
├── views/
├── routes/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── index.js
```

## API Used

This project uses NASA's **Astronomy Picture of the Day (APOD)** API.

The API may return either:

* an **image**
* a **video**

The application checks the `media_type` field in the response and renders the appropriate HTML element:

* `image` → `<img>`
* `video` → `<iframe>`

## Security

This project follows basic security practices:

* API keys are stored in environment variables.
* Sensitive credentials are **not** committed to the repository.
* A `.env.example` file is provided to simplify local setup.

## License

This project is intended for educational purposes as part of a web development capstone.
