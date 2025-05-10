import express from 'express';
import db from './dbConfig.js';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

function verifyToken(req, res, next) {
    let authHeaders = req.get("Authorization");
    if (authHeaders) {
        let token = authHeaders.split(" ")[1];
        jwt.verify(token, "secretkey", (error, payload) => {
            if (!error) {
                req.user = payload;
                next();
            } else {
                res.status(401).send({ message: "Token invalid." });
            }
        });
    } else {
        res.status(401).send({ message: "Token missing." });
    }
}

// REGISTER
app.post("/register", (request, response) => {
    const { fname, email, password } = request.body;
    const encPswrd = hashSync(password, 10);

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            return response.status(500).json({ message: "Database error during registration" });
        }

        if (result.length > 0) {
            return response.status(400).json({ message: "Email already registered" });
        }

        db.query("INSERT INTO users (fname, email, password) VALUES (?, ?, ?)", [fname, email, encPswrd], (err, result) => {
            if (err) {
                return response.status(500).json({ message: "Registration failed" });
            }
            response.status(200).json({ message: "Registration successful" });
        });
    });
});

// LOGIN
app.post("/login", (request, response) => {
    const { email, password } = request.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return response.status(500).json({ message: "Database error" });

        if (results.length > 0) {
            const user = results[0];
            const pswrdSame = compareSync(password, user.password);
            if (pswrdSame) {
                const token = jwt.sign({ email: user.email }, "secretkey", { expiresIn: '1h' });

                return response.status(200).json({
                    message: "Login successful",
                    token: token,
                    fname: user.fname
                });
            } else {
                return response.status(401).json({ message: "Invalid password" });
            }
        } else {
            return response.status(404).json({ message: "User not found" });
        }
    });
});


// SERVER START
app.listen(3000, (err) => {
    if (err) {
        console.log("Something went wrong!!!");
    } else {
        console.log("Server started at http://localhost:3000");
    }
});
