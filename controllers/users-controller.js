import {v4 as uuidv4} from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';

export let USUARIOS = [
    {
        uid: 'u1',
        userName: 'John Doe',
        password: 'asdf1234',
        email: 'jdmail@gmail.com',
        creationDate: '2021-05-15'
    },
    {
        uid: 'u2',
        userName: 'Sarah Martin',
        password: 'dddr3456',
        email: 'sMartin@gmail.com',
        creationDate: '2020-10-06'
    },
    {
        uid: 'u3',
        userName: 'Carlos Correa',
        password: '57cc9978',
        email: 'cclic@yahoo.com',
        creationDate: '2021-03-20'
    }
];

//1 crear nuevo usuario
export const createUser = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return next(new HttpError("Los datos ingresados no son validos.", 422));
    } else {
        const {userName,password,email,creationDate} = req.body;

        const nuevoUsuario = {
            uid: uuidv4(),
            userName,
            password,
            email,
            creationDate
        }

        DUMMY_USUARIOS.push(nuevoUsuario);
        res.status(201);
    }
}

//2 editar un usuario existente
export const updateUser = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return next(new HttpError("Los datos ingresados no son validos.", 422));
    } else {
        let id = req.params.uid
        const {userName,password,email} = req.body;

        const cambio = {...USUARIOS.find(u =>(u.uid === id))};
        cambio.userName = userName;
        cambio.password = password;
        cambio.email = email;

        const indiceJson = {...USUARIOS.findIndex(u =>(u.uid === id))};
        DUMMY_USUARIOS[indiceJson] = cambio;
        res.status(200)
    }
}

//3 buscar usuario en base a su nombre
export const getUserByName = (req, res, next) =>{
    let name = req.params.userName;
    const regreso = {...USUARIOS.find(u =>(u.userName === name))};
    console.log('GET desde la busqueda de usuarios');

    if (!regreso){
        return next( new HttpError('El usuario especificado no existe'));
    } else {
        res.json(regreso);
    }
}
