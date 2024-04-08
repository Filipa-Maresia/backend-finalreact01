import { Router } from "express";
import { check } from 'express-validator';
import UserController from "../controllers/UserController";
import { checkRoles } from '../middlewares/AuthMiddleware';

const router = Router();

// Define the roles required for specific routes
const adminOnly = checkRoles(['ADMIN']);
const userAndAdmin = checkRoles(['USER', 'ADMIN']);

router.get('/users', adminOnly, UserController.getAllUsers);
router.get('/users/:id', userAndAdmin, UserController.getUserById);

// Create a new user
router.post(
    '/register',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').isStrongPassword()
        .withMessage(`minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1`),
        check('role').isIn(['USER', 'ADMIN']).withMessage('Invalid role')
    ],
    UserController.registerUser
);

// Login user
router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').isLength({ min: 6 })
            .withMessage('Password should be at least 6 chars long')
    ],
    UserController.loginUser
);

// Delete a user by ID
router.delete('/users/:id', adminOnly, UserController.deleteUser);

export default router;
