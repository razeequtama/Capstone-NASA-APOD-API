import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

//These are Node.js built-in modules that let Axios reuse TCP connections.
import http from "http";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
const API_URL = process.env.URL_ENDPOINT;
const API_KEY = process.env.API_KEY;

// Set EJS as template engine
app.set("view engine", "ejs");

// Set views directory
app.set("views", path.join(__dirname, "views"));

// Set static default directory to public/
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Create a reusable Axios instance.
//
// keepAlive:
// Reuses the same TCP connection for multiple requests
// instead of opening a new one every time.
//
// timeout:
// Cancel the request if the API doesn't respond
// within 5 seconds.
const axiosClient = axios.create({
    timeout: 5000,
    httpAgent: new http.Agent({
        keepAlive: true,
    }),
    httpsAgent: new https.Agent({
        keepAlive: true,
    }),
});

// Configuration shared by every request.
const config = {
    params: {
        api_key: API_KEY,
    },
};

// Stores the most recent API response.
let cache = null;

// Records when the cache was last updated.
let cacheTime = 0;

// Cache lifetime (1 minute).
// During this period, requests use the cached data
// instead of calling the API again.
const CACHE_DURATION = 60 * 1000;

let content = null;

app.get("/get-fact", async (req, res) => {
    try {

        // If cached data exists and hasn't expired,
        // return it immediately.
        if (
            cache &&
            Date.now() - cacheTime < CACHE_DURATION
        ) {
            return res.json(cache);
        }

        // Cache expired (or doesn't exist),
        // so fetch fresh data from the API.
        const response = await axiosClient.get(API_URL, config);

        // Save the latest response in memory.
        cache = response.data;

        // Remember when the cache was updated.
        cacheTime = Date.now();

        // Send the fresh data.
        res.json(cache);

    } catch (err) {

        console.error(err.message);

        res.status(500).json({
            error: "Failed to fetch data."
        });

    }
});


app.get("/", async (r, s) => {
    s.render("index", {content});
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});