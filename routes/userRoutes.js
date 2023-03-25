import express from "express"
import userConttroler from "../controllers/userConttrolers.js";
``
const router = express.Router();

//public Routes
router.post('/signup',userConttroler.userSignup)
router.post('/login',userConttroler.userLogin)



export default router;