import express from 'express';
import db from './dbConfig.js';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import eventRoutes from "./eventRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(eventRoutes);

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


//Contact Us Query Form
app.post("/query", (request, response) => {
    const { fname, email, subject, query } = request.body;
    db.query("INSERT INTO queries (fname, email, subject, query) VALUES (?,?,?,?)", [fname, email, subject, query], (err) => {
        console.log(fname, email, subject, query)
        if (!err) {
            response.status(200).send({ message: "Response sent successfully" });
        } else {
            response.status(500).send({ message: "Internal Server Error" });
        }
    })
});

//Admin Form Login
app.post("/admin/login", (request, response) => {
    const { email, password } = request.body;
    db.query("SELECT * FROM admin WHERE email = ?", [email], (err, results) => {
        if (err) return response.status(500).json({ message: "Database error" });

        if (results.length > 0) {
            const user = results[0];
            console.log(password, user.password);
            if (password === user.password) {
                const token = jwt.sign({ email: user.email }, "secretkey", { expiresIn: '1h' });

                return response.status(200).json({
                    message: "Login successful",
                    token: token,
                    Username: user.Username
                });
            } else {
                return response.status(401).json({ message: "Invalid password" });
            }
        } else {
            return response.status(404).json({ message: "User not found" });
        }
    });
})

//All Queries
app.get("/query", (req, res) => {
    let qry = `select fname, email, subject, query from queries;`;
    db.query(qry, (error, result) => {
        if (!error) {
            res.status(200).json({message:"Feedbacks retrieved successfully.", result, Feedbackcount:result.length });
        }
        else {
            res.status(500).send({ message: "Server Internal Error" });
        }
    })
});

//Admin side event information
app.get("/geteventdetails", (req, res) => {
    let qry = `select eventid, link, eventname, venue, eventdatetime, hostname from event;`;

    db.query(qry, (error, result) => {
        if (!error) {
            res.status(200).json({message:"All event data retrieved successfully.", result, Eventcount:result.length });
        }
        else {
            res.status(500).send({ message: "Server Internal Error" });
        }

    })
});

/*
UPDATE EVENT
app.put("/updateevent", verifyToken, (req, res) => {
    let qry = `update event set link="${req.body.link}", eventname="${req.body.eventname}", venue="${req.body.venue}", eventdatetime="${req.body.eventdatetime}", hostname="${req.body.hostname}" where eventid=${req.body.eventid};`;
    console.log(`FORMED QUERY: ${qry}`);
    db.query(qry, (error, result) => {
        if (!error) {
            res.status(200).send({ message: "Event updated successsfully." });
        }
        else {
            res.status(500).send({ message: "Server Internal Error.", error });
        }
    })
});

DELETE EVENT
app.delete("/deleteevent/:id", verifyToken , (req, res) => {
    let qry = `delete from event where eventid=${req.params.id};`;
    console.log(`FORMED QUERY: ${qry}`);
    db.query(qry, (error, result) => {
        if (!error) {
            res.status(200).json({message:"Event removed."});
        }
        else {
            res.status(500).send({ message: "Server Internal Error" });
        }

    })
});
*/

// SERVER START
app.listen(3000, (err) => {
    if (err) {
        console.log("Something went wrong!!!");
    } else {
        console.log("Server started at http://localhost:3000");
    }
});
