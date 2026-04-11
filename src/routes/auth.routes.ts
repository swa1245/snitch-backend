import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { googleAuth, login, register } from "../controller/auth.controller.js";
import passport from "passport";

const router = Router()

router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }),googleAuth);

export default router;