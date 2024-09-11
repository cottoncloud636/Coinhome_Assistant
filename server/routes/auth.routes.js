import express from 'express';
import {signup} from '../controllers/auth.controller.js';
import {verifyemail} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.get('/verify/:token', verifyemail);

export default router;