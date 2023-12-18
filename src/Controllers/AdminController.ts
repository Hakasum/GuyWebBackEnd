import ProfileService from "../Services/ProfileService";
import express from "express";
import Request from "../models/Request";
import Profile from "../models/Profile";

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
        res.status(500).json("An Error Occurred ")
    }
})

router.post("/add-profile", async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        const addedProfile = await ProfileService.createProfile(newProfile);
        res.json(addedProfile)
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
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