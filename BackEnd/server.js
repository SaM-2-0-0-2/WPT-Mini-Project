import express from 'express';
import db from './dbConfig.js'; 
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", (request, response) => {
    const { fname, email, password } = request.body;

    // Check if the email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            return response.status(500).json({ message: "Database error during registration" });
        }

        if (result.length > 0) {
            return response.status(400).json({ message: "Email already registered" });
        }

        // Proceed with registration
        db.query("INSERT INTO users (fname, email, password) VALUES (?,?,?)", [fname, email, password], (err, result) => {
            if (err) {
                return response.status(500).json({ message: "Registration failed, please try again" });
            }
            response.status(200).json({ message: "Registration successful" });
        });
    });
});

app.post("/login", (request, response) => {
    const { email, password } = request.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return response.status(500).json({ error: err });

        if (results.length > 0) {
            const user = results[0];
            if (user.password === password) {
                response.json("Success");
            } else {
                response.json("Incorrect password");
            }
        } else {
            response.json("No user found");
        }
    });
});

app.listen(3000, (err) => {
    if (err) {
        console.log("Something went wrong!!!");
    } else {
        console.log("Server started at http://localhost:3000");
    }
});
