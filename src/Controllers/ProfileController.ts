import Tribute from "../models/Tribute";
import Profile from "../models/Profile";
import ProfileService from "../Services/ProfileService";
import express from "express";
import Request from "../models/Request";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const profiles= await ProfileService.getAllProfiles();
        if (profiles.length!==0) {res.json(profiles);}
        else {res.send('No Profiles Yet')}
    }
    catch (err) {
        res.status(500).json("An Error Occurred ")
    }
})

router.post("/new-tribute",async (req, res) => {
    try {
        const newTribute= new Tribute(req.body);
        const addedTribute = await ProfileService.createProfileTribute(newTribute);
        res.json(addedTribute)
    } catch (err) { 
        res.status(500).json("An Error Occurred ")
    }
})

router.post("/new-request",async (req, res) => {
    try {
        const newRequest = new Request();
        newRequest.profileId = req.body.profileId;
        newRequest.type = req.body.type;
        newRequest.body = req.body.body;
        const addedRequest = await ProfileService.createRequest(newRequest);
        res.json(addedRequest)
    } catch (err) { 
        res.status(500).json("An Error Occurred ")
    }
})

router.post("/", async (req, res) => {
    try { 
        const newProfile = new Profile(req.body);
        const addedProfile = await ProfileService.createProfile(newProfile);
        res.json(addedProfile)
    }
    catch (err) {
        res.status(500).json("An Error Occurred ")
    }
})

router.delete("/:profileId", async (req, res) => {
    try {
        const { profileId } = req.params;  // Get profileId from the request parameters
        const deletedProfile = await ProfileService.deleteProfile(profileId);
        res.json(deletedProfile);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});


export default router;