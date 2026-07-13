import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

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

const config = {
    params: {
        api_key: API_KEY
    }
}

let content = null;

app.get("/get-fact", async (r, s) => {
    try {
        const response = await axios.get(API_URL, config);
        const result = response.data;
        content = result;
        console.log(content.url);
        s.redirect("/");
    } catch (error) {
        content = error;
        s.redirect("/");
    }
})


app.get("/", async (r, s) => {
    s.render("index", {content});
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});