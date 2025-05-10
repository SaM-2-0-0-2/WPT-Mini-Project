import express from "express";
import db from "./dbConfig.js";

const router = express.Router();

router.post("/admin/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM admin WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length > 0) {
            const admin = results[0];
            if (admin.password === password) {
                res.json({ message: "Admin login successful!" });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    });
});

export default router;