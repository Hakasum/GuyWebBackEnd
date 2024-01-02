import express from "express";
import AuthService from "../Services/AuthService";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const loggedInUser = await AuthService.loginAsync(req.body);
        if (!loggedInUser) return res.status(401).send("Incorrect email or password.");
        res.json(loggedInUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});

export default router;