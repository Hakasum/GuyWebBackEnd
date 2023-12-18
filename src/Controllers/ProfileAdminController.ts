import ProfileService from "../Services/ProfileService"
import TributeService from "../Services/TributeService";
import WritingService from "../Services/WritingService";
import express from "express";
import Tribute from "../models/Tribute";
import Writing from "../models/Writing";

const router = express.Router();

router.get("/:profileId", async (req, res) => {
    try {
        const profile= await ProfileService.getFullProfile(req.params.profileId);
        if (profile!==null) {res.json(profile)}
        else {res.send('No Profile With Such ID')}
    }
    catch (err) {
        res.status(500).json("An Error Occurred ")
    }
});

router.post("/new-tribute/:profileId",async (req, res) => {
    try {
        const newTribute= new Tribute(req.body);
        const addedTribute = await TributeService.createTribute(newTribute, req.params.profileId);
        res.json(addedTribute)
    } catch (err) { 
        res.status(500).json("An Error Occurred ")
    }
});

router.post("/new-writing/:profileId",async (req, res) => {
    try {
        const newTribute= new Writing(req.body);
        const addedWriting = await WritingService.createWriting(newTribute, req.params.profileId);
        res.json(addedWriting)
    } catch (err) { 
        res.status(500).json("An Error Occurred ")
    }
});

router.post("/approve/:profileId/:requestId", async (req, res) => {
    try {
        const result = await ProfileService.approveRequest(req.params.requestId, req.params.profileId);
        res.json(result);
    } catch(err) {
        res.status(500).json("An Error Occurred ")
    }
});

export default router;