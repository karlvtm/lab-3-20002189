import {v4 as uuidv4} from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';
import { USUARIOS } from "./users-controller.js";

let COMPRAS = [
    {
        cid:'c1',
        totalCompra:15.00,
        uid:'u1',
        fechaHoraCompra:'2020-07-07',
        detalleCompra: [
            {
                did:'d1',
                cid:'c1',
                producto:'pasta de dientes',
                cantidad:1,
                precioUnitario:15.00,
                subtotal:15.00
            }
        ]
    },
    {
        cid:'c2',
        totalCompra:15.00,
        uid:'u1',
        fechaHoraCompra:'2021-10-11',
        detalleCompra: [
            {
                did:'d1',
                cid:'c2',
                producto:'bolsa de globos',
                cantidad:3,
                precioUnitario:3.00,
                subtotal:9.00
            },
            {
                did:'d2',
                cid:'c2',
                producto:'helado',
                cantidad:1,
                precioUnitario:5.00,
                subtotal:5.00
            },
            {
                did:'d3',
                cid:'c2',
                producto:'paquetes de gaseosa en lata',
                cantidad:5,
                precioUnitario:10.00,
                subtotal:50.00
            }
        ]
    },
    {
        cid:'c3',
        totalCompra:15.00,
        uid:'u1',
        fechaHoraCompra:'2022-03-01',
        detalleCompra: [
            {
                did:'d1',
                cid:'c3',
                producto:'tenis Nike',
                cantidad:1,
                precioUnitario:250.00,
                subtotal:250.00
            }
        ]
    }
];

//4 buscar compra en base al nombre de usuario
export const getSellsByUserName = (req,res,next) =>{
    let uname = req.params.userName;

    const intermedio = {...USUARIOS.find(u =>(u.userName === uname))};

    const compra = {...COMPRAS.find(c =>(c.uid === intermedio.uid))}

    res.json(compra);

}

//5 insertar nueva compra a partir de los detalles
export const postSellsByDetail = (req, res, next) =>{
    const {did, cid, producto, cantidad, precioUnitario} = req.body;
    let sbttl = (cantidad*precioUnitario);

    const nuevoDetalle = {
        did,
        cid,
        producto,
        cantidad,
        precioUnitario,
        subtotal: sbttl
    }

    const {uid, fechaHoraCompra} = req.body;
    let total = (nuevoDetalle.subtotal + nuevoDetalle.subtotal)

    const nuevaCompra = {
        cid: nuevoDetalle.cid,
        totalCompra: total,
        uid,
        fechaHoraCompra,
        detalleCompra: nuevoDetalle
    }

    COMPRAS.push(nuevaCompra);
    res.status(201).json(nuevaCompra);

}

//6 Compras que se encuentran en un rango de fechas especifico
export const getSellsByDateRange = (req, res, next) =>{
    const f1 = req.params.fecha1;
    const f2 = req.params.fecha2;

    const fechas = COMPRAS.filter( c => {return (c.fechaHoraCompra >= f1) && (c.fechaHoraCompra <= f2)});
    res.json(fechas); 

}

//7 Compras que se encuentran en un rango de fechas especifico
export const getSellsByTValueRange = (req, res, next) =>{
    const v1 = req.params.fecha1;
    const v2 = req.params.fecha2;

    const fechas = COMPRAS.filter( c => {return (c.totalCompra >= v1) && (c.totalCompra <= v2)});
    res.json(fechas); 

}

//8 get de productos y precios
export const getAll = (req, res, next) =>{
    res.status(200).send({detalleCompra: COMPRAS});
}

//9 patch cantidad y precio en detalles
export const patchDetails = (req, res, next) =>{
    
}

//10 get total de compra
export const getTotal = (req, res, next) =>{
    res.status(200).send({totalCompra: COMPRAS});
}
