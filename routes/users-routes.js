import express from "express";
import { check } from "express-validator";

import { createUser,
            updateUser,
            getUserByName
            } from "../controllers/users-controller.js";

const usersRouter = express.Router();

usersRouter.post('/crear',
    [
        check('userName').not().isEmpty(), 
        check('password').not().isEmpty().isLength({min:6}),
        check('email').normalizeEmail().isEmail()
    ], 
    createUser
);

usersRouter.patch('/editar/:uid',
    [
        check('userName').not().isEmpty(), 
        check('password').not().isEmpty().isLength({min:6}),
        check('email').normalizeEmail().isEmail()
    ],
    updateUser
);

usersRouter.get('/buscar/:userName', getUserByName);

export default usersRouter;