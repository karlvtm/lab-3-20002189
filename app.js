import express from "express";
import bodyParser from "body-parser";

import usersRouter from "./routes/users-routes.js";
import sellsRouter from "./routes/sells-routes.js";

const port = 5000;
const app = express();

app.use(bodyParser.json());

app.use('/api/usuarios', usersRouter);

app.use('/api/compras', sellsRouter);

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }else{
        res.status(error.code || 500);
        res.json({mensaje: error.message || 'No se pudo identificar el error ocurrido'})
    }
});

app.listen(port);