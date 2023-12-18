import ProfileService from "../Services/ProfileService";
import express from "express";
import Request from "../models/Request";

const router = express.Router();

router.get("/get-all-profiles", async (req, res) => {
    try {
        const profiles= await ProfileService.getAllProfiles();
        if (profiles.length!==0) {res.json(profiles);}
        else {res.send('No Profiles Yet')}
    }
    catch (err) {
        res.status(500).json("An Error Occurred ")
    }
})

router.get("/:profileId", async (req, res) => {
    try {
        const profile= await ProfileService.getFullProfile(req.params.profileId);
        if (profile!==null) {res.json(profile)}
        else {res.send('No Profile With Such ID')}
    }
    catch (err) {
        res.status(500).json("An Error Occurred ")
    }
})

router.post("/new-request/:profileId",async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        const addedRequest = await ProfileService.createRequest(newRequest, req.params.profileId);
        res.json(addedRequest)
    } catch (err) { 
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});

export default router;