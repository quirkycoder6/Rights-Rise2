import express from "express";
import { numberguesser } from "../controllers/games.js";
import { quiz } from "../controllers/games.js";
import { scramble } from "../controllers/games.js";
import { wordguesser } from "../controllers/games.js";

const router = express.Router();
router.post("/numberguesser", numberguesser); 
router.post("/quiz", quiz);
router.post("/scramble", scramble); 
router.post("/wordguesser", wordguesser);

export default router;