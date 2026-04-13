import express from 'express';
import sellerController from '../controllers/sellerController.js';

const router = express.Router();

router.get("/profile", sellerController.getSellerProfile);
router.get("/all", sellerController.getAllSellers);
router.post("/create", sellerController.createSeller);
router.patch("/update", sellerController.updateSeller);
router.post("/verify/login-otp", sellerController.verifyLoginOtp);

export default router;