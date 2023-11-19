import 'dotenv/config';
import Koa from 'koa';
import { bodyParser } from '@koa/bodyparser';

import logger from 'koa-logger';
import {
    handleFail
} from './utils/handleResponse.js';

import pokemons from './routes/pokemons.js';
import my_pokemons from './routes/my_pokemons.js';
import cors from '@koa/cors';
import initDB from './config/database.js'; 

initDB()

const app = new Koa();
app.use(cors());

app.use(logger());
app.use(bodyParser());

app.use(pokemons.routes());
app.use(my_pokemons.routes());

app.use(function(ctx){
    handleFail(ctx, 404, 'Not Found')
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});