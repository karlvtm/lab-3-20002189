import express from "express";
import { check } from "express-validator";

import { getSellsByUserName,
                    postSellsByDetail, 
                    getSellsByDateRange, 
                    getSellsByTValueRange, 
                    getAll, 
                    patchDetails, 
                    getTotal 
                    } from "../controllers/sells-controllers.js";

const sellsRouter = express.Router();

sellsRouter.get('/buscar/:userName', getSellsByUserName);

sellsRouter.post('/crearCompra',
    [
        check('did').not().isEmpty(), 
        check('cid').not().isEmpty(),
        check('producto').not().isEmpty(), 
        check('cantidad').not().isEmpty(), 
        check('precioUnitario').not().isEmpty().isDecimal(),
    ],  
    postSellsByDetail
);

sellsRouter.get('/buscar/:fecha1/:fecha2',
    [
        check('fecha1').isDate().not().isEmpty(),
        check('fecha2').isDate().not().isEmpty()
    ],
    getSellsByDateRange
);

sellsRouter.get('/buscar/:valor1/:valor2',
    [
        check('valor1').isDecimal().not().isEmpty(),
        check('valor2').isDecimal().not().isEmpty()
    ],
    getSellsByTValueRange
);

sellsRouter.get('/', getAll);

sellsRouter.patch('/totalDetalles', patchDetails);

sellsRouter.get('/totalDetalles', getTotal);



export default sellsRouter;